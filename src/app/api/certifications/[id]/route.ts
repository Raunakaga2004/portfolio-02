// app/api/certifications/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const cert = await prisma.certification.findUnique({ where: { id } });

  if (!cert) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(cert);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();

  const cert = await prisma.certification.update({
    where: { id },
    data,
  });

  return NextResponse.json(cert);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.certification.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
