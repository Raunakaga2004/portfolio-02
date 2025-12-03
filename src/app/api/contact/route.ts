// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { sentAt: "desc" },
  });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const data = await req.json();

  const msg = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });

  return NextResponse.json(msg, { status: 201 });
}
