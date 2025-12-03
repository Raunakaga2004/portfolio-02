// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const blog = await prisma.blog.findUnique({ where: { id } });

  if (!blog) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();

  const blog = await prisma.blog.update({
    where: { id },
    data,
  });

  return NextResponse.json(blog);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.blog.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
