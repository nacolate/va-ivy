import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validators";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.task.findUnique({ where: { id: Number(params.id) } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { startDate, dueDate, completedAt, ...rest } = parsed.data;
  const item = await prisma.task.update({
    where: { id: Number(params.id) },
    data: {
      ...rest,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: completedAt ? new Date(completedAt) : null,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.task.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
