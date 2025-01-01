import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { addBook } from "../../../redux/features/book/bookSlice";
import Swal from "sweetalert2";

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Destructure to get register
  const [imageFileName, setImageFileName] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Set the base64 image string
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const userToken = localStorage.getItem("userToken"); // Get userToken from localStorage
    if (!userToken) {
      Swal.fire(
        "Unauthorized",
        "You need to be logged in to add a book",
        "error"
      );
      return; // Prevent form submission if user is not authenticated
    }

    try {
      const cleanedImageData = base64Image
        ? base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, "") // Strip off the base64 prefix
        : "";

      const bookData = {
        title: data.title,
        author: data.author,
        originalPrice: data.oldPrice,
        currentPrice: data.newPrice,
        stock: data.stock || 0,
        description: data.description,
        imageData: cleanedImageData ? [cleanedImageData] : [],
        category: data.category,
      };
      console.log("Book data:", bookData);
      await addBook(bookData); // Ensure you await the async action
      Swal.fire("Success", "Book added successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to add the book", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Title Field */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          error={errors.title}
        />

        {/* Author Field */}
        <InputField
          label="Author"
          name="author"
          placeholder="Enter author's name"
          register={register}
          error={errors.author}
        />

        {/* Description Field */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          error={errors.description}
        />

        {/* Category Select Field */}
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

        {/* Trending Checkbox */}
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

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          error={errors.oldPrice}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          error={errors.newPrice}
        />

        {/* Stock */}
        <InputField
          label="Stock"
          name="stock"
          type="number"
          placeholder="Enter stock"
          register={register}
          error={errors.stock}
        />

        {/* Cover Image Upload */}
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

        {/* Submit Button */}
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
