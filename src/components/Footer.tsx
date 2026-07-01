"use client";

import Link from "next/link";
import { footerProfiles, contactLinks } from "@/data/socials";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-surface)",
        paddingTop: 64,
        paddingBottom: 24,
      }}
    >
      <div
        className="container-main"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
        }}
      >
        {/* Column 1 — Identity */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            Sourav
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 12,
            }}
          >
            Protocol Engineer · Smart Contract Security Researcher
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            Building secure protocol infrastructure and auditing production DeFi systems.
          </p>
        </div>

        {/* Column 2 — Sitemap */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.6875rem",
              color: "var(--accent-flag)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Sitemap
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
                  fontSize: "0.875rem",
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
              fontSize: "0.6875rem",
              color: "var(--accent-flag)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
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
                  fontSize: "0.875rem",
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
                {profile.name}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4 — Direct Contact */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.6875rem",
              color: "var(--accent-flag)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contactLinks.map((contact) => (
              <div key={contact.label}>
                {contact.url ? (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.875rem",
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
                      fontSize: "0.875rem",
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
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          © 2026 Sourav Yadav
        </span>
      </div>

    </footer>
  );
}
