import React, { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { NotificationStore } from "../ApiStore/NotificationStore";
import PostCard from "../components/PostCard";

let data = {
  _id: "67b44b12d587567793b6f3d5",
  image: "https://picsum.photos/600/400?random=20",
  title: "The Future of Renewable Energy",
  createdBy: {
    _id: "67ae1182485ecd8ec63caacc",
    name: "mckvie",
    email: "mckvie25@gmail.com",
    profilepic:
      "https://res.cloudinary.com/drpp3xkr4/image/upload/v1739473855/qpxoyi3muoma5fivqdhn.jpg",
  },
  category: "energy",
  comments: [],
  createdAt: "2025-02-18T10:40:00.000Z",
  updatedAt: "2025-07-16T03:42:27.200Z",
  __v: 170,
  description:
    "Solar, wind, and hydro power are leading the way in sustainable energy solutions.",
  likes: [],
};

const Test = () => {
  return (
    <div className="w-full h-dvh pt-5">
      <div className="w-full sm:w-[80%] mx-auto">
        <div className="bg-base-300 pb-10 pt-10 rounded-xl">
          <div className="flex justify-center">Test page</div>
          <PostCard
            SinglePost={data}
            isShowDiscription={true} // isShowDiscription or summany one could be true at a time
            summary={false} // isShowDiscription or summany one could be true at a time
            Rank={false}
            isReverse={false}
            BottomBroder={false}
            BigImage={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
