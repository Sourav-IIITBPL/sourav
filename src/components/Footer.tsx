"use client";

import Link from "next/link";
import { footerProfiles, contactLinks } from "@/data/socials";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        position: "relative",
      }}
    >
      {/* Subtle top gradient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--accent-flag), transparent)",
          opacity: 0.4,
        }}
      />

      <div
        className="container-main"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
          paddingTop: 64,
          paddingBottom: 48,
        }}
      >
        {/* Column 1 — Identity */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
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
              }}
            >
              S
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Sourav Yadav
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 12,
              letterSpacing: "0.02em",
            }}
          >
            Protocol Engineer · Security Researcher
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            Building secure protocol infrastructure and auditing production DeFi
            systems.
          </p>
        </div>

        {/* Column 2 — Sitemap */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Navigate
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Projects", href: "/projects" },
              { label: "Security Research", href: "/security-research" },
              { label: "Resume", href: "/resume" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 — Profiles */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Profiles
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {footerProfiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  transition: "color 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {profile.icon && (
                  <profile.icon size={13} style={{ opacity: 0.6 }} />
                )}
                {profile.name}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contactLinks.map((contact) => (
              <div
                key={contact.label}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                {contact.icon && (
                  <contact.icon
                    size={13}
                    style={{ color: "var(--text-muted)", opacity: 0.6 }}
                  />
                )}
                {contact.url ? (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {contact.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-main"
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            letterSpacing: "0.02em",
          }}
        >
          © {new Date().getFullYear()} Sourav Yadav
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            letterSpacing: "0.02em",
            opacity: 0.5,
          }}
        >
          Built with Next.js
        </span>
      </div>
    </footer>
  );
}
