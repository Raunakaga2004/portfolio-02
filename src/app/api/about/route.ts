// app/api/about/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const about = await prisma.aboutSection.findFirst();
  return NextResponse.json(about);
}

export async function PUT(req: Request) {
  const data = await req.json();

  const existing = await prisma.aboutSection.findFirst();

  const updated = existing
    ? await prisma.aboutSection.update({
        where: { id: existing.id },
        data,
      })
    : await prisma.aboutSection.create({ data });

  return NextResponse.json(updated);
}
