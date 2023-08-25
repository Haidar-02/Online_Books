import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { getAllBooks } from "../../Helpers/books.helper";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  async function fetchBooks() {
    const response = await getAllBooks();
    if (response) {
      setBooks(response);
    }
  }
  useEffect(() => {
    fetchBooks();
  }, []);

  console.log(books);
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        Books List
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book_id={book._id}
            title={book.title}
            author={book.author}
            image={book.image}
            recommendedBy={book.createdBy.name}
            user_id={book.createdBy._id}
            is_followed={book.is_following}
            fetchBooks={fetchBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
