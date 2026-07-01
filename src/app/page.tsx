'use client';

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, ArrowRight, Copy, Check, Loader2, Send, GraduationCap } from 'lucide-react';

import SectionEyebrow from '@/components/SectionEyebrow';
import { stats } from '@/data/stats';
import { projects } from '@/data/projects';
import { profiles, contactLinks } from '@/data/socials';
import { validatedFindings } from '@/data/audits';
import { achievements } from '@/data/achievements';
import { techStack } from '@/data/techstack';

/* ─────────────────────────────────────────────
   Hooks
   ───────────────────────────────────────────── */

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || end === 0) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return count;
}

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

/* ─────────────────────────────────────────────
   Rotating Headlines
   ───────────────────────────────────────────── */

const headlines = [
  'Protocol Engineer',
  'Smart Contract Security Researcher',
  'Web3 Full-Stack Engineer',
];

/* ─────────────────────────────────────────────
   Sub-Components
   ───────────────────────────────────────────── */

function StatCard({ label, value, suffix, size, inView }: {
  label: string; value: number; suffix: string; size: string; inView: boolean;
}) {
  const count = useCountUp(value, 2200, inView);
  const isKnight = value === 0 && suffix === 'Knight';
  const isLarge = size === 'large';

  return (
    <motion.div
      className="card"
      variants={scaleIn}
      style={{
        padding: isLarge ? '32px' : '24px',
        gridColumn: isLarge ? 'span 2' : 'span 1',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-30%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(242,169,59,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <span
        className="stat-number"
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: isLarge ? '3rem' : '2.25rem',
          fontWeight: 600,
          color: 'var(--accent-flag)',
          lineHeight: 1.1,
        }}
      >
        {isKnight ? 'Knight' : `${count}${suffix}`}
      </span>
      <span style={{
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.02em',
      }}>
        {label}
      </span>
    </motion.div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback: noop */ }
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        color: copied ? 'var(--accent-verify)' : 'var(--text-muted)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.75rem',
        transition: 'all var(--transition-base)',
      }}
      aria-label={`Copy ${text}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */

export default function HomePage() {
  /* ── Rotating headline state ── */
  const [headlineIndex, setHeadlineIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ── Stats IntersectionObserver ── */
  const statsSection = useInView();

  /* ── Contact form state ── */
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      setFormStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════ */}
      <section
        className="section-spacing container-main"
        style={{ paddingTop: '120px' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '64px',
          flexWrap: 'wrap',
        }}>
          {/* Left */}
          <motion.div
            style={{ flex: '1 1 480px', minWidth: '300px' }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Name */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Sourav Yadav
            </motion.h1>

            {/* Rotating headline */}
            <motion.div variants={fadeUp} custom={1} style={{ height: '44px', marginBottom: '20px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    color: 'var(--accent-verify)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {headlines[headlineIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: '540px',
                marginBottom: '32px',
              }}
            >
              Building secure protocol infrastructure, auditing production DeFi systems,
              and shipping full-stack Web3 applications.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
            >
              <a href="/resume/Web3Resume.pdf" download className="btn-primary">
                <Download size={16} />
                Download Resume
              </a>
              <a href="https://github.com/Sourav-IIITBPL" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <ExternalLink size={16} />
                GitHub
              </a>
              <Link href="/projects" className="btn-secondary">
                View Projects
              </Link>
              <a href="#contact" className="btn-secondary">
                Contact
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              flex: '0 0 auto',
              position: 'relative',
            }}
          >
            {/* Glow behind photo */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              background: 'radial-gradient(circle at center, rgba(53,199,192,0.12) 0%, rgba(242,169,59,0.06) 50%, transparent 70%)',
              borderRadius: '20px',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }} />
            <Image
              src="/images/my-photo.png"
              alt="Sourav Yadav"
              width={320}
              height={320}
              priority
              style={{
                borderRadius: '12px',
                objectFit: 'cover',
                border: '1px solid var(--border)',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. ABOUT
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-01" label="About" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p style={{
            maxWidth: '800px',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: 'var(--text-muted)',
          }}>
            I&apos;m a Web3 engineer who builds and breaks decentralized systems. Over the past year, I&apos;ve audited 20+ production DeFi protocols across Sherlock, Code4rena, and Cantina — AMMs, lending markets, vaults, and cross-chain infrastructure — surfacing 11 validated vulnerabilities. On the builder side, I&apos;ve shipped pre-transaction security middleware, a yield-generating payment protocol for B2B settlements, and multi-chain DEX routing infrastructure spanning 9 networks. I think in invariants, threat models, and protocol accounting, and I write code the way I audit it — assuming it will be attacked. Currently at IIIT Bhopal, graduating 2027.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          3. STATISTICS
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main" ref={statsSection.ref}>
        <SectionEyebrow id="SEC-02" label="Statistics" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} inView={statsSection.inView} />
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          4. FEATURED PROJECTS
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-03" label="Featured Projects" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              className="card card-accent"
              variants={fadeUp}
              custom={idx}
              style={{
                display: 'flex',
                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                flexWrap: 'wrap',
                gap: '32px',
                padding: '32px',
                alignItems: 'flex-start',
              }}
            >
              {/* Logo / Placeholder */}
              <div style={{
                flex: '0 0 100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: '12px',
                      objectFit: 'contain',
                      background: 'var(--bg-base)',
                      padding: '8px',
                      border: '1px solid var(--border)',
                    }}
                  />
                ) : (
                  <div
                    className="image-placeholder"
                    style={{
                      width: '100px',
                      height: '100px',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display), sans-serif',
                      color: 'var(--accent-flag)',
                    }}
                  >
                    {project.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}>
                  {project.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.8125rem',
                  color: 'var(--accent-verify)',
                  marginBottom: '12px',
                }}>
                  {project.tagline}
                </p>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}>
                  {project.problem}
                </p>

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {project.stack.slice(0, 6).map((tech) => (
                    <span key={tech} className="badge">{tech}</span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--accent-flag)',
                    transition: 'gap var(--transition-base)',
                  }}
                >
                  View Case Study <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          5. FEATURED PROFILES
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-04" label="Profiles" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '16px',
          }}
        >
          {profiles.map((profile, idx) => {
            const IconComponent = profile.icon;
            return (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                variants={scaleIn}
                custom={idx}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(242,169,59,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(242,169,59,0.15)',
                  }}>
                    <IconComponent size={20} style={{ color: 'var(--accent-flag)' }} />
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}>
                      {profile.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                    }}>
                      {profile.handle}
                    </span>
                  </div>
                </div>
                {profile.stat && (
                  <span style={{
                    fontSize: '0.8125rem',
                    color: 'var(--accent-verify)',
                    fontFamily: 'var(--font-mono), monospace',
                  }}>
                    {profile.stat}
                  </span>
                )}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: 'auto',
                }}>
                  Visit Profile <ExternalLink size={11} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          6. LATEST SECURITY RESEARCH
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-05" label="Security Research" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {validatedFindings.slice(0, 4).map((finding, idx) => (
            <motion.a
              key={`${finding.protocol}-${idx}`}
              href={finding.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              variants={scaleIn}
              custom={idx}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {finding.protocol}
                </h4>
                <span className="badge" style={{
                  background: finding.platform === 'Sherlock'
                    ? 'rgba(53,199,192,0.1)'
                    : finding.platform === 'Code4rena'
                      ? 'rgba(242,169,59,0.1)'
                      : 'rgba(139,152,165,0.1)',
                  color: finding.platform === 'Sherlock'
                    ? 'var(--accent-verify)'
                    : finding.platform === 'Code4rena'
                      ? 'var(--accent-flag)'
                      : 'var(--text-muted)',
                  borderColor: 'transparent',
                }}>
                  {finding.platform}
                </span>
              </div>
              {finding.findingSummary && (
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>
                  {finding.findingSummary}
                </p>
              )}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--accent-flag)',
                marginTop: 'auto',
              }}>
                Read Analysis <ArrowRight size={13} />
              </span>
            </motion.a>
          ))}
        </motion.div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/security-research" className="btn-secondary" style={{ display: 'inline-flex' }}>
            View All Research <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. HACKATHONS & ACHIEVEMENTS
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-06" label="Hackathons & Achievements" />
        <div className="timeline-rail" style={{ paddingLeft: '32px' }}>
          {achievements.map((achievement, idx) => (
            <motion.div
              key={`${achievement.title}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                paddingBottom: '36px',
                paddingLeft: '24px',
              }}
            >
              {/* Dot on rail */}
              <div style={{
                position: 'absolute',
                left: '-32px',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--accent-flag)',
                border: '2px solid var(--bg-base)',
                boxShadow: '0 0 0 3px var(--border)',
              }} />

              {/* Year */}
              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--accent-flag)',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '6px',
              }}>
                {achievement.year}
              </span>

              <h4 style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>
                {achievement.title}
              </h4>

              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '8px',
              }}>
                {achievement.description}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {achievement.certificatePath && (
                  <a
                    href={achievement.certificatePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--accent-verify)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    View Certificate <ExternalLink size={12} />
                  </a>
                )}
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--accent-flag)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    View Profile <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. TECH STACK
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-07" label="Tech Stack" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          {techStack.map((category, idx) => (
            <motion.div key={category.label} variants={fadeUp} custom={idx}>
              <h4 style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-flag)',
                marginBottom: '12px',
              }}>
                {category.label}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {category.items.map((item) => (
                  <span key={item} className="badge">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          9. EDUCATION
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-08" label="Education" />
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            maxWidth: '600px',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(53,199,192,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(53,199,192,0.15)',
            flexShrink: 0,
          }}>
            <GraduationCap size={24} style={{ color: 'var(--accent-verify)' }} />
          </div>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '4px',
            }}>
              IIIT Bhopal
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}>
              B.Tech in Electronics &amp; Communication Engineering
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{
                color: 'var(--accent-verify)',
                borderColor: 'rgba(53,199,192,0.25)',
                background: 'rgba(53,199,192,0.06)',
              }}>
                CGPA: 7.57 / 10
              </span>
              <span className="badge" style={{
                color: 'var(--accent-flag)',
                borderColor: 'rgba(242,169,59,0.25)',
                background: 'rgba(242,169,59,0.06)',
              }}>
                Expected 2027
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          10. CONTACT
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main" id="contact">
        <SectionEyebrow id="SEC-09" label="Contact" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              Get in touch
            </h3>

            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  borderColor: 'var(--accent-verify)',
                }}
              >
                <Check size={32} style={{ color: 'var(--accent-verify)', margin: '0 auto 12px' }} />
                <p style={{ color: 'var(--accent-verify)', fontWeight: 500, marginBottom: '4px' }}>
                  Message sent!
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  I&apos;ll reply within a day or two.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(['name', 'email'] as const).map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        marginBottom: '6px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {field}
                    </label>
                    <input
                      id={field}
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      value={formData[field]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                      disabled={formStatus === 'loading'}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-body), sans-serif',
                        transition: 'border-color var(--transition-base)',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-flag)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      marginBottom: '6px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    disabled={formStatus === 'loading'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-body), sans-serif',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'border-color var(--transition-base)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-flag)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {formStatus === 'error' && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--severity-high)' }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formStatus === 'loading'}
                  style={{
                    justifyContent: 'center',
                    opacity: formStatus === 'loading' ? 0.7 : 1,
                  }}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h3 style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              Contact links
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactLinks.map((link) => (
                <div
                  key={link.label}
                  className="card"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <span style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {link.label}
                    </span>
                    {link.url ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-mono), monospace',
                          color: 'var(--accent-flag)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {link.value} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span style={{
                        fontSize: '0.9375rem',
                        fontFamily: 'var(--font-mono), monospace',
                        color: 'var(--text-primary)',
                      }}>
                        {link.value}
                      </span>
                    )}
                  </div>
                  {link.copyable && <CopyButton text={link.value} />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spinner keyframe — injected once */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
