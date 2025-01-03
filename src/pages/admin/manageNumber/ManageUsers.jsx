import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/features/user/userSlice";
import RevenueChart from "./RevenueChart";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, limit: 10 }));
  }, [dispatch]);

  console.log(users);

  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      {/* Orders Chart */}
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

      {/* Users List */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                User ID
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Username
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">1</td>
              <td className="py-2 px-4 border-b">john_doe</td>
              <td className="py-2 px-4 border-b">john@example.com</td>
              <td className="py-2 px-4 border-b">Active</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
                  Ban User
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">2</td>
              <td className="py-2 px-4 border-b">jane_smith</td>
              <td className="py-2 px-4 border-b">jane@example.com</td>
              <td className="py-2 px-4 border-b">Active</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
                  Ban User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
