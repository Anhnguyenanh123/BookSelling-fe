import React from "react";
import { MdIncompleteCircle } from "react-icons/md";
import { HiViewGridAdd } from "react-icons/hi";

const StatCard = () => {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
          <HiViewGridAdd className="h-6 w-6" />
        </div>
        <div>
          <span className="block text-2xl font-bold">
            {/* {data?.totalBooks} */}
          </span>
          <span className="block text-gray-500">Products</span>
        </div>
      </div>

      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">
            {/* ${data?.totalSales} */}
          </span>
          <span className="block text-gray-500">Total Sales</span>
        </div>
      </div>

      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl font-bold">
            {/* {data?.trendingBooks} */}
          </span>
          <span className="inline-block text-xl text-gray-500 font-semibold">
            (13%)
          </span>
          <span className="block text-gray-500">
            Trending Books in This Month
          </span>
        </div>
      </div>

      <div className="flex items-center p-8 bg-white shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <MdIncompleteCircle className="size-6" />
        </div>
        <div>
          <span className="block text-2xl font-bold">
            {/* {data?.totalOrders} */}
          </span>
          <span className="block text-gray-500">Total Orders</span>
        </div>
      </div>
    </section>
  );
};

export default StatCard;
