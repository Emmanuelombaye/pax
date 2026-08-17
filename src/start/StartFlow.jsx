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
  SCREENING_CONDITIONS,
  US_STATES,
  emptyIntake,
  getGoalForTreatment,
  getPlansForTreatment,
  isValidAdultDob,
  isValidEmail,
  isValidPhone,
  isValidZip,
  resolveTreatmentId,
} from './startFlowData.js';
import GlpTreatmentPicker from './GlpTreatmentPicker.jsx';
import { LEGAL_LINKS } from '../marketing/legalContent.js';

function flowPhase(step) {
  if (step === 'treatment') return 'treatment';
  if (step === 'intake') return 'intake';
  return 'checkout';
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
    conditionsApply: raw.conditionsApply || '',
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
  const resumeRaw = pending?.resumeStep || 'treatment';
  const resumeStep = ['plan', 'checkout', 'verify', 'account'].includes(resumeRaw) ? 'intake' : resumeRaw;
  const [step, setStep] = useState(resumeStep);
  const [treatmentId, setTreatmentId] = useState(
    resolveTreatmentId(pending?.treatmentId) || hashTreatmentId || 'semaglutide',
  );
  const [intakeIndex, setIntakeIndex] = useState(
    ['plan', 'checkout', 'verify', 'account'].includes(resumeRaw)
      ? INTAKE_PHASES.length - 1
      : Number.isFinite(pending?.intakeIndex)
        ? pending.intakeIndex
        : 0,
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
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponBusy, setCouponBusy] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');

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
  const supportEmail = PAX_PASSPORT.identity.supportEmail;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
    const hashParams = new URLSearchParams(hashQuery);
    if (params.get('canceled') === '1' || hashParams.get('canceled') === '1') {
      setError('Checkout was canceled. Your intake is still here — continue when you are ready.');
    }
  }, []);

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

  const validateIntakePhase = () => {
    if (intakePhase.id === 'patient') {
      if (
        !checkout.email?.trim() ||
        !checkout.firstName?.trim() ||
        !checkout.lastName?.trim() ||
        !checkout.phone?.trim() ||
        !intake.dob ||
        !intake.sexAtBirth
      ) {
        return 'Please complete all required patient information fields.';
      }
      if (!isValidEmail(checkout.email)) return 'Enter a valid email address.';
      if (!isValidPhone(checkout.phone)) return 'Enter a valid phone number.';
      if (!isValidAdultDob(intake.dob)) return 'You must be 18 or older to continue.';
      return '';
    }
    if (intakePhase.id === 'shipping') {
      if (!intake.address1?.trim() || !intake.city?.trim() || !intake.state || !intake.zip?.trim()) {
        return 'Please complete all required shipping address fields.';
      }
      if (!US_STATES.some((s) => s.value === intake.state)) return 'Select a valid U.S. state.';
      if (!isValidZip(intake.zip)) return 'Enter a valid ZIP code.';
      return '';
    }
    if (intakePhase.id === 'screening') {
      if (intake.conditionsApply !== 'yes' && intake.conditionsApply !== 'no') {
        return 'Please answer the medical screening question to continue.';
      }
      return '';
    }
    if (intakePhase.id === 'consent') {
      if (!intake.consentTelehealth || !intake.consentReview) {
        return 'Please accept both clinical agreements to complete your intake.';
      }
      return '';
    }
    return '';
  };

  const applyCoupon = async () => {
    const code = couponInput.trim();
    if (!code) {
      setCouponMessage('Enter a promo code.');
      setAppliedCoupon(null);
      return;
    }

    setCouponBusy(true);
    setCouponMessage('');
    try {
      const res = await fetch('/api/checkout/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, programSlug: treatment.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.valid !== true) {
        setAppliedCoupon(null);
        setCouponMessage(data.error || 'This code is not valid for this order.');
        return;
      }
      setAppliedCoupon({
        code: data.code || code,
        discountAmountCents: data.discountAmountCents,
        finalAmountCents: data.finalAmountCents,
      });
      setCouponMessage('Promo code applied.');
    } catch {
      setAppliedCoupon(null);
      setCouponMessage('We could not check this code right now. Please try again.');
    } finally {
      setCouponBusy(false);
    }
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage('');
  };

  const startSecureCheckout = async () => {
    if (busy) return false;
    setBusy(true);
    setError('');
    persist({ resumeStep: 'checkout' });

    try {
      localStorage.setItem('pax_checkout_email_v1', checkout.email.trim());
    } catch {
      /* ignore private-mode storage failures */
    }

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug: treatment.id,
          patientInfo: {
            firstName: checkout.firstName.trim(),
            lastName: checkout.lastName.trim(),
            email: checkout.email.trim(),
            phone: checkout.phone.replace(/\D/g, ''),
            dob: intake.dob,
            state: intake.state,
          },
          intakeAnswers: {
            program: treatment.name,
            programSlug: treatment.id,
            planId,
            sexAssignedAtBirth: intake.sexAtBirth,
            shippingStreet: intake.address1,
            shippingApartment: intake.address2,
            shippingCity: intake.city,
            shippingState: intake.state,
            shippingZip: intake.zip,
            conditionsApply: intake.conditionsApply,
            screeningConditions: SCREENING_CONDITIONS.join('; '),
            consentTermsAndTelehealth: intake.consentTelehealth,
            authorizeClinicianReview: intake.consentReview,
            source: 'pax-start',
          },
          ...(appliedCoupon?.code ? { couponCode: appliedCoupon.code } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || 'We could not start checkout. Please try again.');
        return false;
      }
      window.location.href = data.checkoutUrl;
      return true;
    } catch {
      setError('Network error. Check your connection and try again.');
      return false;
    } finally {
      setBusy(false);
    }
  };

  const continueIntake = async () => {
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
    await startSecureCheckout();
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

  const continueCheckout = async (e) => {
    e.preventDefault();
    const msg = validateIntakePhase();
    if (intakePhase.id !== 'consent' && (!checkout.firstName?.trim() || !isValidEmail(checkout.email))) {
      setError('Complete your contact details to continue.');
      return;
    }
    await startSecureCheckout();
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
            <p className="pp-eyebrow">Clinical intake · {intakeIndex + 1}/{INTAKE_PHASES.length}</p>
            <h1>Step {intakeIndex + 1} — {intakePhase.title}</h1>
            <p className="sf-lede">
              A licensed U.S. provider reviews your answers before any prescription is issued — typically within 24 hours.
            </p>

            {intakePhase.id === 'patient' && (
              <div className="pp-auth__form sf-intake-form">
                <label>
                  Email Address *
                  <input
                    type="email"
                    value={checkout.email}
                    onChange={(e) => setCheckout({ ...checkout, email: e.target.value })}
                    placeholder="alex.rivera@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <div className="pp-auth__row">
                  <label>
                    First Name *
                    <input
                      value={checkout.firstName}
                      onChange={(e) => setCheckout({ ...checkout, firstName: e.target.value })}
                      autoComplete="given-name"
                      required
                    />
                  </label>
                  <label>
                    Last Name *
                    <input
                      value={checkout.lastName}
                      onChange={(e) => setCheckout({ ...checkout, lastName: e.target.value })}
                      autoComplete="family-name"
                      required
                    />
                  </label>
                </div>
                <label>
                  Phone Number *
                  <input
                    type="tel"
                    value={checkout.phone}
                    onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })}
                    placeholder="(305) 555-0142"
                    autoComplete="tel"
                    required
                  />
                </label>
                <label>
                  Date of Birth *
                  <input
                    type="date"
                    value={intake.dob}
                    onChange={(e) => setIntake({ ...intake, dob: e.target.value })}
                    autoComplete="bday"
                    required
                  />
                </label>
                <div className="sf-field">
                  <span className="sf-field__label">Sex Assigned at Birth *</span>
                  <div className="sf-choices sf-choices--row">
                    {['Male', 'Female'].map((sex) => (
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

            {intakePhase.id === 'shipping' && (
              <div className="pp-auth__form sf-intake-form">
                <label>
                  Street Address *
                  <input
                    value={intake.address1}
                    onChange={(e) => setIntake({ ...intake, address1: e.target.value })}
                    placeholder="123 Main St"
                    autoComplete="address-line1"
                    required
                  />
                </label>
                <label>
                  Apartment / Suite (Optional)
                  <input
                    value={intake.address2}
                    onChange={(e) => setIntake({ ...intake, address2: e.target.value })}
                    placeholder="Apt 4B / Suite 200"
                    autoComplete="address-line2"
                  />
                </label>
                <div className="pp-auth__row sf-intake-form__city-row">
                  <label>
                    City *
                    <input
                      value={intake.city}
                      onChange={(e) => setIntake({ ...intake, city: e.target.value })}
                      autoComplete="address-level2"
                      required
                    />
                  </label>
                  <label>
                    State *
                    <select
                      value={intake.state}
                      onChange={(e) => setIntake({ ...intake, state: e.target.value })}
                      autoComplete="address-level1"
                      required
                    >
                      <option value="" disabled>Select</option>
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    ZIP / Postcode *
                    <input
                      value={intake.zip}
                      onChange={(e) => setIntake({ ...intake, zip: e.target.value })}
                      placeholder="33101"
                      autoComplete="postal-code"
                      required
                    />
                  </label>
                </div>
              </div>
            )}

            {intakePhase.id === 'screening' && (
              <div className="sf-q">
                <p className="sf-q__prompt">Do any of the following conditions apply to you? *</p>
                <ul className="sf-conditions-list">
                  {SCREENING_CONDITIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="sf-choices">
                  {[
                    { value: 'yes', label: 'Yes, one or more' },
                    { value: 'no', label: 'No, none apply' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`sf-choice ${intake.conditionsApply === opt.value ? 'active' : ''}`}
                      onClick={() => setIntake({ ...intake, conditionsApply: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {intake.conditionsApply === 'yes' && (
                  <p className="sf-consent__note">
                    A licensed clinician will review your history before deciding whether treatment is appropriate.
                    Answering yes does not automatically disqualify you.
                  </p>
                )}
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
                    <a href="#/terms" target="_blank" rel="noreferrer">Terms of Service</a>
                    , Medical Consent form, and acknowledge the{' '}
                    <a href="#/telehealth-consent" target="_blank" rel="noreferrer">Telehealth Informed Consent</a>
                    {' '}for specialized medical protocols. *
                  </span>
                </label>
                <label className="sf-consent__item">
                  <input
                    type="checkbox"
                    checked={intake.consentReview}
                    onChange={(e) => setIntake({ ...intake, consentReview: e.target.checked })}
                  />
                  <span>
                    I authorize {PAX_PASSPORT.product.shortName}&apos;s affiliated clinicians to securely review my medical
                    records and prescribe the necessary medication if I am a candidate. *
                  </span>
                </label>
                <div className="sf-coupon">
                  <label className="sf-coupon__label" htmlFor="pax-coupon">
                    Promo code <span className="sf-coupon__optional">(optional)</span>
                  </label>
                  <div className="sf-coupon__row">
                    <input
                      id="pax-coupon"
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        if (appliedCoupon) clearCoupon();
                      }}
                      placeholder="Enter code"
                      autoComplete="off"
                      disabled={couponBusy || busy}
                    />
                    <button
                      type="button"
                      className="pp-btn pp-btn--outline"
                      onClick={applyCoupon}
                      disabled={couponBusy || busy || !couponInput.trim()}
                    >
                      {couponBusy ? 'Checking…' : 'Apply'}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="sf-coupon__success">
                      {appliedCoupon.code} applied
                      {typeof appliedCoupon.discountAmountCents === 'number'
                        ? ` — saves $${(appliedCoupon.discountAmountCents / 100).toFixed(2)}`
                        : ''}
                    </p>
                  )}
                  {couponMessage && !appliedCoupon && (
                    <p className="sf-coupon__hint">{couponMessage}</p>
                  )}
                </div>
                <p className="sf-consent__note">
                  You will complete payment securely with Stripe. Submitting this intake does not guarantee a
                  prescription. A licensed provider must approve treatment.
                </p>
              </div>
            )}

            {error && <p className="pp-auth__error">{error}</p>}
            <div className="sf-nav-row sf-nav-row--triple">
              <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>
                Cancel
              </button>
              <button type="button" className="pp-btn pp-btn--outline" onClick={backIntake} disabled={busy}>
                Back
              </button>
              <button type="button" className="pp-btn pp-btn--primary" onClick={continueIntake} disabled={busy} aria-busy={busy}>
                {intakePhase.id === 'consent'
                  ? busy
                    ? 'Starting secure checkout…'
                    : 'Continue to secure checkout →'
                  : 'Continue →'}
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
            <p className="sf-hold">You will complete payment securely with Stripe. A prescription is not guaranteed.</p>
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
              {error && <p className="pp-auth__error">{error}</p>}
              <div className="sf-nav-row sf-nav-row--triple">
                <button type="button" className="pp-btn pp-btn--ghost" onClick={cancelFlow}>Cancel</button>
                <button type="button" className="pp-btn pp-btn--outline" onClick={() => go('plan')} disabled={busy}>Back</button>
                <button type="submit" className="pp-btn pp-btn--primary" disabled={busy} aria-busy={busy}>
                  {busy ? 'Starting secure checkout…' : 'Continue to secure checkout →'}
                </button>
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
