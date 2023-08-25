import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../../Helpers/books.helper";

const BookInfo = () => {
  const navigate = useNavigate();
  const bookId = useParams();
  console.log(bookId);
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const bookData = await getBookById(bookId.id);
        setBookInfo(bookData.bookInfo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookDetails();
  }, [bookId]);

  if (!bookInfo) {
    return <div>Loading...</div>;
  }
  console.log(bookInfo);

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
              alt="Book Preview"
              className="aspect-square w-[700px] object-cover rounded-sm"
            />
          </div>

          <div className="w-full px-5 ml-10 cursor-default">
            <h2 className="text-2xl tracking-wider">{bookInfo.title}</h2>
            <div className="mt-2">
              <p className="text-lg">
                Written By{" "}
                <span className="text-yellow-700">{bookInfo.author}</span>
              </p>
            </div>
            <p className="mt-2">
              Review By <strong>{bookInfo.createdBy.name}</strong>
            </p>
            <div className="mt-2">
              <p className="text-lg text-yellow-700">Genre</p>
              <p>{bookInfo.genre}</p>
            </div>
            <div className="mt-2">
              <p className="text-lg text-yellow-700">Review</p>
              <p>{bookInfo.review}</p>
            </div>
            <div className="flex items-end justify-start gap-2">
              <FavoriteIcon
                className={`mt-5 cursor-pointer text-cursor-pointer hover:text-red-500 transition-all`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
