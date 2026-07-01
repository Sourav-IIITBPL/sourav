import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import SectionEyebrow from '@/components/SectionEyebrow';

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
    .join('')
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
            paddingBottom: 'var(--section-gap)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Logo / Placeholder */}
          {project.logo ? (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                overflow: 'hidden',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}
            >
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                width={120}
                height={120}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                priority
              />
            </div>
          ) : (
            <div
              className="image-placeholder"
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                fontSize: '2rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display), sans-serif',
                color: 'var(--accent-flag)',
                background: 'var(--bg-surface)',
                border: '1px dashed var(--border)',
              }}
            >
              {getInitials(project.name)}
            </div>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            {project.name}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '1.125rem',
              color: 'var(--accent-verify)',
              fontWeight: 500,
              maxWidth: 600,
            }}
          >
            {project.tagline}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontFamily: 'var(--font-body), sans-serif' }}
            >
              GitHub ↗
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §2  OVERVIEW
            ════════════════════════════════════════════ */}
        <section className="section-spacing">
          <SectionEyebrow id="SEC-P1" label="Overview" />
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              maxWidth: 800,
              marginTop: 16,
            }}
          >
            {project.overview}
          </p>
        </section>

        {/* ════════════════════════════════════════════
            §3  THE PROBLEM
            ════════════════════════════════════════════ */}
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P2" label="The Problem" />
          <div
            style={{
              marginTop: 16,
              paddingLeft: 20,
              borderLeft: '3px solid var(--accent-flag)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                fontStyle: 'italic',
              }}
            >
              {project.problem}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §4  ARCHITECTURE
            ════════════════════════════════════════════ */}
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P3" label="Architecture" />
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              maxWidth: 800,
              marginTop: 16,
            }}
          >
            {project.architecture}
          </p>
        </section>

        {/* ════════════════════════════════════════════
            §5  TECH STACK
            ════════════════════════════════════════════ */}
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P4" label="Tech Stack" />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 16,
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="badge"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.8125rem',
                  padding: '6px 14px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §6  CHALLENGES & SOLUTIONS
            ════════════════════════════════════════════ */}
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P5" label="Challenges & Solutions" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginTop: 16,
            }}
          >
            {project.challenges.map((challenge, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 'clamp(20px, 3vw, 32px)' }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    color: 'var(--accent-flag)',
                    marginBottom: 12,
                  }}
                >
                  {challenge.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                  }}
                >
                  {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            §7  ROADMAP
            ════════════════════════════════════════════ */}
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P6" label="Roadmap" />
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {project.roadmap.map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent-verify)',
                    marginTop: 7,
                    flexShrink: 0,
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
        <section className="section-spacing" style={{ paddingTop: 0 }}>
          <SectionEyebrow id="SEC-P7" label="Deployment" />
          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginTop: 16,
            }}
          >
            {project.deployment}
          </p>
        </section>

        {/* ════════════════════════════════════════════
            §9  FOOTER CTA
            ════════════════════════════════════════════ */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            paddingTop: 'var(--section-gap)',
            paddingBottom: 'var(--section-gap)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Explore the source
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontFamily: 'var(--font-body), sans-serif' }}
            >
              GitHub ↗
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
          <Link
            href="/projects"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginTop: 8,
              transition: 'color var(--transition-base)',
            }}
          >
            ← Back to all projects
          </Link>
        </section>
      </div>
    </main>
  );
}
