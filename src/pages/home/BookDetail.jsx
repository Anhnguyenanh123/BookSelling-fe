import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../redux/features/book/bookSlice";
import { getImgUrl } from "../../services/getImgUrl";
import ReviewSection from "./ReviewSection";

const BookDetail = () => {
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.book);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <img
          src={getImgUrl(book?.imageData)}
          alt={book?.title}
          className="w-48 h-72 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-800">
            {book?.title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{book?.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-gray-500 line-through text-lg">
              ${book?.originalPrice}
            </span>
            <span className="text-xl font-semibold text-green-600">
              ${book?.currentPrice}
            </span>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
              Order Now
            </button>
            <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Use the new ReviewSection component */}
      <ReviewSection bookId={id} userId={userId} userToken={userToken} />
    </div>
  );
};

export default BookDetail;
