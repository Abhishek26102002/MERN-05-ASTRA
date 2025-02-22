import React from "react";

const SingleUserSkeleton = () => {
  const count = Array(6).fill(null);
  return (
    <div className="flex flex-col gap-3  w-full ">
      {count?.map((_, idx) => (
        <div key={idx} className="sm:ms-20 sm:mt-5 flex w-full flex-col gap-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-slate-500"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-48 sm:w-96 bg-slate-500"></div>
              <div className="skeleton h-4 w-28 bg-slate-500"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleUserSkeleton;
