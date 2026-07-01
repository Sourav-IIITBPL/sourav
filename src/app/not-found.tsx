import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        paddingTop: 64,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.875rem",
          color: "var(--accent-flag)",
          letterSpacing: "0.1em",
        }}
      >
        404 // ROUTE NOT FOUND
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.9375rem",
          maxWidth: 400,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary" style={{ marginTop: 8 }}>
        Back to Home
      </Link>
    </div>
  );
}
