"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ExternalLink,
  ArrowRight,
  Copy,
  Check,
  Loader2,
  Send,
  GraduationCap,
} from "lucide-react";

import SectionEyebrow from "@/components/SectionEyebrow";
import { stats } from "@/data/stats";
import { projects } from "@/data/projects";
import { profiles, contactLinks } from "@/data/socials";
import { validatedFindings } from "@/data/audits";
import { achievements } from "@/data/achievements";
import { techStack } from "@/data/techstack";

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, ...options },
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
   Sub-Components
   ───────────────────────────────────────────── */

function StatCard({
  label,
  value,
  suffix,
  size,
  inView,
}: {
  label: string;
  value: number;
  suffix: string;
  size: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 2200, inView);
  const isKnight = value === 0 && suffix === "Knight";
  const isLarge = size === "large";

  return (
    <motion.div
      className="card"
      variants={scaleIn}
      style={{
        padding: isLarge ? "36px 32px" : "28px 24px",
        gridColumn: isLarge ? "span 2" : "span 1",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
        overflow: "hidden",
        borderColor: "rgba(99, 102, 241, 0.08)",
      }}
    >
      {/* Gradient accent bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--gradient-accent)",
          opacity: 0.6,
        }}
      />
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-60%",
          right: "-30%",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <span
        className="stat-number"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: isLarge ? "3.25rem" : "2.5rem",
          fontWeight: 700,
          background: "var(--gradient-accent)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
        }}
      >
        {isKnight ? "Knight" : `${count}${suffix}`}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          letterSpacing: "0.02em",
        }}
      >
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
    } catch {
      /* fallback: noop */
    }
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied
          ? "rgba(34, 197, 94, 0.08)"
          : "rgba(99, 102, 241, 0.06)",
        border: `1px solid ${copied ? "rgba(34, 197, 94, 0.2)" : "var(--border)"}`,
        borderRadius: "var(--radius-sm)",
        padding: "6px 12px",
        cursor: "pointer",
        color: copied ? "var(--accent-verify)" : "var(--text-secondary)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.75rem",
        fontWeight: 500,
        transition: "all var(--transition-base)",
      }}
      aria-label={`Copy ${text}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */

export default function HomePage() {
  /* ── Stats IntersectionObserver ── */
  const statsSection = useInView();

  /* ── Contact form state ── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMsg("");
    try {
      const formPayload = new FormData(e.target);
      formPayload.append("access_key", "648d6616-d5e5-4fd8-8615-90faa9ada7bc");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        e.target.reset();
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      setFormStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════ */}
      <section
        className="section-spacing container-main"
        style={{
          paddingTop: "120px",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Hero background radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "700px",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 35%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "64px",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left */}
          <motion.div
            style={{ flex: "1 1 480px", minWidth: "300px" }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Name */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              Sourav Yadav
            </motion.h1>

            {/* Headlines */}
            <motion.div
              variants={fadeUp}
              custom={1}
              style={{ marginBottom: "24px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "clamp(0.9rem, 2vw, 1.125rem)",
                  color: "var(--accent-verify)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                Protocol Engineer{" "}
                <span
                  style={{
                    color: "var(--text-muted)",
                    margin: "0 8px",
                    opacity: 0.5,
                  }}
                >
                  •
                </span>{" "}
                Smart Contract Security Researcher{" "}
                <span
                  style={{
                    color: "var(--text-muted)",
                    margin: "0 8px",
                    opacity: 0.5,
                  }}
                >
                  •
                </span>{" "}
                Web3 Full-Stack Engineer
              </h2>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                maxWidth: "560px",
                marginBottom: "36px",
              }}
            >
              Building secure protocol infrastructure, auditing production DeFi
              systems, and shipping full-stack Web3 applications.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
            >
              <a href="/resume/Web3Resume.pdf" download className="btn-primary">
                <Download size={16} />
                Download Resume
              </a>
              <a
                href="https://github.com/Sourav-IIITBPL"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
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

          {/* Right — Profile photo with gradient border ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              flex: "0 0 auto",
              position: "relative",
            }}
          >
            {/* Glow behind photo */}
            <div
              style={{
                position: "absolute",
                inset: "-30px",
                background:
                  "radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
                borderRadius: "24px",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            {/* Gradient border ring */}
            <div
              style={{
                position: "relative",
                padding: "3px",
                borderRadius: "var(--radius-lg)",
                background: "var(--gradient-accent)",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/my-photo.png"
                alt="Sourav Yadav"
                width={320}
                height={320}
                priority
                style={{
                  borderRadius: "13px",
                  objectFit: "cover",
                  display: "block",
                  background: "var(--bg-base)",
                }}
              />
            </div>
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
          <p
            style={{
              maxWidth: "800px",
              fontSize: "1.125rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              marginBottom: "20px",
            }}
          >
            I&apos;m a Protocol Engineer, Smart Contract Security Researcher,
            and Web3 Full-Stack Engineer who builds resilient decentralized
            systems and secures them through rigorous adversarial analysis. My
            journey into the Ethereum ecosystem has been driven by a deep
            curiosity for protocol accounting, cryptography, distributed
            systems, and mechanism design. Over the past year, I've audited 20+
            production DeFi protocols across Sherlock, Code4rena, and Cantina,
            analyzing complex AMMs, lending markets, ERC-4626 vaults, staking
            protocols, and cross-chain messaging infrastructure. This hands-on
            security research has led to 11 validated findings, helping uncover
            critical vulnerabilities before they could impact production
            systems.
          </p>
          <p
            style={{
              maxWidth: "800px",
              fontSize: "1.125rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              marginBottom: "20px",
            }}
          >
            Beyond security research, I enjoy designing and building
            production-grade Web3 infrastructure. I've architected PreFlight, a
            pre-transaction security middleware that combines on-chain protocol
            guards with off-chain simulation to protect DeFi users before
            execution; SettleOne, a yield-generating payment commitment protocol
            for secure B2B settlements; Protocol Invariant Checker (PIC), a
            modular Rust framework for protocol security analysis; and
            DexGateway, a multi-chain DEX routing platform spanning nine
            blockchain networks. I approach every protocol with an engineer's
            mindset—thinking in invariants, threat models, protocol correctness,
            and adversarial edge cases. I write code with the same scrutiny I
            apply during security reviews, operating under the assumption that
            every production system will eventually be tested by determined
            adversaries.
          </p>
          <p
            style={{
              maxWidth: "800px",
              fontSize: "1.125rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
            }}
          >
            I&apos;m currently pursuing my B.Tech in Electronics & Communication
            Engineering at IIIT Bhopal, graduating in 2027, while continuing to
            deepen my expertise in protocol engineering, smart contract
            security, and scalable decentralized infrastructure.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          5. FEATURED PROFILES
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-02" label="Profiles" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
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
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  textDecoration: "none",
                  cursor: "pointer",
                  position: "relative",
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
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
                  }}
                />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--accent-flag-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(99,102,241,0.15)",
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent
                      size={20}
                      style={{ color: "var(--accent-flag)" }}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        display: "block",
                      }}
                    >
                      {profile.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {profile.handle}
                    </span>
                  </div>
                </div>
                {profile.stat && (
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--accent-verify)",
                      fontFamily: "var(--font-mono), monospace",
                      fontWeight: 500,
                    }}
                  >
                    {profile.stat}
                  </span>
                )}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: "auto",
                    transition: "color var(--transition-fast)",
                  }}
                >
                  Visit Profile <ExternalLink size={11} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          3. STATISTICS
          ═══════════════════════════════════════════ */}
      <section
        className="section-spacing container-main"
        ref={statsSection.ref}
      >
        <SectionEyebrow id="SEC-03" label="Statistics" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
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
        <SectionEyebrow id="SEC-04" label="Featured Projects" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              className="card card-accent"
              variants={fadeUp}
              custom={idx}
              style={{
                display: "flex",
                flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
                flexWrap: "wrap",
                gap: "36px",
                padding: "36px",
                alignItems: "flex-start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient accent at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), rgba(139,92,246,0.15), transparent)",
                }}
              />

              {/* Logo / Placeholder */}
              <div
                style={{
                  flex: "0 0 110px",
                  height: "110px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "var(--radius-md)",
                      objectFit: "contain",
                      background: "var(--bg-base)",
                      padding: "10px",
                      border: "1px solid var(--border)",
                    }}
                  />
                ) : (
                  <div
                    className="image-placeholder"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-display), sans-serif",
                      color: "var(--accent-flag)",
                    }}
                  >
                    {project.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.8125rem",
                    color: "var(--accent-verify)",
                    marginBottom: "14px",
                    fontWeight: 500,
                  }}
                >
                  {project.tagline}
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    marginBottom: "18px",
                  }}
                >
                  {project.problem}
                </p>

                {/* Tech badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "18px",
                  }}
                >
                  {project.stack.slice(0, 6).map((tech) => (
                    <span key={tech} className="badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--accent-flag)",
                    transition: "gap var(--transition-base)",
                  }}
                >
                  Explore Project <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
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
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Side accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "2px",
                  height: "100%",
                  background:
                    finding.platform === "Sherlock"
                      ? "var(--accent-verify)"
                      : finding.platform === "Code4rena"
                        ? "var(--accent-flag)"
                        : "var(--text-muted)",
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {finding.protocol}
                </h4>
                <span
                  className="badge"
                  style={{
                    background:
                      finding.platform === "Sherlock"
                        ? "rgba(34,197,94,0.1)"
                        : finding.platform === "Code4rena"
                          ? "var(--accent-flag-soft)"
                          : "rgba(139,152,165,0.1)",
                    color:
                      finding.platform === "Sherlock"
                        ? "var(--accent-verify)"
                        : finding.platform === "Code4rena"
                          ? "var(--accent-flag)"
                          : "var(--text-muted)",
                    borderColor: "transparent",
                    fontWeight: 500,
                  }}
                >
                  {finding.platform}
                </span>
              </div>
              {finding.findingSummary && (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {finding.findingSummary}
                </p>
              )}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--accent-flag)",
                  marginTop: "auto",
                }}
              >
                Read Analysis <ArrowRight size={13} />
              </span>
            </motion.a>
          ))}
        </motion.div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/security-research"
            className="btn-secondary"
            style={{ display: "inline-flex" }}
          >
            Explore Security Research <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. HACKATHONS, ACHIEVEMENTS & COURSES
          ═══════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow
          id="SEC-06"
          label="Hackathons, Achievements & Courses"
        />
        <div
          className="timeline-rail"
          style={{
            paddingLeft: "32px",
            borderImage:
              "linear-gradient(180deg, var(--accent-flag) 0%, rgba(139,92,246,0.5) 50%, rgba(167,139,250,0.2) 100%) 1",
          }}
        >
          {achievements.map((achievement, idx) => (
            <motion.div
              key={`${achievement.title}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: "relative",
                paddingBottom: "40px",
                paddingLeft: "28px",
              }}
            >
              {/* Dot on rail with glow */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "6px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "var(--gradient-accent)",
                  border: "2.5px solid var(--bg-base)",
                  boxShadow:
                    "0 0 0 3px rgba(99,102,241,0.2), 0 0 12px rgba(99,102,241,0.15)",
                }}
              />

              {/* Year */}
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  color: "var(--accent-flag)",
                  letterSpacing: "0.05em",
                  display: "inline-block",
                  marginBottom: "8px",
                  fontWeight: 600,
                  background: "var(--accent-flag-soft)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                {achievement.year}
              </span>

              <h4
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                {achievement.title}
              </h4>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                {achievement.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {achievement.certificatePath &&
                  (achievement.certificatePath.match(
                    /\.(jpeg|jpg|gif|png|webp)$/i,
                  ) ? (
                    <a
                      href={achievement.certificatePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        maxWidth: "300px",
                        overflow: "hidden",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        transition: "border-color var(--transition-base)",
                      }}
                    >
                      <Image
                        src={achievement.certificatePath}
                        alt={achievement.title}
                        width={300}
                        height={200}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </a>
                  ) : achievement.certificatePath.match(/\.pdf$/i) ? (
                    <a
                      href={achievement.certificatePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        maxWidth: "300px",
                        height: "215px",
                        overflow: "hidden",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 10,
                          cursor: "pointer",
                        }}
                      />
                      <iframe
                        src={`${achievement.certificatePath}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          pointerEvents: "none",
                        }}
                        title={achievement.title}
                        tabIndex={-1}
                        scrolling="no"
                      />
                    </a>
                  ) : null)}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {achievement.certificatePath &&
                    !achievement.certificatePath.match(
                      /\.(jpeg|jpg|gif|png|webp|pdf)$/i,
                    ) && (
                      <a
                        href={achievement.certificatePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "var(--accent-verify)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
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
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--accent-flag)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      View Profile <ArrowRight size={12} />
                    </a>
                  )}
                </div>
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
          style={{ display: "flex", flexDirection: "column", gap: "32px" }}
        >
          {techStack.map((category, idx) => (
            <motion.div key={category.label} variants={fadeUp} custom={idx}>
              <h4
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent-flag)",
                  marginBottom: "14px",
                  fontWeight: 600,
                }}
              >
                {category.label}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {category.items.map((item: any) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.name}
                      className="badge"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: "var(--radius-full)",
                        padding: "6px 14px",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        transition:
                          "border-color var(--transition-fast), background var(--transition-fast)",
                      }}
                    >
                      <Icon
                        size={14}
                        style={{ color: item.color || "var(--accent-flag)" }}
                      />{" "}
                      {item.name}
                    </span>
                  );
                })}
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
            padding: "36px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            maxWidth: "640px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, var(--accent-verify), var(--accent-flag))",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "var(--radius-md)",
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(34,197,94,0.18)",
              flexShrink: 0,
            }}
          >
            <GraduationCap
              size={26}
              style={{ color: "var(--accent-verify)" }}
            />
          </div>
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "6px",
                letterSpacing: "-0.01em",
              }}
            >
              IIIT Bhopal
            </h4>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              B.Tech in Electronics &amp; Communication Engineering
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "12px",
                flexWrap: "wrap",
              }}
            >
              <span
                className="badge"
                style={{
                  color: "var(--accent-verify)",
                  borderColor: "rgba(34,197,94,0.25)",
                  background: "rgba(34,197,94,0.08)",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  padding: "4px 14px",
                }}
              >
                CGPA: 7.57 / 10
              </span>
              <span
                className="badge"
                style={{
                  color: "var(--accent-flag)",
                  borderColor: "rgba(99,102,241,0.25)",
                  background: "var(--accent-flag-soft)",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  padding: "4px 14px",
                }}
              >
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "28px",
                letterSpacing: "-0.01em",
              }}
            >
              Get in touch
            </h3>

            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFormStatus("idle")}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    background: "rgba(5, 5, 5, 0.75)",
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="card"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: "56px 40px",
                      textAlign: "center",
                      maxWidth: "460px",
                      background: "var(--bg-surface)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Gradient accent at top of modal */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background:
                          "linear-gradient(90deg, var(--accent-verify), var(--accent-flag), var(--accent-verify))",
                      }}
                    />
                    {/* Success glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "200px",
                        height: "200px",
                        background:
                          "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <Check
                        size={28}
                        style={{ color: "var(--accent-verify)" }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "1.5rem",
                        color: "var(--text-primary)",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Message sent!
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      Your message has been sent directly to{" "}
                      <strong style={{ color: "var(--text-primary)" }}>
                        sourav.dev.official@outlook.com
                      </strong>
                      . I&apos;ll reply within a day or two.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      marginBottom: "8px",
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    required
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    disabled={formStatus === "loading"}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontSize: "0.9375rem",
                      fontFamily: "var(--font-body), sans-serif",
                      transition:
                        "border-color var(--transition-base), box-shadow var(--transition-base)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent-flag)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(99,102,241,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  disabled={formStatus === "loading"}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.9375rem",
                    fontFamily: "var(--font-body), sans-serif",
                    resize: "vertical",
                    outline: "none",
                    transition:
                      "border-color var(--transition-base), box-shadow var(--transition-base)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent-flag)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {formStatus === "error" && (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--severity-high)",
                  }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={formStatus === "loading"}
                style={{
                  justifyContent: "center",
                  opacity: formStatus === "loading" ? 0.7 : 1,
                }}
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2
                      size={16}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
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
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "28px",
                letterSpacing: "-0.01em",
              }}
            >
              Contact links
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {contactLinks.map((link) => (
                <div
                  key={link.label}
                  className="card"
                  style={{
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {link.icon && (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "var(--radius-sm)",
                          background:
                            "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(99,102,241,0.06))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--border)",
                          flexShrink: 0,
                        }}
                      >
                        <link.icon
                          size={18}
                          style={{ color: "var(--accent-verify)" }}
                        />
                      </div>
                    )}
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          marginBottom: "3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          fontWeight: 500,
                        }}
                      >
                        {link.label}
                      </span>
                      {link.url ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.9375rem",
                            fontFamily: "var(--font-mono), monospace",
                            color: "var(--accent-flag)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: 500,
                          }}
                        >
                          {link.value} <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.9375rem",
                            fontFamily: "var(--font-mono), monospace",
                            color: "var(--text-primary)",
                          }}
                        >
                          {link.value}
                        </span>
                      )}
                    </div>
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
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
