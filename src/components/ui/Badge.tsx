import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "alert" | "sage";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-semibold uppercase tracking-wide",
        {
          "bg-brand text-white": variant === "default",
          "bg-alert text-white": variant === "alert",
          "bg-sage/20 text-sage": variant === "sage",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
