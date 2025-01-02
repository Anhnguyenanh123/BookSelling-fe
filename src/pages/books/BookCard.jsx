import React from "react";
import { getImgUrl } from "../../services/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCartThunk } from "../../redux/features/cart/catSlice.js";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    const bookItem = {
      id: book.id,
      title: book.title,
      price: book.currentPrice,
      quantity: 1,
    };

    if (!token || !userId) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemExists = localCart.some((item) => item.id === book.id);

      if (!itemExists) {
        localStorage.setItem("cart", JSON.stringify([...localCart, bookItem]));
        alert("Item added to the cart (local)");
      } else {
        alert("Item is already in your cart");
      }
      return;
    }

    dispatch(createCartThunk({ userId, bookId: book.id, token }));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book?.id}`}>
            <img
              src={getImgUrl(book?.imageData)}
              alt="image"
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book?.id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book.description.length > 80
              ? book?.description.slice(0, 80) + "..."
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.currentPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book?.originalPrice}
            </span>
          </p>
          <button
            onClick={handleAddToCart}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 "
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
