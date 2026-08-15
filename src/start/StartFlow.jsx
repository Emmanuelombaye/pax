import { useEffect, useMemo, useState } from 'react';
import { BrandMark, PAX_PASSPORT } from '../brand/index.js';
import {
  completePurchaseSignup,
  clearPendingOrder,
  getPendingOrder,
  savePendingOrder,
} from '../brand/connect.js';
import {
  FLOW_STEPS,
  INTAKE_PHASES,
  TREATMENT_INCLUDES,
  TREATMENTS,
  TRUST_POINTS,
  US_STATES,
  emptyIntake,
  getActiveScreeningQuestions,
  getGoalForTreatment,
  getPlansForTreatment,
  isScreeningComplete,
  isValidAdultDob,
  isValidEmail,
  isValidPhone,
  isValidZip,
  questionIsDisqualified,
  resolveTreatmentId,
} from './startFlowData.js';
import GlpTreatmentPicker from './GlpTreatmentPicker.jsx';
import { LEGAL_LINKS } from '../marketing/legalContent.js';

function flowPhase(step) {
  if (step === 'treatment') return 'treatment';
  if (step === 'intake') return 'intake';
  if (step === 'plan' || step === 'checkout') return 'plan';
  return 'verify';
}

function Progress({ step }) {
  const phase = flowPhase(step);
  const phaseIdx = FLOW_STEPS.findIndex((s) => s.id === phase);
  const pct = Math.round(((phaseIdx + 1) / FLOW_STEPS.length) * 100);

  return (
    <div className="sf-progress">
      <div className="sf-progress__steps" aria-label="Enrollment progress">
        {FLOW_STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`sf-progress__step ${i <= phaseIdx ? 'sf-progress__step--done' : ''} ${i === phaseIdx ? 'sf-progress__step--active' : ''}`}
          >
            <span className="sf-progress__dot">{i + 1}</span>
            <span className="sf-progress__name">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="sf-progress__track">
        <div className="sf-progress__bar" style={{ width: `${pct}%` }} />
      </div>
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

function normalizeIntake(raw) {
  const base = emptyIntake();
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    ...raw,
    answers: { ...base.answers, ...(raw.answers || {}) },
    height: raw.height || raw.answers?.height || '',
    weight: raw.weight || raw.answers?.weight || '',
    sexAtBirth: raw.sexAtBirth || raw.answers?.gender || '',
    consentTelehealth: Boolean(raw.consentTelehealth),
    consentReview: Boolean(raw.consentReview),
  };
}

export default function StartFlow({ onComplete }) {
  const pending = getPendingOrder();
  const hashTreatmentId = (() => {
    if (typeof window === 'undefined') return '';
    const raw = window.location.hash.replace(/^#\/?/, '');
    const query = raw.includes('?') ? raw.split('?')[1] : '';
    const params = new URLSearchParams(query);
    return resolveTreatmentId(params.get('treatment') || '');
  })();
  const [step, setStep] = useState(pending?.resumeStep || 'treatment');
  const [treatmentId, setTreatmentId] = useState(
    resolveTreatmentId(pending?.treatmentId) || hashTreatmentId || 'semaglutide',
  );
  const [intakeIndex, setIntakeIndex] = useState(
    Number.isFinite(pending?.intakeIndex) ? pending.intakeIndex : 0,
  );
  const [intake, setIntake] = useState(() => normalizeIntake(pending?.intake));
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
    () => TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0],
    [treatmentId],
  );
  const goal = useMemo(() => getGoalForTreatment(treatment.id), [treatment.id]);
  const isGlp = treatment.category === 'weight-loss';
  const plans = useMemo(() => getPlansForTreatment(treatmentId), [treatmentId]);
  const plan = useMemo(
    () => plans.find((p) => p.id === planId) || plans.find((p) => p.popular) || plans[0],
    [plans, planId],
  );
  const intakePhase = INTAKE_PHASES[intakeIndex] || INTAKE_PHASES[0];
  const screeningQuestions = useMemo(() => getActiveScreeningQuestions(intake), [intake]);
  const supportEmail = PAX_PASSPORT.identity.supportEmail;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, intakeIndex]);

  useEffect(() => {
    if (!plans.some((p) => p.id === planId)) {
      setPlanId(plans.find((p) => p.popular)?.id || plans[0]?.id || '3mo');
    }
  }, [plans, planId]);

  const persist = (extra = {}) => {
    savePendingOrder({
      treatmentId,
      planId,
      intake,
      intakeIndex,
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      resumeStep: step,
      ...extra,
    });
  };

  const go = (next, extra = {}) => {
    setError('');
    setStep(next);
    savePendingOrder({
      treatmentId,
      planId,
      intake,
      intakeIndex,
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      resumeStep: next,
      ...extra,
    });
  };

  const cancelFlow = () => {
    clearPendingOrder();
    window.location.hash = '#/';
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
    setIntakeIndex(0);
    go('intake', { intakeIndex: 0 });
  };

  const setAnswer = (id, value) => {
    setIntake((prev) => ({
      ...prev,
      answers: { ...prev.answers, [id]: value },
    }));
  };

  const validateIntakePhase = () => {
    if (intakePhase.id === 'metrics') {
      if (!intake.height?.trim() || !intake.weight || !intake.sexAtBirth || !intake.dob) {
        return 'Enter height, weight, date of birth, and sex assigned at birth.';
      }
      if (!isValidAdultDob(intake.dob)) {
        return 'You must be 18 or older to continue.';
      }
      return '';
    }
    if (intakePhase.id === 'screening') {
      if (!isScreeningComplete(intake)) {
        if (screeningQuestions.some((q) => questionIsDisqualified(q, intake.answers?.[q.id]))) {
          return `Based on your answers, a physician must review before you can continue. Contact ${supportEmail}.`;
        }
        return 'Please answer all medical screening questions to continue.';
      }
      return '';
    }
    if (intakePhase.id === 'patient') {
      if (!checkout.firstName?.trim() || !checkout.lastName?.trim() || !checkout.email?.trim() || !checkout.phone?.trim()) {
        return 'Enter your full name, email, and phone number.';
      }
      if (!isValidEmail(checkout.email)) return 'Enter a valid email address.';
      if (!isValidPhone(checkout.phone)) return 'Enter a valid phone number.';
      return '';
    }
    if (intakePhase.id === 'shipping') {
      if (!intake.address1?.trim() || !intake.city?.trim() || !intake.state || !intake.zip?.trim()) {
        return 'Enter a complete shipping address.';
      }
      if (!US_STATES.some((s) => s.value === intake.state)) return 'Select a valid U.S. state.';
      if (!isValidZip(intake.zip)) return 'Enter a valid ZIP code.';
      return '';
    }
    if (intakePhase.id === 'consent') {
      if (!intake.consentTelehealth || !intake.consentReview) {
        return 'Please accept both agreements to submit your intake for provider review.';
      }
      return '';
    }
    return '';
  };

  const continueIntake = () => {
    const msg = validateIntakePhase();
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    if (intakeIndex < INTAKE_PHASES.length - 1) {
      const nextIndex = intakeIndex + 1;
      setIntakeIndex(nextIndex);
      persist({ intakeIndex: nextIndex });
      return;
    }
    go('plan');
  };

  const backIntake = () => {
    setError('');
    if (intakeIndex === 0) {
      go('treatment');
      return;
    }
    const nextIndex = intakeIndex - 1;
    setIntakeIndex(nextIndex);
    persist({ intakeIndex: nextIndex });
  };

  const continueCheckout = (e) => {
    e.preventDefault();
    if (!checkout.firstName || !checkout.email || !checkout.card || checkout.card.replace(/\s/g, '').length < 12) {
      setError('Complete your contact details and card to continue.');
      return;
    }
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
          <section className="sf-panel sf-panel--start">
            <header className="sf-start-hero">
              <div className="sf-start-hero__copy">
                <p className="sf-eyebrow">Get started · {goal.label}</p>
                <h1>{isGlp ? 'Choose your GLP-1 treatment' : `Confirm your ${goal.title} plan`}</h1>
                <p className="sf-lede sf-lede--strong">
                  {isGlp
                    ? 'Select Semaglutide or Tirzepatide, then complete a short medical questionnaire — no account needed until after checkout.'
                    : `${treatment.blurb} Complete a short medical questionnaire — no account needed until after checkout.`}
                </p>
                <TrustStrip />
              </div>
              <div className="sf-start-hero__flow" aria-hidden="true">
                <ol className="sf-flow-preview">
                  <li><span>01</span> Pick your medication</li>
                  <li><span>02</span> Complete intake</li>
                  <li><span>03</span> Checkout & verify</li>
                  <li><span>04</span> Open Patient Center</li>
                </ol>
              </div>
            </header>

            {isGlp ? (
              <GlpTreatmentPicker
                selectedId={treatmentId}
                onSelect={onSelectTreatment}
                showCta={false}
              />
            ) : (
              <article className="glp-pick">
                <div className="glp-pick__media">
                  <img src={treatment.image || goal.image} alt="" loading="lazy" />
                  <div className="glp-pick__media-badges" aria-hidden="true">
                    {goal.badges.map((b) => (
                      <span key={b} className="glp-pick__chip">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="glp-pick__body">
                  <p className="glp-pick__proof">{goal.eyebrow}</p>
                  <h2 className="glp-pick__title">{treatment.name}</h2>
                  <p className="glp-pick__blurb">{goal.blurb}</p>
                  <div className="glp-pick__includes">
                    <p className="glp-pick__includes-label">All plans include</p>
                    <ul>
                      {TREATMENT_INCLUDES.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glp-pick__footer">
                    <div className="glp-pick__price">
                      <span className="glp-pick__price-label">Starting as low as</span>
                      <p className="glp-pick__price-value">
                        <strong>${treatment.priceFrom}</strong>
                        <span>/mo</span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {error && <p className="pp-auth__error">{error}</p>}
            <div className="sf-sticky-cta">
              <p className="sf-sticky-cta__hint">
                Selected: {treatment.name}
              </p>
              <div className="sf-nav-row sf-nav-row--triple">
                <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>
                  Cancel
                </button>
                <a href="#/" className="pp-btn pp-btn--outline">
                  Back
                </a>
                <button type="button" className="pp-btn pp-btn--primary sf-cta" onClick={continueTreatment}>
                  Continue with {treatment.name} →
                </button>
              </div>
            </div>
          </section>
        )}

        {step === 'intake' && (
          <section className="sf-panel sf-panel--intake">
            <p className="pp-eyebrow">
              {intakePhase.eyebrow} · {intakeIndex + 1}/{INTAKE_PHASES.length}
            </p>
            <h1>{intakePhase.title}</h1>
            <p className="sf-lede">
              A licensed U.S. provider reviews your answers before any prescription is issued — typically within 24 hours.
            </p>

            {intakePhase.id === 'metrics' && (
              <div className="sf-metrics">
                <label>
                  Height (e.g. 5&apos;10&quot;)
                  <input
                    value={intake.height}
                    onChange={(e) => setIntake({ ...intake, height: e.target.value })}
                    placeholder={'5\'10"'}
                    required
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
                    required
                  />
                </label>
                <label>
                  Date of birth
                  <input
                    type="date"
                    value={intake.dob}
                    onChange={(e) => setIntake({ ...intake, dob: e.target.value })}
                    required
                  />
                </label>
                <div className="sf-field">
                  <span className="sf-field__label">Sex assigned at birth</span>
                  <div className="sf-choices sf-choices--row">
                    {['Male', 'Female', 'Other'].map((sex) => (
                      <button
                        key={sex}
                        type="button"
                        className={`sf-choice ${intake.sexAtBirth === sex ? 'active' : ''}`}
                        onClick={() => setIntake({ ...intake, sexAtBirth: sex })}
                      >
                        {sex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {intakePhase.id === 'screening' && (
              <div className="sf-q-list">
                {screeningQuestions.map((q) => {
                  const value = intake.answers?.[q.id] || '';
                  const disqualified = questionIsDisqualified(q, value);
                  return (
                    <div key={q.id} className={`sf-q ${disqualified ? 'sf-q--warn' : ''}`}>
                      <p className="sf-q__prompt">
                        {q.question}
                        {q.required ? <span aria-hidden="true"> *</span> : null}
                      </p>

                      {q.type === 'boolean' && (
                        <div className="sf-choices sf-choices--row">
                          {['yes', 'no'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`sf-choice ${value === opt ? 'active' : ''} ${disqualified && value === opt ? 'sf-choice--danger' : ''}`}
                              onClick={() => setAnswer(q.id, opt)}
                            >
                              {opt === 'yes' ? 'Yes' : 'No'}
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === 'select' && (
                        <div className="sf-choices">
                          {(q.options || []).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`sf-choice ${value === opt ? 'active' : ''}`}
                              onClick={() => setAnswer(q.id, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(q.type === 'text' || q.type === 'number') && (
                        q.type === 'text' && String(q.question).length > 80 ? (
                          <textarea
                            value={value}
                            onChange={(e) => setAnswer(q.id, e.target.value)}
                            rows={3}
                            placeholder="Enter your answer…"
                          />
                        ) : (
                          <input
                            type={q.type === 'number' ? 'number' : 'text'}
                            value={value}
                            onChange={(e) => setAnswer(q.id, e.target.value)}
                            placeholder="Enter your answer…"
                          />
                        )
                      )}

                      {disqualified && (
                        <div className="sf-q__alert" role="alert">
                          <strong>Medical review required</strong>
                          <p>
                            Based on this response, a physician review is required before you can proceed.
                            Contact {supportEmail} for next steps.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {intakePhase.id === 'patient' && (
              <div className="pp-auth__form sf-intake-form">
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
                      required
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
                    required
                  />
                </label>
              </div>
            )}

            {intakePhase.id === 'shipping' && (
              <div className="pp-auth__form sf-intake-form">
                <label>
                  Street address
                  <input
                    value={intake.address1}
                    onChange={(e) => setIntake({ ...intake, address1: e.target.value })}
                    placeholder="123 Main St"
                    required
                  />
                </label>
                <label>
                  Apartment / suite
                  <input
                    value={intake.address2}
                    onChange={(e) => setIntake({ ...intake, address2: e.target.value })}
                    placeholder="Optional"
                  />
                </label>
                <div className="pp-auth__row sf-intake-form__city-row">
                  <label>
                    City
                    <input
                      value={intake.city}
                      onChange={(e) => setIntake({ ...intake, city: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    State
                    <select
                      value={intake.state}
                      onChange={(e) => setIntake({ ...intake, state: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select</option>
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    ZIP
                    <input
                      value={intake.zip}
                      onChange={(e) => setIntake({ ...intake, zip: e.target.value })}
                      placeholder="33101"
                      required
                    />
                  </label>
                </div>
              </div>
            )}

            {intakePhase.id === 'consent' && (
              <div className="sf-consent">
                <label className="sf-consent__item">
                  <input
                    type="checkbox"
                    checked={intake.consentTelehealth}
                    onChange={(e) => setIntake({ ...intake, consentTelehealth: e.target.checked })}
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#/terms">Terms of Use</a>, <a href="#/telehealth-consent">Telehealth Consent</a>, and <a href="#/hipaa">HIPAA Notice</a>
                    for provider-guided treatment.
                  </span>
                </label>
                <label className="sf-consent__item">
                  <input
                    type="checkbox"
                    checked={intake.consentReview}
                    onChange={(e) => setIntake({ ...intake, consentReview: e.target.checked })}
                  />
                  <span>
                    I authorize {PAX_PASSPORT.product.legalName}&apos;s affiliated clinicians to securely review
                    my medical information and prescribe medication only if clinically appropriate.
                  </span>
                </label>
                <p className="sf-consent__note">
                  Submitting this intake does not guarantee a prescription. A licensed provider must approve treatment.
                </p>
              </div>
            )}

            {error && <p className="pp-auth__error">{error}</p>}
            <div className="sf-nav-row sf-nav-row--triple">
              <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>
                Cancel
              </button>
              <button type="button" className="pp-btn pp-btn--outline" onClick={backIntake}>
                Back
              </button>
              <button type="button" className="pp-btn pp-btn--primary" onClick={continueIntake}>
                {intakePhase.id === 'consent' ? 'Continue to plan →' : 'Continue →'}
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
              {plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`sf-plan ${planId === p.id ? 'active' : ''}`}
                  onClick={() => setPlanId(p.id)}
                >
                  {p.popular && <span className="sf-plan__tag">3-month</span>}
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
            <div className="sf-nav-row sf-nav-row--triple">
              <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>Cancel</button>
              <button
                type="button"
                className="pp-btn pp-btn--outline"
                onClick={() => {
                  setIntakeIndex(INTAKE_PHASES.length - 1);
                  go('intake', { intakeIndex: INTAKE_PHASES.length - 1 });
                }}
              >
                Back
              </button>
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
              <div className="sf-nav-row sf-nav-row--triple">
                <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>Cancel</button>
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
              <div className="sf-nav-row sf-nav-row--triple">
                <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>Cancel</button>
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
              <div className="sf-nav-row sf-nav-row--triple">
                <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>Cancel</button>
                <button type="button" className="pp-btn pp-btn--outline" onClick={() => go('verify')} disabled={busy}>Back</button>
                <button type="submit" className="pp-btn pp-btn--primary sf-cta" disabled={busy}>
                  {busy ? 'Opening Patient Center…' : 'Open Patient Center →'}
                </button>
              </div>
            </form>
          </section>
        )}

        <footer className="sf-legal">
          <p className="sf-legal__links">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.id}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </p>
        </footer>
      </main>
    </div>
  );
}
