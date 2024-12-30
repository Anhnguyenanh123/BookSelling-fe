import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/features/userSlice";
import RevenueChart from "./RevenueChart";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, limit: 10 }));
  }, [dispatch]);

  const filteredUsers = users.filter((user) => user.role !== "admin");
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
      <div className="flex flex-col md:col-span-2 row-span-2 bg-white shadow rounded-lg">
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
          <span>Users by average order</span>
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
              {filteredUsers.map((user) => (
                <li key={user.id} className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${Math.floor(
                        Math.random() * 99
                      )}.jpg`}
                      alt={`${user.name} profile picture`}
                    />
                  </div>
                  <span className="text-gray-600">{user.name}</span>
                  <span className="ml-auto font-semibold">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
