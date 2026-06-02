import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-display font-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-brand text-white hover:bg-brand/90 active:scale-[0.98]":
            variant === "primary",
          "bg-sage text-white hover:bg-sage/90 active:scale-[0.98]":
            variant === "secondary",
          "border-2 border-brand text-brand hover:bg-brand hover:text-white active:scale-[0.98]":
            variant === "outline",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-base": size === "md",
          "px-8 py-3.5 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
