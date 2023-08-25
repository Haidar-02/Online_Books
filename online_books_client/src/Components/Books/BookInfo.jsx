import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const BookInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="p-16 bg-gray-100">
      <p
        className="cursor-pointer hover:underline mb-3"
        onClick={() => navigate("/dashboard")}
      >
        ~ Book List
      </p>
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black p-2 text-yellow-700">
            Book Review Info
          </h2>
        </div>
        <div className="flex">
          <div>
            <img
              src=""
              alt="recipe preview"
              className="aspect-square w-[700px] object-cover rounded-sm"
            />
          </div>

          <div className="w-full px-5 ml-10 cursor-default">
            <h2 className="text-2xl tracking-wider">Book Title</h2>
            <div className="mt-2">
              <p className="text-lg">
                Writen By <span className="text-yellow-700">Authur Name</span>
              </p>
            </div>
            <p className="mt-2">
              Review By <strong>Name</strong>
              <button className="ml-2 px-3 py-1 bg-blue-500 hover:opacity-75 text-white rounded-md">
                Follow
              </button>
            </p>
            <div className="mt-2">
              <p className="text-lg text-yellow-700">Genre</p>
              <p>Genre</p>
            </div>
            <div className="mt-2">
              <p className="text-lg text-yellow-700">Review</p>
              <p>Review details here</p>
            </div>
            <div className="flex items-end justify-start gap-2">
              <FavoriteIcon
                className={`mt-5 cursor-pointer text-cursor-pointer hover:text-red-500 transition-all`}
              />
              <div>
                <strong className="text-red-500">2 people</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
