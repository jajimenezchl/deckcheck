import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const types = await prisma.cardType.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(types);
}
