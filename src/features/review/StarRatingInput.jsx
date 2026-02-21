import { Star } from "lucide-react";

export default function StarRatingInput({ rating, setRating, max = 5 }) {
  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            onClick={() => setRating(starValue)}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              starValue <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}