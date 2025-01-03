import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchOrders,
  createOrder,
  deleteOrder,
} from "../../redux/features/order/ordersSlice.js";
import { fetchUserById } from "../../redux/features/user/userSlice.js";
import { fetchBookById } from "../../redux/features/book/bookSlice.js";
import Payment from "./Payment.jsx"; // Payment component for each order

const Orders = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { orders, loading, error } = useSelector((state) => state.order);
  const { books } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((user) => {
        setCustomer({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrders({ page: 0, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const order = {
        userId,
        totalPrice: cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
        orderDetails: cartItems.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      dispatch(createOrder(order));
    }
  }, [cartItems, dispatch, userId]);

  useEffect(() => {
    orders.forEach((order) => {
      order.orderDetails.forEach((detail) => {
        if (!books[detail.bookId]) {
          dispatch(fetchBookById(detail.bookId));
        }
      });
    });
  }, [orders, dispatch, books]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const totalPrice = orders.reduce((acc, order) => {
    return (
      acc + order.orderDetails.reduce((acc, detail) => acc + detail.price, 0)
    );
  }, 0);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        {/* Orders List */}
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Orders
            </p>
            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {orders.map((order) => {
              const orderTotalPrice = order.orderDetails.reduce(
                (acc, detail) => acc + detail.quantity * detail.price,
                0
              );
              return (
                <div
                  key={order.id}
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  {order.orderDetails.map((detail) => (
                    <div
                      key={detail.bookId}
                      className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0"
                    >
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Quantity:{" "}
                            </span>
                            {detail.quantity}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Price:{" "}
                            </span>
                            ${detail.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          ${detail.price * detail.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Total Price and Payment button for each order */}
                  <div className="mt-4 flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      ${orderTotalPrice}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded-md"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                  alt="avatar"
                />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {customer.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <p className="cursor-pointer text-sm leading-5 ">
                  Email: {customer.email}
                </p>
              </div>
              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <p className="cursor-pointer text-sm leading-5 ">
                  Phone: {customer.phone}
                </p>
              </div>
              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <p className="cursor-pointer text-sm leading-5 ">
                  Address: {customer.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="mt-6 flex justify-center">
        <Payment
          orderId={orders.map((order) => order.id)}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default Orders;
