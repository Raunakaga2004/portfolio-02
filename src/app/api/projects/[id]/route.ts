// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();

  const project = await prisma.project.update({
    where: { id },
    data,
  });

  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.project.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
