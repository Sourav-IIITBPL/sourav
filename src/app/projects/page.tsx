import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import SectionEyebrow from '@/components/SectionEyebrow';

export const metadata: Metadata = {
  title: 'Projects — Sourav Yadav',
  description:
    'Case studies: PreFlight, SettleOne, DexGateway, Protocol Invariant Checker.',
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <div className="container-main">
        {/* ── Page Header ── */}
        <h1
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          Projects
        </h1>

        <SectionEyebrow id="SEC-P0" label="All Projects" />

        {/* ── Project Cards ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            marginTop: 48,
          }}
        >
          {projects.map((project) => (
            <article
              key={project.slug}
              className="card card-accent"
              style={{ padding: 'clamp(24px, 4vw, 48px)' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                {/* Logo / Placeholder + Name row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  {project.logo ? (
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 12,
                        overflow: 'hidden',
                        flexShrink: 0,
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
                      />
                    </div>
                  ) : (
                    <div
                      className="image-placeholder"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 12,
                        flexShrink: 0,
                        fontSize: '1.75rem',
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

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display), sans-serif',
                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}
                    >
                      {project.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '1rem',
                        color: 'var(--accent-verify)',
                        fontWeight: 500,
                      }}
                    >
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Overview */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                    maxWidth: 800,
                  }}
                >
                  {project.overview}
                </p>

                {/* Problem */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    paddingLeft: 16,
                    borderLeft: '2px solid var(--accent-flag)',
                    opacity: 0.85,
                  }}
                >
                  {project.problem}
                </p>

                {/* Tech Stack Badges */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="badge"
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ paddingTop: 8 }}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-primary"
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      textDecoration: 'none',
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
