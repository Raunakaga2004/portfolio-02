// app/api/certifications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const certs = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
  return NextResponse.json(certs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const cert = await prisma.experience.create({ data });
  return NextResponse.json(cert, { status: 201 });
}
