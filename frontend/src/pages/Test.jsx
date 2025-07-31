import React, { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { NotificationStore } from "../ApiStore/NotificationStore";
import PostCard from "../components/PostCard";
import Comment from "../components/PostViewModal";
import PostViewModal from "../components/PostViewModal";
import UserProfilePostCard from "../components/UserProfilePostCard";
import AdminPanelOptimised from "./AdminPannelOptimised";

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
  comments: [
    {
      userId: {
        _id: "67ae3445485ecd8ec63cad0c",
        name: "joy",
        email: "joy@gmail.com",
        profilepic:
          "https://res.cloudinary.com/drpp3xkr4/image/upload/v1739655531/hc9evqmgibutentx8nq3.jpg",
      },
      text: "this is my comment.",
      createdAt: "2025-07-27T15:11:12.841Z",
    },
  ],
  createdAt: "2025-02-18T10:40:00.000Z",
  updatedAt: "2025-07-27T15:11:12.845Z",
  __v: 175,
  description:
    "Solar, wind, and hydro power are leading the way in sustainable energy solutions.",
  likes: [
    {
      _id: "67ae1182485ecd8ec63caacc",
      name: "mckvie",
      email: "mckvie25@gmail.com",
      profilepic:
        "https://res.cloudinary.com/drpp3xkr4/image/upload/v1739473855/qpxoyi3muoma5fivqdhn.jpg",
    },
    {
      _id: "67ae3445485ecd8ec63cad0c",
      name: "joy",
      email: "joy@gmail.com",
      profilepic:
        "https://res.cloudinary.com/drpp3xkr4/image/upload/v1739655531/hc9evqmgibutentx8nq3.jpg",
    },
  ],
};
const Test = () => {
  const [showModal, setShowModal] = useState(true);
  // return (
  //   <div className="w-full h-dvh pt-5">
  //     <div className="w-full sm:w-[80%] mx-auto">
  //       <div className="bg-base-300 pb-10 pt-10 rounded-xl">
  //         <div className="flex justify-center">Test page</div>
  //         <UserProfilePostCard post={data}/>
  //       </div>
  //     </div>
  //   </div>
  // );
  return <AdminPanelOptimised/>
};

export default Test;
