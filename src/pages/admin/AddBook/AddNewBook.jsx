import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { addBook } from "../../../redux/features/book/bookSlice";
import Swal from "sweetalert2";

const AddNewBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFileName, setImageFileName] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFileName(file.name);
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

  const onSubmit = async (data) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      Swal.fire(
        "Unauthorized",
        "You need to be logged in to add a book",
        "error"
      );
      return;
    }

    try {
      const bookData = {
        title: data.title,
        author: data.author,
        originalPrice: data.oldPrice,
        currentPrice: data.newPrice,
        stock: data.stock || 0,
        description: data.description,
        imageData: base64Image || "",
        category: data.category,
      };

      const resultAction = await dispatch(addBook(bookData));

      if (addBook.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Book added successfully", "success");
        navigate(-1); // Navigate back after successful submission
      } else {
        throw new Error(resultAction.payload || "Failed to add book");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)} // Navigate back on click
        className="mb-4 text-blue-600 font-bold hover:underline"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          error={errors.title}
        />
        <InputField
          label="Author"
          name="author"
          placeholder="Enter author's name"
          register={register}
          error={errors.author}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          error={errors.description}
        />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
          error={errors.category}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          error={errors.oldPrice}
        />
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          error={errors.newPrice}
        />
        <InputField
          label="Stock"
          name="stock"
          type="number"
          placeholder="Enter stock"
          register={register}
          error={errors.stock}
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
