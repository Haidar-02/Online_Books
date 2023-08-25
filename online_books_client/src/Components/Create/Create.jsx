import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    review: "",
    genre: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setBookData({
        ...bookData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!bookData.title) {
      newErrors.title = "Title is required";
    }
    if (!bookData.author) {
      newErrors.author = "Author is required";
    }
    if (!bookData.genre) {
      newErrors.genre = "Genre is required";
    }
    if (!bookData.review) {
      newErrors.review = "Review is required";
    }
    if (!bookData.image) {
      newErrors.image = "Image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // All fields are valid, you can proceed with submitting the data
      // You can also reset the form, clear fields, etc.
    }
  };

  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ` Share Your Favorite Books
      </h1>
      <div className="w-full flex items-center justify-center">
        <div>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="enter book title"
              className="form-element px-3 py-2 w-72"
              onChange={handleInputChange}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="enter author's name"
              className="form-element px-3 py-2 w-72"
              onChange={handleInputChange}
            />
            {errors.author && (
              <p className="text-red-500 text-xs">{errors.author}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              name="genre"
              id="genre"
              className="form-element p-2 w-72"
              onChange={handleInputChange}
            >
              <option value="">Select a genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-xs">{errors.genre}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea
              name="review"
              id="review"
              placeholder="enter your review on book"
              onChange={handleInputChange}
              className="form-element px-3 py-2 w-72"
            />
            {errors.review && (
              <p className="text-red-500 text-xs">{errors.review}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="image">Add Recipe Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              id="image"
              className="form-element px-3 py-2 w-72 bg-white"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image}</p>
            )}
          </div>
        </div>
        <div className="p-5 bg-gray-500 h-80 w-72 flex items-center justify-center">
          <img
            src={imagePreview || "placeholder_image_url"}
            alt="Recipe Preview"
            className="aspect-[3/4] object-cover w-5/6"
          />
        </div>
      </div>
      <div className="form-group w-full flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="self-center px-3 py-1 bg-yellow-600 rounded text-white hover:opacity-75 transition-all"
        >
          Share Book Review
        </button>
      </div>
    </div>
  );
};

export default Create;
