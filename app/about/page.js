export const metadata = { title: "About — Wounded Planet" };

export default function About() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>OUR MISSION</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3.5rem", color: "#1A3D2B", lineHeight: 1.1, marginBottom: 28 }}>
            The planet is wounded.<br /><em>We're here to help.</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#4A3728", lineHeight: 1.8, maxWidth: 680 }}>
            Wounded Planet is a project finance and ESG platform built to close the gap between available climate capital and the clean energy projects that need it most — across emerging markets in Asia and Africa.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 64 }}>
          {[
            { icon: "🎯", title: "Our Focus", body: "We specialise in solar C&I, utility-scale solar, e-mobility, and battery storage projects in Vietnam, Indonesia, India, Philippines, Kenya, and Ghana." },
            { icon: "🤝", title: "What We Do", body: "We structure, document, and matchmake — helping project developers present bankable opportunities and helping investors access vetted deal flow." },
            { icon: "📊", title: "Our Edge", body: "Built by practitioners with hands-on experience in emerging market project finance, DFI frameworks, and ESG structuring." },
            { icon: "🌱", title: "The Impact", body: "Every project we facilitate represents real-world impact: CO₂ avoided, households powered, green jobs created, and communities transformed." },
          ].map(card => (
            <div key={card.title} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(26,61,43,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.35rem", color: "#1A3D2B", marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666", lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1A3D2B", borderRadius: 20, padding: 48, textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "2.2rem", color: "#F5F0E8", marginBottom: 16 }}>Want to work with us?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(245,240,232,0.7)", marginBottom: 28 }}>Whether you have capital to deploy or a project that needs financing — let's talk.</p>
          <a href="/contact" style={{ background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>Get in Touch →</a>
        </div>
      </div>
    </div>
  );
}
