'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { login } = useContext(UserContext);

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Login exitoso');
      localStorage.setItem('deckcheckUser', JSON.stringify(data.user));
      login(data.user);
      setTimeout(() => router.push('/'), 500);
    } else {
      setMessage(data.error || 'Error desconocido');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-zinc-900 p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Entrar
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
      )}
    </div>
  );
}
