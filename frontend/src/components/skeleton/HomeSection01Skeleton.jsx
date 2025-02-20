import React from "react";

const HomeSection01Skeleton = () => {
  const count = Array(6).fill(null);
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 ps-0 sm:ps-24">
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

export default HomeSection01Skeleton;
