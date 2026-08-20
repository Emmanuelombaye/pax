import React, { useState, useMemo, useEffect } from "react";
import { BrandMark } from "../brand/index.js";
import {
  TREATMENTS,
  US_STATES,
  resolveTreatmentId,
} from "./startFlowData.js";
import questionnaireData from "./questionnaire.json";

export default function StartFlow() {
  const hashTreatmentId = (() => {
    if (typeof window === "undefined") return "";
    const raw = window.location.hash.replace(/^#\/?/, "");
    const query = raw.includes("?") ? raw.split("?")[1] : "";
    const params = new URLSearchParams(query);
    return resolveTreatmentId(params.get("treatment") || "");
  })();

  const [treatmentId, setTreatmentId] = useState(hashTreatmentId || "semaglutide");
  const treatment = useMemo(
    () => TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0],
    [treatmentId]
  );

  // Flow State
  const [screen, setScreen] = useState("CHECKOUT"); // CHECKOUT, ORDER_RECEIVED, PRIVACY, INTAKE_1, INTAKE_2, FINAL
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    sexAtBirth: "",
    height: "",
    weight: "",
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
  });

  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Active Questions evaluated dynamically from questionnaire.json
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

  const submitCheckout = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setScreen("ORDER_RECEIVED");
  };

  const submitIntake = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setScreen("FINAL");
  };

  const inputStyle = { width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.5rem", border: "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", fontSize: "0.9rem", outline: "none", backgroundColor: "#ffffff" };
  const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.35rem" };
  const boxStyle = { backgroundColor: "#ffffff", borderRadius: "1.5rem", padding: "1.75rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.03)", marginBottom: "1.25rem" };
  const buttonStyle = { width: "100%", padding: "1.15rem", borderRadius: "999px", backgroundColor: "var(--forest)", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.02em", border: "none", cursor: "pointer", transition: "all 0.2s" };

  const priceDisplay = formData.plan === "monthly" ? "$249.00 / month" : formData.plan === "quarterly" ? "$672.30 every 3 months" : "$249.00 one time";
  const totalDisplay = formData.plan === "quarterly" ? "$672.30" : "$249.00";

  return (
    <div className="sf">
      {/* Top Header */}
      <header className="sf-top">
        <div className="sf-top__inner">
          <a href="#/" className="sf-brand" aria-label="Pax home">
            <BrandMark variant="wordmark" />
          </a>
          <a href="#/portal" className="sf-top__login">
            Patient Center Sign In →
          </a>
        </div>
      </header>

      <main className="sf-main">
        {screen === "CHECKOUT" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start", marginTop: "2rem" }}>
            <div>
              {/* Contact Info */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ backgroundColor: "var(--forest)", color: "white", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700 }}>1</div>
                  Contact Information
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginLeft: "2.75rem", marginBottom: "1.5rem" }}>Used to create your demonstration patient record.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginLeft: "2.75rem" }}>
                  <div><label style={labelStyle}>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} /></div>
                  <div>
                    <label style={labelStyle}>Sex Assigned at Birth</label>
                    <select name="sexAtBirth" value={formData.sexAtBirth} onChange={handleChange} style={inputStyle}>
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
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
                  <div><label style={labelStyle}>Address Line 1</label><input type="text" name="address1" value={formData.address1} onChange={handleChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Address Line 2 (optional)</label><input type="text" name="address2" value={formData.address2} onChange={handleChange} style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>City</label><input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} /></div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <select name="state" value={formData.state} onChange={handleChange} style={inputStyle}>
                        <option value="">Select a state</option>
                        {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>ZIP Code</label><input type="text" name="zip" value={formData.zip} onChange={handleChange} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Country</label><input type="text" name="country" value={formData.country} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#f1f5f9" }} readOnly /></div>
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
                  <div><label style={labelStyle}>Card Number</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>Expiry (MM/YY)</label><input type="text" name="cardExp" value={formData.cardExp} onChange={handleChange} placeholder="MM/YY" style={inputStyle} /></div>
                    <div><label style={labelStyle}>CVC</label><input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="123" style={inputStyle} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Right Col */}
            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={{ ...boxStyle, boxShadow: "0 15px 35px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--forest)", marginBottom: "1.5rem" }}>Order Summary</h3>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: "4.5rem", height: "4.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                    <img src={treatment.image} alt={treatment.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700, color: "var(--forest)", margin: "0 0 0.25rem 0" }}>{treatment.name}</h4>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 0.5rem 0" }}>Monthly · Qty 1</p>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#e2e8f0", padding: "0.25rem 0.5rem", borderRadius: "999px", fontWeight: 600, color: "#475569" }}>Monthly Subscription</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--forest)" }}>$249.00</div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.75rem" }}>Purchase plan</h4>
                  {["monthly", "quarterly", "onetime"].map(p => (
                    <label key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "0.5rem", border: formData.plan === p ? "2px solid var(--forest)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", backgroundColor: formData.plan === p ? "#ffffff" : "transparent", cursor: "pointer", marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "var(--forest)" }}>
                        <input type="radio" name="plan" value={p} checked={formData.plan === p} onChange={handleChange} style={{ accentColor: "var(--forest)" }} />
                        {p === "monthly" ? "Monthly" : p === "quarterly" ? "Quarterly" : "One-time"}
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        {p === "monthly" ? "$249.00 / month" : p === "quarterly" ? "$672.30 every 3 months" : "$249.00 one time"}
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

                <button onClick={submitCheckout} disabled={isSubmitting} style={buttonStyle}>
                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "ORDER_RECEIVED" && (
          <div style={{ maxWidth: "600px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "3rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2rem", color: "var(--forest)", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Order Received</h2>
            <p style={{ color: "#475569", marginBottom: "2rem", lineHeight: "1.6" }}>Your demo order has been created. Continue to complete your required medical intake.</p>
            
            <div style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", borderRadius: "1rem", padding: "1.5rem", textAlign: "left", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Order Number</span><span style={{ fontWeight: 600 }}>DEMO-964022</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Product</span><span style={{ fontWeight: 600 }}>{treatment.name}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Total</span><span style={{ fontWeight: 600 }}>{totalDisplay}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Patient</span><span style={{ fontWeight: 600 }}>{formData.firstName || "Demo"} {formData.lastName || "Patient"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}><span style={{ color: "#64748b" }}>Payment method</span><span style={{ fontWeight: 600 }}>Card •••• {formData.cardNumber.slice(-4) || "3435"}</span></div>
            </div>

            <button onClick={() => setScreen("PRIVACY")} style={buttonStyle}>Continue to Medical Intake</button>
          </div>
        )}

        {screen === "PRIVACY" && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem" }}>
            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2.5rem", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
              <h2 style={{ fontSize: "1.75rem", color: "var(--forest)", marginBottom: "2rem", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "var(--forest)" }}>🛡️</span> Your Privacy is Our Priority
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
          <div style={{ maxWidth: "1100px", margin: "2rem auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", borderRadius: "1.5rem", padding: "1.75rem", display: "flex", gap: "1rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)" }}>
                <span style={{ fontSize: "1.5rem" }}>✨</span>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--forest)", margin: "0 0 0.25rem 0", fontSize: "1.1rem" }}>Welcome, {formData.firstName || "Cassandra"}.</p>
                  <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0, lineHeight: "1.5" }}>Complete your health assessment to finalize your order. <strong>Your order will continue to clinical review after all required steps are completed.</strong></p>
                </div>
              </div>

              <div style={{ ...boxStyle, marginBottom: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--terracotta)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>1</div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>Medical Screening Questionnaire</h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>Step 1 of 2</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {activeQuestions.map((q) => {
                    const val = questionnaireAnswers[q.id] || "";
                    const isDisqualified = q.disqualifier && String(val).toLowerCase() === String(q.disqualifier_value).toLowerCase();

                    return (
                      <div key={q.id} style={{ backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.25rem", borderRadius: "1rem", border: isDisqualified ? "1px solid #fca5a5" : "1px solid color-mix(in oklch, var(--forest) 8%, transparent)" }}>
                        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.75rem", lineHeight: "1.45" }}>
                          {q.question} {q.required && <span style={{ color: "var(--terracotta)" }}>*</span>}
                        </label>

                        {q.type === "boolean" || q.type === "select" ? (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                            {["Yes", "No"].map((opt) => {
                              const optVal = opt.toLowerCase();
                              const isSelected = val === optVal;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setQuestionnaireAnswers((prev) => ({ ...prev, [q.id]: optVal }))}
                                  style={{ height: "3rem", borderRadius: "0.75rem", border: isSelected ? "2px solid var(--forest)" : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)", backgroundColor: isSelected ? "var(--forest)" : "#ffffff", color: isSelected ? "#ffffff" : "var(--forest)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.15s ease" }}
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
                            onChange={(e) => setQuestionnaireAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            placeholder="Enter your response..."
                            style={inputStyle}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setScreen("INTAKE_2")} style={{ ...buttonStyle, width: "auto", padding: "1rem 3rem" }}>Review & Submit →</button>
                </div>
              </div>
            </div>

            {/* Right Column: Intake Summary */}
            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={boxStyle}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--forest)", margin: "0 0 1.25rem 0" }}>Intake Summary</h3>
                <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--forest)" }}>{treatment.name}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Personalized dosing, ongoing provider messaging & expedited cold-chain shipping.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#475569" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Medical Evaluation</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>503A Pharmacy Dispatch</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Expedited Cold-Chain Shipping</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Free</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "INTAKE_2" && (
          <div style={{ maxWidth: "1100px", margin: "2rem auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              <div style={boxStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>✓</div>
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>Medical Screening Questionnaire</h3>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>Step 1 Complete</p>
                    </div>
                  </div>
                  <button onClick={() => setScreen("INTAKE_1")} style={{ fontSize: "0.85rem", color: "var(--terracotta)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>Edit</button>
                </div>
              </div>

              <div style={{ ...boxStyle, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "1.75rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "var(--terracotta)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>2</div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>Telehealth Consent & Agreements</h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>Terms & Clinical Authorization</p>
                  </div>
                </div>

                <div style={{ padding: "1.75rem", paddingTop: 0, borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.5rem", borderRadius: "1rem", marginBottom: "1.5rem" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem", color: "var(--forest)", lineHeight: "1.5" }}>
                      <input type="checkbox" name="consent1" checked={formData.consent1} onChange={handleChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)" }} />
                      <span>I agree to the <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>, and acknowledge the <strong>Telehealth Informed Consent</strong> for clinical evaluation.</span>
                    </label>

                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem", color: "var(--forest)", lineHeight: "1.5" }}>
                      <input type="checkbox" name="consent2" checked={formData.consent2} onChange={handleChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)" }} />
                      <span>I authorize Pax's affiliated licensed medical providers to securely review my intake responses and medical records to evaluate prescription eligibility.</span>
                    </label>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center", margin: "0 0 1rem 0" }}>No payment is collected today. A physician must evaluate and approve your protocol first.</p>
                </div>
              </div>

            </div>

            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={boxStyle}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--forest)", margin: "0 0 1.25rem 0" }}>Intake Summary</h3>
                <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--forest)" }}>{treatment.name}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Personalized dosing, ongoing provider messaging & expedited cold-chain shipping.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#475569", marginBottom: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Medical Evaluation</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>503A Pharmacy Dispatch</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Expedited Cold-Chain Shipping</span><span style={{ fontWeight: 600, color: "var(--forest)" }}>Free</span></div>
                </div>

                <button
                  type="button"
                  onClick={submitIntake}
                  disabled={!formData.consent1 || !formData.consent2 || isSubmitting}
                  style={{ ...buttonStyle, opacity: (!formData.consent1 || !formData.consent2 || isSubmitting) ? 0.5 : 1, boxShadow: "0 10px 25px rgba(28, 58, 43, 0.2)" }}
                >
                  {isSubmitting ? "Submitting Clinical Intake..." : "Submit Medical Intake →"}
                </button>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", margin: "1.25rem 0 0 0", lineHeight: "1.4" }}>
                  By submitting this intake, your information is encrypted under HIPAA security protocols for licensed physician evaluation.
                </p>
              </div>
            </div>

          </div>
        )}

        {screen === "FINAL" && (
          <div style={{ maxWidth: "650px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "4rem 2rem", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", backgroundColor: "var(--forest)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--forest)", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Intake Submitted</h2>
            <p style={{ color: "#475569", marginBottom: "2rem", lineHeight: "1.6", fontSize: "1.1rem" }}>Thank you! Your clinical intake and medical history have been securely submitted.</p>
            <p style={{ color: "#64748b", margin: 0, lineHeight: "1.6", backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.5rem", borderRadius: "1rem" }}>A licensed U.S. physician will review your chart within 24 hours. We will contact you via email once your evaluation is complete and your protocol is approved.</p>
          </div>
        )}
      </main>
    </div>
  );
}
