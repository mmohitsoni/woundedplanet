"use client";
import { useState } from "react";

export default function ImpactCalculator() {
  const [amount, setAmount] = useState(100000);
  const [sector, setSector] = useState("solar");
  const [years, setYears] = useState(5);

  const FACTORS = {
    solar: { co2: 0.042, mwh: 0.18, homes: 0.0012, jobs: 0.000008, label: "Solar C&I" },
    mobility: { co2: 0.031, mwh: 0.09, homes: 0, jobs: 0.000015, label: "E-Mobility", vehicles: 0.0005 },
    bess: { co2: 0.028, mwh: 0.25, homes: 0.0008, jobs: 0.000006, label: "Battery Storage" },
    rural: { co2: 0.038, mwh: 0.14, homes: 0.003, jobs: 0.000012, label: "Rural Solar" },
  };

  const f = FACTORS[sector];
  const co2 = Math.round(amount * f.co2 * years);
  const mwh = Math.round(amount * f.mwh * years);
  const homes = Math.round(amount * f.homes * years);
  const jobs = Math.round(amount * f.jobs * years);
  const vehicles = f.vehicles ? Math.round(amount * f.vehicles * years) : null;

  const metrics = [
    { icon: "🌍", label: "CO₂ Avoided", value: co2.toLocaleString(), unit: "tonnes" },
    { icon: "⚡", label: "Clean Energy", value: mwh.toLocaleString(), unit: "MWh" },
    ...(homes > 0 ? [{ icon: "🏠", label: "Homes Powered", value: homes.toLocaleString(), unit: "households" }] : []),
    ...(vehicles ? [{ icon: "🛵", label: "EV Vehicles", value: vehicles.toLocaleString(), unit: "financed" }] : []),
    { icon: "👷", label: "Jobs Supported", value: jobs > 0 ? jobs.toLocaleString() : "<1", unit: "green jobs" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 24, padding: 48, boxShadow: "0 8px 48px rgba(26,61,43,0.1)", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "2rem", color: "#1A3D2B", marginBottom: 8 }}>Calculate Your Impact</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#666" }}>See what your investment does for the planet</p>
      </div>

      {/* Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 36 }}>
        {/* Investment Amount */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 8 }}>Investment (USD)</label>
          <input type="range" min={10000} max={5000000} step={10000} value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#1A3D2B", marginBottom: 6 }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: "#1A3D2B" }}>
            ${amount >= 1000000 ? (amount / 1000000).toFixed(1) + "M" : (amount / 1000).toFixed(0) + "K"}
          </div>
        </div>

        {/* Sector */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 8 }}>Sector</label>
          <select value={sector} onChange={e => setSector(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid rgba(26,61,43,0.2)",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1A3D2B",
            background: "#fff", cursor: "pointer",
          }}>
            {Object.entries(FACTORS).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        {/* Tenor */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 8 }}>Tenor (Years)</label>
          <input type="range" min={1} max={10} step={1} value={years}
            onChange={e => setYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#1A3D2B", marginBottom: 6 }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: "#1A3D2B" }}>{years} {years === 1 ? "year" : "years"}</div>
        </div>
      </div>

      {/* Results */}
      <div style={{ background: "#F5F0E8", borderRadius: 16, padding: 28 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 20 }}>Estimated Impact Over {years} Year{years > 1 ? "s" : ""}</p>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length}, 1fr)`, gap: 16 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.6rem", color: "#1A3D2B", lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#666", marginTop: 4 }}>{m.unit}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#aaa", marginTop: 16, textAlign: "center" }}>
        * Estimates based on sector averages. Actual impact varies by project. For detailed analysis, contact us.
      </p>
    </div>
  );
}
