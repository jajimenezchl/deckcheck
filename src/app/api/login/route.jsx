import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }

    // Comprobar contraseña (sin hash aún)
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }

    // Login exitoso
    return new Response(JSON.stringify({ success: true, user: { id: user.id, username: user.username } }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error en servidor' }), { status: 500 });
  }
}
