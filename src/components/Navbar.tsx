"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Security Research", href: "/security-research" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "rgba(5, 5, 5, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <nav
        className="container-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "0.08em",
            padding: "6px 0",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "var(--radius-sm)",
              background: "var(--gradient-accent)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: 0,
            }}
          >
            S
          </span>
          <span style={{ opacity: 0.5, fontWeight: 400 }}>ourav</span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          className="desktop-nav"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: "rgba(255,255,255,0.03)",
              borderRadius: "var(--radius-sm)",
              padding: "3px",
              border: "1px solid var(--border)",
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    background: isActive
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <a
            href={contactHref}
            className="btn-primary"
            style={{
              padding: "7px 18px",
              fontSize: "0.8125rem",
              marginLeft: 8,
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: 7,
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(5, 5, 5, 0.96)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            zIndex: 99,
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  transition: "color 0.2s ease",
                  padding: "8px 24px",
                  borderRadius: "var(--radius-sm)",
                  background: isActive
                    ? "var(--accent-flag-soft)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={contactHref}
            onClick={() => setMobileOpen(false)}
            className="btn-primary"
            style={{ marginTop: 12, padding: "12px 32px" }}
          >
            Contact
          </a>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
