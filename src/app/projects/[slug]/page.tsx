import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import SectionEyebrow from "@/components/SectionEyebrow";

/* ── Static params ── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: `${project?.name} — Sourav Yadav`,
    description: project?.overview,
  };
}

/* ── Helpers ── */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Page Component ── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main style={{ paddingTop: 120 }}>
      <div className="container-main">
        {/* ════════════════════════════════════════════
            §1  HERO
            ════════════════════════════════════════════ */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
            paddingBottom: 64,
            position: "relative",
          }}
        >
          {/* Decorative gradient orb behind hero */}
          <div
            style={{
              position: "absolute",
              top: -60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Back link */}
          <Link
            href="/projects"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "color 0.2s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            ← Back to projects
          </Link>

          {/* Logo / Placeholder */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {project.logo ? (
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  boxShadow:
                    "0 0 0 6px rgba(99,102,241,0.06), var(--shadow-md)",
                }}
              >
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={96}
                  height={96}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  priority
                />
              </div>
            ) : (
              <div
                className="image-placeholder"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "var(--radius-lg)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-display), sans-serif",
                  color: "var(--accent-flag)",
                  background:
                    "linear-gradient(135deg, var(--accent-flag-soft) 0%, transparent 100%)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  boxShadow:
                    "0 0 0 6px rgba(99,102,241,0.06), var(--shadow-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getInitials(project.name)}
              </div>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              position: "relative",
              zIndex: 1,
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.125rem",
              color: "var(--accent-verify)",
              fontWeight: 500,
              maxWidth: 600,
              lineHeight: 1.5,
              position: "relative",
              zIndex: 1,
            }}
          >
            {project.tagline}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              GitHub ↗
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>

          {/* Bottom divider */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              maxWidth: 600,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </section>

        {/* ════════════════════════════════════════════
            §2  OVERVIEW
            ════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 56,
            paddingBottom: 56,
          }}
        >
          <SectionEyebrow id="SEC-P1" label="Overview" />
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              maxWidth: 800,
              marginTop: 20,
            }}
          >
            {project.overview}
          </p>
        </section>

        {/* ════════════════════════════════════════════
            §2.5  METRICS
            ════════════════════════════════════════════ */}
        {project.metrics && project.metrics.length > 0 && (
          <section style={{ paddingBottom: 56 }}>
            <SectionEyebrow id="SEC-P1-B" label="Key Metrics" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    textAlign: "center",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: 2,
                      background: "var(--gradient-accent)",
                      opacity: 0.4,
                      borderRadius: "0 0 2px 2px",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono), monospace",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {metric.label}
                  </span>
                  <span
                    style={{
                      fontSize: "1.375rem",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      fontFamily: "var(--font-display), sans-serif",
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            §3  THE PROBLEM
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P2" label="The Problem" />
          <div
            style={{
              marginTop: 20,
              paddingLeft: 24,
              borderLeft: "3px solid var(--accent-flag)",
              background: "var(--accent-flag-soft)",
              borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--text-secondary)",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {project.problem}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §4  ARCHITECTURE
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P3" label="Architecture" />
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              maxWidth: 800,
              marginTop: 20,
            }}
          >
            {project.architecture}
          </p>
        </section>

        {/* ════════════════════════════════════════════
            §5  TECH STACK
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P4" label="Tech Stack" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 20,
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  padding: "7px 16px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.02em",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §5.5  KEY FEATURES
            ════════════════════════════════════════════ */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section style={{ paddingBottom: 56 }}>
            <SectionEyebrow id="SEC-P4-B" label="Key Features" />
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 16,
              }}
            >
              {project.keyFeatures.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent-flag)",
                      marginTop: 7,
                      flexShrink: 0,
                      boxShadow: "0 0 6px rgba(99,102,241,0.3)",
                    }}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ════════════════════════════════════════════
            §6  CHALLENGES & SOLUTIONS
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P5" label="Challenges & Solutions" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginTop: 20,
            }}
          >
            {project.challenges.map((challenge, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                {/* Numbered accent */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--accent-flag-soft)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "var(--accent-flag)",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {challenge.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {challenge.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §7  ROADMAP
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P6" label="Roadmap" />
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {project.roadmap.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-sm)",
                  background:
                    i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent-verify)",
                    marginTop: 7,
                    flexShrink: 0,
                    boxShadow: "0 0 6px rgba(34,197,94,0.3)",
                  }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ════════════════════════════════════════════
            §8  DEPLOYMENT
            ════════════════════════════════════════════ */}
        <section style={{ paddingBottom: 56 }}>
          <SectionEyebrow id="SEC-P7" label="Deployment" />
          <div
            style={{
              marginTop: 20,
              padding: "20px 24px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {project.deployment}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §9  FOOTER CTA
            ════════════════════════════════════════════ */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            paddingTop: 56,
            paddingBottom: "var(--section-gap)",
            position: "relative",
          }}
        >
          {/* Top divider */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              maxWidth: 600,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "1.375rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            Explore the source
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              GitHub ↗
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
          <Link
            href="/projects"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginTop: 8,
              transition: "color var(--transition-base)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            ← Back to all projects
          </Link>
        </section>
      </div>
    </main>
  );
}
