import React, { useEffect } from "react";
import {
  CalendarDays,
  MessageCircle,
  Share2,
  Heart,
  SquareArrowOutUpRight,
} from "lucide-react";
import { PostStore } from "../ApiStore/PostStore";
import { useParams, Link } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams(); // this is post id
  const {
    fetchuserbyhisid,
    isuserLoading,
    setpostuser,
    fetchpostbyid,
    isLoadingPost,
    setonepost,
  } = PostStore();

  useEffect(() => {
    fetchpostbyid(id);
  }, [id]); // Runs whenever `id` changes

  useEffect(() => {
    if (setonepost?.createdBy) {
      fetchuserbyhisid(setonepost.createdBy);
    }
  }, [setonepost?.createdBy]); // Runs whenever `createdBy` changes

  if (isuserLoading || isLoadingPost) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-dvh pt-1">
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            {/* User Info */}
            <Link
              to={`/singleProfile/${setonepost?.createdBy}`}
              className="gap-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 sm:w-20 rounded-full">
                    <img src={setpostuser?.profilepic || "/profile.png"} />
                  </div>
                </div>
                <div>
                  <div className="flex gap-6">
                  <p className="font-semibold ">{setpostuser?.name}</p>
                  <SquareArrowOutUpRight size={20} />
                  </div>
                  <p className="text-sm flex items-center gap-1">
                    <CalendarDays size={16} /> Published:{" "}
                    {setonepost?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            </Link>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">{setonepost?.title}</h2>

            {/* Image */}
            <img
              src={setonepost?.image}
              alt={setonepost?.title}
              className="w-full h-72 sm:h-96 object-cover rounded-lg mb-4"
            />

            {/* Description */}
            <p className=" mb-6">{setonepost?.blogText}</p>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 hover:text-red-500">
                <Heart size={20} /> Like
              </button>
              <button className="flex items-center gap-1 hover:text-red-500">
                <MessageCircle size={20} /> Comments {setonepost?.comments}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <Share2 size={20} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
