import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
        "inline-flex items-center justify-center font-display font-semibold rounded-lg",
        "transition-all duration-200 ease-out",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
        {
          "bg-brand text-white hover:bg-brand/85 active:scale-[0.97] active:bg-brand":
            variant === "primary",
          "bg-sage text-white hover:bg-sage/85 active:scale-[0.97]":
            variant === "secondary",
          "border-2 border-brand text-brand hover:bg-brand hover:text-white active:scale-[0.97]":
            variant === "outline",
          "text-brand hover:bg-brand/8 active:scale-[0.97]":
            variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm gap-1.5": size === "sm",
          "px-5 py-2.5 text-base gap-2": size === "md",
          "px-8 py-3.5 text-lg gap-2.5": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
