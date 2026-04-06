"use client";
import { useState, useEffect } from "react";

const CATEGORY_COLORS = {
  "Project Finance": { bg: "#d4edda", color: "#155724" },
  "ESG": { bg: "#cce5ff", color: "#004085" },
  "Market Insights": { bg: "#fff3cd", color: "#856404" },
  "Opinion": { bg: "#f8d7da", color: "#721c24" },
  "Tools": { bg: "#e2d9f3", color: "#4a235a" },
};

function formatDate(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function readTime(content) {
  if (!content) return "3 min read";
  const words = content.replace(/!\[.*?\]\(.*?\)/g, "").split(" ").length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} style={{ fontWeight: 700, color: "#1A3D2B" }}>{part.slice(2, -2)}</strong>
      : part
  );
}

function RichContent({ content }) {
  if (!content) return (
    <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#bbb", fontStyle: "italic" }}>
      Full content not yet added. Edit this post in the admin panel.
    </p>
  );

  return (
    <div>
      {content.split("\n").map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height: 12 }} />;

        if (t.startsWith("## ")) return (
          <h3 key={i} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.55rem", color: "#1A3D2B", margin: "28px 0 10px", lineHeight: 1.3 }}>
            {t.slice(3)}
          </h3>
        );

        if (t.startsWith("### ")) return (
          <h4 key={i} style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A3D2B", margin: "20px 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {t.slice(4)}
          </h4>
        );

        const imgMatch = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) return (
          <div key={i} style={{ margin: "24px 0" }}>
            <img src={imgMatch[2]} alt={imgMatch[1]} style={{ width: "100%", borderRadius: 12, objectFit: "cover", maxHeight: 440, display: "block" }} onError={e => { e.target.style.display = "none"; }} />
            {imgMatch[1] && <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#aaa", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>{imgMatch[1]}</p>}
          </div>
        );

        if (t.startsWith("- ")) return (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ color: "#E8C547", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.6, flexShrink: 0 }}>•</span>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: 0 }}>{renderInline(t.slice(2))}</p>
          </div>
        );

        return (
          <p key={i} style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.85, marginBottom: 14 }}>
            {renderInline(t)}
          </p>
        );
      })}
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(posts.map(p => p.category).filter(Boolean))];
  const displayed = filter === "All" ? posts : posts.filter(p => p.category === filter);

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 100 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8C547", marginBottom: 12 }}>INSIGHTS</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "3.5rem", color: "#1A3D2B", marginBottom: 16 }}>Market Intelligence</h1>
          <p style={{ fontFamily: "sans-serif", fontSize: "1rem", color: "#666", maxWidth: 520, lineHeight: 1.7 }}>Analysis, frameworks, and perspectives on project finance, ESG, and clean energy investing in emerging markets.</p>
        </div>

        {categories.length > 1 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 18px", borderRadius: 100, border: "1.5px solid", borderColor: filter === cat ? "#1A3D2B" : "rgba(26,61,43,0.2)", background: filter === cat ? "#1A3D2B" : "transparent", color: filter === cat ? "#F5F0E8" : "#1A3D2B", fontFamily: "sans-serif", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" }}>{cat}</button>
            ))}
          </div>
        )}

        {loading && <div style={{ textAlign: "center", padding: 60, fontFamily: "sans-serif", color: "#999" }}>Loading posts...</div>}

        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, background: "#fff", borderRadius: 20 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#1A3D2B", marginBottom: 8 }}>No posts yet</h3>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: "#999" }}>Add your first blog post from the admin panel.</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {displayed.map(post => {
            const isOpen = expanded === post.id;
            const catColor = CATEGORY_COLORS[post.category] || { bg: "#f0f0f0", color: "#555" };
            return (
              <div key={post.id} style={{ background: "#fff", borderRadius: 16, boxShadow: isOpen ? "0 12px 40px rgba(26,61,43,0.12)" : "0 4px 20px rgba(26,61,43,0.06)", border: `1px solid ${isOpen ? "rgba(26,61,43,0.15)" : "rgba(26,61,43,0.06)"}`, overflow: "hidden", transition: "box-shadow 0.3s" }}>
                <div onClick={() => setExpanded(isOpen ? null : post.id)} style={{ padding: "28px 32px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ background: catColor.bg, color: catColor.color, fontFamily: "sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100 }}>{post.category}</span>
                      <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999" }}>{readTime(post.content)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#bbb" }}>{formatDate(post.created_at)}</span>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: isOpen ? "#1A3D2B" : "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: isOpen ? "#F5F0E8" : "#1A3D2B", transition: "all 0.3s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</div>
                    </div>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.6rem", color: "#1A3D2B", marginBottom: 10, lineHeight: 1.25 }}>{post.title}</h2>
                  <p style={{ fontFamily: "sans-serif", fontSize: "0.875rem", color: "#666", lineHeight: 1.7, margin: 0 }}>{post.excerpt}</p>
                  {!isOpen && <div style={{ marginTop: 18 }}><span style={{ fontFamily: "sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#1A3D2B", borderBottom: "1.5px solid #E8C547", paddingBottom: 2 }}>Read more →</span></div>}
                </div>

                {isOpen && (
                  <div style={{ borderTop: "1px solid rgba(26,61,43,0.07)" }}>
                    <div style={{ padding: "32px 32px 28px" }}>
                      <RichContent content={post.content} />
                    </div>
                    <div style={{ margin: "0 32px", paddingTop: 20, paddingBottom: 24, borderTop: "1px solid rgba(26,61,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1A3D2B", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8C547", fontSize: 15 }}>✍</div>
                        <span style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: "#999" }}>Written by <strong style={{ color: "#1A3D2B" }}>{post.author || "Wounded Planet Team"}</strong></span>
                      </div>
                      <button onClick={() => setExpanded(null)} style={{ background: "none", border: "none", fontFamily: "sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#aaa", cursor: "pointer" }}>↑ Collapse</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
