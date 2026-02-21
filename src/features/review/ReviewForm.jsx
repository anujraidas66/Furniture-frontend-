import { useState } from "react";
import StarRatingInput from "./StarRatingInput";
import { useAddReviewMutation } from "../products/productApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.userSlice);
  const token = user?.token; // ✅ get token from Redux store

  const [addReview, { isLoading }] = useAddReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");

    if (!token) return toast.error("You must be logged in to add a review");

    try {
      await addReview({ productId, rating, comment, token }).unwrap();
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (err) {
      // ✅ Properly show error message instead of [object Object]
      const message = err?.data?.message || err.error || "Failed to submit review";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-3 mt-4">
      <div>
        <label className="font-semibold">Rating</label>
        <StarRatingInput rating={rating} setRating={setRating} />
      </div>
      <div>
        <label className="font-semibold">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}