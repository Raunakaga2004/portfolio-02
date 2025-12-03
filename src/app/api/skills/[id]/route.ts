// app/api/skills/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(skill);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();

  const skill = await prisma.skill.update({
    where: { id },
    data,
  });

  return NextResponse.json(skill);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);

  await prisma.skill.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
