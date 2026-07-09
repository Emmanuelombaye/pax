import { useEffect, useMemo, useState } from 'react';
import {
  addWeightEntry,
  getCurrentUser,
  getProfile,
  getSession,
  login,
  logout,
  markMessagesRead,
  saveProfile,
  sendMessage,
  signup,
  toggleChecklistItem,
} from './storage.js';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'treatment', label: 'Treatment' },
  { id: 'messages', label: 'Messages' },
  { id: 'progress', label: 'Progress' },
  { id: 'profile', label: 'Profile' },
];

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function BrandMark() {
  return (
    <div className="pp-brand">
      <picture>
        <source srcSet="/images/pax-logo.webp" type="image/webp" />
        <img src="/images/pax-logo.png" alt="Pax Longevity" className="pp-brand__img" width="270" height="280" />
      </picture>
    </div>
  );
}

function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result =
        mode === 'login'
          ? login({ email: form.email, password: form.password })
          : signup({
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              password: form.password,
            });
      onAuthed(result.user);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pp-auth">
      <div className="pp-auth__visual" aria-hidden="true">
        <div className="pp-auth__glow" />
        <div className="pp-auth__copy">
          <p className="pp-eyebrow">Patient Center</p>
          <h1>Your care, in one calm place.</h1>
          <p>
            Track treatment, message your care team, and manage refills — designed for Pax Longevity members.
          </p>
          <ul className="pp-auth__perks">
            <li>Provider-guided protocols</li>
            <li>Shipment & refill status</li>
            <li>Secure care-team messaging</li>
          </ul>
        </div>
      </div>

      <div className="pp-auth__panel">
        <a href="#/" className="pp-auth__back">← Back to Pax</a>
        <BrandMark />
        <div className="pp-auth__tabs" role="tablist">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => { setMode('login'); setError(''); }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'active' : ''}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            Create account
          </button>
        </div>

        <p className="pp-auth__sim">
          Simulated portal — accounts are saved on this device only (no real database).
        </p>

        <form className="pp-auth__form" onSubmit={submit}>
          {mode === 'signup' && (
            <div className="pp-auth__row">
              <label>
                First name
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Ava"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                Last name
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Rivera"
                  autoComplete="family-name"
                />
              </label>
            </div>
          )}

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={4}
            />
          </label>

          {error && <p className="pp-auth__error">{error}</p>}

          <button type="submit" className="pp-btn pp-btn--primary" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Sign in to Patient Center' : 'Create my account'}
          </button>
        </form>

        <p className="pp-auth__hint">
          Tip: create an account once — next visit, sign in with the same email and password on this browser.
        </p>
      </div>
    </div>
  );
}

function PortalShell({ user, onLogout }) {
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(() => getProfile(user.id));
  const [draft, setDraft] = useState('');
  const [weight, setWeight] = useState('');
  const [toast, setToast] = useState('');

  const refresh = () => setProfile(getProfile(user.id));

  useEffect(() => {
    if (tab === 'messages') {
      markMessagesRead(user.id);
      refresh();
    }
  }, [tab, user.id]);

  const unread = useMemo(
    () => (profile?.messages || []).filter((m) => !m.read && m.from === 'care').length,
    [profile],
  );

  const checklistDone = (profile?.checklist || []).filter((c) => c.done).length;
  const checklistTotal = (profile?.checklist || []).length || 1;
  const progressPct = Math.round((checklistDone / checklistTotal) * 100);

  const flash = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2400);
  };

  const onToggleCheck = (id) => {
    setProfile(toggleChecklistItem(user.id, id));
  };

  const onSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setProfile(sendMessage(user.id, draft));
    setDraft('');
    flash('Message sent');
  };

  const onWeight = (e) => {
    e.preventDefault();
    try {
      setProfile(addWeightEntry(user.id, weight));
      setWeight('');
      flash('Weight logged');
    } catch (err) {
      flash(err.message);
    }
  };

  const onSaveProfile = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setProfile(
      saveProfile(user.id, {
        firstName: String(fd.get('firstName') || profile.firstName),
        lastName: String(fd.get('lastName') || profile.lastName),
        phone: String(fd.get('phone') || ''),
        dob: String(fd.get('dob') || ''),
      }),
    );
    flash('Profile saved');
  };

  if (!profile) {
    return (
      <div className="pp-empty">
        <p>Session expired. Please sign in again.</p>
        <button type="button" className="pp-btn pp-btn--primary" onClick={onLogout}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="pp-shell">
      <header className="pp-topbar">
        <div className="pp-topbar__inner">
          <BrandMark />
          <div className="pp-topbar__right">
            <span className="pp-topbar__hello">Hi, {profile.firstName}</span>
            <button type="button" className="pp-btn pp-btn--ghost" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </header>

      <nav className="pp-nav" aria-label="Patient Center">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`pp-nav__item ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
            {item.id === 'messages' && unread > 0 && <span className="pp-nav__badge">{unread}</span>}
          </button>
        ))}
      </nav>

      <main className="pp-main">
        {tab === 'home' && (
          <section className="pp-stack">
            <div className="pp-hero-card">
              <p className="pp-eyebrow">Patient Center</p>
              <h1>Welcome back, {profile.firstName}.</h1>
              <p className="pp-lede">
                Your treatment, care team, and next steps — all in one place.
              </p>
              <div className="pp-hero-card__meta">
                <span className={`pp-pill ${profile.treatment.status === 'Active' ? 'pp-pill--ok' : ''}`}>
                  {profile.treatment.status}
                </span>
                <span className="pp-meta-text">{profile.treatment.name}</span>
              </div>
            </div>

            <div className="pp-grid-2">
              <article className="pp-card">
                <div className="pp-card__head">
                  <h2>Onboarding checklist</h2>
                  <span>{progressPct}%</span>
                </div>
                <div className="pp-progress">
                  <div className="pp-progress__bar" style={{ width: `${progressPct}%` }} />
                </div>
                <ul className="pp-check">
                  {profile.checklist.map((item) => (
                    <li key={item.id}>
                      <label className={item.done ? 'done' : ''}>
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => onToggleCheck(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="pp-card">
                <h2>Next refill</h2>
                <p className="pp-stat">{formatDate(profile.treatment.nextRefill)}</p>
                <p className="pp-muted">{profile.treatment.dose} · {profile.treatment.pharmacy}</p>
                <div className="pp-actions">
                  <button type="button" className="pp-btn pp-btn--primary" onClick={() => setTab('treatment')}>
                    View treatment
                  </button>
                  <button type="button" className="pp-btn pp-btn--outline" onClick={() => setTab('messages')}>
                    Message care team
                  </button>
                </div>
              </article>
            </div>

            <article className="pp-card pp-card--soft">
              <h2>How Pax care works</h2>
              <ol className="pp-steps">
                <li><strong>Intake reviewed</strong> — licensed U.S. provider within 24 hours</li>
                <li><strong>Pharmacy fulfills</strong> — compounded & shipped to your door</li>
                <li><strong>Ongoing support</strong> — message your care team anytime</li>
              </ol>
            </article>
          </section>
        )}

        {tab === 'treatment' && (
          <section className="pp-stack">
            <article className="pp-card">
              <p className="pp-eyebrow">Current protocol</p>
              <h1>{profile.treatment.name}</h1>
              <div className="pp-treat-grid">
                <div>
                  <span className="pp-label">Status</span>
                  <p>{profile.treatment.status}</p>
                </div>
                <div>
                  <span className="pp-label">Dose</span>
                  <p>{profile.treatment.dose}</p>
                </div>
                <div>
                  <span className="pp-label">Started</span>
                  <p>{formatDate(profile.treatment.startedAt)}</p>
                </div>
                <div>
                  <span className="pp-label">Next refill</span>
                  <p>{formatDate(profile.treatment.nextRefill)}</p>
                </div>
              </div>
              <p className="pp-muted" style={{ marginTop: '1rem' }}>
                Filled by {profile.treatment.pharmacy}. Always follow your provider’s instructions.
              </p>
            </article>

            <article className="pp-card">
              <h2>Refill & shipping</h2>
              <div className="pp-timeline">
                <div className="pp-timeline__item done">
                  <span />
                  <div>
                    <strong>Prescription approved</strong>
                    <p>Provider cleared your protocol</p>
                  </div>
                </div>
                <div className="pp-timeline__item done">
                  <span />
                  <div>
                    <strong>Pharmacy compounding</strong>
                    <p>Personalized dose prepared</p>
                  </div>
                </div>
                <div className="pp-timeline__item">
                  <span />
                  <div>
                    <strong>In transit</strong>
                    <p>Next shipment around {formatDate(profile.treatment.nextRefill)}</p>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        {tab === 'messages' && (
          <section className="pp-stack">
            <article className="pp-card pp-messages">
              <h1>Care team</h1>
              <p className="pp-muted">Ask about dosing, side effects, or refills. Replies are simulated in this demo portal.</p>
              <div className="pp-thread">
                {(profile.messages || []).map((m) => (
                  <div key={m.id} className={`pp-bubble ${m.from === 'patient' ? 'me' : 'care'}`}>
                    <div className="pp-bubble__meta">
                      <strong>{m.author}</strong>
                      <span>{formatTime(m.at)}</span>
                    </div>
                    <p>{m.body}</p>
                  </div>
                ))}
              </div>
              <form className="pp-compose" onSubmit={onSend}>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message to your care team…"
                  rows={3}
                  required
                />
                <button type="submit" className="pp-btn pp-btn--primary">Send</button>
              </form>
            </article>
          </section>
        )}

        {tab === 'progress' && (
          <section className="pp-stack">
            <article className="pp-card">
              <h1>Progress</h1>
              <p className="pp-muted">Log weight to see your trend. Data stays on this device.</p>
              <form className="pp-inline-form" onSubmit={onWeight}>
                <label>
                  Weight (lbs)
                  <input
                    type="number"
                    min="50"
                    max="500"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="168"
                    required
                  />
                </label>
                <button type="submit" className="pp-btn pp-btn--primary">Log weight</button>
              </form>
            </article>

            <article className="pp-card">
              <h2>Recent entries</h2>
              {(profile.weightLog || []).length === 0 ? (
                <p className="pp-muted">No entries yet — log your first weight above.</p>
              ) : (
                <ul className="pp-log">
                  {profile.weightLog.map((entry) => (
                    <li key={entry.id}>
                      <strong>{entry.lbs} lbs</strong>
                      <span>{formatTime(entry.at)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>
        )}

        {tab === 'profile' && (
          <section className="pp-stack">
            <article className="pp-card">
              <h1>Profile</h1>
              <form className="pp-auth__form" onSubmit={onSaveProfile}>
                <div className="pp-auth__row">
                  <label>
                    First name
                    <input name="firstName" defaultValue={profile.firstName} required />
                  </label>
                  <label>
                    Last name
                    <input name="lastName" defaultValue={profile.lastName} />
                  </label>
                </div>
                <label>
                  Email
                  <input value={profile.email} disabled />
                </label>
                <label>
                  Phone
                  <input name="phone" defaultValue={profile.phone || ''} placeholder="(305) 555-0142" />
                </label>
                <label>
                  Date of birth
                  <input name="dob" type="date" defaultValue={profile.dob || ''} />
                </label>
                <button type="submit" className="pp-btn pp-btn--primary">Save profile</button>
              </form>
            </article>

            <article className="pp-card pp-card--soft">
              <h2>Demo note</h2>
              <p className="pp-muted">
                This Patient Center is a branded frontend simulation. Accounts and messages are stored in your browser’s local storage — not a live clinical database.
              </p>
              <a href="#/" className="pp-link">Return to marketing site →</a>
            </article>
          </section>
        )}
      </main>

      {toast && <div className="pp-toast" role="status">{toast}</div>}
    </div>
  );
}

export default function PortalApp() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.userId) setUser(getCurrentUser());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="pp-loading">
        <BrandMark />
        <p>Opening Patient Center…</p>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthed={setUser} />;
  }

  return (
    <PortalShell
      user={user}
      onLogout={() => {
        logout();
        setUser(null);
      }}
    />
  );
}
