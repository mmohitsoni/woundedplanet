import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1A3D2B", color: "#F5F0E8", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E8C547", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌍</div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem" }}>Wounded Planet</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", opacity: 0.7, lineHeight: 1.7, maxWidth: 280 }}>
              Where climate capital meets project opportunity. Bridging the gap between impact investors and emerging market clean energy projects.
            </p>
          </div>
          {[
            { title: "Platform", links: [["Projects", "/projects"], ["Impact Tool", "/impact"], ["Submit a Project", "/contact"]] },
            { title: "Resources", links: [["Insights", "/blog"], ["About", "/about"], ["ESG Framework", "/esg"]] },
            { title: "Connect", links: [["Contact", "/contact"], ["LinkedIn", "#"], ["Newsletter", "#"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#F5F0E8", opacity: 0.75, textDecoration: "none", marginBottom: 10 }}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(245,240,232,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", opacity: 0.4 }}>© 2025 Wounded Planet. All rights reserved.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", opacity: 0.4 }}>Built for a better planet 🌱</p>
        </div>
      </div>
    </footer>
  );
}
