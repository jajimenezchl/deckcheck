// src/app/api/register/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
    }

    // Validar si ya existe
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Usuario ya existe' }), { status: 409 });
    }

    // Crear usuario (sin hash por ahora)
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
}
