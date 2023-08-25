import React from "react";
import BookCard from "../Books/BookCard";

const Search = () => {
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' Search
      </h1>
      <div className="m-3">
        <input
          type="text"
          name="content"
          placeholder="search for Books"
          className="p-2 w-72 form-element"
        />
        <button className="p-2  text-white border-1 border-yellow-600 bg-yellow-600 transition-all hover:opacity-70">
          Search
        </button>
        <select name="criteria" className="form-element p-2 ml-2">
          <option value="1">By Title</option>
          <option value="2">By Author</option>
          <option value="3">By Genre</option>
        </select>
      </div>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        <BookCard />
      </div>
    </div>
  );
};

export default Search;
