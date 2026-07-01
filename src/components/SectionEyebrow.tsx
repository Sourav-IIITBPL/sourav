interface SectionEyebrowProps {
  id: string;
  label: string;
}

export default function SectionEyebrow({ id, label }: SectionEyebrowProps) {
  return (
    <div className="section-eyebrow" style={{ fontFamily: "var(--font-mono), monospace" }}>
      <span>{id} // {label.toUpperCase()}</span>
    </div>
  );
}
