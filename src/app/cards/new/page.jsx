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
    fetch("/api/races")
      .then((res) => res.json())
      .then(setRaces)
      .catch(() => setRaces([]));

    fetch("/api/editions")
      .then((res) => res.json())
      .then(setEditions)
      .catch(() => setEditions([]));

    fetch("/api/cardTypes")
      .then((res) => res.json())
      .then(setTypes)
      .catch(() => setTypes([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 border rounded">
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-semibold">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="cost" className="block mb-1 font-semibold">Coste</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={form.cost}
          onChange={handleChange}
          min="0"
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="attack" className="block mb-1 font-semibold">Ataque</label>
        <input
          type="number"
          id="attack"
          name="attack"
          value={form.attack}
          onChange={handleChange}
          min="0"
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="isBanned" className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            id="isBanned"
            name="isBanned"
            checked={form.isBanned}
            onChange={handleChange}
          />
          <span>¿Baneada?</span>
        </label>
      </div>

      <div>
        <label htmlFor="deckLimit" className="block mb-1 font-semibold">Límite por mazo</label>
        <input
          type="number"
          id="deckLimit"
          name="deckLimit"
          value={form.deckLimit}
          onChange={handleChange}
          min="1"
          max="10"
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block mb-1 font-semibold">URL Imagen</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="raceId" className="block mb-1 font-semibold">Raza</label>
        <select
          id="raceId"
          name="raceId"
          value={form.raceId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">-- Ninguna --</option>
          {races.map((race) => (
            <option key={race.id} value={race.id}>
              {race.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="editionId" className="block mb-1 font-semibold">Edición</label>
        <select
          id="editionId"
          name="editionId"
          value={form.editionId}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value="">-- Selecciona --</option>
          {editions.map((edition) => (
            <option key={edition.id} value={edition.id}>
              {edition.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="typeId" className="block mb-1 font-semibold">Tipo</label>
        <select
          id="typeId"
          name="typeId"
          value={form.typeId}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value="">-- Selecciona --</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Crear Carta
      </button>
    </form>
  );
}
