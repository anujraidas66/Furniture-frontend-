import { Star } from "lucide-react";

export default function StarRating({ value = 0, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const rating = i + 1;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              rating <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}