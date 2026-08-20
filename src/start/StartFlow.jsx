import React, { useState, useMemo, useEffect } from "react";
import { BrandMark } from "../brand/index.js";
import { TREATMENTS, US_STATES, resolveTreatmentId } from "./startFlowData.js";
import questionnaireData from "./questionnaire.json";

export default function StartFlow() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const hashTreatmentId = (() => {
    if (typeof window === "undefined") return "";
    const raw = window.location.hash.replace(/^#\/?/, "");
    const query = raw.includes("?") ? raw.split("?")[1] : "";
    const params = new URLSearchParams(query);
    return resolveTreatmentId(params.get("treatment") || "");
  })();

  const [treatmentId, setTreatmentId] = useState(hashTreatmentId || "semaglutide");
  const treatment = useMemo(() => TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0], [treatmentId]);

  const [screen, setScreen] = useState("CHECKOUT"); // CHECKOUT, ORDER_RECEIVED, PRIVACY, INTAKE_1, INTAKE_2, FINAL
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    plan: "monthly"
  });

  // Intake Form State
  const [intakeData, setIntakeData] = useState({
    weight: "",
    heightFt: "",
    heightIn: "",
    allergies: [],
    consent1: false,
    consent2: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleIntakeChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "allergies") {
      setIntakeData(prev => ({
        ...prev,
        allergies: checked ? [...prev.allergies, value] : prev.allergies.filter(a => a !== value)
      }));
    } else {
      setIntakeData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const submitCheckout = async () => {
    setIsSubmitting(true);
    // Mock network delay
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setScreen("ORDER_RECEIVED");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitIntake = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setScreen("FINAL");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputStyle = { width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" };
  const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.35rem" };
  const boxStyle = { backgroundColor: "#ffffff", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", marginBottom: "1.5rem" };
  const buttonStyle = { width: "100%", padding: "1rem", borderRadius: "999px", backgroundColor: "var(--forest)", color: "#ffffff", fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.2s" };

  // Calculate pricing based on selection (Mocking)
  const priceDisplay = formData.plan === "monthly" ? "$249.00 / month" : formData.plan === "quarterly" ? "$672.30 every 3 months" : "$249.00 one time";
  const totalDisplay = formData.plan === "quarterly" ? "$672.30" : "$249.00";

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", padding: "1rem 2rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <BrandMark variant="wordmark" />
        </div>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
        
        {screen === "CHECKOUT" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
            <div>
              {/* Contact Info */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ backgroundColor: "var(--forest)", color: "white", width: "1.75rem", height: "1.75rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>1</span>
                  Contact Information
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginLeft: "2.5rem", marginBottom: "1.5rem" }}>Used to create your demonstration patient record.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginLeft: "2.5rem" }}>
                  <div><label style={labelStyle}>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleCheckoutChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleCheckoutChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleCheckoutChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleCheckoutChange} style={inputStyle} /></div>
                </div>
              </div>

              {/* Billing Address */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ backgroundColor: "var(--forest)", color: "white", width: "1.75rem", height: "1.75rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>2</span>
                  Billing Address
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginLeft: "2.5rem" }}>
                  <div><label style={labelStyle}>Address Line 1</label><input type="text" name="address1" value={formData.address1} onChange={handleCheckoutChange} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Address Line 2 (optional)</label><input type="text" name="address2" value={formData.address2} onChange={handleCheckoutChange} style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>City</label><input type="text" name="city" value={formData.city} onChange={handleCheckoutChange} style={inputStyle} /></div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <select name="state" value={formData.state} onChange={handleCheckoutChange} style={{ ...inputStyle, backgroundColor: "white" }}>
                        <option value="">Select a state</option>
                        {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>ZIP Code</label><input type="text" name="zip" value={formData.zip} onChange={handleCheckoutChange} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Country</label><input type="text" name="country" value={formData.country} onChange={handleCheckoutChange} style={{ ...inputStyle, backgroundColor: "#f1f5f9" }} readOnly /></div>
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--forest)", fontWeight: 600, marginTop: "0.5rem" }}>
                    <input type="checkbox" name="sameShipping" checked={formData.sameShipping} onChange={handleCheckoutChange} style={{ accentColor: "var(--forest)", width: "1.15rem", height: "1.15rem" }} />
                    Shipping address is the same as billing address
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div style={boxStyle}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ backgroundColor: "var(--forest)", color: "white", width: "1.75rem", height: "1.75rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>3</span>
                  Payment Method
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginLeft: "2.5rem" }}>
                  <div><label style={labelStyle}>Card Number</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleCheckoutChange} placeholder="0000 0000 0000 0000" style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><label style={labelStyle}>Expiry (MM/YY)</label><input type="text" name="cardExp" value={formData.cardExp} onChange={handleCheckoutChange} placeholder="MM/YY" style={inputStyle} /></div>
                    <div><label style={labelStyle}>CVC</label><input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleCheckoutChange} placeholder="123" style={inputStyle} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{ backgroundColor: "#fdfbf7", borderRadius: "1.5rem", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--forest)", marginBottom: "1.5rem" }}>Order Summary</h3>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
                  <div style={{ width: "4rem", height: "4rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    💊
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700, color: "var(--forest)", margin: 0 }}>{treatment.name}</h4>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.25rem 0" }}>Monthly · Qty 1</p>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#e2e8f0", padding: "0.25rem 0.5rem", borderRadius: "999px", fontWeight: 600, color: "#475569" }}>Monthly Subscription</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--forest)" }}>$249.00</div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--forest)", marginBottom: "0.75rem" }}>Purchase plan</h4>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "0.5rem", border: formData.plan === "monthly" ? "2px solid #0f766e" : "1px solid #e2e8f0", backgroundColor: formData.plan === "monthly" ? "#f0fdfa" : "white", cursor: "pointer", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "var(--forest)" }}>
                      <input type="radio" name="plan" value="monthly" checked={formData.plan === "monthly"} onChange={handleCheckoutChange} style={{ accentColor: "#0f766e" }} />
                      Monthly
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>$249.00 / month</span>
                  </label>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "0.5rem", border: formData.plan === "quarterly" ? "2px solid #0f766e" : "1px solid #e2e8f0", backgroundColor: formData.plan === "quarterly" ? "#f0fdfa" : "white", cursor: "pointer", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "var(--forest)" }}>
                      <input type="radio" name="plan" value="quarterly" checked={formData.plan === "quarterly"} onChange={handleCheckoutChange} style={{ accentColor: "#0f766e" }} />
                      Quarterly
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>$672.30 every 3 months</span>
                  </label>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "0.5rem", border: formData.plan === "onetime" ? "2px solid #0f766e" : "1px solid #e2e8f0", backgroundColor: formData.plan === "onetime" ? "#f0fdfa" : "white", cursor: "pointer", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "var(--forest)" }}>
                      <input type="radio" name="plan" value="onetime" checked={formData.plan === "onetime"} onChange={handleCheckoutChange} style={{ accentColor: "#0f766e" }} />
                      One-time
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>$249.00 one time</span>
                  </label>
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
          <div style={{ maxWidth: "550px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "3rem 2.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2rem", color: "var(--forest)", marginBottom: "1rem", fontFamily: "serif" }}>Order Received</h2>
            <p style={{ color: "#475569", marginBottom: "2rem", lineHeight: "1.6" }}>Your demo order has been created. Continue to complete your required medical intake.</p>
            
            <div style={{ backgroundColor: "#fdfbf7", borderRadius: "1.5rem", padding: "1.5rem", border: "1px solid #e2e8f0", textAlign: "left", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.95rem" }}><span style={{ color: "#64748b" }}>Order Number</span><span style={{ fontWeight: 600 }}>DEMO-964022</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.95rem" }}><span style={{ color: "#64748b" }}>Product</span><span style={{ fontWeight: 600 }}>{treatment.name}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.95rem" }}><span style={{ color: "#64748b" }}>Total</span><span style={{ fontWeight: 600 }}>{totalDisplay}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.95rem" }}><span style={{ color: "#64748b" }}>Patient</span><span style={{ fontWeight: 600 }}>{formData.firstName || "Demo"} {formData.lastName || "Patient"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}><span style={{ color: "#64748b" }}>Payment method</span><span style={{ fontWeight: 600 }}>Card •••• {formData.cardNumber.slice(-4) || "3435"}</span></div>
            </div>

            <button onClick={() => setScreen("PRIVACY")} style={{ ...buttonStyle, padding: "1.25rem", fontSize: "1rem" }}>Continue to Medical Intake</button>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "1rem" }}>Continuing to your medical intake automatically...</p>
          </div>
        )}

        {screen === "PRIVACY" && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "1rem", backdropFilter: "blur(4px)" }}>
            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2.5rem", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
              <h2 style={{ fontSize: "1.75rem", color: "var(--forest)", marginBottom: "2rem", fontFamily: "serif", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "#0f766e" }}>🛡️</span> Your Privacy is Our Priority
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>🔒</span> Your Information Stays Private</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>We never sell your personal or medical information to third parties. Your data is yours.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>🏛️</span> No Government Sharing</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>We do not share your information with government agencies without a valid legal requirement.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>🛡️</span> Insurance Independence</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>Your information is never shared with insurance companies. Your healthcare decisions remain private.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>🔐</span> Protected & Encrypted</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>Health information would be handled under strict privacy safeguards with bank-level encryption.</p></div>
                <div><h4 style={{ fontWeight: 700, color: "var(--forest)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>👤</span> You're in Control</h4><p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>You can log back into your account at any time to review or delete your information.</p></div>
              </div>
              <button onClick={() => setScreen("INTAKE_1")} style={{ ...buttonStyle, backgroundColor: "#0f172a" }}>I Understand, Continue</button>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", marginTop: "1rem" }}>Demonstration content for a fictional brand. No real data is collected.</p>
            </div>
          </div>
        )}

        {screen === "INTAKE_1" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ backgroundColor: "#e0f2fe", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2.5rem", display: "flex", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>✨</span>
              <div>
                <p style={{ fontWeight: 700, color: "#0369a1", margin: "0 0 0.25rem 0" }}>Welcome, {formData.firstName || "Cassandra"}.</p>
                <p style={{ fontSize: "0.9rem", color: "#0c4a6e", margin: 0 }}>Complete your health assessment to finalize your order. <strong>Your order will continue to clinical review after all required steps are completed.</strong></p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "2px solid var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--forest)" }}>1</div>
                <div style={{ width: "4rem", height: "2px", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#94a3b8" }}>2</div>
                <div style={{ width: "4rem", height: "2px", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#94a3b8" }}>3</div>
              </div>
              <span style={{ display: "inline-block", backgroundColor: "#ccfbf1", color: "#0f766e", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1rem" }}>STEP 1 OF 3</span>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "serif", color: "var(--forest)", margin: 0 }}>Health History</h2>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2.5rem", border: "1px solid #e2e8f0" }}>
              <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "0.95rem" }}>Accurate answers help your provider confirm this program is appropriate for you.</p>
              
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", marginBottom: "1.5rem" }}>Vital statistics</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div>
                    <label style={{ ...labelStyle, display: "flex", gap: "0.25rem" }}>Weight (lbs) <span style={{ color: "#ef4444" }}>*</span></label>
                    <input type="number" name="weight" value={intakeData.weight} onChange={handleIntakeChange} placeholder="Enter weight in lbs" style={{ ...inputStyle, borderRadius: "999px", padding: "0 1.5rem" }} />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, display: "flex", gap: "0.25rem" }}>Height (inches) <span style={{ color: "#ef4444" }}>*</span></label>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <input type="number" name="heightFt" value={intakeData.heightFt} onChange={handleIntakeChange} style={{ ...inputStyle, borderRadius: "999px", textAlign: "center" }} /> ft
                      <input type="number" name="heightIn" value={intakeData.heightIn} onChange={handleIntakeChange} style={{ ...inputStyle, borderRadius: "999px", textAlign: "center" }} /> in
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.5rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", marginBottom: "1.5rem", display: "flex", gap: "0.25rem" }}>
                  Please select all allergies to medications, foods, latex, or medical materials <span style={{ color: "#ef4444" }}>*</span>
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                  {["None", "Gelatin", "Iodine", "Latex", "Penicillin", "Sulfa (Bactrim)", "Other (please specify)"].map(alg => (
                    <label key={alg} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem", color: "#475569" }}>
                      <input type="checkbox" name="allergies" value={alg} checked={intakeData.allergies.includes(alg)} onChange={handleIntakeChange} style={{ accentColor: "var(--forest)", width: "1.25rem", height: "1.25rem" }} />
                      {alg}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setScreen("INTAKE_2")} style={{ ...buttonStyle, width: "auto", padding: "1rem 3rem" }}>Continue</button>
              </div>
            </div>
          </div>
        )}

        {screen === "INTAKE_2" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white" }}>✓</div>
                <div style={{ width: "4rem", height: "2px", backgroundColor: "#0f766e" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "2px solid var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--forest)" }}>2</div>
                <div style={{ width: "4rem", height: "2px", backgroundColor: "#e2e8f0" }}></div>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#94a3b8" }}>3</div>
              </div>
              <span style={{ display: "inline-block", backgroundColor: "#ccfbf1", color: "#0f766e", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1rem" }}>STEP 2 OF 3</span>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "serif", color: "var(--forest)", margin: 0 }}>Review & Submit</h2>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>From your checkout</p>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "serif", color: "var(--forest)", marginBottom: "0.5rem" }}>Your information</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2rem" }}>Carried over from checkout so you do not have to re-enter it. Order DEMO-964022.</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>Name</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.firstName || "Cassandra"} {formData.lastName || "Carey"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>Email</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.email || "patient@example.com"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>Phone</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.phone || "(164) 250-2857"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>State</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.state || "NE"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>Address</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.address1 || "631 Milton Drive"}, {formData.city} {formData.zip}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: "0 0 0.25rem 0" }}>Plan</p>
                  <p style={{ margin: 0, fontWeight: 500, color: "var(--forest)", fontSize: "0.95rem" }}>{formData.plan === "monthly" ? "Monthly Subscription" : formData.plan === "quarterly" ? "Quarterly Plan" : "One-time Purchase"}</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Ordering</p>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--forest)", marginBottom: "0.5rem" }}>{treatment.name}</p>
              <h3 style={{ fontSize: "1.75rem", fontFamily: "serif", color: "var(--forest)", marginBottom: "2rem" }}>Consent & signature</h3>

              <div style={{ backgroundColor: "#f9f8f6", borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.95rem", color: "var(--forest)" }}>
                  <input type="checkbox" name="consent1" checked={intakeData.consent1} onChange={handleIntakeChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)" }} />
                  <span>I agree to the Terms of Service, Privacy Policy, and Telehealth Informed Consent.</span>
                </label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.95rem", color: "var(--forest)" }}>
                  <input type="checkbox" name="consent2" checked={intakeData.consent2} onChange={handleIntakeChange} style={{ marginTop: "0.2rem", width: "1.25rem", height: "1.25rem", accentColor: "var(--forest)" }} />
                  <span>I authorize my medical records to be shared securely with affiliated clinicians for evaluation.</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={submitIntake} disabled={!intakeData.consent1 || !intakeData.consent2 || isSubmitting} style={{ ...buttonStyle, width: "auto", padding: "1rem 3rem", opacity: (!intakeData.consent1 || !intakeData.consent2 || isSubmitting) ? 0.5 : 1 }}>
                  {isSubmitting ? "Submitting..." : "Submit Medical Intake"}
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "FINAL" && (
          <div style={{ maxWidth: "600px", margin: "4rem auto", backgroundColor: "white", borderRadius: "1.5rem", padding: "4rem 2rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", backgroundColor: "#ecfdf5", color: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem auto" }}>✓</div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--forest)", marginBottom: "1rem", fontFamily: "serif" }}>Intake Submitted</h2>
            <p style={{ color: "#475569", marginBottom: "2rem", lineHeight: "1.6", fontSize: "1.1rem" }}>Thank you! Your clinical intake and medical history have been securely submitted.</p>
            <p style={{ color: "#64748b", margin: 0, lineHeight: "1.6", backgroundColor: "#f8fafc", padding: "1.5rem", borderRadius: "1rem" }}>
              A licensed physician will review your chart within 24 hours. We will contact you via email once your evaluation is complete and your protocol is approved.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
