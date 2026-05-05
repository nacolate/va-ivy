import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const items = await prisma.task.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(priority ? { priority: priority as any } : {}),
      ...(category ? { category: category as any } : {}),
      ...(search ? { title: { contains: search } } : {}),
    },
    include: {
      academicSubject: { select: { subject: true } },
      testingItem: { select: { name: true } },
      activity: { select: { name: true } },
      award: { select: { name: true } },
      book: { select: { title: true } },
      project: { select: { name: true } },
      research: { select: { title: true } },
      chessTournament: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { startDate, dueDate, completedAt, ...rest } = parsed.data;
  const item = await prisma.task.create({
    data: {
      ...rest,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: completedAt ? new Date(completedAt) : null,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
