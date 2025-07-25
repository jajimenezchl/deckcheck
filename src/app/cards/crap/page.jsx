'use client';

import { useState } from 'react';
import ModalImagenHover from "@/app/components/ModalImagenHover";

export default function ImageList() {
  const baseUrl = 'https://api.myl.cl/static/cards/72/';
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Estado para filtro rango (números enteros)
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(10);

  // Validar y limitar el rango al cambiar inputs
  const handleRangeStartChange = (e) => {
    let val = parseInt(e.target.value) || 1;
    if (val < 1) val = 1;
    if (val > 311) val = 311;
    if (val > rangeEnd) val = rangeEnd;
    setRangeStart(val);
  };

  const handleRangeEndChange = (e) => {
    let val = parseInt(e.target.value) || 10;
    if (val < 1) val = 1;
    if (val > 311) val = 311;
    if (val < rangeStart) val = rangeStart;
    setRangeEnd(val);
  };

  // Generar array completo
  const allImages = Array.from({ length: 311 }, (_, i) =>
    (i + 1).toString().padStart(3, '0')
  );

  // Filtrar por rango
  const imagesInRange = allImages.slice(rangeStart - 1, rangeEnd);

  const handleClick = (url, index) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex gap-4 items-center">
        <label className="flex flex-col">
          Desde (001 - 311):
          <input
            type="number"
            min={1}
            max={311}
            value={rangeStart}
            onChange={handleRangeStartChange}
            className="border rounded px-2 py-1 w-20 text-center"
          />
        </label>
        <label className="flex flex-col">
          Hasta (001 - 311):
          <input
            type="number"
            min={1}
            max={311}
            value={rangeEnd}
            onChange={handleRangeEndChange}
            className="border rounded px-2 py-1 w-20 text-center"
          />
        </label>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {imagesInRange.map((numStr, i) => {
          const url = `${baseUrl}${numStr}.png`;
          return (
            <div key={url} className="relative cursor-pointer">
              <ModalImagenHover src={url} alt={`Carta ${numStr}`} />
              {copiedIndex === i && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded shadow">
                  Copiado!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
