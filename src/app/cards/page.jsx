// app/cards/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function CardList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch("/api/cards")
            .then((res) => res.json())
            .then(setCards)
            .catch(() => setCards([]));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Cartas Registradas</h1>

            <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Imagen</th>
                        <th className="p-2 border">Nombre</th>
                        <th className="p-2 border">Tipo</th>
                        <th className="p-2 border">Raza</th>
                        <th className="p-2 border">Edición</th>
                        <th className="p-2 border">Coste</th>
                        <th className="p-2 border">Ataque</th>
                        <th className="p-2 border">Baneada</th>
                        <th className="p-2 border">Límite</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.id} className="hover:bg-gray-50">
                            <td className="border p-1 text-center">
                                {card.imageUrl ? (
                                    <img
                                        src={card.imageUrl}
                                        alt={card.name}
                                        style={{
                                            width: '130px',
                                            height: 'auto',
                                            display: 'block',
                                            margin: '0 auto',
                                            borderRadius: '4px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                          className="w-24 h-auto mx-auto rounded shadow transition-transform duration-200 hover:scale-125"
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className="border p-2">{card.name}</td>
                            <td className="border p-2">{card.type?.name || "-"}</td>
                            <td className="border p-2">{card.race?.name || "-"}</td>
                            <td className="border p-2">{card.edition?.name}</td>
                            <td className="border p-2 text-center">{card.cost}</td>
                            <td className="border p-2 text-center">{card.attack}</td>
                            <td className="border p-2 text-center">
                                {card.isBanned ? "Sí" : "No"}
                            </td>
                            <td className="border p-2 text-center">{card.deckLimit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
