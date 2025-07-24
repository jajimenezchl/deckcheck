import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const editions = await prisma.edition.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(editions);
}
