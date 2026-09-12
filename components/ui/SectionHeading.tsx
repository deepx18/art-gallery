interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {label && (
        <span className="block mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft font-sans">
          {label}
        </span>
      )}
      <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.05] font-medium text-ink">
        {title}
      </h2>
    </div>
  );
}
