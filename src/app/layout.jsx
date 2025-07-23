'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { UserProvider, UserContext } from './context/UserContext';

function RootContent({ children }) {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <header style={{
        padding: 15,
        backgroundColor: '#222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}><h1 style={{ margin: 0 }}>DeckCheck</h1> </Link>
        <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (
            <>
              <span>Hola, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  // redirige a login
                  window.location.href = '/login';
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#ff6b6b',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{
                color: '#61dafb',
                textDecoration: 'none',
                padding: '8px 15px',
                backgroundColor: '#555',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </header>
      <main style={{ padding: 20, minHeight: '100vh' }}>
        {children}
      </main>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#282c34', color: '#fff' }}>
        <UserProvider>
          <RootContent>{children}</RootContent>
        </UserProvider>
      </body>
    </html>
  );
}
