/**
 * Pax Auth Dictionary DB
 * ----------------------
 * A JSON dictionary that behaves like a tiny real database:
 *   users[email]    -> account row
 *   sessions[token] -> active login
 *   audit[]         -> login / logout history
 *
 * Persisted in localStorage so refresh keeps you signed in until logout.
 */

const DB_KEY = 'pax_auth_dict_db_v1';
const ACTIVE_SESSION_KEY = 'pax_auth_active_token_v1';

const SEED_USERS = [
  {
    id: 'user_demo_alex',
    email: 'alex.rivera@email.com',
    password: 'paxdemo',
    firstName: 'Alex',
    lastName: 'Rivera',
    phone: '(305) 555-0142',
    role: 'patient',
    demo: true,
  },
  {
    id: 'user_demo_guest',
    email: 'demo@pax.longevity',
    password: 'paxdemo',
    firstName: 'Demo',
    lastName: 'Member',
    phone: '',
    role: 'patient',
    demo: true,
  },
];

function uid(prefix = 'id') {
  return `${prefix}_${crypto.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`}`;
}

function nowIso() {
  return new Date().toISOString();
}

function emptyDb() {
  return {
    version: 1,
    users: {}, // email -> user
    sessions: {}, // token -> session
    audit: [], // recent auth events
  };
}

function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return emptyDb();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return emptyDb();
    return {
      version: 1,
      users: parsed.users && typeof parsed.users === 'object' ? parsed.users : {},
      sessions: parsed.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
      audit: Array.isArray(parsed.audit) ? parsed.audit : [],
    };
  } catch {
    return emptyDb();
  }
}

function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function publicUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

function pushAudit(db, event) {
  db.audit.unshift({
    id: uid('audit'),
    at: nowIso(),
    ...event,
  });
  db.audit = db.audit.slice(0, 40);
}

function ensureSeeded(db) {
  let changed = false;
  for (const seed of SEED_USERS) {
    const email = seed.email.toLowerCase();
    if (!db.users[email]) {
      db.users[email] = {
        ...seed,
        email,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        lastLoginAt: null,
      };
      changed = true;
    }
  }
  if (changed) saveDb(db);
  return db;
}

function getDb() {
  return ensureSeeded(loadDb());
}

export const DEMO_CREDENTIALS = {
  email: SEED_USERS[0].email,
  password: SEED_USERS[0].password,
  altEmail: SEED_USERS[1].email,
};

/** Dictionary snapshot (passwords redacted) — useful for Settings / debug */
export function inspectAuthDb() {
  const db = getDb();
  return {
    userCount: Object.keys(db.users).length,
    sessionCount: Object.keys(db.sessions).length,
    users: Object.values(db.users).map(publicUser),
    activeToken: localStorage.getItem(ACTIVE_SESSION_KEY),
    audit: db.audit.slice(0, 10),
  };
}

export function registerUser({
  firstName,
  lastName,
  email,
  password,
  phone = '',
  id = null,
  demo = false,
}) {
  const db = getDb();
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !password || String(password).length < 4) {
    throw new Error('Enter a valid email and a password (4+ characters).');
  }
  if (db.users[normalized]) {
    throw new Error('An account with this email already exists. Sign in instead.');
  }

  const user = {
    id: id || uid('user'),
    email: normalized,
    password: String(password),
    firstName: String(firstName || 'Member').trim() || 'Member',
    lastName: String(lastName || '').trim(),
    phone: String(phone || '').trim(),
    role: 'patient',
    demo: Boolean(demo),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    lastLoginAt: null,
  };

  db.users[normalized] = user;
  pushAudit(db, { type: 'register', email: normalized, userId: user.id });
  saveDb(db);
  return publicUser(user);
}

/** Upsert used when IndexedDB signup already created an account */
export function upsertUserFromSignup(user) {
  const db = getDb();
  const email = String(user.email || '').trim().toLowerCase();
  if (!email) return null;
  db.users[email] = {
    ...(db.users[email] || {}),
    id: user.id,
    email,
    password: String(user.password || db.users[email]?.password || ''),
    firstName: user.firstName || 'Member',
    lastName: user.lastName || '',
    phone: user.phone || '',
    role: 'patient',
    demo: false,
    createdAt: db.users[email]?.createdAt || user.createdAt || nowIso(),
    updatedAt: nowIso(),
    lastLoginAt: db.users[email]?.lastLoginAt || null,
  };
  saveDb(db);
  return publicUser(db.users[email]);
}

export function login({ email, password }) {
  const db = getDb();
  const normalized = String(email || '').trim().toLowerCase();
  const user = db.users[normalized];

  if (!user || user.password !== String(password || '')) {
    pushAudit(db, { type: 'login_failed', email: normalized || '(empty)' });
    saveDb(db);
    throw new Error('Invalid email or password.');
  }

  // Single active session per browser — clear prior tokens for this user
  for (const [token, session] of Object.entries(db.sessions)) {
    if (session.userId === user.id) delete db.sessions[token];
  }

  const token = uid('sess');
  const session = {
    token,
    userId: user.id,
    email: user.email,
    createdAt: nowIso(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days
  };

  db.sessions[token] = session;
  user.lastLoginAt = nowIso();
  user.updatedAt = nowIso();
  db.users[normalized] = user;
  pushAudit(db, { type: 'login', email: user.email, userId: user.id, token });
  saveDb(db);
  localStorage.setItem(ACTIVE_SESSION_KEY, token);

  return {
    session: { token, userId: user.id, email: user.email },
    user: publicUser(user),
  };
}

export function logout() {
  const db = getDb();
  const token = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (token && db.sessions[token]) {
    const session = db.sessions[token];
    pushAudit(db, {
      type: 'logout',
      email: session.email,
      userId: session.userId,
      token,
    });
    delete db.sessions[token];
    saveDb(db);
  }
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  // legacy keys from older portal builds
  localStorage.removeItem('pax_portal_session_v2');
  localStorage.removeItem('pax_portal_demo_session_v1');
}

export function getSession() {
  const db = getDb();
  const token = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!token) return null;
  const session = db.sessions[token];
  if (!session) {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    return null;
  }
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    delete db.sessions[token];
    saveDb(db);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    pushAudit(db, { type: 'session_expired', email: session.email, userId: session.userId });
    saveDb(db);
    return null;
  }
  return { token: session.token, userId: session.userId, email: session.email };
}

export function getCurrentUser() {
  const session = getSession();
  if (!session) throw new Error('Not signed in.');
  const db = getDb();
  const user = Object.values(db.users).find((u) => u.id === session.userId);
  if (!user) {
    logout();
    throw new Error('Account not found. Please sign in again.');
  }
  return publicUser(user);
}

export function getAuditLog(limit = 12) {
  return getDb().audit.slice(0, limit);
}

export function findUserByEmail(email) {
  const db = getDb();
  return publicUser(db.users[String(email || '').trim().toLowerCase()] || null);
}
