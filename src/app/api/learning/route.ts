// app/api/learning/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const learningSkills = await prisma.skill.findMany({
    where: { isLearning: true },
    include: { category: true },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(learningSkills);
}
