import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
  const navigate = useNavigate();
  return (
    <div className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-default pb-2 card">
      <img
        src=""
        alt="recipe preview"
        className="aspect-[3/4] w-[700px] object-cover rounded-sm"
      />
      <div className="w-full px-5">
        <h2 className="text-xl tracking-wider">Book Title</h2>
        <h2 className="text-l tracking-wider">Author</h2>
        <p>
          Recommended By <strong>Name</strong>
        </p>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          onClick={() => navigate("/book")}
          className="text-white bg-gray-700 self-center px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
