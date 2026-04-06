"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "investor", country: "", amount: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid rgba(26,61,43,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1A3D2B", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 8 };

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>GET IN TOUCH</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3rem", color: "#1A3D2B", marginBottom: 16 }}>Submit a Project or Enquiry</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666", lineHeight: 1.7 }}>
            Whether you're a project developer looking for financing, or an investor looking for deal flow — start here.
          </p>
        </div>

        {submitted ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 8px 40px rgba(26,61,43,0.08)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "2rem", color: "#1A3D2B", marginBottom: 12 }}>Thank you!</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#666", lineHeight: 1.7 }}>We've received your enquiry and will be in touch within 2–3 business days.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 8px 40px rgba(26,61,43,0.08)" }}>
            {/* Type toggle */}
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>I am a</label>
              <div style={{ display: "flex", gap: 12 }}>
                {[["investor", "💼 Investor / Lender"], ["developer", "⚡ Project Developer"]].map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setForm(f => ({ ...f, type: val }))} style={{
                    flex: 1, padding: "12px 20px", borderRadius: 10,
                    border: "2px solid", borderColor: form.type === val ? "#1A3D2B" : "rgba(26,61,43,0.15)",
                    background: form.type === val ? "#1A3D2B" : "#fff",
                    color: form.type === val ? "#F5F0E8" : "#1A3D2B",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div><label style={labelStyle}>Full Name</label><input name="name" required value={form.name} onChange={handle} style={inputStyle} placeholder="Your name" /></div>
              <div><label style={labelStyle}>Email</label><input name="email" type="email" required value={form.email} onChange={handle} style={inputStyle} placeholder="your@email.com" /></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div><label style={labelStyle}>Country / Region</label><input name="country" value={form.country} onChange={handle} style={inputStyle} placeholder="e.g. Indonesia, Vietnam" /></div>
              <div><label style={labelStyle}>{form.type === "investor" ? "Investment Range (USD)" : "Financing Need (USD)"}</label>
                <select name="amount" value={form.amount} onChange={handle} style={inputStyle}>
                  <option value="">Select range</option>
                  <option>$100K – $500K</option><option>$500K – $2M</option>
                  <option>$2M – $10M</option><option>$10M+</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>{form.type === "investor" ? "What sectors interest you?" : "Tell us about your project"}</label>
              <textarea name="message" value={form.message} onChange={handle} rows={5} style={{ ...inputStyle, resize: "vertical" }} placeholder={form.type === "investor" ? "e.g. Solar C&I in Southeast Asia, E-mobility, Battery storage..." : "Project type, location, stage, capacity, offtake structure..."} />
            </div>

            <button type="submit" style={{ width: "100%", background: "#1A3D2B", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", padding: "16px", borderRadius: 12, border: "none", cursor: "pointer" }}>
              Submit Enquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
