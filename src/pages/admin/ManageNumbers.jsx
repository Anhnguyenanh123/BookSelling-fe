import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/features/book/bookSlice";
import RevenueChart from "./manageNumber/RevenueChart";

const ManageNumbers = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks({ page: 0, limit: 10 })); // Fetching books with pagination
  }, [dispatch]);

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        {/* Revenue Chart */}
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow">
            <div
              className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold 
                bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"
            >
              <RevenueChart />
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="flex flex-col md:col-span-2 row-span-2 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>All current books</span>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            {status === "loading" && (
              <div className="p-6 text-gray-500">Loading...</div>
            )}
            {status === "failed" && (
              <div className="p-6 text-red-500">Error: {error}</div>
            )}
            {status === "succeeded" && (
              <ul className="grid grid-cols-2 gap-6 p-6">
                {books.map((book) => (
                  <li key={book.id} className="flex items-center">
                    <span className="text-gray-600">{book.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageNumbers;
