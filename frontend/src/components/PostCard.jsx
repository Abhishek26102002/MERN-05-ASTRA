import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
import { Heart, ChevronDown } from "lucide-react";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import PostViewModal from "./PostViewModal";
const PostCard = ({
  SinglePost,
  isReverse,
  isShowDiscription,
  Rank,
  BottomBroder,
  summary,
  ImageSize,
  title,
}) => {
  const { setuser } = UserStore();
  const { likeUnlike } = PostStore();
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    SinglePost.likes.some((like) => like._id === setuser?._id)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(
    SinglePost.likes.length
  );
  const [showModal, setShowModal] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      console.log("Liked");

      await likeUnlike(SinglePost._id);
    } catch (error) {
      setOptmisticLikes(SinglePost.likes.length);
      setHasLiked(SinglePost.likes.some((like) => like._id === setuser?._id));
    } finally {
      setIsLiking(false);
    }
  };
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid date"
      : `${formatDistanceToNowStrict(date)} ago`;
  };
  return (
    <div className="flex flex-row w-full">
      <div className="w-full">
        <div
          className={
            BottomBroder ? "flex gap-4 p-4 border-b" : "flex gap-4 p-4"
          }
        >
          <div className="relative" onClick={() => setShowModal(true)}>
            {!isReverse && (
              <img
                src={SinglePost.image}
                alt="Post"
                className={ImageSize && `${ImageSize} rounded-lg`}
              />
            )}
            {Rank && (
              <div className="absolute bottom-0 left-0 bg-white px-2 py-1 text-blue-600 text-3xl font-bold w-15">
                {`#${Rank}`}
              </div>
            )}
          </div>
          <div className="flex  w-[70%]">
            <div className="flex flex-col justify-between">
              <h2 className={title && `${title} font-semibold`}>
                {SinglePost.title}
              </h2>
              {isShowDiscription && !summary && (
                <div className="p-1">
                  <p className="hidden sm:block text-gray-600 text-sm">
                    {SinglePost.description}
                  </p>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <Link to={`/dashboard/${SinglePost?.createdBy?._id}`}>
                    <div className="flex pe-1 items-center border border-gray-300 rounded-full">
                      <div className="avatar">
                        <div className="w-7 rounded-full">
                          <img
                            src={
                              SinglePost?.createdBy?.profilepic ||
                              "./profile.png"
                            }
                          />
                        </div>
                      </div>
                      <span className="ms-2 text-xs">
                        {SinglePost?.createdBy?.name || "name"}
                      </span>
                    </div>
                  </Link>
                  <button
                    className="ms-4 flex items-center gap-2"
                    onClick={handleLike}
                  >
                    {hasLiked ? (
                      <Heart className="size-5 fill-red-500" />
                    ) : (
                      <Heart className="size-5" />
                    )}
                    <span>{optimisticLikes}</span>
                  </button>
                </div>

                <span className="hidden sm:flex text-gray-400 text-xs ml-1 mt-2">
                  {formatTimeAgo(SinglePost?.createdAt)}
                </span>
              </div>
              {!isShowDiscription && summary && (
                <div className="collapse pt-2 -ms-4 w-80 sm:w-full ">
                  <input type="checkbox" />
                  <div className="collapse-title flex flex-row gap-1 ">
                    View quick summary{" "}
                    <ChevronDown
                      size={15}
                      className="mt-2 flex justify-center items-center"
                    />
                  </div>
                  <div className="collapse-content">
                    <p>{SinglePost.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isReverse && (
            <div onClick={() => setShowModal(true)}>
              <img
                src={SinglePost.image}
                alt="Post"
                className={ImageSize && `${ImageSize} rounded-lg`}
              />
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <PostViewModal post={SinglePost} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default PostCard;
