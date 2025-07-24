import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const races = await prisma.race.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(races);
}
