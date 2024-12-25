import React from "react";

const ManageUsers = () => {
  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow">
            <div
              className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold 
                  bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"
            >
              Revenue Chart
            </div>
          </div>
        </div>

        <div className="flex flex-col md:col-span-2 row-span-2 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Users by average order</span>
            <button
              type="button"
              className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium 
                    text-gray-500 hover:text-gray-600"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Descending
              <svg
                className="-mr-1 ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="grid grid-cols-2 gap-6 p-6">
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/82.jpg"
                    alt="Annette Watson profile picture"
                  />
                </div>
                <span className="text-gray-600">Annette Watson</span>
                <span className="ml-auto font-semibold">9.3</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/81.jpg"
                    alt="Calvin Steward profile picture"
                  />
                </div>
                <span className="text-gray-600">Calvin Steward</span>
                <span className="ml-auto font-semibold">8.9</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/80.jpg"
                    alt="Ralph Richards profile picture"
                  />
                </div>
                <span className="text-gray-600">Ralph Richards</span>
                <span className="ml-auto font-semibold">8.7</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/79.jpg"
                    alt="Bernard Murphy profile picture"
                  />
                </div>
                <span className="text-gray-600">Bernard Murphy</span>
                <span className="ml-auto font-semibold">8.2</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/78.jpg"
                    alt="Arlene Robertson profile picture"
                  />
                </div>
                <span className="text-gray-600">Arlene Robertson</span>
                <span className="ml-auto font-semibold">8.2</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/77.jpg"
                    alt="Jane Lane profile picture"
                  />
                </div>
                <span className="text-gray-600">Jane Lane</span>
                <span className="ml-auto font-semibold">8.1</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/76.jpg"
                    alt="Pat Mckinney profile picture"
                  />
                </div>
                <span className="text-gray-600">Pat Mckinney</span>
                <span className="ml-auto font-semibold">7.9</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Norman Walters profile picture"
                  />
                </div>
                <span className="text-gray-600">Norman Walters</span>
                <span className="ml-auto font-semibold">7.7</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageUsers;
