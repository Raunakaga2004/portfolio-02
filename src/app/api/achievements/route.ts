// app/api/achievementss/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const certs = await prisma.achievement.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(certs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const cert = await prisma.achievement.create({ data });
  return NextResponse.json(cert, { status: 201 });
}
