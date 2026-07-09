/**
 * Pax Longevity Patient Center — local relational database (IndexedDB).
 * Tables: users, profiles, orders, messages, weight_logs, meta
 * Session cookie stays in localStorage (auth token only).
 */

const DB_NAME = 'pax_longevity_db';
const DB_VERSION = 1;
const SESSION_KEY = 'pax_portal_session_v2';
const PENDING_KEY = 'pax_portal_pending_order_v2';
const LEGACY = {
  users: 'pax_portal_users_v1',
  profiles: 'pax_portal_profiles_v1',
  session: 'pax_portal_session_v1',
  pending: 'pax_portal_pending_order_v1',
};

let dbPromise = null;

function uid(prefix = 'id') {
  return `${prefix}_${crypto.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`}`;
}

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('users')) {
        const users = db.createObjectStore('users', { keyPath: 'id' });
        users.createIndex('email', 'email', { unique: true });
      }
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'userId' });
      }
      if (!db.objectStoreNames.contains('orders')) {
        const orders = db.createObjectStore('orders', { keyPath: 'id' });
        orders.createIndex('userId', 'userId', { unique: false });
        orders.createIndex('email', 'email', { unique: false });
      }
      if (!db.objectStoreNames.contains('messages')) {
        const messages = db.createObjectStore('messages', { keyPath: 'id' });
        messages.createIndex('userId', 'userId', { unique: false });
      }
      if (!db.objectStoreNames.contains('weight_logs')) {
        const weights = db.createObjectStore('weight_logs', { keyPath: 'id' });
        weights.createIndex('userId', 'userId', { unique: false });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
  });
  return dbPromise;
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));
  });
}

async function storePut(storeName, value) {
  const db = await openDb();
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).put(value);
  await txDone(tx);
  return value;
}

async function storeGet(storeName, key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function storeGetAll(storeName) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function storeIndexGet(storeName, indexName, query) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).index(indexName).get(query);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function storeIndexGetAll(storeName, indexName, query) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).index(indexName).getAll(query);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function storeClear(storeName) {
  const db = await openDb();
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).clear();
  await txDone(tx);
}

function readLocal(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function defaultProfile(user, order = null) {
  const treatmentName = order?.treatment?.med || order?.treatment?.name || 'Personalized Semaglutide';
  const planLabel = order?.plan?.label ? `${order.plan.label} plan` : 'Provider-guided plan';
  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || order?.phone || '',
    dob: '',
    treatment: {
      name: treatmentName,
      status: 'Pending provider review',
      dose: 'To be confirmed by provider',
      nextRefill: addDays(3),
      pharmacy: 'Licensed U.S. compounding pharmacy',
      startedAt: new Date().toISOString().slice(0, 10),
      plan: planLabel,
    },
    checklist: [
      { id: 'welcome', label: 'Welcome to Pax Longevity', done: true },
      { id: 'intake', label: 'Complete clinical intake', done: true },
      { id: 'checkout', label: 'Checkout & authorization hold', done: true },
      { id: 'id', label: 'Verify your identity', done: true },
      { id: 'provider', label: 'Provider review (within 24 hours)', done: false },
      { id: 'ship', label: 'First shipment on the way', done: false },
      { id: 'start', label: 'Start your first dose', done: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

let migrated = false;

async function migrateFromLegacyIfNeeded() {
  if (migrated) return;
  const db = await openDb();
  const flag = await storeGet('meta', 'migrated_v1');
  if (flag?.value) {
    migrated = true;
    return;
  }

  const legacyUsers = readLocal(LEGACY.users, []);
  const legacyProfiles = readLocal(LEGACY.profiles, {});

  if (Array.isArray(legacyUsers) && legacyUsers.length) {
    const tx = db.transaction(['users', 'profiles', 'messages', 'weight_logs', 'orders'], 'readwrite');
    for (const user of legacyUsers) {
      tx.objectStore('users').put(user);
      const profile = legacyProfiles[user.id];
      if (profile) {
        const { messages = [], weightLog = [], order = null, ...rest } = profile;
        tx.objectStore('profiles').put({ ...rest, userId: user.id });
        for (const msg of messages) {
          tx.objectStore('messages').put({ ...msg, userId: user.id, id: msg.id || uid('msg') });
        }
        for (const w of weightLog) {
          tx.objectStore('weight_logs').put({ ...w, userId: user.id, id: w.id || uid('wt') });
        }
        if (order) {
          tx.objectStore('orders').put({
            id: uid('ord'),
            userId: user.id,
            email: user.email,
            status: 'pending_review',
            treatment: { id: order.treatmentId, name: rest.treatment?.name },
            plan: { id: order.planId, total: order.total, label: rest.treatment?.plan },
            intake: order.intake,
            total: order.total || 0,
            createdAt: order.purchasedAt || new Date().toISOString(),
          });
        }
      }
    }
    await txDone(tx);
  }

  const legacySession = readLocal(LEGACY.session, null);
  if (legacySession && !readLocal(SESSION_KEY, null)) {
    writeLocal(SESSION_KEY, legacySession);
  }
  const legacyPending = readLocal(LEGACY.pending, null);
  if (legacyPending && !readLocal(PENDING_KEY, null)) {
    writeLocal(PENDING_KEY, legacyPending);
  }

  await storePut('meta', { key: 'migrated_v1', value: true, at: new Date().toISOString() });
  migrated = true;
}

async function ensureDb() {
  await openDb();
  await migrateFromLegacyIfNeeded();
}

export function getSession() {
  return readLocal(SESSION_KEY, null);
}

export function setSession(session) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else writeLocal(SESSION_KEY, session);
}

export function getPendingOrder() {
  return readLocal(PENDING_KEY, null);
}

export function savePendingOrder(order) {
  writeLocal(PENDING_KEY, { ...order, updatedAt: new Date().toISOString() });
}

export function clearPendingOrder() {
  localStorage.removeItem(PENDING_KEY);
}

export async function findUserByEmail(email) {
  await ensureDb();
  const normalized = String(email || '').trim().toLowerCase();
  return storeIndexGet('users', 'email', normalized);
}

export async function signup({ firstName, lastName, email, password, phone, order }) {
  await ensureDb();
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !password || password.length < 4) {
    throw new Error('Enter a valid email and a password (4+ characters).');
  }
  if (await findUserByEmail(normalized)) {
    throw new Error('An account with this email already exists. Sign in instead.');
  }

  const user = {
    id: uid('user'),
    firstName: String(firstName || 'Member').trim() || 'Member',
    lastName: String(lastName || '').trim(),
    email: normalized,
    password: String(password),
    phone: String(phone || '').trim(),
    createdAt: new Date().toISOString(),
  };

  await storePut('users', user);

  const profile = defaultProfile(user, order || null);
  await storePut('profiles', profile);

  if (order?.treatment || order?.plan) {
    await storePut('orders', {
      id: uid('ord'),
      userId: user.id,
      email: user.email,
      status: 'pending_review',
      treatment: order.treatment || null,
      plan: order.plan || null,
      intake: order.intake || null,
      phone: user.phone,
      total: order.plan?.total || 0,
      createdAt: new Date().toISOString(),
    });
  }

  const welcomeMsg = {
    id: uid('msg'),
    userId: user.id,
    from: 'care',
    author: 'Pax Care Team',
    body: `Hi ${user.firstName} — thanks for completing checkout. A licensed U.S. provider is reviewing your intake (usually within 24 hours). We’ll update your Patient Center when your prescription is approved.`,
    at: new Date().toISOString(),
    read: false,
  };
  await storePut('messages', welcomeMsg);

  const session = { userId: user.id, email: user.email, at: new Date().toISOString() };
  setSession(session);
  return { user, session };
}

export async function completePurchaseSignup({ firstName, lastName, email, password, phone, treatment, plan, intake }) {
  const result = await signup({
    firstName,
    lastName,
    email,
    password,
    phone,
    order: { treatment, plan, intake, phone },
  });
  clearPendingOrder();
  return result;
}

export async function login({ email, password }) {
  await ensureDb();
  const user = await findUserByEmail(email);
  if (!user || user.password !== String(password || '')) {
    throw new Error('Email or password does not match. Complete checkout first, or try again.');
  }
  const session = { userId: user.id, email: user.email, at: new Date().toISOString() };
  setSession(session);
  return { user, session };
}

export function logout() {
  setSession(null);
}

export async function getCurrentUser() {
  await ensureDb();
  const session = getSession();
  if (!session?.userId) return null;
  return storeGet('users', session.userId);
}

export async function getProfile(userId) {
  await ensureDb();
  const profile = await storeGet('profiles', userId);
  if (!profile) return null;
  const messages = (await storeIndexGetAll('messages', 'userId', userId)).sort(
    (a, b) => new Date(a.at) - new Date(b.at),
  );
  const weightLog = (await storeIndexGetAll('weight_logs', 'userId', userId)).sort(
    (a, b) => new Date(b.at) - new Date(a.at),
  );
  const orders = await storeIndexGetAll('orders', 'userId', userId);
  const latestOrder = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  return {
    ...profile,
    messages,
    weightLog,
    order: latestOrder
      ? {
          treatmentId: latestOrder.treatment?.id,
          planId: latestOrder.plan?.id,
          total: latestOrder.total,
          intake: latestOrder.intake,
          purchasedAt: latestOrder.createdAt,
          status: latestOrder.status,
        }
      : null,
  };
}

export async function saveProfile(userId, patch) {
  await ensureDb();
  const current = (await storeGet('profiles', userId)) || { userId };
  const { messages, weightLog, order, ...safePatch } = patch;
  const next = {
    ...current,
    ...safePatch,
    userId,
    updatedAt: new Date().toISOString(),
  };
  await storePut('profiles', next);
  return getProfile(userId);
}

export async function toggleChecklistItem(userId, itemId) {
  const profile = await storeGet('profiles', userId);
  if (!profile) return null;
  const checklist = (profile.checklist || []).map((item) =>
    item.id === itemId ? { ...item, done: !item.done } : item,
  );
  return saveProfile(userId, { checklist });
}

export async function sendMessage(userId, body) {
  await ensureDb();
  const text = String(body || '').trim();
  if (!text) return getProfile(userId);

  await storePut('messages', {
    id: uid('msg'),
    userId,
    from: 'patient',
    author: 'You',
    body: text,
    at: new Date().toISOString(),
    read: true,
  });

  await storePut('messages', {
    id: uid('msg'),
    userId,
    from: 'care',
    author: 'Pax Care Team',
    body: 'Thanks — we received your message. A care specialist typically replies within a few hours during business days.',
    at: new Date(Date.now() + 500).toISOString(),
    read: false,
  });

  return getProfile(userId);
}

export async function markMessagesRead(userId) {
  await ensureDb();
  const messages = await storeIndexGetAll('messages', 'userId', userId);
  const db = await openDb();
  const tx = db.transaction('messages', 'readwrite');
  for (const msg of messages) {
    tx.objectStore('messages').put({ ...msg, read: true });
  }
  await txDone(tx);
  return getProfile(userId);
}

export async function addWeightEntry(userId, lbs) {
  await ensureDb();
  const value = Number(lbs);
  if (!Number.isFinite(value) || value <= 0) throw new Error('Enter a valid weight.');
  await storePut('weight_logs', {
    id: uid('wt'),
    userId,
    lbs: value,
    at: new Date().toISOString(),
  });
  return getProfile(userId);
}

export async function listOrders(userId) {
  await ensureDb();
  return storeIndexGetAll('orders', 'userId', userId);
}

export async function clearAllPortalData() {
  await ensureDb();
  await Promise.all([
    storeClear('users'),
    storeClear('profiles'),
    storeClear('orders'),
    storeClear('messages'),
    storeClear('weight_logs'),
    storeClear('meta'),
  ]);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(PENDING_KEY);
  Object.values(LEGACY).forEach((k) => localStorage.removeItem(k));
  migrated = false;
}

/** Dev helper: inspect table counts in console */
export async function dbStats() {
  await ensureDb();
  const [users, profiles, orders, messages, weights] = await Promise.all([
    storeGetAll('users'),
    storeGetAll('profiles'),
    storeGetAll('orders'),
    storeGetAll('messages'),
    storeGetAll('weight_logs'),
  ]);
  return {
    database: DB_NAME,
    users: users.length,
    profiles: profiles.length,
    orders: orders.length,
    messages: messages.length,
    weight_logs: weights.length,
  };
}
