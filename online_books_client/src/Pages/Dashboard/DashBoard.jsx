import React, { useState } from "react";
import BooksList from "../../Components/Books/BooksList";
import FollowingsList from "../../Components/Books/FollowingsList";
import Search from "../../Components/Search/Search";
import Create from "../../Components/Create/Create";
import "./style.css";

const falseState = {
  all_books: false,
  following: false,
  create: false,
  search: false,
};

const DashBoard = () => {
  const [state, setState] = useState({
    all_books: true,
    following: false,
    create: false,
    search: false,
  });

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { all_books, search, following, create } = state;
  return (
    <div className="h-full w-full flex-col gap-5">
      <div className="flex w-full items-center justify-center gap-10 py-5 bg-gray-100 shadow-lg">
        <div
          onClick={async () => togglePage("all_books")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          All Books
        </div>
        <div
          onClick={async () => togglePage("following")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          Following Books
        </div>
        <div
          onClick={async () => togglePage("search")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          Search
        </div>
        <div
          onClick={async () => togglePage("create")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          Share Books
        </div>
      </div>
      <div className="w-full h-full p-10">
        {all_books && <BooksList />}
        {following && <FollowingsList />}
        {search && <Search />}
        {create && <Create />}
      </div>
    </div>
  );
};
export default DashBoard;
