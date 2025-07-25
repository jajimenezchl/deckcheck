"use client";
import { useEffect, useState } from "react";
import ModalImagenHover from "@/app/components/ModalImagenHover";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setLoading(true);
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => {
        setCards([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        {/* Spinner */}
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 overflow-visible">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Cartas Registradas</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-zinc-700">
        <table className="w-full text-sm text-left text-white bg-zinc-900">
          <thead className="bg-zinc-800 text-zinc-300 text-xs uppercase tracking-wide">
            <tr>
              <th className="p-3 border border-zinc-700 text-center">Imagen</th>
              <th className="p-3 border border-zinc-700">Nombre</th>
              <th className="p-3 border border-zinc-700">Tipo</th>
              <th className="p-3 border border-zinc-700">Raza</th>
              <th className="p-3 border border-zinc-700">Edición</th>
              <th className="p-3 border border-zinc-700 text-center">Coste</th>
              <th className="p-3 border border-zinc-700 text-center">Ataque</th>
              <th className="p-3 border border-zinc-700 text-center">Baneada</th>
              <th className="p-3 border border-zinc-700 text-center">Límite</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className="hover:bg-zinc-800 border-t border-zinc-700">
               <td className="p-2 text-center">
  {card.imageUrl ? (
    <ModalImagenHover src={card.imageUrl} alt={card.name} />
  ) : (
    <span className="text-zinc-400">—</span>
  )}
</td>
                <td className="p-2 font-medium">{card.name}</td>
                <td className="p-2">{card.type?.name || <span className="text-zinc-500">—</span>}</td>
                <td className="p-2">{card.race?.name || <span className="text-zinc-500">—</span>}</td>
                <td className="p-2">{card.edition?.name || <span className="text-zinc-500">—</span>}</td>
                <td className="p-2 text-center">{card.cost}</td>
                <td className="p-2 text-center">{card.attack}</td>
                <td className="p-2 text-center">
                  <span className={card.isBanned ? "text-red-400 font-semibold" : "text-green-400"}>
                    {card.isBanned ? "Sí" : "No"}
                  </span>
                </td>
                <td className="p-2 text-center">{card.deckLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
