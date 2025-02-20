import React from "react";

const PostSkeleton = () => {
  const count = Array(3).fill(null);
  return (
    <>
      <div className="flex flex-row">
        {count?.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="flex w-80 flex-col gap-4">
              <div className="skeleton h-32 w-full  bg-slate-500"></div>
              <div className="skeleton h-4 w-28  bg-slate-500"></div>
              <div className="skeleton h-4 w-full  bg-slate-500"></div>
              <div className="skeleton h-4 w-full  bg-slate-500"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostSkeleton;
