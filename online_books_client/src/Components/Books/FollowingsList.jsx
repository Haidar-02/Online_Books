import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { follow, getAllFollowed } from "../../Helpers/books.helper";

const FollowingsList = () => {
  const [followedBooks, setFollowedBooks] = useState([]);
  async function fetchFollowedBooks() {
    try {
      const books = await getAllFollowed();
      setFollowedBooks(books);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFollowedBooks();
  }, []);

  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        Books List From Followings
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        {followedBooks.map((followedBook) => (
          <BookCard
            key={followedBook.book._id}
            book_id={followedBook.book._id}
            title={followedBook.book.title}
            author={followedBook.book.author}
            image={followedBook.book.image}
            recommendedBy={followedBook.book.createdBy.name}
            user_id={followedBook.book.createdBy._id}
            is_followed={followedBook.isFollowing}
            fetchBooks={fetchFollowedBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowingsList;
