// app/api/skills/categories/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    include: { skills: true },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const category = await prisma.skillCategory.create({ data });
  return NextResponse.json(category, { status: 201 });
}
