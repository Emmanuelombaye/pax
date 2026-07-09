import { useEffect, useMemo, useState } from 'react';
import { BrandMark } from './BrandMark.jsx';
import { INTAKE_STEPS, PLANS, TREATMENTS, TRUST_POINTS } from './startFlowData.js';
import {
  completePurchaseSignup,
  getPendingOrder,
  savePendingOrder,
} from '../brand/connect.js';
import { PAX_PASSPORT } from '../brand/passport.js';

const STEPS = ['treatment', 'intake', 'plan', 'checkout', 'verify', 'account'];

function Progress({ step }) {
  const idx = STEPS.indexOf(step);
  const pct = Math.round(((idx + 1) / STEPS.length) * 100);
  return (
    <div className="sf-progress">
      <div className="sf-progress__track">
        <div className="sf-progress__bar" style={{ width: `${pct}%` }} />
      </div>
      <p className="sf-progress__label">Step {idx + 1} of {STEPS.length}</p>
    </div>
  );
}

function TrustStrip() {
  return (
    <ul className="sf-trust">
      {TRUST_POINTS.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export default function StartFlow({ onComplete }) {
  const pending = getPendingOrder();
  const [step, setStep] = useState(pending?.resumeStep || 'treatment');
  const [treatmentId, setTreatmentId] = useState(pending?.treatmentId || '');
  const [intakeIndex, setIntakeIndex] = useState(0);
  const [intake, setIntake] = useState(pending?.intake || {
    goal: '',
    height: '',
    weight: '',
    conditions: '',
    meds: '',
  });
  const [planId, setPlanId] = useState(pending?.planId || '3mo');
  const [checkout, setCheckout] = useState({
    firstName: pending?.firstName || '',
    lastName: pending?.lastName || '',
    email: pending?.email || '',
    phone: pending?.phone || '',
    card: '',
    exp: '',
    cvc: '',
  });
  const [verify, setVerify] = useState({ method: 'ssn', ssn4: '', idNote: '' });
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const treatment = useMemo(
    () => TREATMENTS.find((t) => t.id === treatmentId) || null,
    [treatmentId],
  );
  const plan = useMemo(() => PLANS.find((p) => p.id === planId) || PLANS[1], [planId]);
  const intakeStep = INTAKE_STEPS[intakeIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, intakeIndex]);

  const persist = (extra = {}) => {
    savePendingOrder({
      treatmentId,
      planId,
      intake,
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      resumeStep: step,
      ...extra,
    });
  };

  const go = (next) => {
    setError('');
    setStep(next);
    savePendingOrder({
      treatmentId,
      planId,
      intake,
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      resumeStep: next,
    });
  };

  const onSelectTreatment = (id) => {
    setTreatmentId(id);
    setError('');
  };

  const continueTreatment = () => {
    if (!treatmentId) {
      setError('Select a treatment to continue.');
      return;
    }
    go('intake');
  };

  const continueIntake = () => {
    if (intakeStep.type === 'choice') {
      const key = intakeStep.id === 'conditions' ? 'conditions' : intakeStep.id === 'meds' ? 'meds' : 'goal';
      if (!intake[key]) {
        setError('Please choose an option to continue.');
        return;
      }
    }
    if (intakeStep.type === 'metrics') {
      if (!intake.height || !intake.weight) {
        setError('Enter height and weight to continue.');
        return;
      }
    }
    setError('');
    if (intakeIndex < INTAKE_STEPS.length - 1) {
      setIntakeIndex((i) => i + 1);
      persist();
      return;
    }
    go('plan');
  };

  const continueCheckout = (e) => {
    e.preventDefault();
    if (!checkout.firstName || !checkout.email || !checkout.card || checkout.card.replace(/\s/g, '').length < 12) {
      setError('Complete your contact details and card to continue.');
      return;
    }
    // Simulated authorization hold — no real charge
    go('verify');
  };

  const continueVerify = (e) => {
    e.preventDefault();
    if (verify.method === 'ssn' && !/^\d{4}$/.test(verify.ssn4)) {
      setError('Enter the last 4 digits of your SSN.');
      return;
    }
    if (verify.method === 'id' && !verify.idNote.trim()) {
      setError('Add a short note confirming you uploaded a government ID (simulated).');
      return;
    }
    go('account');
  };

  const finishAccount = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 4) {
      setError('Choose a password with at least 4 characters.');
      return;
    }
    if (password !== password2) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const { user } = await completePurchaseSignup({
        firstName: checkout.firstName,
        lastName: checkout.lastName,
        email: checkout.email,
        password,
        phone: checkout.phone,
        treatment,
        plan,
        intake,
      });
      onComplete(user);
    } catch (err) {
      setError(err.message || 'Could not open Patient Center.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sf">
      <header className="sf-top">
        <div className="sf-top__inner">
          <a href="#/" className="sf-top__brand" aria-label="Pax Longevity home">
            <BrandMark size="md" />
          </a>
          <a href="#/portal" className="sf-top__login">Already a member? Sign in</a>
        </div>
        <Progress step={step} />
      </header>

      <main className="sf-main">
        {step === 'treatment' && (
          <section className="sf-panel">
            <p className="pp-eyebrow">Get started</p>
            <h1>Choose a treatment plan</h1>
            <p className="sf-lede">
              Browse science-backed options, then complete a short medical questionnaire — no account needed until after checkout.
            </p>
            <TrustStrip />
            <div className="sf-treat-grid">
              {TREATMENTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`sf-treat ${treatmentId === t.id ? 'active' : ''}`}
                  onClick={() => onSelectTreatment(t.id)}
                >
                  <div className="sf-treat__media" style={{ backgroundImage: `url(${t.image})` }} />
                  <div className="sf-treat__body">
                    <span className="sf-badge">{t.badge}</span>
                    <h2>{t.name}</h2>
                    <p>{t.blurb}</p>
                    <div className="sf-treat__meta">
                      <strong>{t.med}</strong>
                      <span>As low as ${t.priceFrom}/mo</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {error && <p className="pp-auth__error">{error}</p>}
            <button type="button" className="pp-btn pp-btn--primary sf-cta" onClick={continueTreatment}>
              Continue with {treatment ? treatment.name : 'selected treatment'} →
            </button>
          </section>
        )}

        {step === 'intake' && (
          <section className="sf-panel sf-panel--narrow">
            <p className="pp-eyebrow">Clinical intake · {intakeIndex + 1}/{INTAKE_STEPS.length}</p>
            <h1>{intakeStep.question}</h1>
            <p className="sf-lede">Takes a few minutes. A licensed U.S. provider reviews within 24 hours.</p>

            {intakeStep.type === 'choice' && (
              <div className="sf-choices">
                {intakeStep.options.map((opt) => {
                  const key = intakeStep.id === 'conditions' ? 'conditions' : intakeStep.id === 'meds' ? 'meds' : 'goal';
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`sf-choice ${intake[key] === opt.value ? 'active' : ''}`}
                      onClick={() => setIntake({ ...intake, [key]: opt.value })}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {intakeStep.type === 'metrics' && (
              <div className="sf-metrics">
                <label>
                  Height (e.g. 5'7")
                  <input
                    value={intake.height}
                    onChange={(e) => setIntake({ ...intake, height: e.target.value })}
                    placeholder="5'7&quot;"
                  />
                </label>
                <label>
                  Weight (lbs)
                  <input
                    type="number"
                    value={intake.weight}
                    onChange={(e) => setIntake({ ...intake, weight: e.target.value })}
                    placeholder="185"
                    min="50"
                    max="500"
                  />
                </label>
              </div>
            )}

            {error && <p className="pp-auth__error">{error}</p>}
            <div className="sf-nav-row">
              <button
                type="button"
                className="pp-btn pp-btn--outline"
                onClick={() => {
                  setError('');
                  if (intakeIndex === 0) go('treatment');
                  else setIntakeIndex((i) => i - 1);
                }}
              >
                Back
              </button>
              <button type="button" className="pp-btn pp-btn--primary" onClick={continueIntake}>
                Continue →
              </button>
            </div>
          </section>
        )}

        {step === 'plan' && (
          <section className="sf-panel">
            <p className="pp-eyebrow">{treatment?.name}</p>
            <h1>Choose your plan & check out</h1>
            <p className="sf-lede">
              Authorization hold only — you are charged if a provider prescribes. Cancel anytime.
            </p>
            <div className="sf-plan-grid">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`sf-plan ${planId === p.id ? 'active' : ''}`}
                  onClick={() => setPlanId(p.id)}
                >
                  {p.popular && <span className="sf-plan__tag">Most popular</span>}
                  <h2>{p.label}</h2>
                  <p className="sf-plan__price">
                    <strong>${p.perMonth}</strong>
                    <span>/mo</span>
                  </p>
                  <p className="sf-plan__total">${p.total} billed today (hold)</p>
                  <p className="sf-plan__note">{p.note}</p>
                </button>
              ))}
            </div>
            <div className="sf-nav-row">
              <button type="button" className="pp-btn pp-btn--outline" onClick={() => go('intake')}>Back</button>
              <button type="button" className="pp-btn pp-btn--primary" onClick={() => go('checkout')}>
                Continue to checkout →
              </button>
            </div>
          </section>
        )}

        {step === 'checkout' && (
          <section className="sf-panel sf-panel--narrow">
            <p className="pp-eyebrow">Checkout</p>
            <h1>Complete your purchase</h1>
            <div className="sf-summary">
              <div>
                <strong>{treatment?.med}</strong>
                <span>{plan.label} · ${plan.perMonth}/mo</span>
              </div>
              <strong>${plan.total}</strong>
            </div>
            <p className="sf-hold">Simulated card authorization — no real charge in this demo.</p>
            <form className="pp-auth__form" onSubmit={continueCheckout}>
              <div className="pp-auth__row">
                <label>
                  First name
                  <input
                    value={checkout.firstName}
                    onChange={(e) => setCheckout({ ...checkout, firstName: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Last name
                  <input
                    value={checkout.lastName}
                    onChange={(e) => setCheckout({ ...checkout, lastName: e.target.value })}
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  type="email"
                  value={checkout.email}
                  onChange={(e) => setCheckout({ ...checkout, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Phone
                <input
                  value={checkout.phone}
                  onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })}
                  placeholder="(305) 555-0142"
                />
              </label>
              <label>
                Card number
                <input
                  value={checkout.card}
                  onChange={(e) => setCheckout({ ...checkout, card: e.target.value })}
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </label>
              <div className="pp-auth__row">
                <label>
                  Exp
                  <input
                    value={checkout.exp}
                    onChange={(e) => setCheckout({ ...checkout, exp: e.target.value })}
                    placeholder="06/28"
                    required
                  />
                </label>
                <label>
                  CVC
                  <input
                    value={checkout.cvc}
                    onChange={(e) => setCheckout({ ...checkout, cvc: e.target.value })}
                    placeholder="123"
                    required
                  />
                </label>
              </div>
              {error && <p className="pp-auth__error">{error}</p>}
              <div className="sf-nav-row">
                <button type="button" className="pp-btn pp-btn--outline" onClick={() => go('plan')}>Back</button>
                <button type="submit" className="pp-btn pp-btn--primary">Authorize & continue →</button>
              </div>
            </form>
          </section>
        )}

        {step === 'verify' && (
          <section className="sf-panel sf-panel--narrow">
            <p className="pp-eyebrow">Identity verification</p>
            <h1>Verify your identity</h1>
            <p className="sf-lede">
              Required before a provider can issue a prescription — last 4 of SSN or government ID.
            </p>
            <div className="sf-choices sf-choices--row">
              <button
                type="button"
                className={`sf-choice ${verify.method === 'ssn' ? 'active' : ''}`}
                onClick={() => setVerify({ ...verify, method: 'ssn' })}
              >
                Last 4 of SSN
              </button>
              <button
                type="button"
                className={`sf-choice ${verify.method === 'id' ? 'active' : ''}`}
                onClick={() => setVerify({ ...verify, method: 'id' })}
              >
                Government ID
              </button>
            </div>
            <form className="pp-auth__form" onSubmit={continueVerify}>
              {verify.method === 'ssn' ? (
                <label>
                  Last 4 digits
                  <input
                    value={verify.ssn4}
                    onChange={(e) => setVerify({ ...verify, ssn4: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    inputMode="numeric"
                    placeholder="1234"
                    required
                  />
                </label>
              ) : (
                <label>
                  Upload confirmation (simulated)
                  <input
                    value={verify.idNote}
                    onChange={(e) => setVerify({ ...verify, idNote: e.target.value })}
                    placeholder="e.g. Driver license uploaded"
                    required
                  />
                </label>
              )}
              {error && <p className="pp-auth__error">{error}</p>}
              <div className="sf-nav-row">
                <button type="button" className="pp-btn pp-btn--outline" onClick={() => go('checkout')}>Back</button>
                <button type="submit" className="pp-btn pp-btn--primary">Submit for provider review →</button>
              </div>
            </form>
          </section>
        )}

        {step === 'account' && (
          <section className="sf-panel sf-panel--narrow">
            <p className="pp-eyebrow">Almost there</p>
            <h1>Create your Patient Center login</h1>
            <p className="sf-lede">
              Your intake is in for provider review (typically within 24 hours). Set a password to track shipping, messages, and treatment in the {PAX_PASSPORT.product.shortName} Patient Center.
            </p>
            <div className="sf-summary">
              <div>
                <strong>{checkout.email}</strong>
                <span>{treatment?.name} · {plan.label}</span>
              </div>
            </div>
            <form className="pp-auth__form" onSubmit={finishAccount}>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  required
                  autoComplete="new-password"
                />
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  minLength={4}
                  required
                  autoComplete="new-password"
                />
              </label>
              {error && <p className="pp-auth__error">{error}</p>}
              <button type="submit" className="pp-btn pp-btn--primary sf-cta" disabled={busy}>
                {busy ? 'Opening Patient Center…' : 'Open Patient Center →'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
