import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Projects — Sourav Yadav",
  description:
    "Case studies: PreFlight, SettleOne, DexGateway, Protocol Invariant Checker.",
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <div className="container-main">
        {/* ── Page Header ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16,
            marginBottom: 64,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-flag)",
              background: "var(--accent-flag-soft)",
              padding: "6px 16px",
              borderRadius: "var(--radius-full)",
            }}
          >
            Portfolio
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 0,
              lineHeight: 1.15,
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: 560,
            }}
          >
            A curated collection of projects spanning smart contract
            infrastructure, DeFi protocols, and developer tooling.
          </p>
        </div>

        <SectionEyebrow id="SEC-P0" label="All Projects" />

        {/* ── Project Cards ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            marginTop: 40,
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.slug}
              style={{
                position: "relative",
                padding: "clamp(28px, 4vw, 48px)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                overflow: "hidden",
              }}
            >
              {/* Subtle top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "var(--gradient-accent)",
                  opacity: 0.6,
                }}
                aria-hidden="true"
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {/* Logo / Placeholder + Name row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Project number badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "clamp(20px, 3vw, 32px)",
                      right: "clamp(20px, 3vw, 32px)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      opacity: 0.5,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {project.logo ? (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "var(--bg-base)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={80}
                        height={80}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="image-placeholder"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "var(--radius-md)",
                        flexShrink: 0,
                        fontSize: "1.375rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-display), sans-serif",
                        color: "var(--accent-flag)",
                        background:
                          "linear-gradient(135deg, var(--accent-flag-soft) 0%, transparent 100%)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getInitials(project.name)}
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 6,
                        lineHeight: 1.2,
                      }}
                    >
                      {project.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontSize: "0.9375rem",
                        color: "var(--accent-verify)",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Overview */}
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                    maxWidth: 800,
                  }}
                >
                  {project.overview}
                </p>

                {/* Problem */}
                <div
                  style={{
                    paddingLeft: 20,
                    borderLeft: "2px solid var(--accent-flag)",
                    background: "var(--accent-flag-soft)",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    padding: "16px 20px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    {project.problem}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "5px 14px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  style={{
                    paddingTop: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-primary"
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Explore Project →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="section-spacing" />
    </main>
  );
}
