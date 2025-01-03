import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/features/user/userSlice";
import RevenueChart from "./manageNumber/RevenueChart";
import Swal from "sweetalert2";

const ManageNumbers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, limit: 10 }));
  }, [dispatch]);

  const filteredUsers = users.filter((user) => user.role !== "admin");

  const handleBanUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, ban them!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId));
        Swal.fire("Banned!", "The user has been banned.", "success");
      }
    });
  };

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

        {/* Users List */}
        <div className="flex flex-col md:col-span-2 row-span-2 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>All current users</span>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="p-6 space-y-4">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-4 bg-gray-100 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                    <p className="text-sm text-gray-600">
                      Address: {user.address}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBanUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Ban
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageNumbers;
