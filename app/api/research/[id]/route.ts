import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { researchSchema } from "@/lib/validators";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.research.findUnique({ where: { id: Number(params.id) }, include: { tasks: true } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = researchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { startDate, endDate, ...rest } = parsed.data;
  const item = await prisma.research.update({
    where: { id: Number(params.id) },
    data: { ...rest, startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null },
  });
  return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.research.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
