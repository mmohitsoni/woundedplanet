"use client";
import { useState, useRef } from "react";

const PROJECT_EMPTY = { title: "", country: "", flag: "🌍", sector: "Solar C&I", tag: "energy", ticket_size: "", tenor: "", irr: "", status: "Seeking Finance", impact: "", description: "", is_active: true };
const POST_EMPTY = { title: "", category: "Market Insights", excerpt: "", content: "", author: "Wounded Planet Team", is_active: true };
const SECTORS = ["Solar C&I", "E-Mobility", "Battery Storage", "Solar Rural", "Water & Energy", "Agri-Solar", "Utility Solar"];
const STATUSES = ["Seeking Finance", "Due Diligence", "Pipeline", "Closed"];
const TAGS = ["energy", "mobility", "bess", "water"];
const CATEGORIES = ["Market Insights", "Project Finance", "ESG", "Opinion", "Tools"];
const COUNTRIES = [
  { name: "Angola", flag: "🇦🇴" }, { name: "Argentina", flag: "🇦🇷" }, { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Benin", flag: "🇧🇯" }, { name: "Bolivia", flag: "🇧🇴" }, { name: "Botswana", flag: "🇧🇼" },
  { name: "Brazil", flag: "🇧🇷" }, { name: "Burkina Faso", flag: "🇧🇫" }, { name: "Cambodia", flag: "🇰🇭" },
  { name: "Cameroon", flag: "🇨🇲" }, { name: "Chad", flag: "🇹🇩" }, { name: "Chile", flag: "🇨🇱" },
  { name: "China", flag: "🇨🇳" }, { name: "Colombia", flag: "🇨🇴" }, { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Cote d'Ivoire", flag: "🇨🇮" }, { name: "DR Congo", flag: "🇨🇩" }, { name: "Ecuador", flag: "🇪🇨" },
  { name: "Egypt", flag: "🇪🇬" }, { name: "El Salvador", flag: "🇸🇻" }, { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Ghana", flag: "🇬🇭" }, { name: "Guatemala", flag: "🇬🇹" }, { name: "Guinea", flag: "🇬🇳" },
  { name: "Haiti", flag: "🇭🇹" }, { name: "Honduras", flag: "🇭🇳" }, { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" }, { name: "Jamaica", flag: "🇯🇲" }, { name: "Jordan", flag: "🇯🇴" },
  { name: "Kazakhstan", flag: "🇰🇿" }, { name: "Kenya", flag: "🇰🇪" }, { name: "Laos", flag: "🇱🇦" },
  { name: "Liberia", flag: "🇱🇷" }, { name: "Madagascar", flag: "🇲🇬" }, { name: "Malawi", flag: "🇲🇼" },
  { name: "Malaysia", flag: "🇲🇾" }, { name: "Mali", flag: "🇲🇱" }, { name: "Mexico", flag: "🇲🇽" },
  { name: "Mongolia", flag: "🇲🇳" }, { name: "Morocco", flag: "🇲🇦" }, { name: "Mozambique", flag: "🇲🇿" },
  { name: "Myanmar", flag: "🇲🇲" }, { name: "Namibia", flag: "🇳🇦" }, { name: "Nepal", flag: "🇳🇵" },
  { name: "Nicaragua", flag: "🇳🇮" }, { name: "Niger", flag: "🇳🇪" }, { name: "Nigeria", flag: "🇳🇬" },
  { name: "Pakistan", flag: "🇵🇰" }, { name: "Panama", flag: "🇵🇦" }, { name: "Paraguay", flag: "🇵🇾" },
  { name: "Peru", flag: "🇵🇪" }, { name: "Philippines", flag: "🇵🇭" }, { name: "Rwanda", flag: "🇷🇼" },
  { name: "Saudi Arabia", flag: "🇸🇦" }, { name: "Senegal", flag: "🇸🇳" }, { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Singapore", flag: "🇸🇬" }, { name: "Somalia", flag: "🇸🇴" }, { name: "South Africa", flag: "🇿🇦" },
  { name: "South Sudan", flag: "🇸🇸" }, { name: "Sri Lanka", flag: "🇱🇰" }, { name: "Sudan", flag: "🇸🇩" },
  { name: "Tanzania", flag: "🇹🇿" }, { name: "Thailand", flag: "🇹🇭" }, { name: "Togo", flag: "🇹🇬" },
  { name: "Tunisia", flag: "🇹🇳" }, { name: "UAE", flag: "🇦🇪" }, { name: "Uganda", flag: "🇺🇬" },
  { name: "Uruguay", flag: "🇺🇾" }, { name: "Uzbekistan", flag: "🇺🇿" }, { name: "Venezuela", flag: "🇻🇪" },
  { name: "Vietnam", flag: "🇻🇳" }, { name: "Zambia", flag: "🇿🇲" }, { name: "Zimbabwe", flag: "🇿🇼" },
];

function Toolbar({ textareaRef, value, onChange }) {
  function insert(before, after = "") {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const newVal = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newVal);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length + selected.length);
    }, 0);
  }

  function insertImage() {
    const url = prompt("Paste image URL:");
    if (!url) return;
    const caption = prompt("Caption (optional):") || "";
    const el = textareaRef.current;
    const pos = el ? el.selectionStart : value.length;
    const snippet = `\n![${caption}](${url})\n`;
    onChange(value.slice(0, pos) + snippet + value.slice(pos));
  }

  const btnStyle = { padding: "5px 12px", borderRadius: 6, border: "1.5px solid rgba(26,61,43,0.15)", background: "#fff", color: "#1A3D2B", fontFamily: "sans-serif", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" };

  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "10px 12px", background: "#F5F0E8", borderRadius: "8px 8px 0 0", border: "1.5px solid rgba(26,61,43,0.2)", borderBottom: "none" }}>
      <button type="button" style={btnStyle} onClick={() => insert("**", "**")} title="Bold">B</button>
      <button type="button" style={{ ...btnStyle, fontStyle: "italic" }} onClick={() => insert("*", "*")} title="Italic">I</button>
      <button type="button" style={btnStyle} onClick={() => insert("## ")} title="Heading">H2</button>
      <button type="button" style={btnStyle} onClick={() => insert("### ")} title="Sub-heading">H3</button>
      <button type="button" style={btnStyle} onClick={() => insert("- ")} title="Bullet point">• List</button>
      <button type="button" style={btnStyle} onClick={insertImage} title="Insert image">🖼 Image</button>
      <div style={{ marginLeft: "auto", fontFamily: "sans-serif", fontSize: "0.7rem", color: "#aaa", alignSelf: "center", paddingRight: 4 }}>
        **bold** · ## heading · ![caption](url)
      </div>
    </div>
  );
}

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(PROJECT_EMPTY);
  const [postForm, setPostForm] = useState(POST_EMPTY);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const contentRef = useRef(null);

  const headers = { "Content-Type": "application/json", "x-admin-key": key };

  async function loadProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  }

  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  }

  async function login() {
    const res = await fetch("/api/projects", { headers: { "x-admin-key": key } });
    if (res.ok) { setAuthed(true); loadProjects(); loadPosts(); }
    else setMsg("Wrong password");
  }

  function flash(m) { setMsg(m); setTimeout(() => setMsg(""), 3000); }

  async function saveProject() {
    setLoading(true);
    const method = editingProject ? "PATCH" : "POST";
    const body = editingProject ? { ...projectForm, id: editingProject } : projectForm;
    const res = await fetch("/api/projects", { method, headers, body: JSON.stringify(body) });
    if (res.ok) { flash(editingProject ? "Updated!" : "Project added!"); setProjectForm(PROJECT_EMPTY); setEditingProject(null); loadProjects(); }
    else flash("Error saving project");
    setLoading(false);
  }

  async function savePost() {
    setLoading(true);
    const method = editingPost ? "PATCH" : "POST";
    const body = editingPost ? { ...postForm, id: editingPost } : postForm;
    const res = await fetch("/api/posts", { method, headers, body: JSON.stringify(body) });
    if (res.ok) { flash(editingPost ? "Updated!" : "Post published!"); setPostForm(POST_EMPTY); setEditingPost(null); loadPosts(); }
    else flash("Error saving post");
    setLoading(false);
  }

  async function delProject(id) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/projects", { method: "DELETE", headers, body: JSON.stringify({ id }) });
    loadProjects();
  }

  async function delPost(id) {
    if (!confirm("Delete this post?")) return;
    await fetch("/api/posts", { method: "DELETE", headers, body: JSON.stringify({ id }) });
    loadPosts();
  }

  function editProject(p) {
    setEditingProject(p.id);
    setProjectForm({ title: p.title, country: p.country, flag: p.flag, sector: p.sector, tag: p.tag, ticket_size: p.ticket_size, tenor: p.tenor, irr: p.irr, status: p.status, impact: p.impact, description: p.description, is_active: p.is_active });
    setTab("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editPost(p) {
    setEditingPost(p.id);
    setPostForm({ title: p.title, category: p.category, excerpt: p.excerpt, content: p.content, author: p.author, is_active: p.is_active });
    setTab("blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCountryChange(name) {
    const found = COUNTRIES.find(c => c.name === name);
    setProjectForm(f => ({ ...f, country: name, flag: found ? found.flag : "🌍" }));
  }

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid rgba(26,61,43,0.2)", fontFamily: "sans-serif", fontSize: "0.875rem", color: "#1A3D2B", background: "#fff", boxSizing: "border-box" };
  const lbl = { fontFamily: "sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 6 };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, width: 360, boxShadow: "0 8px 40px rgba(26,61,43,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌍</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1.8rem", color: "#1A3D2B" }}>Admin Panel</h1>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#999", marginTop: 6 }}>Wounded Planet</p>
        </div>
        <label style={lbl}>Admin Password</label>
        <input type="password" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} style={{ ...inp, marginBottom: 16 }} placeholder="Enter admin password" />
        {msg && <p style={{ color: "red", fontFamily: "sans-serif", fontSize: "0.82rem", marginBottom: 12 }}>{msg}</p>}
        <button onClick={login} style={{ width: "100%", background: "#1A3D2B", color: "#F5F0E8", fontFamily: "sans-serif", fontWeight: 700, padding: "12px", borderRadius: 10, border: "none", cursor: "pointer" }}>Login →</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", paddingTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "2.2rem", color: "#1A3D2B" }}>Admin Panel</h1>
          <a href="/" style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#1A3D2B", textDecoration: "none", borderBottom: "1px solid #E8C547" }}>← Back to site</a>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 32, background: "#fff", borderRadius: 12, padding: 4, width: "fit-content", boxShadow: "0 2px 12px rgba(26,61,43,0.06)" }}>
          {[["projects", "📋 Projects"], ["blog", "📝 Blog Posts"]].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 24px", borderRadius: 9, border: "none", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", background: tab === t ? "#1A3D2B" : "transparent", color: tab === t ? "#F5F0E8" : "#999", transition: "all 0.2s" }}>{label}</button>
          ))}
        </div>

        {msg && <div style={{ background: "#d4edda", color: "#155724", padding: "12px 18px", borderRadius: 10, marginBottom: 24, fontFamily: "sans-serif", fontSize: "0.875rem" }}>{msg}</div>}

        {tab === "projects" && (
          <>
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, marginBottom: 32, boxShadow: "0 4px 24px rgba(26,61,43,0.08)" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1.4rem", color: "#1A3D2B", marginBottom: 24 }}>{editingProject ? "✏️ Edit Project" : "➕ Add New Project"}</h2>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Project Title *</label><input value={projectForm.title} onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="e.g. Rooftop Solar Portfolio" /></div>
                <div><label style={lbl}>Country</label>
                  <select value={projectForm.country} onChange={e => handleCountryChange(e.target.value)} style={inp}>
                    <option value="">— Select Country —</option>
                    {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Sector</label><select value={projectForm.sector} onChange={e => setProjectForm(f => ({ ...f, sector: e.target.value }))} style={inp}>{SECTORS.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label style={lbl}>Tag</label><select value={projectForm.tag} onChange={e => setProjectForm(f => ({ ...f, tag: e.target.value }))} style={inp}>{TAGS.map(t => <option key={t}>{t}</option>)}</select></div>
                <div><label style={lbl}>Status</label><select value={projectForm.status} onChange={e => setProjectForm(f => ({ ...f, status: e.target.value }))} style={inp}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Ticket Size</label><input value={projectForm.ticket_size} onChange={e => setProjectForm(f => ({ ...f, ticket_size: e.target.value }))} style={inp} placeholder="EUR 2.5M" /></div>
                <div><label style={lbl}>Tenor</label><input value={projectForm.tenor} onChange={e => setProjectForm(f => ({ ...f, tenor: e.target.value }))} style={inp} placeholder="5 years" /></div>
                <div><label style={lbl}>Target IRR</label><input value={projectForm.irr} onChange={e => setProjectForm(f => ({ ...f, irr: e.target.value }))} style={inp} placeholder="12-14%" /></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Impact Statement</label><input value={projectForm.impact} onChange={e => setProjectForm(f => ({ ...f, impact: e.target.value }))} style={inp} placeholder="4,200 tCO2 avoided/yr" /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 24 }}>
                  <input type="checkbox" id="pactive" checked={projectForm.is_active} onChange={e => setProjectForm(f => ({ ...f, is_active: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#1A3D2B" }} />
                  <label htmlFor="pactive" style={{ fontFamily: "sans-serif", fontSize: "0.875rem", color: "#1A3D2B", fontWeight: 500 }}>Visible on website</label>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}><label style={lbl}>Description</label><textarea value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Brief project description..." /></div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={saveProject} disabled={loading || !projectForm.title} style={{ background: "#1A3D2B", color: "#F5F0E8", fontFamily: "sans-serif", fontWeight: 700, padding: "12px 32px", borderRadius: 10, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                </button>
                {editingProject && <button onClick={() => { setEditingProject(null); setProjectForm(PROJECT_EMPTY); }} style={{ background: "transparent", color: "#999", fontFamily: "sans-serif", fontWeight: 600, padding: "12px 24px", borderRadius: 10, border: "1.5px solid #ddd", cursor: "pointer" }}>Cancel</button>}
              </div>
            </div>

            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1.3rem", color: "#1A3D2B", marginBottom: 16 }}>All Projects ({projects.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projects.length === 0
                ? <div style={{ background: "#fff", borderRadius: 14, padding: 32, textAlign: "center", color: "#999", fontFamily: "sans-serif" }}>No projects yet.</div>
                : projects.map(p => (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 10px rgba(26,61,43,0.05)", opacity: p.is_active ? 1 : 0.5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: 22 }}>{p.flag}</span>
                      <div>
                        <div style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1rem", color: "#1A3D2B" }}>{p.title}</div>
                        <div style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999" }}>{p.country} · {p.sector} · {p.ticket_size} · {p.status}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "sans-serif", fontSize: "0.7rem", padding: "3px 10px", borderRadius: 100, background: p.is_active ? "#d4edda" : "#f8d7da", color: p.is_active ? "#155724" : "#721c24", fontWeight: 600 }}>{p.is_active ? "Live" : "Hidden"}</span>
                      <button onClick={() => editProject(p)} style={{ background: "#F5F0E8", color: "#1A3D2B", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => delProject(p.id)} style={{ background: "#fee", color: "#c00", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}

        {tab === "blog" && (
          <>
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, marginBottom: 32, boxShadow: "0 4px 24px rgba(26,61,43,0.08)" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1.4rem", color: "#1A3D2B", marginBottom: 24 }}>{editingPost ? "✏️ Edit Post" : "📝 Write New Post"}</h2>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Post Title *</label><input value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="e.g. Why Good Projects Stay Unfunded" /></div>
                <div><label style={lbl}>Category</label><select value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))} style={inp}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div><label style={lbl}>Author</label><input value={postForm.author} onChange={e => setPostForm(f => ({ ...f, author: e.target.value }))} style={inp} placeholder="Your name" /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 24 }}>
                  <input type="checkbox" id="bactive" checked={postForm.is_active} onChange={e => setPostForm(f => ({ ...f, is_active: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#1A3D2B" }} />
                  <label htmlFor="bactive" style={{ fontFamily: "sans-serif", fontSize: "0.875rem", color: "#1A3D2B", fontWeight: 500 }}>Published (visible on site)</label>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={lbl}>Excerpt (shown on card preview)</label>
                <textarea value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} style={{ ...inp, resize: "vertical" }} placeholder="1-2 sentence summary shown before the reader clicks 'Read more'..." />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>Full Article Content</label>
                <Toolbar textareaRef={contentRef} value={postForm.content} onChange={v => setPostForm(f => ({ ...f, content: v }))} />
                <textarea
                  ref={contentRef}
                  value={postForm.content}
                  onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))}
                  rows={16}
                  style={{ ...inp, resize: "vertical", borderRadius: "0 0 8px 8px", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.7 }}
                  placeholder={"Write your full article here.\n\nUse the toolbar above to format:\n- Click B to bold selected text\n- Click H2 for a section heading\n- Click H3 for a sub-heading\n- Click 🖼 Image to insert a photo\n- Use - at start of line for bullet points\n\nExample:\n## Why Capital Sits Idle\n\nDFIs deploy billions annually, yet **most small projects** never see a dollar.\n\n- Reason one: documentation barriers\n- Reason two: ticket size mismatch\n\n![Solar panels in Ghana](https://example.com/image.jpg)"}
                />
                <p style={{ fontFamily: "sans-serif", fontSize: "0.72rem", color: "#aaa", marginTop: 8 }}>
                  Formatting: <strong>**bold**</strong> · <em>## Heading</em> · <em>### Sub-heading</em> · <em>- bullet</em> · <em>![caption](image-url)</em>
                </p>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={savePost} disabled={loading || !postForm.title} style={{ background: "#1A3D2B", color: "#F5F0E8", fontFamily: "sans-serif", fontWeight: 700, padding: "12px 32px", borderRadius: 10, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Saving..." : editingPost ? "Update Post" : "Publish Post"}
                </button>
                {editingPost && <button onClick={() => { setEditingPost(null); setPostForm(POST_EMPTY); }} style={{ background: "transparent", color: "#999", fontFamily: "sans-serif", fontWeight: 600, padding: "12px 24px", borderRadius: 10, border: "1.5px solid #ddd", cursor: "pointer" }}>Cancel</button>}
              </div>
            </div>

            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1.3rem", color: "#1A3D2B", marginBottom: 16 }}>All Posts ({posts.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {posts.length === 0
                ? <div style={{ background: "#fff", borderRadius: 14, padding: 32, textAlign: "center", color: "#999", fontFamily: "sans-serif" }}>No posts yet. Write your first one above.</div>
                : posts.map(p => (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 10px rgba(26,61,43,0.05)", opacity: p.is_active ? 1 : 0.5 }}>
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: "1rem", color: "#1A3D2B" }}>{p.title}</div>
                      <div style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999", marginTop: 2 }}>{p.category} · {p.author} · {new Date(p.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "sans-serif", fontSize: "0.7rem", padding: "3px 10px", borderRadius: 100, background: p.is_active ? "#d4edda" : "#f8d7da", color: p.is_active ? "#155724" : "#721c24", fontWeight: 600 }}>{p.is_active ? "Published" : "Draft"}</span>
                      <button onClick={() => editPost(p)} style={{ background: "#F5F0E8", color: "#1A3D2B", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => delPost(p.id)} style={{ background: "#fee", color: "#c00", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.78rem", padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
