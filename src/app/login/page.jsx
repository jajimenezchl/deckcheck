'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { validateUser } from '@/app/utils/auth';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
  const [userInput, setUserInput] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    const validUser = validateUser(userInput, pass);
    if (validUser) {
      localStorage.setItem('deckcheckUser', JSON.stringify(validUser));
      setUser(validUser);
      setMessage('¡Login exitoso!');
      setTimeout(() => router.push('/'), 1000);
    } else {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20 }}>
      <h2 style={{ color: '#fff' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ color: '#fff' }}>Usuario:</label><br />
        <input
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          style={{ padding: 8, width: '100%', marginBottom: 10 }}
        />
        <label style={{ color: '#fff' }}>Contraseña:</label><br />
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={{ padding: 8, width: '100%', marginBottom: 10 }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#61dafb',
            color: '#282c34',
            padding: '8px 15px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 4
          }}
        >
          Entrar
        </button>
      </form>
      {message && (
        <p style={{ color: message.includes('exitoso') ? '#4ade80' : '#ff6b6b', marginTop: 10 }}>
          {message}
        </p>
      )}
    </div>
  );
}
