'use client'

import React, { useEffect, useState } from "react";

export default function CreateCardForm() {
  const [races, setRaces] = useState([]);
  const [editions, setEditions] = useState([]);
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    cost: 0,
    attack: 0,
    isBanned: false,
    deckLimit: 3,
    imageUrl: "",
    raceId: "",
    editionId: "",
    typeId: ""
  });

  useEffect(() => {
    fetch("/api/races").then(res => res.json()).then(setRaces).catch(() => setRaces([]));
    fetch("/api/editions").then(res => res.json()).then(setEditions).catch(() => setEditions([]));
    fetch("/api/cardTypes").then(res => res.json()).then(setTypes).catch(() => setTypes([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        cost: Number(form.cost),
        attack: Number(form.attack),
        deckLimit: Number(form.deckLimit),
        raceId: form.raceId ? Number(form.raceId) : null,
        editionId: Number(form.editionId),
        typeId: Number(form.typeId)
      })
    });

    if (response.ok) {
      alert("Carta creada con éxito");
      setForm({
        name: "",
        description: "",
        cost: 0,
        attack: 0,
        isBanned: false,
        deckLimit: 3,
        imageUrl: "",
        raceId: "",
        editionId: "",
        typeId: ""
      });
    } else {
      alert("Error creando la carta");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-zinc-900 rounded-lg shadow-lg space-y-5 text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Crear Nueva Carta</h2>

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Coste */}
      <div>
        <label htmlFor="cost" className="block mb-1">Coste</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={form.cost}
          onChange={handleChange}
          min="0"
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Ataque */}
      <div>
        <label htmlFor="attack" className="block mb-1">Ataque</label>
        <input
          type="number"
          id="attack"
          name="attack"
          value={form.attack}
          onChange={handleChange}
          min="0"
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ¿Baneada? */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isBanned"
          name="isBanned"
          checked={form.isBanned}
          onChange={handleChange}
          className="accent-red-500"
        />
        <label htmlFor="isBanned">¿Baneada?</label>
      </div>

      {/* Límite por mazo */}
      <div>
        <label htmlFor="deckLimit" className="block mb-1">Límite por mazo</label>
        <input
          type="number"
          id="deckLimit"
          name="deckLimit"
          value={form.deckLimit}
          onChange={handleChange}
          min="1"
          max="10"
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Imagen */}
      <div>
        <label htmlFor="imageUrl" className="block mb-1">URL de Imagen</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Raza */}
      <div>
        <label htmlFor="raceId" className="block mb-1">Raza</label>
        <select
          id="raceId"
          name="raceId"
          value={form.raceId}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
        >
          <option value="">-- Ninguna --</option>
          {races.map((race) => (
            <option key={race.id} value={race.id}>{race.name}</option>
          ))}
        </select>
      </div>

      {/* Edición */}
      <div>
        <label htmlFor="editionId" className="block mb-1">Edición</label>
        <select
          id="editionId"
          name="editionId"
          value={form.editionId}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
        >
          <option value="">-- Selecciona --</option>
          {editions.map((edition) => (
            <option key={edition.id} value={edition.id}>{edition.name}</option>
          ))}
        </select>
      </div>

      {/* Tipo */}
      <div>
        <label htmlFor="typeId" className="block mb-1">Tipo</label>
        <select
          id="typeId"
          name="typeId"
          value={form.typeId}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
        >
          <option value="">-- Selecciona --</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
      >
        Crear Carta
      </button>
    </form>
  );
}
