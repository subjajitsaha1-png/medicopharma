import type { ReactNode } from "react";
import type { PaletteColor } from "@/lib/palette";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * A colored, numbered heading bar — the "boxed section header" treatment used
 * throughout the app to mark a distinct stage of a chapter (Overview, Mechanism,
 * Classification, Clinical Application, Summary, ...). Purely a layout/typography
 * pattern; no text content lives here.
 */
export function SectionHeader({
  numeral,
  icon,
  label,
  sublabel,
  color,
}: {
  numeral?: number;
  icon: ReactNode;
  label: string;
  sublabel?: string;
  color: PaletteColor;
}) {
  return (
    <div style={{ backgroundColor: color.ring }} className="flex items-center gap-2.5 rounded-t-xl px-4 py-2.5">
      {typeof numeral === "number" && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/25 text-[11px] font-bold text-white">
          {ROMAN[numeral] ?? numeral + 1}
        </span>
      )}
      <span className="text-white/90">{icon}</span>
      <span className="flex-1 text-xs font-bold uppercase tracking-wider text-white sm:text-sm">{label}</span>
      {sublabel && <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white/80">{sublabel}</span>}
    </div>
  );
}

/** The card body that sits under a SectionHeader, sharing its rounded-bottom edge. */
export function SectionBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-b-xl border border-t-0 border-border bg-card p-4 sm:p-5 ${className}`}>{children}</div>;
}

/** A full boxed section: colored header bar + body, in one card with a shadow. */
export function BoxedSection({
  numeral,
  icon,
  label,
  sublabel,
  color,
  children,
  className = "",
}: {
  numeral?: number;
  icon: ReactNode;
  label: string;
  sublabel?: string;
  color: PaletteColor;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl shadow-sm ${className}`}>
      <SectionHeader numeral={numeral} icon={icon} label={label} sublabel={sublabel} color={color} />
      <SectionBody>{children}</SectionBody>
    </div>
  );
}

/**
 * Icon-badged callout box with a colored left rule — the "Clinical Application" /
 * "High-Yield" / "Exam Trap" style boxed aside, distinct from the numbered chapter
 * sections above so it reads as a pulled-out note rather than a stage of the chapter.
 */
export function CalloutBox({
  icon,
  label,
  color,
  tone = "tint",
  children,
}: {
  icon: ReactNode;
  label: string;
  color: PaletteColor;
  tone?: "tint" | "outline";
  children: ReactNode;
}) {
  const style =
    tone === "tint"
      ? { backgroundColor: color.bg, borderLeftColor: color.ring }
      : { backgroundColor: "transparent", borderLeftColor: color.ring };
  const textColor = tone === "tint" ? color.fg : undefined;
  return (
    <div style={{ ...style, borderLeftWidth: 4 }} className={`rounded-lg border border-border p-3.5 sm:p-4 ${tone === "outline" ? "bg-card" : ""}`}>
      <p style={textColor ? { color: textColor } : undefined} className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${tone === "outline" ? "text-card-foreground" : ""}`}>
        {icon}
        {label}
      </p>
      <div style={textColor ? { color: textColor } : undefined} className={`mt-1.5 text-xs leading-relaxed ${tone === "outline" ? "text-card-foreground" : ""}`}>
        {children}
      </div>
    </div>
  );
}
