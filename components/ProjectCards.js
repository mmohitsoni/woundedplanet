"use client";
import { useState, useEffect } from "react";

const FALLBACK = [
  { id: 1, title: "Rooftop Solar Portfolio", country: "Vietnam", flag: "🇻🇳", sector: "Solar C&I", tag: "energy", ticket_size: "EUR 2.5M", tenor: "5 years", irr: "12–14%", status: "Seeking Finance", impact: "4,200 tCO₂ avoided/yr", description: "A portfolio of 18 rooftop solar assets across manufacturing facilities in Ha Nam and Binh Duong provinces.", is_active: true },
  { id: 2, title: "E-Mobility Fleet Financing", country: "Indonesia", flag: "🇮🇩", sector: "E-Mobility", tag: "mobility", ticket_size: "USD 1.8M", tenor: "3 years", irr: "15–18%", status: "Due Diligence", impact: "850 tCO₂ avoided/yr", description: "Electric motorcycle fleet for last-mile delivery in Jakarta and Surabaya. Strong offtake agreements in place.", is_active: true },
  { id: 3, title: "BESS Utility Project", country: "India", flag: "🇮🇳", sector: "Battery Storage", tag: "bess", ticket_size: "USD 4.2M", tenor: "7 years", irr: "11–13%", status: "Seeking Finance", impact: "12,000 MWh stored/yr", description: "Grid-scale battery energy storage system supporting a 40MW solar farm in Rajasthan. 15-year PPA secured.", is_active: true },
];

const TAG_COLORS = {
  energy: { bg: "#d4edda", color: "#155724" },
  mobility: { bg: "#cce5ff", color: "#004085" },
  bess: { bg: "#fff3cd", color: "#856404" },
  water: { bg: "#d1ecf1", color: "#0c5460" },
};

const STATUS_COLORS = {
  "Seeking Finance": { bg: "#fff0cc", color: "#92600a" },
  "Due Diligence": { bg: "#e8f5e9", color: "#2e7d32" },
  "Pipeline": { bg: "#ede7f6", color: "#4527a0" },
  "Closed": { bg: "#f5f5f5", color: "#666" },
};

const FLOATS = ["float-1","float-2","float-3","float-4","float-5","float-6"];

function ContactModal({ project, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", type: "investor", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectTitle: project.title }),
      });
      if (res.ok) setSent(true);
      else setError("Failed to send. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    }
    setSending(false);
  }

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid rgba(26,61,43,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#1A3D2B", background: "#fff", boxSizing: "border-box" };
  const lbl = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 6 };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(26,61,43,0.65)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#F5F0E8", borderRadius: 20, padding: 36, maxWidth: 520, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999", lineHeight: 1 }}>✕</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.6rem", color: "#1A3D2B", marginBottom: 10 }}>Message Sent!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#666", lineHeight: 1.7 }}>We'll be in touch within 2–3 business days. Check your inbox for a confirmation.</p>
            <button onClick={onClose} style={{ marginTop: 24, background: "#1A3D2B", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: "10px 28px", borderRadius: 100, border: "none", cursor: "pointer" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ background: "#1A3D2B", borderRadius: 12, padding: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{project.flag}</span>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", color: "#F5F0E8" }}>{project.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(245,240,232,0.6)", marginTop: 2 }}>{project.country} · {project.sector} · {project.ticket_size}</div>
              </div>
            </div>

            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.5rem", color: "#1A3D2B", marginBottom: 4 }}>Express Interest</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#999", marginBottom: 22 }}>We'll connect you with the project team within 2–3 business days.</p>

            <form onSubmit={submit}>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                {[["investor", "💼 Investor"], ["developer", "⚡ Developer"]].map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setForm(f => ({ ...f, type: val }))} style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "2px solid", borderColor: form.type === val ? "#1A3D2B" : "rgba(26,61,43,0.15)", background: form.type === val ? "#1A3D2B" : "#fff", color: form.type === val ? "#F5F0E8" : "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>{label}</button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={lbl}>Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inp} placeholder="Your name" /></div>
                <div><label style={lbl}>Email *</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inp} placeholder="your@email.com" /></div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={lbl}>Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Your ticket size, timeline, or any questions..." />
              </div>

              {error && <p style={{ color: "red", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", marginBottom: 12 }}>{error}</p>}

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#aaa", marginBottom: 14 }}>
                Prefer email? <a href={`mailto:info@woundedplanet.com?subject=Interest in ${encodeURIComponent(project.title)}`} style={{ color: "#1A3D2B", fontWeight: 600 }}>info@woundedplanet.com</a>
              </p>

              <button type="submit" disabled={sending} style={{ width: "100%", background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", padding: "13px", borderRadius: 10, border: "none", cursor: "pointer", opacity: sending ? 0.7 : 1 }}>
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectCards({ limit }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => {
        const live = Array.isArray(data) && data.length > 0 ? data.filter(p => p.is_active) : [];
        setProjects(live.length > 0 ? live : FALLBACK);
      })
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const sectors = ["All", ...new Set(projects.map(p => p.sector))];
  const displayed = (filter === "All" ? projects : projects.filter(p => p.sector === filter)).slice(0, limit || 999);

  if (loading) return <div style={{ textAlign: "center", padding: 60, fontFamily: "'DM Sans', sans-serif", color: "#999", fontSize: "0.9rem" }}>Loading projects...</div>;

  return (
    <>
      {selected && <ContactModal project={selected} onClose={() => setSelected(null)} />}

      {!limit && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {sectors.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 100, border: "1.5px solid", borderColor: filter === f ? "#1A3D2B" : "rgba(26,61,43,0.2)", background: filter === f ? "#1A3D2B" : "transparent", color: filter === f ? "#F5F0E8" : "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" }}>{f}</button>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
        {displayed.map((p, i) => (
          <div key={p.id} className={FLOATS[i % 6]} onClick={() => setSelected(p)}
            style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 4px 24px rgba(26,61,43,0.08)", border: "1px solid rgba(26,61,43,0.06)", cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(26,61,43,0.16)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,61,43,0.08)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{p.flag}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "#666" }}>{p.country}</span>
              </div>
              <span style={{ ...(TAG_COLORS[p.tag] || TAG_COLORS.energy), fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100 }}>{p.sector}</span>
            </div>

            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", color: "#1A3D2B", marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#666", lineHeight: 1.6, marginBottom: 18 }}>{p.description}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18, padding: "14px 0", borderTop: "1px solid rgba(26,61,43,0.06)", borderBottom: "1px solid rgba(26,61,43,0.06)" }}>
              {[["Ticket", p.ticket_size], ["Tenor", p.tenor], ["IRR", p.irr]].map(([label, val]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem", color: "#1A3D2B" }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13 }}>🌱</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#2D5A3F", fontWeight: 500 }}>{p.impact}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ ...(STATUS_COLORS[p.status] || STATUS_COLORS.Pipeline), fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>{p.status}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#1A3D2B" }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
