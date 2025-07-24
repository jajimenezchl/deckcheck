// scripts/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Card Types
  await prisma.cardType.createMany({
    data: [
      { name: "Totem" },
      { name: "Oro" },
      { name: "Aliado" },
      { name: "Talisman" },
      { name: "Arma" }
    ],
    skipDuplicates: true
  })

  // Races
  await prisma.race.createMany({
    data: [
      { name: "Caballero" },
      { name: "Héroe" },
      { name: "Defensor" },
      { name: "Eterno" },
      { name: "Dragón" },
      { name: "Olímpico" },
      { name: "Desafiante" },
      { name: "Faraón" },
      { name: "Faerie" },
      { name: "Titán" },
      { name: "Sombra" },
      { name: "Sacerdote" }
    ],
    skipDuplicates: true
  })

  // Editions
  await prisma.edition.createMany({
    data: [
      { name: "Espada Sagrada" },
      { name: "Cruzadas" },
      { name: "Helénica" },
      { name: "Imperio" },
      { name: "Hijos de Daana" },
      { name: "Tierras Altas" },
      { name: "Dominios de Ra" },
      { name: "Encrucijada" }
    ],
    skipDuplicates: true
  })

  console.log("✅ Datos base insertados correctamente")
}

main()
  .catch((e) => {
    console.error("❌ Error al ejecutar seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
