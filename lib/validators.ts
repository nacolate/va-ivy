import { z } from "zod";

export const academicSubjectSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  grade: z.enum(["GRADE_9", "GRADE_10", "GRADE_11", "GRADE_12", "AP"]),
  level: z.string().optional(),
  importanceLevel: z.coerce.number().min(1).max(5).default(3),
  targetScore: z.string().optional(),
  actualScore: z.string().optional(),
  studyMode: z.string().optional(),
  teacher: z.string().optional(),
  mentor: z.string().optional(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export const testingItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  targetScore: z.string().optional(),
  actualScore: z.string().optional(),
  plannedDate: z.string().optional().nullable(),
  actualDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
});

export const activitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  impact: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
});

export const awardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  result: z.string().optional(),
  plannedDate: z.string().optional().nullable(),
  actualDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
});

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  mentor: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  outcome: z.string().optional(),
  notes: z.string().optional(),
});

export const researchSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  mentor: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  output: z.string().optional(),
  notes: z.string().optional(),
});

export const chessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  result: z.string().optional(),
  eloChange: z.coerce.number().optional().nullable(),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  notes: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["ACADEMIC", "TESTING", "ACTIVITY", "AWARD", "BOOK", "PROJECT", "RESEARCH", "CHESS", "GENERAL"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "PAUSED", "CANCELLED"]).default("PLANNED"),
  startDate: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  completedAt: z.string().optional().nullable(),
  academicSubjectId: z.coerce.number().optional().nullable(),
  testingItemId: z.coerce.number().optional().nullable(),
  activityId: z.coerce.number().optional().nullable(),
  awardId: z.coerce.number().optional().nullable(),
  bookId: z.coerce.number().optional().nullable(),
  projectId: z.coerce.number().optional().nullable(),
  researchId: z.coerce.number().optional().nullable(),
  chessTournamentId: z.coerce.number().optional().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
