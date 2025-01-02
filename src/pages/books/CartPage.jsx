import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../services/getImgUrl";
import {
  getCartThunk,
  removeCartThunk,
  deleteCartThunk,
} from "../../redux/features/cart/catSlice";
import Swal from "sweetalert2";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId && token) {
      dispatch(getCartThunk({ userId, token }));
    }
  }, [dispatch, userId, token]);

  const totalPrice = cartItems
    .reduce((total, item) => total + item.newPrice * item.quantity, 0)
    .toFixed(2);

  const handleClearCart = () => {
    dispatch(deleteCartThunk({ userId, token }));
  };

  const handleRemove = (product) => {
    dispatch(removeCartThunk({ userId, bookId: product._id, token }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
      showConfirmButton: true,
    });
  }

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
          <div className="ml-3 flex h-7 items-center ">
            <button
              type="button"
              onClick={handleClearCart}
              className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
            >
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt=""
                        src={`${getImgUrl(product.coverImage)}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to="/">{product.title}</Link>
                          </h3>
                          <p className="sm:ml-4">${product.newPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category:</strong> {product.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <p className="text-gray-500">
                          <strong>Quantity:</strong> {product.quantity}
                        </p>

                        <div className="flex">
                          <button
                            onClick={() => handleRemove(product)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice || 0}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
