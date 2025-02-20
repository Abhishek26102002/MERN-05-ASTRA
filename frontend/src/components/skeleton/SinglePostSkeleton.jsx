import React from "react";

const SinglePostSkeleton = () => {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <div className="flex w-[40%] flex-col gap-4 ">
        <div className="skeleton h-72 w-full bg-slate-500"></div>
        <div className="skeleton h-8 w-28 bg-slate-500"></div>
        <div className="skeleton h-8 w-full bg-slate-500"></div>
        <div className="skeleton h-8 w-full bg-slate-500"></div>
      </div>
    </div>
  );
};

export default SinglePostSkeleton;
