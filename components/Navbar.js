"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/impact", label: "Impact Tool" },
    { href: "/blog", label: "Insights" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(245,240,232,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(26,61,43,0.08)" : "none",
      padding: scrolled ? "12px 0" : "22px 0",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1A3D2B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌍</div>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.15rem", color: "#1A3D2B", letterSpacing: "0.01em" }}>Wounded Planet</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#1A3D2B", textDecoration: "none", opacity: 0.85 }}>{l.label}</Link>
          ))}
          <Link href="/contact" style={{
            background: "#E8C547", color: "#1A3D2B", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem", fontWeight: 600, padding: "9px 22px", borderRadius: 100,
            textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
          }}>Submit a Project</Link>
        </div>
      </div>
    </nav>
  );
}
