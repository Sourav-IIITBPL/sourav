import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";
import {
  validatedFindings,
  auditArchive,
  securityKnowledge,
  methodologySteps,
} from "@/data/audits";

export const metadata: Metadata = {
  title: "Security Research — Sourav Yadav",
  description:
    "Smart contract security research: 20+ protocol audits, validated findings, methodology, and competitive audit archive.",
};

/* ── Platform color map ── */
const platformColor: Record<string, string> = {
  Sherlock: "#4A9EFF",
  Code4rena: "#A855F7",
  Cantina: "#22C55E",
};

/* ── Category pills for hero ── */
const categories = [
  "AMMs",
  "Vaults",
  "Lending",
  "Cross-Chain",
  "DEX",
  "Smart Contracts",
  "Access Control",
  "Protocol Accounting",
  "Logic Flaws",
  "Tokenomics",
  "Staking",
];

export default function SecurityResearchPage() {
  return (
    <div style={{ paddingBottom: "var(--section-gap)" }}>
      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section
        className="container-main"
        style={{ paddingTop: 120, paddingBottom: "var(--section-gap)" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          Security Research
        </h1>

        {/* Stats Flex Layout */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "64px",
            marginBottom: 32,
          }}
        >
          {/* Left Stat: Protocols */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span
                className="stat-number"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  fontWeight: 800,
                  color: "var(--accent-flag)",
                  lineHeight: 1,
                }}
              >
                21
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                }}
              >
                Protocols Audited
              </span>
            </div>
            {/* Category pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                maxWidth: 500,
              }}
            >
              {categories.map((cat) => (
                <span className="badge" key={cat}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Right Stat: Findings */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span
                className="stat-number"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  fontWeight: 800,
                  color: "var(--accent-verify)",
                  lineHeight: 1,
                }}
              >
                11
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                }}
              >
                Validated Findings
              </span>
            </div>
            {/* Findings breakdown */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div
                className="card"
                style={{
                  padding: "12px 20px",
                  textAlign: "center",
                  borderColor: "rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.05)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ef4444",
                    fontFamily: "var(--font-display), sans-serif",
                  }}
                >
                  2
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  High
                </span>
              </div>
              <div
                className="card"
                style={{
                  padding: "12px 20px",
                  textAlign: "center",
                  borderColor: "rgba(245,158,11,0.3)",
                  background: "rgba(245,158,11,0.05)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f59e0b",
                    fontFamily: "var(--font-display), sans-serif",
                  }}
                >
                  3
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  Medium
                </span>
              </div>
              <div
                className="card"
                style={{
                  padding: "12px 20px",
                  textAlign: "center",
                  borderColor: "rgba(139,152,165,0.3)",
                  background: "rgba(139,152,165,0.05)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-display), sans-serif",
                  }}
                >
                  6
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  Low
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VALIDATED FINDINGS
      ═══════════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-S1" label="Validated Findings" />

        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 36,
          }}
        >
          Validated Findings
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: 20,
          }}
        >
          {validatedFindings.map((f, i) => (
            <div key={i} className="card" style={{ padding: "28px 28px 24px" }}>
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {f.protocol}
                </h3>
                <span
                  className="badge"
                  style={{
                    borderColor: platformColor[f.platform] ?? "var(--border)",
                    color: platformColor[f.platform] ?? "var(--text-muted)",
                  }}
                >
                  {f.platform}
                </span>
              </div>

              {/* Metadata tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                <span
                  className="badge"
                  style={{ fontSize: "0.7rem", color: "var(--text-primary)" }}
                >
                  {f.category}
                </span>
                {f.severity &&
                  f.severity.filter(Boolean).map((s) => (
                    <span
                      key={s}
                      className="badge"
                      style={{
                        fontSize: "0.7rem",
                        borderColor:
                          s === "High"
                            ? "rgba(239,68,68,0.3)"
                            : "var(--border)",
                        color:
                          s === "High"
                            ? "#ef4444"
                            : s === "Medium"
                              ? "#f59e0b"
                              : "var(--text-muted)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                {f.time && (
                  <span className="badge" style={{ fontSize: "0.7rem" }}>
                    {f.time}
                  </span>
                )}
                {f.rank && (
                  <span
                    className="badge"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--accent-verify)",
                    }}
                  >
                    Rank {f.rank}
                  </span>
                )}
                {f.findings !== undefined && (
                  <span className="badge" style={{ fontSize: "0.7rem" }}>
                    {f.findings} Findings
                  </span>
                )}
              </div>

              {/* Summary */}
              {f.findingSummary && (
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {f.findingSummary}
                </p>
              )}

              {/* Technologies */}
              {f.technologies && f.technologies.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 18,
                  }}
                >
                  {f.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="badge"
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono), monospace",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              <a
                href={f.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--accent-flag)",
                  transition: "opacity var(--transition-base)",
                }}
              >
                Read Analysis
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          METHODOLOGY — Visual Flow Diagram
      ═══════════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-S2" label="Methodology" />

        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 48,
          }}
        >
          Audit Methodology
        </h2>

        {/* ── Flow diagram (CSS Grid + pseudo-element connectors) ── */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .meth-flow {
                display: flex;
                align-items: flex-start;
                gap: 0;
                overflow-x: auto;
                padding: 20px 0 24px;
              }
              .meth-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                min-width: 120px;
                flex: 1;
                position: relative;
              }
              /* numbered circle */
              .meth-circle {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: rgba(242, 169, 59, 0.12);
                border: 2px solid var(--accent-flag);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-display), sans-serif;
                font-weight: 700;
                font-size: 1.1rem;
                color: var(--accent-flag);
                position: relative;
                z-index: 2;
                transition: background var(--transition-base), transform var(--transition-base);
              }
              .meth-step:hover .meth-circle {
                background: rgba(242, 169, 59, 0.25);
                transform: scale(1.1);
              }
              /* step label */
              .meth-label {
                margin-top: 14px;
                font-family: var(--font-body), sans-serif;
                font-size: 0.82rem;
                font-weight: 500;
                color: var(--text-muted);
                text-align: center;
                max-width: 110px;
                line-height: 1.35;
                transition: color var(--transition-base);
              }
              .meth-step:hover .meth-label {
                color: var(--text-primary);
              }
              /* connecting line (between circles, not after last) */
              .meth-connector {
                display: flex;
                align-items: center;
                padding-top: 0;
                /* center vertically with circle (52/2 = 26px from top) */
                margin-top: 26px;
                transform: translateY(-50%);
              }
              .meth-connector-line {
                width: 32px;
                height: 2px;
                background: var(--accent-verify);
                position: relative;
              }
              /* arrow head */
              .meth-connector-line::after {
                content: "";
                position: absolute;
                right: -1px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 7px solid var(--accent-verify);
              }

              /* ── Mobile: vertical flow ── */
              @media (max-width: 768px) {
                .meth-flow {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 0;
                  overflow-x: visible;
                  padding: 0;
                }
                .meth-step {
                  flex-direction: row;
                  gap: 16px;
                  min-width: unset;
                  align-items: center;
                }
                .meth-label {
                  margin-top: 0;
                  text-align: left;
                  max-width: unset;
                }
                .meth-connector {
                  margin-top: 0;
                  transform: none;
                  flex-direction: column;
                  padding-left: 25px;
                }
                .meth-connector-line {
                  width: 2px;
                  height: 28px;
                }
                .meth-connector-line::after {
                  right: unset;
                  bottom: -1px;
                  top: unset;
                  left: 50%;
                  transform: translateX(-50%);
                  border-left: 5px solid transparent;
                  border-right: 5px solid transparent;
                  border-top: 7px solid var(--accent-verify);
                  border-bottom: none;
                }
              }
            `,
          }}
        />

        <div
          className="meth-flow"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "36px 28px",
          }}
        >
          {methodologySteps.map((step, i) => (
            <div key={step} style={{ display: "contents" }}>
              <div className="meth-step">
                <div className="meth-circle">{i + 1}</div>
                <span className="meth-label">{step}</span>
              </div>
              {i < methodologySteps.length - 1 && (
                <div className="meth-connector">
                  <div className="meth-connector-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECURITY KNOWLEDGE
      ═══════════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-S3" label="Security Knowledge" />

        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 36,
          }}
        >
          Security Knowledge
        </h2>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .knowledge-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
              }
              @media (max-width: 1024px) {
                .knowledge-grid { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 768px) {
                .knowledge-grid { grid-template-columns: 1fr; }
              }
            `,
          }}
        />

        <div className="knowledge-grid">
          {securityKnowledge.map((item, i) => (
            <div key={i} className="card" style={{ padding: "24px 24px 22px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AUDIT ARCHIVE
      ═══════════════════════════════════════════════ */}
      <section className="section-spacing container-main">
        <SectionEyebrow id="SEC-S4" label="Audit Archive" />

        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 36,
          }}
        >
          Audit Archive
        </h2>

        {/* Responsive styles for archive */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .archive-table-wrap {
                overflow-x: auto;
                border-radius: 8px;
                border: 1px solid var(--border);
              }
              .archive-table {
                width: 100%;
                border-collapse: collapse;
                background: var(--bg-surface);
              }
              .archive-table th {
                text-align: left;
                padding: 14px 20px;
                font-family: var(--font-display), sans-serif;
                font-size: 0.78rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--text-muted);
                border-bottom: 1px solid var(--border);
                background: var(--bg-base);
              }
              .archive-table td {
                padding: 14px 20px;
                font-size: 0.88rem;
                color: var(--text-primary);
                border-bottom: 1px solid var(--border);
              }
              .archive-table tr:last-child td {
                border-bottom: none;
              }
              .archive-table tr:hover td {
                background: rgba(242, 169, 59, 0.04);
              }
              .archive-table .proto-name {
                font-family: var(--font-mono), monospace;
                font-weight: 500;
              }

              /* Desktop: show table, hide cards */
              .archive-cards { display: none; }
              .archive-table-wrap { display: block; }

              @media (max-width: 768px) {
                .archive-table-wrap { display: none !important; }
                .archive-cards { display: grid !important; gap: 14px; }
              }
            `,
          }}
        />

        {/* Desktop table */}
        <div className="archive-table-wrap">
          <table className="archive-table">
            <thead>
              <tr>
                <th>Protocol</th>
                <th>Platform</th>
                <th>Date</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {auditArchive.map((a, i) => (
                <tr key={i}>
                  <td className="proto-name">{a.protocol}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        borderColor:
                          platformColor[a.platform] ?? "var(--border)",
                        color: platformColor[a.platform] ?? "var(--text-muted)",
                      }}
                    >
                      {a.platform}
                    </span>
                  </td>
                  <td>{a.date}</td>
                  <td>
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent-flag)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      View <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="archive-cards" style={{ display: "none" }}>
          {auditArchive.map((a, i) => (
            <div key={i} className="card" style={{ padding: "20px 20px 18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {a.protocol}
                </span>
                <span
                  className="badge"
                  style={{
                    borderColor: platformColor[a.platform] ?? "var(--border)",
                    color: platformColor[a.platform] ?? "var(--text-muted)",
                  }}
                >
                  {a.platform}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="badge" style={{ fontSize: "0.72rem" }}>
                    {a.date}
                  </span>
                </div>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--accent-flag)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  View <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
