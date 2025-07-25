import { useState } from "react";

export default function ModalImagenHover({ src, alt }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-20 h-auto rounded shadow-md cursor-pointer"
      />

      {hover && (
        <div
          className="fixed top-1/2 left-1/2 max-w-lg max-h-[80vh] -translate-x-1/2 -translate-y-1/2   bg-opacity-80 rounded shadow-xl p-2 z-50"
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[70vh] rounded"
          />
        </div>
      )}
    </div>
  );
}
