import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const data = await req.json()

    // Validaciones básicas (puedes mejorar)
    if (!data.name || !data.cost || !data.editionId || !data.typeId) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 })
    }

    const newCard = await prisma.card.create({
      data: {
        name: data.name,
        description: data.description || null,
        cost: Number(data.cost),
        attack: data.attack ? Number(data.attack) : null,
        isBanned: data.isBanned || false,
        deckLimit: data.deckLimit ? Number(data.deckLimit) : 3,
        imageUrl: data.imageUrl || null,
        raceId: data.raceId ? Number(data.raceId) : null,
        editionId: Number(data.editionId),
        typeId: Number(data.typeId)
      }
    })

    return NextResponse.json(newCard)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  const cards = await prisma.card.findMany({
    include: {
      race: true,
      edition: true,
      type: true
    },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(cards)
}
