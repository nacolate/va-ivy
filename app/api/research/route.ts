export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { researchSchema } from "@/lib/validators";

export async function GET() {
  const items = await prisma.research.findMany({ include: { tasks: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = researchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { startDate, endDate, ...rest } = parsed.data;
  const item = await prisma.research.create({
    data: { ...rest, startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null },
  });
  return NextResponse.json(item, { status: 201 });
}
