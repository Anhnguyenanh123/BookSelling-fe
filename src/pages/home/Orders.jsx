import React from "react";
import { useSelector } from "react-redux";
import { getImgUrl } from "../../services/getImgUrl.js";

const Orders = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <div className="container mx-auto  p-6">
      <h2 className="text-3xl font-semibold mb-4">Orders</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">No orders</div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                  <img
                    src={getImgUrl(item?.coverImage)}
                    alt="image"
                    className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                    {item?.title}
                  </h3>
                  <p className="text-gray-600 mb-5">{item?.description}</p>
                  <p className="font-medium mb-5">Price: ${item?.newPrice}</p>
                  <p className="font-medium mb-5">Quantity: {item?.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
