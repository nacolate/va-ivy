export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { testingItemSchema } from "@/lib/validators";

export async function GET() {
  const items = await prisma.testingItem.findMany({ include: { tasks: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = testingItemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { plannedDate, actualDate, ...rest } = parsed.data;
  const item = await prisma.testingItem.create({
    data: { ...rest, plannedDate: plannedDate ? new Date(plannedDate) : null, actualDate: actualDate ? new Date(actualDate) : null },
  });
  return NextResponse.json(item, { status: 201 });
}
