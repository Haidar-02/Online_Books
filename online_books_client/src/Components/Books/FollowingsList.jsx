import React from "react";
import BookCard from "./BookCard";

const FollowingsList = () => {
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' Books List From Followings
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        <BookCard />
      </div>
    </div>
  );
};

export default FollowingsList;
