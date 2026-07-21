import { useEffect, useMemo, useState } from 'react';
import { BrandMark } from '../brand/BrandMark.jsx';
import { PAX_PASSPORT } from '../brand/passport.js';
import {
  getCurrentUser,
  getSession,
  login,
  logout as connectLogout,
} from '../brand/connect.js';
import { DEMO_CREDENTIALS, getAuditLog, inspectAuthDb } from './authDictDb.js';
import { Icon } from './Icon.jsx';
import { MOCK, unreadMessages, unreadNotifications } from './mockData.js';
import { MOBILE_PRIMARY, PORTAL_NAV, defaultChild, parsePortalRoute, portalHref } from './nav.js';
import { renderPortalScreen } from './screens.jsx';

function AuthScreen({ onAuthed }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
  });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await login({ email: form.email, password: form.password });
      onAuthed(result.user);
      window.location.hash = '#/portal/dashboard';
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const enterDemo = async () => {
    setError('');
    setBusy(true);
    try {
      const result = await login({
        email: DEMO_CREDENTIALS.email,
        password: DEMO_CREDENTIALS.password,
      });
      onAuthed(result.user);
      window.location.hash = '#/portal/dashboard';
    } catch (err) {
      setError(err.message || 'Demo login failed.');
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
          <h1>Your care, clearly arranged.</h1>
          <p>
            Appointments, records, monitoring, medications, billing, and family access — one branded Pax experience.
          </p>
          <ul className="pp-auth__perks">
            <li>Dictionary auth DB · real login / logout sessions</li>
            <li>RPM graphs & wellness tracking</li>
            <li>Secure messaging & visit join flow</li>
          </ul>
        </div>
      </div>

      <div className="pp-auth__panel">
        <a href="#/" className="pp-auth__back">← Back to Pax</a>
        <BrandMark size="lg" />
        <h2 className="pp-auth__title">Sign in</h2>
        <p className="pp-auth__sim">
          Accounts live in a local dictionary database (email → user, token → session). Sign out clears your session token.
          <br />
          <span className="pp-auth__mode">{PAX_PASSPORT.compliance.demoDisclaimer}</span>
        </p>

        <div className="pc-cred-card">
          <p className="pc-cred-card__label">Demo dictionary account</p>
          <code>{DEMO_CREDENTIALS.email}</code>
          <code>password: {DEMO_CREDENTIALS.password}</code>
        </div>

        <button type="button" className="pp-btn pp-btn--primary" onClick={enterDemo} disabled={busy} style={{ width: '100%' }}>
          {busy ? 'Signing in…' : 'Enter demo Patient Center'}
        </button>

        <div className="pc-auth-divider"><span>or sign in with form</span></div>

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
            {busy ? 'Please wait…' : 'Sign in'}
          </button>
        </form>

        <a href="#/start" className="pp-btn pp-btn--outline" style={{ width: '100%', marginTop: '0.35rem' }}>
          Start treatment →
        </a>

        <p className="pp-auth__legal-links">
          <a href="#/privacy">Privacy</a>
          <span aria-hidden="true"> · </span>
          <a href="#/terms">Terms</a>
          <span aria-hidden="true"> · </span>
          <a href="#/medical-disclaimer">Medical Disclaimer</a>
        </p>
      </div>
    </div>
  );
}

function PortalShell({ user, onLogout }) {
  const [{ section, panel }, setRoute] = useState(() => parsePortalRoute());
  const [openGroups, setOpenGroups] = useState(() => new Set([section]));
  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const patient = useMemo(
    () => ({
      ...MOCK.profile,
      ...user,
      firstName: user.firstName || MOCK.profile.firstName,
      lastName: user.lastName || MOCK.profile.lastName,
      email: user.email || MOCK.profile.email,
    }),
    [user],
  );

  const badges = useMemo(
    () => ({
      messages: unreadMessages(),
      notifications: unreadNotifications(),
    }),
    [],
  );

  const authMeta = useMemo(() => inspectAuthDb(), [user?.id]);
  const auditLog = useMemo(() => getAuditLog(8), [user?.id, section]);

  useEffect(() => {
    const sync = () => {
      const next = parsePortalRoute();
      setRoute(next);
      setOpenGroups((prev) => new Set([...prev, next.section]));
      setMoreOpen(false);
      setSidebarOpen(false);
    };
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (nextSection, nextPanel) => {
    const panelId = nextPanel || defaultChild(nextSection);
    window.location.hash = portalHref(nextSection, panelId);
  };

  const toggleGroup = (id) => {
    setOpenGroups((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const screen = renderPortalScreen({
    section,
    panel,
    patient,
    onNavigate: navigate,
    onLogout,
    authMeta,
    auditLog,
  });

  const renderNavItem = (item) => {
    const active = section === item.id;
    const badge = item.badge ? badges[item.badge] : 0;
    if (item.children?.length) {
      const open = openGroups.has(item.id) || active;
      return (
        <div key={item.id} className={`pc-nav-group ${active ? 'is-active' : ''}`}>
          <button type="button" className="pc-nav-group__btn" onClick={() => toggleGroup(item.id)}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
            <span className="pc-nav-group__chev">{open ? '−' : '+'}</span>
          </button>
          {open && (
            <div className="pc-nav-sub">
              {item.children.map((child) => (
                <a
                  key={child.id}
                  href={portalHref(item.id, child.id)}
                  className={`pc-nav-sub__link ${active && panel === child.id ? 'is-active' : ''}`}
                >
                  {child.label}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <a
        key={item.id}
        href={portalHref(item.id)}
        className={`pc-nav-link ${active ? 'is-active' : ''}`}
      >
        <Icon name={item.icon} />
        <span>{item.label}</span>
        {badge > 0 && <span className="pc-badge">{badge}</span>}
      </a>
    );
  };

  return (
    <div className={`pc-app ${sidebarOpen ? 'is-sidebar-open' : ''}`}>
      <aside className="pc-sidebar" aria-label="Patient Center navigation">
        <div className="pc-sidebar__brand">
          <a href="#/" aria-label="Pax home"><BrandMark size="md" /></a>
          <p className="pc-sidebar__eyebrow">Patient Center</p>
        </div>
        <nav className="pc-sidebar__nav">{PORTAL_NAV.map(renderNavItem)}</nav>
        <div className="pc-sidebar__foot">
          <p className="pc-sidebar__user">{patient.firstName} {patient.lastName}</p>
          <button type="button" className="pc-btn pc-btn--ghost" onClick={onLogout}>Sign out</button>
        </div>
      </aside>

      {sidebarOpen && <button type="button" className="pc-scrim" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}

      <div className="pc-maincol">
        <header className="pc-top">
          <button type="button" className="pc-icon-btn pc-only-mobile" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
            <Icon name="more" />
          </button>
          <div className="pc-top__title">
            <p className="pc-eyebrow">Pax Longevity</p>
            <strong>{PORTAL_NAV.find((n) => n.id === section)?.label || 'Dashboard'}</strong>
          </div>
          <div className="pc-top__actions">
            <a href="#/portal/notifications" className="pc-icon-btn" aria-label="Notifications">
              <Icon name="bell" />
              {badges.notifications > 0 && <span className="pc-badge pc-badge--dot" />}
            </a>
            <button type="button" className="pc-btn pc-btn--ghost pc-only-desktop" onClick={onLogout}>Sign out</button>
          </div>
        </header>

        <main className="pc-content">{screen}</main>
      </div>

      <nav className="pc-tabbar" aria-label="Mobile primary">
        {MOBILE_PRIMARY.map((id) => {
          if (id === 'more') {
            return (
              <button
                key="more"
                type="button"
                className={`pc-tabbar__item ${moreOpen ? 'is-active' : ''}`}
                onClick={() => setMoreOpen((v) => !v)}
              >
                <Icon name="more" />
                <span>More</span>
              </button>
            );
          }
          const item = PORTAL_NAV.find((n) => n.id === id);
          const active = section === id;
          return (
            <a
              key={id}
              href={portalHref(id, defaultChild(id))}
              className={`pc-tabbar__item ${active ? 'is-active' : ''}`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.badge && badges[item.badge] > 0 && <span className="pc-badge">{badges[item.badge]}</span>}
            </a>
          );
        })}
      </nav>

      {moreOpen && (
        <div className="pc-more">
          <div className="pc-more__sheet">
            <div className="pc-more__head">
              <strong>More</strong>
              <button type="button" className="pc-link" onClick={() => setMoreOpen(false)}>Close</button>
            </div>
            <div className="pc-more__grid">
              {PORTAL_NAV.filter((n) => !['dashboard', 'appointments', 'messages', 'health'].includes(n.id)).map((item) => (
                <a
                  key={item.id}
                  href={portalHref(item.id, defaultChild(item.id))}
                  className="pc-more__item"
                  onClick={() => setMoreOpen(false)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortalApp() {
  const [boot, setBoot] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!getSession()) {
        if (alive) setBoot(false);
        return;
      }
      try {
        const current = await getCurrentUser();
        if (alive) setUser(current);
      } catch {
        connectLogout();
      } finally {
        if (alive) setBoot(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const onLogout = () => {
    connectLogout();
    setUser(null);
    window.location.hash = '#/portal';
  };

  if (boot) {
    return (
      <div className="pp-loading">
        <BrandMark size="lg" />
        <p>Loading Patient Center…</p>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthed={setUser} />;
  }

  return <PortalShell user={user} onLogout={onLogout} />;
}
