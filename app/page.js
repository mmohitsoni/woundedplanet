import Link from "next/link";
import ProjectCards from "@/components/ProjectCards";
import ImpactCalculator from "@/components/ImpactCalculator";

export default function Home() {
  return (
    <div style={{ background: "#F5F0E8" }}>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background circles */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,197,71,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,61,43,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 780 }}>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,61,43,0.07)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ fontSize: 12 }}>🌱</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#1A3D2B", letterSpacing: "0.06em", textTransform: "uppercase" }}>Project Finance & ESG Platform</span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#1A3D2B", lineHeight: 1.08, marginBottom: 28, letterSpacing: "-0.01em" }}>
              Where Climate Capital<br />
              <em style={{ fontStyle: "italic", color: "#2D5A3F" }}>Meets Project</em><br />
              Opportunity
            </h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "#4A3728", lineHeight: 1.75, maxWidth: 560, marginBottom: 40, fontWeight: 300 }}>
              Wounded Planet connects impact investors and lenders with vetted clean energy projects across emerging markets — from solar C&I to e-mobility to battery storage.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/projects" style={{
                background: "#1A3D2B", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.95rem", padding: "14px 32px", borderRadius: 100,
                textDecoration: "none", display: "inline-block",
              }}>Browse Projects →</Link>
              <Link href="/contact" style={{
                background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.95rem", padding: "14px 32px", borderRadius: 100,
                textDecoration: "none", display: "inline-block",
              }}>Submit a Project</Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(26,61,43,0.1)" }}>
              {[["$40M+", "Capital Deployed"], ["18+", "Projects Financed"], ["6", "Countries"], ["120K+", "tCO₂ Avoided"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "2rem", color: "#1A3D2B" }}>{num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#666", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>HOW IT WORKS</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "2.8rem", color: "#1A3D2B" }}>Two paths. One mission.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              {
                icon: "💼", title: "For Investors & Lenders",
                steps: ["Browse vetted project teasers", "Review deal summaries & ESG scores", "Connect directly with project developers", "Deploy capital with confidence"],
                cta: "Browse Projects", href: "/projects",
              },
              {
                icon: "⚡", title: "For Project Developers",
                steps: ["Submit your project profile", "Get matched with relevant financiers", "Access ESG structuring support", "Close your financing faster"],
                cta: "Submit a Project", href: "/contact",
              },
            ].map(card => (
              <div key={card.title} style={{ background: "#F5F0E8", borderRadius: 20, padding: 40 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.7rem", color: "#1A3D2B", marginBottom: 24 }}>{card.title}</h3>
                {card.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1A3D2B", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#4A3728", lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
                <Link href={card.href} style={{ display: "inline-block", marginTop: 16, background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", padding: "10px 24px", borderRadius: 100, textDecoration: "none" }}>{card.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding: "100px 24px", background: "#F5F0E8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 10 }}>LIVE OPPORTUNITIES</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "2.8rem", color: "#1A3D2B" }}>Featured Projects</h2>
            </div>
            <Link href="/projects" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#1A3D2B", textDecoration: "none", borderBottom: "2px solid #E8C547", paddingBottom: 2 }}>View all projects →</Link>
          </div>
          <ProjectCards limit={3} />
        </div>
      </section>

      {/* IMPACT CALCULATOR */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>IMPACT TOOL</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "2.8rem", color: "#1A3D2B" }}>What does your money do?</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666", marginTop: 12 }}>Estimate the real-world climate impact of your investment.</p>
          </div>
          <ImpactCalculator />
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "100px 24px", background: "#1A3D2B" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3rem", color: "#F5F0E8", marginBottom: 20, lineHeight: 1.15 }}>
            Have a project that needs financing?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(245,240,232,0.7)", marginBottom: 36, lineHeight: 1.7 }}>
            We work with solar, e-mobility, BESS, and water projects across emerging markets. Submit your teaser and we'll match you with the right capital partners.
          </p>
          <Link href="/contact" style={{ background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", padding: "16px 40px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>
            Submit Your Project →
          </Link>
        </div>
      </section>

    </div>
  );
}
