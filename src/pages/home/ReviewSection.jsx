import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchReviews,
  submitReview,
  deleteReview,
  updateReview,
} from "../../redux/features/review/reviewSlice";

const ReviewSection = ({ bookId, userId, userToken }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const loading = useSelector((state) => state.review.loading);
  const error = useSelector((state) => state.review.error);

  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editReview, setEditReview] = useState(null); // For editing a review
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews when component is mounted
  useEffect(() => {
    dispatch(fetchReviews({ page: 0, limit: 10 }));
  }, [dispatch]);

  // Handle submitting a new review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!userToken) {
      Swal.fire(
        "Unauthorized",
        "You need to be logged in to leave a review",
        "error"
      );
      return;
    }

    setIsSubmitting(true);
    dispatch(submitReview({ userId, bookId, ...newReview }))
      .unwrap()
      .then(() => {
        setNewReview({ rating: 0, comment: "" });
        setIsSubmitting(false);
      })
      .catch(() => setIsSubmitting(false));
  };

  // Handle deleting a review
  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
      .unwrap()
      .then(() => {
        // Refetch all reviews after deleting
        dispatch(fetchReviews({ page: 0, limit: 10 }));
      });
  };

  // Handle updating a review (directly within the review itself)
  const handleUpdateReview = (reviewId, updatedReview) => {
    dispatch(
      updateReview({
        reviewId,
        userId,
        bookId,
        rating: updatedReview.rating,
        comment: updatedReview.comment,
      })
    ).then(() => setEditReview(null)); // Reset after update
  };

  // Render stars based on rating value
  const renderStars = (rating) => {
    const fullStars = "★".repeat(rating); // full stars
    const emptyStars = "☆".repeat(5 - rating); // empty stars
    return fullStars + emptyStars;
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>

      {/* Render reviews */}
      <div className="space-y-4">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {reviews.map((review) => (
          <div key={review.id} className="flex space-x-4">
            <div className="flex-shrink-0">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">John Doe</span>
                <span className="text-yellow-500">
                  {renderStars(review.rating)}
                </span>
              </div>

              {/* Editable comment */}
              {editReview && editReview.id === review.id ? (
                <div>
                  <textarea
                    value={editReview.comment}
                    onChange={(e) =>
                      setEditReview({ ...editReview, comment: e.target.value })
                    }
                    className="w-full p-4 border rounded-md mt-2"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md"
                      onClick={() => handleUpdateReview(review.id, editReview)}
                    >
                      Update
                    </button>
                    <button
                      className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md"
                      onClick={() => setEditReview(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 mt-1">{review.comment}</p>
              )}

              <div className="flex space-x-2 mt-2">
                <button
                  className="text-blue-600"
                  onClick={() => setEditReview(review)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add a review form */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Leave a Review</h3>
        <form className="mt-4 space-y-4" onSubmit={handleSubmitReview}>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            placeholder="Write your review here..."
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setNewReview({ rating: 0, comment: "" })}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
