import type { Metadata } from "next";
import { Download } from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Resume — Sourav Yadav",
  description:
    "Download Sourav Yadav's resume — Protocol Engineer and Smart Contract Security Researcher.",
};

export default function ResumePage() {
  return (
    <div
      className="container-main"
      style={{
        paddingTop: 120,
        paddingBottom: "var(--section-gap)",
      }}
    >
      {/* Decorative gradient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 260,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionEyebrow id="SEC-R0" label="Resume" />

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          Resume
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          Protocol Engineer &amp; Smart Contract Security Researcher.
        </p>

        {/* ── Download button (top) ── */}
        <div style={{ marginBottom: 28 }}>
          <a
            href="/resume/Web3Resume.pdf"
            download
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>

        {/* ── Accent divider ── */}
        <div
          aria-hidden="true"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.25) 30%, rgba(139,92,246,0.15) 70%, transparent 100%)",
            marginBottom: 28,
          }}
        />

        {/* ── PDF Preview ── */}
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <iframe
            src="/resume/Web3Resume.pdf"
            title="Resume — Sourav Yadav"
            style={{
              width: "100%",
              minHeight: 800,
              border: "1px solid var(--border)",
              borderRadius: 12,
              background: "var(--bg-surface)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          />
        </div>

        {/* ── Download button (bottom) ── */}
        <div
          style={{ marginTop: 36, display: "flex", justifyContent: "center" }}
        >
          <a
            href="/resume/Web3Resume.pdf"
            download
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
