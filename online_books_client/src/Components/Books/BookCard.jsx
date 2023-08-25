import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { follow } from "../../Helpers/books.helper";

const BookCard = ({
  title,
  author,
  image,
  recommendedBy,
  book_id,
  user_id,
  is_followed,
  fetchBooks,
}) => {
  const navigate = useNavigate();
  console.log(book_id);

  const handleFollowToggle = async () => {
    try {
      const res = await follow(user_id);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-pointer pb-2 card">
      <img
        src={image}
        alt={`${title} cover`}
        className="aspect-[3/4] w-full object-cover rounded-sm"
      />
      <div className="w-full px-5">
        <h2 className="text-xl tracking-wider">{title}</h2>
        <h2 className="text-l tracking-wider">{author}</h2>
        <p className="text-sm">
          Recommended By <strong>{recommendedBy}</strong>
        </p>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          onClick={() => navigate(`/book/${book_id}`)}
          className="text-white mr-2 bg-gray-700 self-center px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={handleFollowToggle}
          className={`text-white ml-2 ${
            is_followed ? "bg-red-700" : "bg-blue-700"
          } self-center px-3 py-1 rounded-full hover:opacity-75 transition-all cursor-pointer`}
        >
          {is_followed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
