import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-body font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border bg-white font-body text-ink placeholder:text-muted",
          "focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand",
          "transition-colors duration-200",
          error ? "border-alert" : "border-sage/40",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-alert">{error}</p>}
    </div>
  );
}
