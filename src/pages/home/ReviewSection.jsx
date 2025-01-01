import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReviews,
  submitReview,
  deleteReview,
  updateReview,
} from "../../redux/features/review/reviewSlice";

const ReviewSection = ({ bookId, userId, userToken }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User 1"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">John Doe</span>
              <span className="text-yellow-500">★★★★☆</span>
            </div>
            <p className="text-gray-600 mt-1">
              This book provides amazing insights into growing an online
              business. The strategies are practical and easy to follow!
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="User 2"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Jane Smith</span>
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-gray-600 mt-1">
              Highly recommend! The tips in this book helped me increase my
              sales in just a few weeks.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Leave a Review
          </h3>
          <form className="mt-4 space-y-4">
            <textarea
              placeholder="Write your review here..."
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Submit Review
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
