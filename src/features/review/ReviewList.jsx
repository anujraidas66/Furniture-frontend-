import { useGetReviewsQuery } from "../products/productApi";
import StarRating from "./StarRating";

export default function ReviewList({ productId }) {
  const { data: reviews, isLoading, error } = useGetReviewsQuery(productId);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error?.data?.message || error.error}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <div className="mt-4">
      {reviews.map((review) => (
        <div key={review._id} className="border p-3 mb-3 rounded">
          <div className="flex justify-between items-center">
            <p className="font-medium">{review.user?.username || "Unknown"}</p>
            <StarRating value={Number(review.rating) || 0} />
          </div>
          <p className="mt-2 text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}