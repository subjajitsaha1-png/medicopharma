import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "tab" | "again" | "hard" | "good" | "easy";
  active?: boolean;
}

const variantClasses: Record<string, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:brightness-95",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  tab: "text-muted-foreground hover:bg-card hover:text-foreground",
  again: "bg-rose-100 text-rose-700 hover:bg-rose-200",
  hard: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  good: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  easy: "bg-violet-100 text-violet-700 hover:bg-violet-200",
};

export function Button({ variant = "default", active, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        active && "bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
