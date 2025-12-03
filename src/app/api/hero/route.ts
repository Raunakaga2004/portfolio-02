// app/api/hero/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hero = await prisma.heroSection.findFirst();
  return NextResponse.json(hero);
}

export async function PUT(req: Request) {
  const data = await req.json();

  // There should only be one hero row
  const existing = await prisma.heroSection.findFirst();

  const updated = existing
    ? await prisma.heroSection.update({
        where: { id: existing.id },
        data,
      })
    : await prisma.heroSection.create({ data });

  return NextResponse.json(updated);
}
