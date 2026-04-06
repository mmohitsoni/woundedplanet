import ImpactCalculator from "@/components/ImpactCalculator";

export const metadata = { title: "Impact Tool — Wounded Planet" };

export default function Impact() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>ESG TOOL</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3.5rem", color: "#1A3D2B", marginBottom: 16 }}>Impact Calculator</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Input your investment size, sector, and tenor to estimate real-world climate and social impact.
          </p>
        </div>
        <ImpactCalculator />
      </div>
    </div>
  );
}
