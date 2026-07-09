const KEYS = {
  session: 'pax_portal_session_v1',
  users: 'pax_portal_users_v1',
  profiles: 'pax_portal_profiles_v1',
  pending: 'pax_portal_pending_order_v1',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
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
    messages: [
      {
        id: uid('msg'),
        from: 'care',
        author: 'Pax Care Team',
        body: `Hi ${user.firstName} — thanks for completing checkout. A licensed U.S. provider is reviewing your intake (usually within 24 hours). We’ll update your Patient Center when your prescription is approved.`,
        at: new Date().toISOString(),
        read: false,
      },
    ],
    weightLog: [],
    order: order
      ? {
          treatmentId: order.treatment?.id,
          planId: order.plan?.id,
          total: order.plan?.total,
          intake: order.intake || null,
          purchasedAt: new Date().toISOString(),
        }
      : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function getSession() {
  return read(KEYS.session, null);
}

export function setSession(session) {
  if (!session) localStorage.removeItem(KEYS.session);
  else write(KEYS.session, session);
}

export function listUsers() {
  return read(KEYS.users, []);
}

export function findUserByEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  return listUsers().find((u) => u.email === normalized) || null;
}

export function signup({ firstName, lastName, email, password, phone, order }) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !password || password.length < 4) {
    throw new Error('Enter a valid email and a password (4+ characters).');
  }
  if (findUserByEmail(normalized)) {
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

  const users = listUsers();
  users.push(user);
  write(KEYS.users, users);

  const profiles = read(KEYS.profiles, {});
  profiles[user.id] = defaultProfile(user, order || null);
  write(KEYS.profiles, profiles);

  const session = { userId: user.id, email: user.email, at: new Date().toISOString() };
  setSession(session);
  return { user, session };
}

/** Yucca-style: account is created only after purchase + verify. */
export function completePurchaseSignup({ firstName, lastName, email, password, phone, treatment, plan, intake }) {
  const result = signup({
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

export function getPendingOrder() {
  return read(KEYS.pending, null);
}

export function savePendingOrder(order) {
  write(KEYS.pending, { ...order, updatedAt: new Date().toISOString() });
}

export function clearPendingOrder() {
  localStorage.removeItem(KEYS.pending);
}

export function login({ email, password }) {
  const user = findUserByEmail(email);
  if (!user || user.password !== String(password || '')) {
    throw new Error('Email or password does not match. Try again or create an account.');
  }
  const session = { userId: user.id, email: user.email, at: new Date().toISOString() };
  setSession(session);
  return { user, session };
}

export function logout() {
  setSession(null);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session?.userId) return null;
  return listUsers().find((u) => u.id === session.userId) || null;
}

export function getProfile(userId) {
  const profiles = read(KEYS.profiles, {});
  return profiles[userId] || null;
}

export function saveProfile(userId, patch) {
  const profiles = read(KEYS.profiles, {});
  const current = profiles[userId] || {};
  profiles[userId] = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  write(KEYS.profiles, profiles);
  return profiles[userId];
}

export function toggleChecklistItem(userId, itemId) {
  const profile = getProfile(userId);
  if (!profile) return null;
  const checklist = profile.checklist.map((item) =>
    item.id === itemId ? { ...item, done: !item.done } : item,
  );
  return saveProfile(userId, { checklist });
}

export function sendMessage(userId, body) {
  const profile = getProfile(userId);
  if (!profile) return null;
  const text = String(body || '').trim();
  if (!text) return profile;

  const messages = [
    ...profile.messages,
    {
      id: uid('msg'),
      from: 'patient',
      author: 'You',
      body: text,
      at: new Date().toISOString(),
      read: true,
    },
  ];

  // Simulated care-team reply after a short delay is handled in UI;
  // also persist an immediate acknowledgment for offline feel.
  messages.push({
    id: uid('msg'),
    from: 'care',
    author: 'Pax Care Team',
    body: 'Thanks — we received your message. A care specialist typically replies within a few hours during business days.',
    at: new Date(Date.now() + 800).toISOString(),
    read: false,
  });

  return saveProfile(userId, { messages });
}

export function markMessagesRead(userId) {
  const profile = getProfile(userId);
  if (!profile) return null;
  const messages = profile.messages.map((m) => ({ ...m, read: true }));
  return saveProfile(userId, { messages });
}

export function addWeightEntry(userId, lbs) {
  const profile = getProfile(userId);
  if (!profile) return null;
  const value = Number(lbs);
  if (!Number.isFinite(value) || value <= 0) throw new Error('Enter a valid weight.');
  const weightLog = [
    { id: uid('wt'), lbs: value, at: new Date().toISOString() },
    ...(profile.weightLog || []),
  ].slice(0, 24);
  return saveProfile(userId, { weightLog });
}

export function updateTreatmentStatus(userId, status) {
  const profile = getProfile(userId);
  if (!profile) return null;
  return saveProfile(userId, {
    treatment: { ...profile.treatment, status },
  });
}

export function clearAllPortalData() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
