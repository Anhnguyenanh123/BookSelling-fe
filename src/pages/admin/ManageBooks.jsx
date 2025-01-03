import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  fetchBooks,
  deleteBook,
  updateBook,
} from "../../redux/features/book/bookSlice";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { books, loading, error, currentPage } = useSelector(
    (state) => state.book
  );

  const [editingBook, setEditingBook] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({ page: 0, limit: 10 }));
  }, [dispatch]);

  const handleDelete = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the book permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook(bookId))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "The book has been deleted.", "success");
            dispatch(fetchBooks({ page: currentPage, limit: 10 }));
          })
          .catch((error) => {
            Swal.fire("Error!", `Failed to delete book: ${error}`, "error");
          });
      }
    });
  };

  const handleEdit = (book) => {
    setEditingBook({ ...book });
    setBase64Image(book.imageData); // Set current base64 image if any
  };

  const handleUpdate = () => {
    if (editingBook) {
      const { oldPrice, newPrice, ...updatedBook } = editingBook;

      const finalBook = { ...updatedBook, imageData: base64Image };

      dispatch(updateBook(finalBook))
        .unwrap()
        .then(() => {
          Swal.fire("Success!", "The book has been updated.", "success");
          setEditingBook(null);
          dispatch(fetchBooks({ page: currentPage, limit: 10 }));
        })
        .catch((error) => {
          Swal.fire("Error!", `Failed to update book: ${error}`, "error");
        });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Books
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(fetchBooks({ page: 0, limit: 10 }))}
                >
                  Refresh
                </button>
                <button
                  className="bg-gray-500 text-white text-xs font-bold uppercase px-3 py-1 rounded ml-2"
                  type="button"
                  onClick={() => navigate(-1)} // Back navigation
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Book Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Category
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Price
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1 + currentPage * 10}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.title}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.category || "N/A"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${book.currentPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                        <button
                          className="font-medium bg-yellow-500 py-1 px-4 rounded-full text-white mr-2"
                          onClick={() => handleEdit(book)}
                        >
                          Update
                        </button>
                        <button
                          className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;
