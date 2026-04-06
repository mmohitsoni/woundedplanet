import ProjectCards from "@/components/ProjectCards";

export const metadata = { title: "Projects — Wounded Planet" };

export default function Projects() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>LIVE OPPORTUNITIES</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3.5rem", color: "#1A3D2B", marginBottom: 16 }}>Project Pipeline</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666", maxWidth: 560, lineHeight: 1.7 }}>
            Vetted clean energy projects seeking financing across emerging markets. Filter by sector to find your match.
          </p>
        </div>
        <ProjectCards />
      </div>
    </div>
  );
}
