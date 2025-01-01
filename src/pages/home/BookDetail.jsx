import React from "react";

const BookDetail = () => {
  return (
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <img
          src="book-1.png"
          alt="How to Grow Your Online Store"
          class="w-48 h-72 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h1 class="text-3xl font-semibold text-gray-800">
            How to Grow Your Online Store
          </h1>
          <p class="text-xl text-gray-600 mt-2">
            Learn the best strategies to grow your online store in today's
            competitive market.
          </p>
          <div class="mt-4 flex items-center space-x-4">
            <span class="text-gray-500 line-through text-lg">$29.99</span>
            <span class="text-xl font-semibold text-green-600">$19.99</span>
          </div>
          <div class="mt-6 flex space-x-4">
            <button class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
              Order Now
            </button>
            <button class="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        <div class="space-y-4">
          <div class="flex space-x-4">
            <div class="flex-shrink-0">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User 1"
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-800">John Doe</span>
                <span class="text-yellow-500">★★★★☆</span>
              </div>
              <p class="text-gray-600 mt-1">
                This book provides amazing insights into growing an online
                business. The strategies are practical and easy to follow!
              </p>
            </div>
          </div>

          <div class="flex space-x-4">
            <div class="flex-shrink-0">
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="User 2"
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-800">Jane Smith</span>
                <span class="text-yellow-500">★★★★★</span>
              </div>
              <p class="text-gray-600 mt-1">
                Highly recommend! The tips in this book helped me increase my
                sales in just a few weeks.
              </p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Leave a Review</h3>
            <form class="mt-4 space-y-4">
              <textarea
                placeholder="Write your review here..."
                class="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div class="flex space-x-4">
                <button
                  type="submit"
                  class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  class="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
