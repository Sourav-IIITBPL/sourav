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
      <SectionEyebrow id="SEC-R0" label="Resume" />

      <h1
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.15,
          marginBottom: 32,
        }}
      >
        Resume
      </h1>

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

      {/* ── PDF Preview ── */}
      <iframe
        src="/resume/Web3Resume.pdf"
        title="Resume — Sourav Yadav"
        style={{
          width: "100%",
          minHeight: 800,
          border: "1px solid var(--border)",
          borderRadius: 8,
          background: "var(--bg-surface)",
        }}
      />

      {/* ── Download button (bottom) ── */}
      <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
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
  );
}
