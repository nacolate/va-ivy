import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isAfter, isBefore, addDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return format(new Date(date), "MMM d, yyyy");
}

export function isOverdue(dueDate: Date | string | null | undefined, status: string): boolean {
  if (!dueDate || status === "COMPLETED") return false;
  return isBefore(new Date(dueDate), new Date());
}

export function isDueSoon(dueDate: Date | string | null | undefined, status: string): boolean {
  if (!dueDate || status === "COMPLETED") return false;
  const now = new Date();
  const due = new Date(dueDate);
  return isAfter(due, now) && isBefore(due, addDays(now, 7));
}

export function calcProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export const STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PAUSED: "Paused",
  CANCELLED: "Cancelled",
};

export const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const GRADE_LABELS: Record<string, string> = {
  GRADE_9: "Grade 9",
  GRADE_10: "Grade 10",
  GRADE_11: "Grade 11",
  GRADE_12: "Grade 12",
  AP: "AP",
};

export const CATEGORY_LABELS: Record<string, string> = {
  ACADEMIC: "Academic",
  TESTING: "Testing",
  ACTIVITY: "Activity",
  AWARD: "Award",
  BOOK: "Book",
  PROJECT: "Project",
  RESEARCH: "Research",
  CHESS: "Chess",
  GENERAL: "General",
};
