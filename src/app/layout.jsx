'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { UserProvider, UserContext } from './context/UserContext';
import './globals.css';

function RootContent({ children }) {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <header className="p-4 bg-zinc-900 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-white no-underline">
            <h1 className="m-0 text-xl font-bold">DeckCheck</h1>
          </Link>

          <Link href="/cards" className="text-sky-400 hover:underline">
            Ver Cartas
          </Link>

          <Link href="/cards/new" className="text-sky-400 hover:underline">
            Crear Carta
          </Link>


          <Link href="/cards/crap" className="text-sky-400 hover:underline">
            Crap Carta
          </Link>
        </div>

        <nav className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-white">Hola, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-600 text-sky-400 rounded hover:bg-gray-700 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      <main className="p-5 min-h-screen bg-zinc-800 text-white">
        {children}
      </main>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="m-0 font-sans bg-zinc-800 text-white">
        <UserProvider>
          <RootContent>{children}</RootContent>
        </UserProvider>
      </body>
    </html>
  );
}
