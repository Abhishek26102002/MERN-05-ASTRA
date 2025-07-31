import React, { useEffect } from "react";
import { PostStore } from "../../ApiStore/PostStore";
import { Link } from "react-router-dom";

const TrendingStories = () => {
  const { setallpost } = PostStore();

  return (
    <>
      <div className="hidden sm:block w-[30%] bg-gradient-to-tr from-amber-200 via-amber-200 to-red-400 p-4 rounded-lg shadow-md">
        <h2 className="text-3xl text-black font-bold mb-3">Trending Stories</h2>
        {setallpost?.slice(0, 5).map((trend, index) => (
          <div
            key={trend._id}
            className="gap-4 mb-4 flex border-b py-2 relative"
          >
            <div className="font-semibold text-xl text-blue-800 bg-white w-12 h-12 flex items-center justify-center absolute -left-4 -top-1">
              #0{index + 1}
            </div>
            <div className="ms-10">
              <Link to={`/singleblog/${trend._id}`}>
                <h3 className="text-md text-black font-semibold">
                  {trend.title}
                </h3>
              </Link>
              <div className="flex gap-3 mt-2">
                <Link to={`/dashboard/${trend?.createdBy[0]?._id}`}>
                  <div className="avatar">
                    <div className="w-7 rounded-full">
                      <img
                        src={trend?.createdBy[0]?.profilepic || "./profile.png"}
                      />
                    </div>
                  </div>
                </Link>
                <p className="flex justify-center items-center  text-sm text-gray-600">
                  {trend?.createdBy[0]?.name || "author"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingStories;
