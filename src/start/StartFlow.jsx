import React, { useState, useMemo, useEffect } from "react";
import { BrandMark } from "../brand/index.js";
import {
  listStorefrontProducts,
  startProductIntake,
} from "../brand/connect.js";
import {
  fallbackProducts,
  findProductForTreatment,
} from "../brand/productMap.js";
import {
  TREATMENTS,
  US_STATES,
  resolveTreatmentId,
} from "./startFlowData.js";
import questionnaireData from "./questionnaire.json";

// Helper to persist state securely in sessionStorage
const loadPersistedState = (key, defaultVal) => {
  if (typeof window === "undefined") return defaultVal;
  try {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const savePersistedState = (key, val) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

export default function StartFlow() {
  const hashTreatmentId = (() => {
    if (typeof window === "undefined") return "";
    const raw = window.location.hash.replace(/^#\/?/, "");
    const query = raw.includes("?") ? raw.split("?")[1] : "";
    const params = new URLSearchParams(query);
    return resolveTreatmentId(params.get("treatment") || "");
  })();

  const [treatmentId] = useState(() => loadPersistedState("pax_treatmentId", hashTreatmentId || "semaglutide"));
  
  const treatment = useMemo(
    () => TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0],
    [treatmentId]
  );

  // Flow State
  const [screen, setScreen] = useState(() => loadPersistedState("pax_screen", "CHECKOUT")); 
  
  // Form State
  const [formData, setFormData] = useState(() => loadPersistedState("pax_formData", {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    sexAtBirth: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    sameShipping: true,
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    plan: "monthly",
    consent1: false,
    consent2: false,
  }));

  const [questionnaireAnswers, setQuestionnaireAnswers] = useState(() => loadPersistedState("pax_questionnaire", {}));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [intakeRedirect, setIntakeRedirect] = useState({
    status: "loading", // loading | ready | failed
    url: null,
    error: null,
  });

  // Persist State Effects
  useEffect(() => { savePersistedState("pax_screen", screen); }, [screen]);
  useEffect(() => { savePersistedState("pax_formData", formData); }, [formData]);
  useEffect(() => { savePersistedState("pax_questionnaire", questionnaireAnswers); }, [questionnaireAnswers]);
  useEffect(() => { savePersistedState("pax_treatmentId", treatmentId); }, [treatmentId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen]);

  // Brand Storefront: send patients to VirtualClinicOS hosted intake
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let products;
        try {
          products = await listStorefrontProducts();
        } catch {
          products = fallbackProducts();
        }
        if (cancelled) return;
        const product = findProductForTreatment(products, treatmentId);
        if (product?.intakeUrl) {
          setIntakeRedirect({ status: "ready", url: product.intakeUrl, error: null });
          startProductIntake(product);
          return;
        }
        setIntakeRedirect({
          status: "failed",
          url: null,
          error: "No hosted intake URL for this treatment yet.",
        });
      } catch (err) {
        if (cancelled) return;
        setIntakeRedirect({
          status: "failed",
          url: null,
          error: err?.message || "Could not open clinical intake.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [treatmentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCheckout = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone required";
    if (!formData.dob) newErrors.dob = "Required";
    if (!formData.sexAtBirth) newErrors.sexAtBirth = "Required";
    
    if (!formData.address1) newErrors.address1 = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.zip) newErrors.zip = "Required";
    
    if (!formData.cardNumber || formData.cardNumber.length < 15) newErrors.cardNumber = "Valid card required";
    if (!formData.cardExp || !/^\d{2}\/\d{2}$/.test(formData.cardExp)) newErrors.cardExp = "Format MM/YY";
    if (!formData.cardCvc || formData.cardCvc.length < 3) newErrors.cardCvc = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openHostedIntake = async () => {
    setIsSubmitting(true);
    try {
      if (intakeRedirect.url) {
        startProductIntake(intakeRedirect.url);
        return;
      }
      let products;
      try {
        products = await listStorefrontProducts();
      } catch {
        products = fallbackProducts();
      }
      const product = findProductForTreatment(products, treatmentId);
      if (product?.intakeUrl) {
        startProductIntake(product);
        return;
      }
      setErrors((prev) => ({
        ...prev,
        form: "Hosted intake is unavailable right now. Please try again or contact support.",
      }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err?.message || "Could not open clinical intake.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitCheckout = async () => {
    // Prefer VirtualClinicOS hosted intake (payment + clinical questions)
    await openHostedIntake();
  };

  const activeQuestions = useMemo(() => {
    return questionnaireData.filter((q) => {
      if (!q.condition) return true;
      const relatedAnswer =
        q.condition.question_id === "gender"
          ? formData.sexAtBirth
          : questionnaireAnswers[q.condition.question_id];
      return String(relatedAnswer || "").toLowerCase() === String(q.condition.value || "").toLowerCase();
    });
  }, [formData.sexAtBirth, questionnaireAnswers]);

  const validateIntake = () => {
    const newErrors = {};
    activeQuestions.forEach(q => {
      if (q.required && !questionnaireAnswers[q.id]) {
        newErrors[q.id] = "This question requires an answer.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const proceedToIntake2 = () => {
    if (!validateIntake()) return;
    setScreen("INTAKE_2");
  };

  const submitIntake = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    // Clear session storage on success
    sessionStorage.removeItem("pax_screen");
    sessionStorage.removeItem("pax_formData");
    sessionStorage.removeItem("pax_questionnaire");
    setScreen("FINAL");
  };

  const inputStyle = (name) => ({ 
    width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.5rem", 
    border: errors[name] ? "2px solid var(--terracotta)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", 
    fontSize: "0.9rem", outline: "none", backgroundColor: errors[name] ? "#fff5f5" : "#ffffff" 
  });
  const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.35rem" };
  const errorStyle = { color: "var(--terracotta)", fontSize: "0.75rem", fontWeight: 600, marginTop: "0.25rem" };
  const boxStyle = { backgroundColor: "#ffffff", borderRadius: "1.5rem", padding: "1.75rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.03)", marginBottom: "1.25rem" };
  const buttonStyle = { width: "100%", padding: "1.15rem", borderRadius: "999px", backgroundColor: "var(--forest)", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.02em", border: "none", cursor: "pointer", transition: "all 0.2s" };

  const _priceDisplay = formData.plan === "monthly" ? "$125.00 / month" : formData.plan === "quarterly" ? "$337.50 every 3 months" : "$125.00 one time";
  const totalDisplay = formData.plan === "quarterly" ? "$337.50" : "$125.00";
  
  const pillStyle = { backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", color: "var(--forest)", padding: "0.35rem 1rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1rem", border: "1px solid color-mix(in oklch, var(--forest) 15%, transparent)" };

  if (intakeRedirect.status === "loading" || intakeRedirect.status === "ready") {
    return (
      <div className="sf">
        <header className="sf-top">
          <div className="sf-top__inner">
            <a href="#/" className="sf-brand" aria-label="Pax home">
              <BrandMark variant="wordmark" />
            </a>
          </div>
        </header>
        <main className="sf-main" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
          <p style={{ color: "var(--forest)", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.5rem" }}>
            Opening secure clinical intake…
          </p>
          <p style={{ color: "#64748b", maxWidth: "28rem", margin: "0 auto" }}>
            You are being connected to {treatment.name} on intake.paxlongevity.com for payment and medical review.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="sf">
      <header className="sf-top">
        <div className="sf-top__inner">
          <a href="#/" className="sf-brand" aria-label="Pax home" onClick={() => sessionStorage.clear()}>
            <BrandMark variant="wordmark" />
          </a>
          <a href="#/treatments/weight-loss" className="sf-top__login" onClick={() => sessionStorage.clear()}>
            Go back to shop →
          </a>
        </div>
      </header>

      <main className="sf-main">
        {intakeRedirect.status === "failed" && intakeRedirect.error && (
          <div style={{ ...boxStyle, borderColor: "color-mix(in oklch, var(--terracotta) 35%, transparent)" }}>
            <p style={{ color: "var(--terracotta)", fontWeight: 600, margin: "0 0 0.75rem" }}>{intakeRedirect.error}</p>
            <button type="button" onClick={openHostedIntake} disabled={isSubmitting} style={buttonStyle}>
              {isSubmitting ? "Opening intake…" : "Retry hosted clinical intake →"}
            </button>
          </div>
        )}
        {screen === "CHECKOUT" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-start", marginTop: "2rem" }}>
            <div style={{ flex: "1 1 500px" }}>
              {/* Contact Info */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ backgroundColor: "var(--forest)", color: "white", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700 }}>1</div>
                  Contact Information
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginLeft: "2.75rem", marginBottom: "1.5rem" }}>Used to create your confidential patient profile.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginLeft: "2.75rem" }}>
                  <div><label style={labelStyle}>First Name *</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle("firstName")} />{errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}</div>
                  <div><label style={labelStyle}>Last Name *</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle("lastName")} />{errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}</div>
                  <div><label style={labelStyle}>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle("email")} />{errors.email && <div style={errorStyle}>{errors.email}</div>}</div>
                  <div><label style={labelStyle}>Phone Number *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle("phone")} />{errors.phone && <div style={errorStyle}>{errors.phone}</div>}</div>
                  <div><label style={labelStyle}>Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle("dob")} />{errors.dob && <div style={errorStyle}>{errors.dob}</div>}</div>
                  <div>
                    <label style={labelStyle}>Sex Assigned at Birth *</label>
                    <select name="sexAtBirth" value={formData.sexAtBirth} onChange={handleChange} style={inputStyle("sexAtBirth")}>
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sexAtBirth && <div style={errorStyle}>{errors.sexAtBirth}</div>}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ backgroundColor: "var(--forest)", color: "white", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700 }}>2</div>
                  Billing Address
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginLeft: "2.75rem" }}>
                  <div><label style={labelStyle}>Address Line 1 *</label><input type="text" name="address1" value={formData.address1} onChange={handleChange} style={inputStyle("address1")} />{errors.address1 && <div style={errorStyle}>{errors.address1}</div>}</div>
                  <div><label style={labelStyle}>Address Line 2 (optional)</label><input type="text" name="address2" value={formData.address2} onChange={handleChange} style={inputStyle("address2")} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                    <div><label style={labelStyle}>City *</label><input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle("city")} />{errors.city && <div style={errorStyle}>{errors.city}</div>}</div>
                    <div>
                      <label style={labelStyle}>State *</label>
                      <select name="state" value={formData.state} onChange={handleChange} style={inputStyle("state")}>
                        <option value="">Select a state</option>
                        {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      {errors.state && <div style={errorStyle}>{errors.state}</div>}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                    <div><label style={labelStyle}>ZIP Code *</label><input type="text" name="zip" value={formData.zip} onChange={handleChange} style={inputStyle("zip")} />{errors.zip && <div style={errorStyle}>{errors.zip}</div>}</div>
                    <div><label style={labelStyle}>Country</label><input type="text" name="country" value={formData.country} onChange={handleChange} style={{ ...inputStyle("country"), backgroundColor: "#f1f5f9" }} readOnly /></div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--forest)", fontWeight: 600, marginTop: "0.5rem" }}>
                    <input type="checkbox" name="sameShipping" checked={formData.sameShipping} onChange={handleChange} style={{ accentColor: "var(--forest)", width: "1.15rem", height: "1.15rem" }} />
                    Shipping address is the same as billing address
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ backgroundColor: "var(--forest)", color: "white", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700 }}>3</div>
                  Payment Method
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginLeft: "2.75rem" }}>
                  <div><label style={labelStyle}>Card Number *</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" style={inputStyle("cardNumber")} />{errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>Expiry (MM/YY) *</label><input type="text" name="cardExp" value={formData.cardExp} onChange={handleChange} placeholder="MM/YY" style={inputStyle("cardExp")} />{errors.cardExp && <div style={errorStyle}>{errors.cardExp}</div>}</div>
                    <div><label style={labelStyle}>CVC *</label><input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="123" style={inputStyle("cardCvc")} />{errors.cardCvc && <div style={errorStyle}>{errors.cardCvc}</div>}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ flex: "1 1 300px", position: "sticky", top: "2rem" }}>
              <div style={{ ...boxStyle, boxShadow: "0 15px 35px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--forest)", marginBottom: "1.5rem" }}>Order Summary</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: "4.5rem", height: "4.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                    <img src={treatment.image} alt={treatment.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: "150px" }}>
                    <h4 style={{ fontWeight: 700, color: "var(--forest)", margin: "0 0 0.25rem 0" }}>{treatment.name}</h4>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 0.5rem 0" }}>Monthly · Qty 1</p>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#e2e8f0", padding: "0.25rem 0.5rem", borderRadius: "999px", fontWeight: 600, color: "#475569" }}>Monthly Subscription</span>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.75rem" }}>Purchase plan</h4>
                  {["monthly", "quarterly", "onetime"].map(p => (
                    <label key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "0.5rem", border: formData.plan === p ? "2px solid var(--forest)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", backgroundColor: formData.plan === p ? "#ffffff" : "transparent", cursor: "pointer", marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "var(--forest)", fontSize: "0.9rem" }}>
                        <input type="radio" name="plan" value={p} checked={formData.plan === p} onChange={handleChange} style={{ accentColor: "var(--forest)" }} />
                        {p === "monthly" ? "Monthly" : p === "quarterly" ? "Quarterly" : "One-time"}
                      </div>
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        {p === "monthly" ? "$125.00 / mo" : p === "quarterly" ? "$337.50 / 3 mo" : "$125.00"}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "0.5rem" }}>
                  <span>Subtotal</span><span>{totalDisplay}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
                  <span>Estimated Tax</span><span>$0.00</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--forest)" }}>Total</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--forest)" }}>{totalDisplay}</span>
                </div>

                {Object.keys(errors).length > 0 && (
                  <div style={{ padding: "0.75rem", backgroundColor: "#fff5f5", color: "var(--terracotta)", borderRadius: "0.5rem", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem", textAlign: "center" }}>
                    Please complete all required fields correctly.
                  </div>
                )}

                {errors.form && <div style={{ ...errorStyle, marginBottom: "0.75rem" }}>{errors.form}</div>}
                <button onClick={submitCheckout} disabled={isSubmitting} style={buttonStyle}>
                  {isSubmitting ? "Opening intake…" : "Continue to clinical intake →"}
                </button>
                <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "color-mix(in oklch, var(--dune) 10%, var(--sand))", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", borderRadius: "0.5rem", textAlign: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--forest)", fontWeight: 700 }}>✓ Zero commitment today.</span>
                  <p style={{ fontSize: "0.75rem", color: "#475569", margin: "0.25rem 0 0 0", lineHeight: "1.4" }}>Your card will <strong>not be charged</strong> until a licensed U.S. provider approves your prescription.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "ORDER_RECEIVED" && (
          <div style={{ maxWidth: "600px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "3rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2rem", color: "var(--forest)", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Order Received</h2>
            <p style={{ color: "#475569", marginBottom: "2rem", lineHeight: "1.6" }}>Your order has been successfully placed. Continue to complete your required medical intake.</p>
            
            <div style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", borderRadius: "1rem", padding: "1.5rem", textAlign: "left", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Order Number</span><span style={{ fontWeight: 600 }}>{orderNumber}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Product</span><span style={{ fontWeight: 600 }}>{treatment.name}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Total</span><span style={{ fontWeight: 600 }}>{totalDisplay}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Patient</span><span style={{ fontWeight: 600 }}>{formData.firstName} {formData.lastName}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Payment method</span><span style={{ fontWeight: 600 }}>Card •••• {formData.cardNumber ? formData.cardNumber.slice(-4) : "3435"}</span></div>
            </div>

            <button onClick={() => setScreen("PRIVACY")} style={buttonStyle}>Continue to Medical Intake</button>
          </div>
        )}

        {screen === "PRIVACY" && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem" }}>
            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2.5rem", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
              <h2 style={{ fontSize: "1.75rem", color: "var(--forest)", marginBottom: "2rem", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "var(--forest)" }}>🔒</span> Your Privacy is Our Priority
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem" }}>Your Information Stays Private</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>We never sell your personal or medical information to third parties. Your data is yours.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem" }}>No Government Sharing</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>We do not share your information with government agencies without a valid legal requirement.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem" }}>Insurance Independence</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>Your information is never shared with insurance companies. Your healthcare decisions remain private.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem" }}>Protected & Encrypted</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>Health information would be handled under strict privacy safeguards with bank-level encryption.</p></div>
              </div>
              <button onClick={() => setScreen("INTAKE_1")} style={buttonStyle}>I Understand, Continue</button>
            </div>
          </div>
        )}

        {screen === "INTAKE_1" && (
          <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
            
            {/* Progress Bar 1 of 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>1</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>2</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>3</div>
              </div>
              <div style={pillStyle}>Step 1 of 3</div>
              <h2 style={{ fontSize: "2.5rem", color: "var(--forest)", margin: 0, fontFamily: "var(--font-display)", textAlign: "center" }}>Medical Questionnaire</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", borderRadius: "1.5rem", padding: "1.75rem", display: "flex", gap: "1rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem" }}>✨</span>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <p style={{ fontWeight: 700, color: "var(--forest)", margin: "0 0 0.25rem 0", fontSize: "1.1rem" }}>Welcome{formData.firstName ? `, ${formData.firstName}` : ""}.</p>
                  <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>Complete your health assessment to finalize your order. <strong>Your order will continue to clinical review after all required steps are completed.</strong></p>
                </div>
              </div>

              <div style={{ ...boxStyle, marginBottom: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {activeQuestions.map((q) => {
                    const val = questionnaireAnswers[q.id] || "";
                    const isDisqualified = q.disqualifier && String(val).toLowerCase() === String(q.disqualifier_value).toLowerCase();
                    const hasError = errors[q.id];

                    return (
                      <div key={q.id} style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.25rem", borderRadius: "1rem", border: isDisqualified ? "1px solid #fca5a5" : (hasError ? "1px solid var(--terracotta)" : "1px solid color-mix(in oklch, var(--forest) 8%, transparent)") }}>
                        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.75rem", lineHeight: "1.45" }}>
                          {q.question} {q.required && <span style={{ color: "var(--terracotta)" }}>*</span>}
                        </label>

                        {q.type === "boolean" ? (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                            {["Yes", "No"].map((opt) => {
                              const optVal = opt.toLowerCase();
                              const isSelected = val === optVal;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setQuestionnaireAnswers((prev) => ({ ...prev, [q.id]: optVal }));
                                    if(errors[q.id]) setErrors(prev => ({...prev, [q.id]: ""}));
                                  }}
                                  style={{ height: "3rem", borderRadius: "0.75rem", border: isSelected ? "2px solid var(--forest)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", backgroundColor: isSelected ? "var(--forest)" : "#ffffff", color: isSelected ? "#ffffff" : "var(--forest)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.15s ease" }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        ) : q.type === "select" ? (
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "0.75rem" }}>
                            {(q.options || ["Yes", "No"]).map((opt) => {
                              const optVal = opt.toLowerCase();
                              const isSelected = val === optVal;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setQuestionnaireAnswers((prev) => ({ ...prev, [q.id]: optVal }));
                                    if(errors[q.id]) setErrors(prev => ({...prev, [q.id]: ""}));
                                  }}
                                  style={{ height: "3rem", borderRadius: "0.75rem", border: isSelected ? "2px solid var(--forest)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", backgroundColor: isSelected ? "var(--forest)" : "#ffffff", color: isSelected ? "#ffffff" : "var(--forest)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.15s ease", padding: "0 0.5rem" }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <input
                            type={q.type === "number" ? "number" : "text"}
                            value={val}
                            onChange={(e) => {
                              setQuestionnaireAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                              if(errors[q.id]) setErrors(prev => ({...prev, [q.id]: ""}));
                            }}
                            placeholder="Enter your response..."
                            style={{ width: "100%", height: "3rem", padding: "0 1rem", borderRadius: "0.75rem", border: "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", fontSize: "0.95rem", outline: "none" }}
                          />
                        )}
                        {isDisqualified && (
                          <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fef2f2", color: "#991b1b", borderRadius: "0.75rem", fontSize: "0.85rem", fontWeight: 600 }}>
                            Based on this response, you may require an alternative protocol. A clinical team member will reach out.
                          </div>
                        )}
                        {hasError && <div style={errorStyle}>{hasError}</div>}
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={proceedToIntake2} style={{ ...buttonStyle, width: "auto", padding: "1rem 3rem" }}>Review & Submit →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "INTAKE_2" && (
          <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
            
            <div style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", borderRadius: "1rem", padding: "1.25rem", display: "flex", gap: "1rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", marginBottom: "3rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              <span style={{ fontSize: "1.25rem" }}>⚠️</span>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p style={{ fontWeight: 700, color: "var(--forest)", margin: "0 0 0.25rem 0", fontSize: "0.95rem" }}>Final step: review and submit</p>
                <p style={{ fontSize: "0.85rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>Please review and confirm your medical responses before clinical evaluation.</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>✓</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "var(--forest)" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "2px solid var(--forest)", color: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", backgroundColor: "transparent" }}>2</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>3</div>
              </div>
              <div style={pillStyle}>Step 2 of 3</div>
              <h2 style={{ fontSize: "2.5rem", color: "var(--forest)", margin: 0, fontFamily: "var(--font-display)", textAlign: "center" }}>Review & Submit</h2>
            </div>

            <div style={{ ...boxStyle, padding: "2.5rem", marginBottom: "2rem" }}>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.5rem 0" }}>From your checkout</p>
                <h3 style={{ fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-display)" }}>Your information</h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0 }}>Carried over from checkout so you do not have to re-enter it. Order #{orderNumber}.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>Name</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0 }}>{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>Email</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0 }}>{formData.email || "patient@example.com"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>Phone</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0 }}>{formData.phone || "(555) 123-4567"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>State</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0 }}>{formData.state || "NY"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>Address</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0, lineHeight: 1.4 }}>{formData.address1 || "123 Main St"}{formData.address2 ? `, ${formData.address2}` : ""} <br /> {formData.city || "New York"}, {formData.state || "NY"} {formData.zip || "10001"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.25rem 0" }}>Plan</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 500, margin: 0 }}>{formData.plan === 'monthly' ? 'Monthly' : formData.plan === 'quarterly' ? 'Quarterly' : 'One-time'} Subscription</p>
                </div>
              </div>
            </div>

            <div style={{ ...boxStyle, padding: "2.5rem" }}>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.5rem 0" }}>Ordering</p>
                <p style={{ fontSize: "0.95rem", color: "var(--forest)", fontWeight: 600, margin: "0 0 0.5rem 0" }}>{treatment.name} Program</p>
                <h3 style={{ fontSize: "1.75rem", color: "var(--forest)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-display)" }}>Consent & signature</h3>
              </div>

              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.5rem", borderRadius: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer", fontSize: "0.9rem", color: "var(--forest)", lineHeight: "1.5" }}>
                    <input type="checkbox" name="consent1" checked={formData.consent1} onChange={handleChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)", shrink: 0 }} />
                    <span>I agree to the <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>, and acknowledge the <strong>Telehealth Informed Consent</strong> for clinical evaluation.</span>
                  </label>

                  <label style={{ display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer", fontSize: "0.9rem", color: "var(--forest)", lineHeight: "1.5" }}>
                    <input type="checkbox" name="consent2" checked={formData.consent2} onChange={handleChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)", shrink: 0 }} />
                    <span>I authorize Pax's affiliated licensed medical providers to securely review my intake responses and medical records to evaluate prescription eligibility.</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={submitIntake}
                disabled={!formData.consent1 || !formData.consent2 || isSubmitting}
                style={{ ...buttonStyle, opacity: (!formData.consent1 || !formData.consent2 || isSubmitting) ? 0.5 : 1, boxShadow: "0 10px 25px rgba(28, 58, 43, 0.2)" }}
              >
                {isSubmitting ? "Submitting Clinical Intake..." : "Submit Medical Intake →"}
              </button>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
               <button onClick={() => setScreen("INTAKE_1")} style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>← Back to Questionnaire</button>
            </div>
          </div>
        )}

        {screen === "FINAL" && (
          <div style={{ maxWidth: "600px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "3rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>✓</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "var(--forest)" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>✓</div>
                <div style={{ height: "2px", width: "3rem", backgroundColor: "var(--forest)" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "2px solid var(--forest)", color: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", backgroundColor: "transparent" }}>3</div>
              </div>
              <div style={pillStyle}>Step 3 of 3</div>
            </div>

            <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--forest)", marginBottom: "1.25rem", fontFamily: "var(--font-display)" }}>Intake Complete</h2>
            <p style={{ color: "#475569", marginBottom: "2.5rem", lineHeight: "1.6", fontSize: "1.05rem" }}>
              Your clinical intake has been submitted for review. A licensed U.S. medical provider will review your file within 24 hours. We will contact you at <strong>{formData.email || "your email"}</strong> with any updates.
            </p>
            <a href="#/treatments/weight-loss" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none", padding: "1rem 3rem", width: "auto" }} onClick={() => sessionStorage.clear()}>
              Go Back to Shop
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
