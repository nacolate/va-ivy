import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { testingItemSchema } from "@/lib/validators";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.testingItem.findUnique({ where: { id: Number(params.id) }, include: { tasks: true } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = testingItemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { plannedDate, actualDate, ...rest } = parsed.data;
  const item = await prisma.testingItem.update({
    where: { id: Number(params.id) },
    data: { ...rest, plannedDate: plannedDate ? new Date(plannedDate) : null, actualDate: actualDate ? new Date(actualDate) : null },
  });
  return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.testingItem.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
