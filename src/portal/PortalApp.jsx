import { useEffect, useMemo, useState } from 'react';
import { BrandMark } from '../brand/BrandMark.jsx';
import { PAX_PASSPORT } from '../brand/passport.js';
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
  toggleChecklistItem,
} from '../brand/connect.js';

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

function AuthScreen({ onAuthed }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await login({ email: form.email, password: form.password });
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
          <BrandMark size="hero" className="pp-brand--on-dark" />
          <p className="pp-eyebrow">Patient Center</p>
          <h1>Welcome back.</h1>
          <p>
            Sign in to track treatment, message your care team, and manage refills — available after you complete checkout.
          </p>
          <ul className="pp-auth__perks">
            <li>Provider review status</li>
            <li>Shipment & refill tracking</li>
            <li>Secure care-team messaging</li>
          </ul>
        </div>
      </div>

      <div className="pp-auth__panel">
        <a href="#/" className="pp-auth__back">← Back to Pax</a>
        <BrandMark size="lg" />
        <h2 className="pp-auth__title">Member sign in</h2>
        <p className="pp-auth__sim">
          New here? Don’t create an account first — <a href="#/start">choose a treatment & check out</a>, then unlock Patient Center.
          <br />
          <span className="pp-auth__mode">Portable mode · data saved on this device · {PAX_PASSPORT.compliance.demoDisclaimer.split('.')[0]}.</span>
        </p>

        <form className="pp-auth__form" onSubmit={submit}>
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
              autoComplete="current-password"
              required
              minLength={4}
            />
          </label>

          {error && <p className="pp-auth__error">{error}</p>}

          <button type="submit" className="pp-btn pp-btn--primary" disabled={busy}>
            {busy ? 'Please wait…' : 'Sign in to Patient Center'}
          </button>
        </form>

        <a href="#/start" className="pp-btn pp-btn--outline" style={{ width: '100%', marginTop: '0.35rem' }}>
          Start treatment →
        </a>
      </div>
    </div>
  );
}

function PortalShell({ user, onLogout }) {
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [draft, setDraft] = useState('');
  const [weight, setWeight] = useState('');
  const [toast, setToast] = useState('');

  const refresh = async () => {
    const next = await getProfile(user.id);
    setProfile(next);
    return next;
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoadingProfile(true);
      const next = await getProfile(user.id);
      if (alive) {
        setProfile(next);
        setLoadingProfile(false);
      }
    })();
    return () => { alive = false; };
  }, [user.id]);

  useEffect(() => {
    if (tab !== 'messages') return;
    (async () => {
      await markMessagesRead(user.id);
      await refresh();
    })();
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

  const onToggleCheck = async (id) => {
    setProfile(await toggleChecklistItem(user.id, id));
  };

  const onSend = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setProfile(await sendMessage(user.id, draft));
    setDraft('');
    flash('Message sent');
  };

  const onWeight = async (e) => {
    e.preventDefault();
    try {
      setProfile(await addWeightEntry(user.id, weight));
      setWeight('');
      flash('Weight logged');
    } catch (err) {
      flash(err.message);
    }
  };

  const onSaveProfile = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setProfile(
      await saveProfile(user.id, {
        firstName: String(fd.get('firstName') || profile.firstName),
        lastName: String(fd.get('lastName') || profile.lastName),
        phone: String(fd.get('phone') || ''),
        dob: String(fd.get('dob') || ''),
      }),
    );
    flash('Profile saved');
  };

  if (loadingProfile) {
    return (
      <div className="pp-loading">
        <BrandMark size="lg" />
        <p>Loading your care record…</p>
      </div>
    );
  }

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
          <a href="#/" className="pp-topbar__brand" aria-label="Pax Longevity home">
            <BrandMark size="md" />
          </a>
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
                <span className={`pp-pill ${profile.treatment.status === 'Active' ? 'pp-pill--ok' : 'pp-pill--pending'}`}>
                  {profile.treatment.status}
                </span>
                <span className="pp-meta-text">{profile.treatment.name}</span>
              </div>
              {profile.treatment.plan && (
                <p className="pp-muted" style={{ marginTop: '0.75rem' }}>{profile.treatment.plan}</p>
              )}
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
              <h2>Portable Patient Center</h2>
              <p className="pp-muted">
                {PAX_PASSPORT.compliance.demoDisclaimer} When you connect a production API, flip `VITE_PAX_CONNECT_MODE=remote` — the UI stays the same.
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
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const session = getSession();
      if (session?.userId) {
        const current = await getCurrentUser();
        if (alive) setUser(current);
      }
      if (alive) setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  if (!ready) {
    return (
      <div className="pp-loading">
        <BrandMark size="lg" />
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
