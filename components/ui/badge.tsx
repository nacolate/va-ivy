"use client";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-slate-100 text-slate-700",
        variant === "success" && "bg-emerald-100 text-emerald-700",
        variant === "warning" && "bg-amber-100 text-amber-700",
        variant === "danger" && "bg-red-100 text-red-700",
        variant === "info" && "bg-blue-100 text-blue-700",
        variant === "muted" && "bg-slate-100 text-slate-500",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    PLANNED: { label: "Planned", variant: "default" },
    IN_PROGRESS: { label: "In Progress", variant: "info" },
    COMPLETED: { label: "Completed", variant: "success" },
    PAUSED: { label: "Paused", variant: "warning" },
    CANCELLED: { label: "Cancelled", variant: "danger" },
  };
  const { label, variant } = map[status] ?? { label: status, variant: "default" };
  return <Badge variant={variant}>{label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    LOW: { label: "Low", variant: "muted" },
    MEDIUM: { label: "Medium", variant: "default" },
    HIGH: { label: "High", variant: "warning" },
    CRITICAL: { label: "Critical", variant: "danger" },
  };
  const { label, variant } = map[priority] ?? { label: priority, variant: "default" };
  return <Badge variant={variant}>{label}</Badge>;
}
