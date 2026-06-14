import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-blue-700 text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800",
  secondary:
    "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
