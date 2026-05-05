"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-5 py-2.5 text-base",
          variant === "primary" && "bg-blue-900 text-white hover:bg-blue-800",
          variant === "secondary" && "bg-slate-100 text-slate-700 hover:bg-slate-200",
          variant === "ghost" && "text-slate-600 hover:bg-slate-100",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
          variant === "outline" && "border border-slate-300 text-slate-700 hover:bg-slate-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
