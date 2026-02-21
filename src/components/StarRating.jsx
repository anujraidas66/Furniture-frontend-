import { useState } from "react";

export default function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1 text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          className={
            star <= (hover || value)
              ? "text-yellow-400"
              : "text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
