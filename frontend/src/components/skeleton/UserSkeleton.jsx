import React from "react";

const UserSkeleton = () => {
  return (
    <>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="flex w-[70%] h-[90%] flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-52 w-52 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-8 w-32"></div>
              <div className="skeleton h-8 w-64"></div>
            </div>
          </div>
          <div className="skeleton h-60 w-full"></div>
        </div>
      </div>
    </>
  );
};

export default UserSkeleton;
