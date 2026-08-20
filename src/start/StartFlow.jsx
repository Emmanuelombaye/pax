import React, { useState, useMemo } from "react";
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
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    consent1: false,
    consent2: false,
  });

  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [blurred, setBlurred] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const treatment = useMemo(
    () => TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0],
    [treatmentId]
  );

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? e.target.checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (field) => {
    setBlurred((prev) => ({ ...prev, [field]: true }));
  };

  // Validators
  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val) => String(val || "").replace(/\D/g, "").length >= 10;
  const isValidDob = (val) => {
    if (!val) return false;
    const birthDate = new Date(val);
    if (isNaN(birthDate.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18 && age <= 120;
  };
  const isValidState = (val) => US_STATES.some((s) => s.value === val);
  const isValidZip = (val) => /^\d{5}(-\d{4})?$/.test(String(val || "").trim());

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

  const isStep1Valid = useMemo(() => {
    const questionsToValidate = activeQuestions.filter(
      (q) => !["gender", "weight", "height", "dob"].includes(q.id)
    );
    const allAnswered = questionsToValidate.every((q) => {
      if (!q.required) return true;
      const ans = questionnaireAnswers[q.id];
      return ans && String(ans).trim().length > 0;
    });
    return allAnswered;
  }, [activeQuestions, questionnaireAnswers]);

  const isStep2Valid = useMemo(() => {
    return Boolean(
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.dob &&
      formData.sexAtBirth &&
      formData.height &&
      formData.weight &&
      isValidEmail(formData.email) &&
      isValidPhone(formData.phone) &&
      isValidDob(formData.dob)
    );
  }, [formData]);

  const isStep3Valid = useMemo(() => {
    return Boolean(
      formData.address1 &&
      formData.city &&
      formData.state &&
      formData.zip &&
      isValidState(formData.state) &&
      isValidZip(formData.zip)
    );
  }, [formData]);

  const isStep4Valid = useMemo(() => {
    return Boolean(
      formData.cardNumber && formData.cardNumber.length >= 14 &&
      formData.cardExp && formData.cardExp.length === 5 &&
      formData.cardCvc && formData.cardCvc.length >= 3
    );
  }, [formData]);

  const isStep5Valid = useMemo(() => {
    return Boolean(formData.consent1 && formData.consent2);
  }, [formData]);

  const handleNextStep = (stepNumber) => {
    if (stepNumber === 1 && isStep1Valid) {
      if (!completedSteps.includes(1)) setCompletedSteps([...completedSteps, 1]);
      setActiveStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (stepNumber === 2 && isStep2Valid) {
      if (!completedSteps.includes(2)) setCompletedSteps([...completedSteps, 2]);
      setActiveStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (stepNumber === 3 && isStep3Valid) {
      if (!completedSteps.includes(3)) setCompletedSteps([...completedSteps, 3]);
      setActiveStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (stepNumber === 4 && isStep4Valid) {
      if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]);
      setActiveStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEditStep = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrorMsg("");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Intake submission error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

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

      {/* Success Modal */}
      {isSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "var(--sand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2.5rem",
              borderRadius: "2rem",
              maxWidth: "540px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "4.5rem",
                height: "4.5rem",
                backgroundColor: "var(--forest)",
                color: "var(--sand)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "2rem",
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--forest)",
                marginBottom: "0.75rem",
              }}
            >
              Medical Intake Received
            </h2>
            <p
              style={{
                color: "color-mix(in oklch, var(--forest) 75%, transparent)",
                marginBottom: "2rem",
                lineHeight: "1.6",
                fontSize: "0.95rem",
              }}
            >
              Thank you for completing your clinical intake for <strong>{treatment.name}</strong>. A licensed U.S. physician will review your medical chart within 24 hours. You will receive an email notification once your protocol is authorized.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
              <a
                href="#/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "3.5rem",
                  borderRadius: "999px",
                  backgroundColor: "var(--forest)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px rgba(28, 58, 43, 0.2)",
                }}
              >
                Return to Home
              </a>
              <a
                href="#/portal"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "3.5rem",
                  borderRadius: "999px",
                  backgroundColor: "transparent",
                  color: "var(--forest)",
                  border: "1px solid color-mix(in oklch, var(--forest) 20%, transparent)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                Access Patient Center
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Intake Container */}
      <main className="sf-main" style={{ display: isSuccess ? "none" : "block", maxWidth: "1160px" }}>
        
        {/* Treatment Banner & Switcher */}
        <section style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--terracotta)", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
                Clinical Intake · Telehealth Evaluation
              </p>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", color: "var(--forest)", margin: 0 }}>
                {treatment.name}
              </h1>
            </div>

            {/* Quick Treatment Selector */}
            <div style={{ display: "flex", gap: "0.5rem", backgroundColor: "color-mix(in oklch, var(--dune) 40%, var(--sand))", padding: "0.35rem", borderRadius: "999px", border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)" }}>
              {TREATMENTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTreatmentId(t.id)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "999px",
                    border: "none",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: treatmentId === t.id ? "var(--forest)" : "transparent",
                    color: treatmentId === t.id ? "#ffffff" : "var(--forest)",
                  }}
                >
                  {t.med}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "start" }}>
          
          {/* Left Column: 4-Step Clinical Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* STEP 1: Medical Screening Questionnaire */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div
                onClick={() => handleEditStep(1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: completedSteps.includes(1) ? "var(--forest)" : activeStep === 1 ? "var(--terracotta)" : "#e2e8f0",
                      color: completedSteps.includes(1) || activeStep === 1 ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    {completedSteps.includes(1) ? "✓" : "1"}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                      Medical Screening Questionnaire
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>
                      17 Clinical evaluation questions
                    </p>
                  </div>
                </div>
                {completedSteps.includes(1) && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--terracotta)", textTransform: "uppercase" }}>
                    Edit
                  </span>
                )}
              </div>

              {activeStep === 1 && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1.25rem", lineHeight: "1.5" }}>
                    Please answer the following medical history questions accurately for physician eligibility evaluation.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {activeQuestions
                      .filter((q) => !["gender", "weight", "height", "dob"].includes(q.id))
                      .map((q) => {
                        const val = questionnaireAnswers[q.id] || "";
                        const isDisqualified =
                          q.disqualifier &&
                          String(val).toLowerCase() === String(q.disqualifier_value).toLowerCase();

                        return (
                          <div
                            key={q.id}
                            style={{
                              backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))",
                              padding: "1.15rem",
                              borderRadius: "1rem",
                              border: isDisqualified
                                ? "1px solid #fca5a5"
                                : "1px solid color-mix(in oklch, var(--forest) 8%, transparent)",
                            }}
                          >
                            <label
                              style={{
                                display: "block",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                color: "var(--forest)",
                                marginBottom: "0.75rem",
                                lineHeight: "1.45",
                              }}
                            >
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
                                      onClick={() =>
                                        setQuestionnaireAnswers((prev) => ({
                                          ...prev,
                                          [q.id]: optVal,
                                        }))
                                      }
                                      style={{
                                        height: "2.75rem",
                                        borderRadius: "0.75rem",
                                        border: isSelected
                                          ? "2px solid var(--forest)"
                                          : "1px solid color-mix(in oklch, var(--forest) 15%, transparent)",
                                        backgroundColor: isSelected ? "var(--forest)" : "#ffffff",
                                        color: isSelected ? "#ffffff" : "var(--forest)",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                      }}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <textarea
                                value={val}
                                onChange={(e) =>
                                  setQuestionnaireAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: e.target.value,
                                  }))
                                }
                                placeholder="Enter your response (or type 'none')..."
                                rows={2}
                                style={{
                                  width: "100%",
                                  padding: "0.75rem 0.85rem",
                                  borderRadius: "0.75rem",
                                  border: "1px solid color-mix(in oklch, var(--forest) 15%, transparent)",
                                  backgroundColor: "#ffffff",
                                  font: "inherit",
                                  fontSize: "0.85rem",
                                  resize: "vertical",
                                  outline: "none",
                                }}
                              />
                            )}

                            {isDisqualified && (
                              <div
                                style={{
                                  marginTop: "0.75rem",
                                  padding: "0.75rem 1rem",
                                  backgroundColor: "#fef2f2",
                                  border: "1px solid #fecaca",
                                  borderRadius: "0.75rem",
                                  fontSize: "0.8rem",
                                  color: "#991b1b",
                                  lineHeight: "1.45",
                                }}
                              >
                                <strong>Physician Review Alert:</strong> Based on this response, an individualized clinical review will be required before protocol approval.
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNextStep(1)}
                    disabled={!isStep1Valid}
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "3.25rem",
                      borderRadius: "999px",
                      backgroundColor: "var(--forest)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: isStep1Valid ? "pointer" : "not-allowed",
                      opacity: isStep1Valid ? 1 : 0.45,
                      boxShadow: "0 8px 20px rgba(28, 58, 43, 0.15)",
                    }}
                  >
                    Continue to Patient Information →
                  </button>
                </div>
              )}
            </div>

            {/* STEP 2: Patient Information */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div
                onClick={() => completedSteps.includes(1) && handleEditStep(2)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: completedSteps.includes(1) ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: completedSteps.includes(2) ? "var(--forest)" : activeStep === 2 ? "var(--terracotta)" : "#e2e8f0",
                      color: completedSteps.includes(2) || activeStep === 2 ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    {completedSteps.includes(2) ? "✓" : "2"}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                      Patient Information
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>
                      Identity & Demographics
                    </p>
                  </div>
                </div>
                {completedSteps.includes(2) && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--terracotta)", textTransform: "uppercase" }}>
                    Edit
                  </span>
                )}
              </div>

              {activeStep === 2 && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("firstName")}
                        placeholder="John"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("lastName")}
                        placeholder="Doe"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="john@example.com"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        placeholder="(555) 000-0000"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Date of Birth (18+) *</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        onBlur={() => handleBlur("dob")}
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Biological Sex *</label>
                      <select
                        name="sexAtBirth"
                        value={formData.sexAtBirth}
                        onChange={handleChange}
                        onBlur={() => handleBlur("sexAtBirth")}
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem", backgroundColor: "#ffffff" }}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Height *</label>
                      <input
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        onBlur={() => handleBlur("height")}
                        placeholder="e.g. 5ft 10in"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Weight (lbs) *</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        onBlur={() => handleBlur("weight")}
                        placeholder="e.g. 185"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNextStep(2)}
                    disabled={!isStep2Valid}
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "3.25rem",
                      borderRadius: "999px",
                      backgroundColor: "var(--forest)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: isStep2Valid ? "pointer" : "not-allowed",
                      opacity: isStep2Valid ? 1 : 0.45,
                      boxShadow: "0 8px 20px rgba(28, 58, 43, 0.15)",
                    }}
                  >
                    Continue to Shipping Address →
                  </button>
                </div>
              )}
            </div>

            {/* STEP 3: Shipping Address */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div
                onClick={() => completedSteps.includes(2) && handleEditStep(3)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: completedSteps.includes(2) ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: completedSteps.includes(3) ? "var(--forest)" : activeStep === 3 ? "var(--terracotta)" : "#e2e8f0",
                      color: completedSteps.includes(3) || activeStep === 3 ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    {completedSteps.includes(3) ? "✓" : "3"}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                      Shipping Address
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>
                      Prescription Delivery Location
                    </p>
                  </div>
                </div>
                {completedSteps.includes(3) && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--terracotta)", textTransform: "uppercase" }}>
                    Edit
                  </span>
                )}
              </div>

              {activeStep === 3 && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Street Address *</label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      onBlur={() => handleBlur("address1")}
                      placeholder="123 Main Street"
                      style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Apt / Suite (Optional)</label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      placeholder="Apt 4B"
                      style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={() => handleBlur("city")}
                        placeholder="City"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={() => handleBlur("state")}
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem", backgroundColor: "#ffffff" }}
                      >
                        <option value="">State</option>
                        {US_STATES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>ZIP Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        onBlur={() => handleBlur("zip")}
                        placeholder="12345"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNextStep(3)}
                    disabled={!isStep3Valid}
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "3.25rem",
                      borderRadius: "999px",
                      backgroundColor: "var(--forest)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: isStep3Valid ? "pointer" : "not-allowed",
                      opacity: isStep3Valid ? 1 : 0.45,
                      boxShadow: "0 8px 20px rgba(28, 58, 43, 0.15)",
                    }}
                  >
                    Continue to Agreements →
                  </button>
                </div>
              )}
            </div>

            {/* STEP 4: Payment */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                marginBottom: "1.25rem"
              }}
            >
              <div
                onClick={() => {
                  if (completedSteps.includes(3) || isStep3Valid) {
                    setActiveStep(4);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: completedSteps.includes(3) || isStep3Valid ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: completedSteps.includes(4) ? "var(--forest)" : activeStep === 4 ? "var(--terracotta)" : "#e2e8f0",
                      color: completedSteps.includes(4) || activeStep === 4 ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    4
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                      Payment Information
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>
                      Secure Checkout
                    </p>
                  </div>
                </div>
              </div>

              {activeStep === 4 && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>Expiry *</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#475569", marginBottom: "0.35rem" }}>CVC *</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNextStep(4)}
                    disabled={!isStep4Valid}
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "3.25rem",
                      borderRadius: "999px",
                      backgroundColor: "var(--forest)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: isStep4Valid ? "pointer" : "not-allowed",
                      opacity: isStep4Valid ? 1 : 0.45,
                      boxShadow: "0 8px 20px rgba(28, 58, 43, 0.15)",
                    }}
                  >
                    Continue to Agreements →
                  </button>
                </div>
              )}
            </div>

            {/* STEP 5: Agreements & Consent */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div
                onClick={() => completedSteps.includes(3) && handleEditStep(4)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: completedSteps.includes(3) ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: completedSteps.includes(5) ? "var(--forest)" : activeStep === 5 ? "var(--terracotta)" : "#e2e8f0",
                      color: completedSteps.includes(5) || activeStep === 5 ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    5
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                      Telehealth Consent & Agreements
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.15rem 0 0 0" }}>
                      Terms & Clinical Authorization
                    </p>
                  </div>
                </div>
              </div>

              {activeStep === 5 && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "color-mix(in oklch, var(--dune) 20%, var(--sand))", padding: "1.25rem", borderRadius: "1rem", marginBottom: "1.5rem" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.85rem", color: "var(--forest)", lineHeight: "1.5" }}>
                      <input
                        type="checkbox"
                        name="consent1"
                        checked={formData.consent1}
                        onChange={handleChange}
                        style={{ marginTop: "0.2rem", width: "1.15rem", height: "1.15rem", accentColor: "var(--forest)" }}
                      />
                      <span>
                        I agree to the <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>, and acknowledge the <strong>Telehealth Informed Consent</strong> for clinical evaluation.
                      </span>
                    </label>

                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.85rem", color: "var(--forest)", lineHeight: "1.5" }}>
                      <input
                        type="checkbox"
                        name="consent2"
                        checked={formData.consent2}
                        onChange={handleChange}
                        style={{ marginTop: "0.2rem", width: "1.15rem", height: "1.15rem", accentColor: "var(--forest)" }}
                      />
                      <span>
                        I authorize Pax's affiliated licensed medical providers to securely review my intake responses and medical records to evaluate prescription eligibility.
                      </span>
                    </label>
                  </div>

                  <p style={{ fontSize: "0.75rem", color: "#64748b", textAlign: "center", margin: "0 0 1rem 0" }}>
                    No payment is collected today. A physician must evaluate and approve your protocol first.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Submit Box */}
          <div style={{ position: "sticky", top: "5rem" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.75rem",
                padding: "2rem",
                border: "1px solid color-mix(in oklch, var(--forest) 10%, transparent)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--forest)", margin: "0 0 1.25rem 0" }}>
                Intake Summary
              </h3>

              <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--forest)" }}>{treatment.name}</span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{treatment.pathway}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                  Personalized dosing, ongoing provider messaging & expedited cold-chain shipping.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.85rem", color: "#475569", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Medical Evaluation</span>
                  <span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>503A Pharmacy Dispatch</span>
                  <span style={{ fontWeight: 600, color: "var(--forest)" }}>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Expedited Cold-Chain Shipping</span>
                  <span style={{ fontWeight: 600, color: "var(--forest)" }}>Free</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={activeStep !== 5 || !isStep5Valid || isSubmitting}
                style={{
                  width: "100%",
                  height: "3.75rem",
                  borderRadius: "999px",
                  backgroundColor: "var(--forest)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: activeStep === 5 && isStep5Valid && !isSubmitting ? "pointer" : "not-allowed",
                  opacity: activeStep === 5 && isStep5Valid && !isSubmitting ? 1 : 0.4,
                  boxShadow: "0 10px 25px rgba(28, 58, 43, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                {isSubmitting ? "Submitting Clinical Intake..." : "Submit Medical Intake →"}
              </button>

              {errorMsg && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#fef2f2", color: "#dc2626", borderRadius: "0.75rem", fontSize: "0.8rem", textAlign: "center", fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              <p style={{ fontSize: "0.72rem", color: "#94a3b8", textAlign: "center", margin: "1.25rem 0 0 0", lineHeight: "1.4" }}>
                By submitting this intake, your information is encrypted under HIPAA security protocols for licensed physician evaluation.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
