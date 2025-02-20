import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import { Heart, ChevronDown } from "lucide-react";
import HomeSection01Skeleton from "./skeleton/HomeSection01Skeleton";


const HomeSection03 = (posts) => {
  const { isuserLoading, isLoadingPost, likeUnlike } = PostStore();
  const { setuser } = UserStore();
  const [likedPosts, setLikedPosts] = useState({}); // Track liked status per post

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid date"
      : `${formatDistanceToNowStrict(date)} ago`;
  };

  const handleLike = async (postId) => {
    try {
      await likeUnlike(postId);
      setLikedPosts((prevLiked) => ({
        ...prevLiked,
        [postId]: !prevLiked[postId], // Toggle like status for the specific post
      }));
    } catch (error) {
      console.log("Error in handle Like Homesection01 ", error);
    }
  };
  if (isuserLoading || isLoadingPost) return <HomeSection01Skeleton />;
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-6 p-0 sm:p-12 w-full">
        {posts.posts.map((post, index) => (
          <div
            key={index}
            className="flex flex-col-reverse sm:flex-row p-4 rounded-lg overflow-hidden shadow-md "
          >
            {/* Left Text Section */}
            <div className="flex flex-col justify-between p-4 w-2/3">
              <h2 className="text-lg font-semibold w-72 sm:w-full">
                {post?.title}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2 mt-2 justify-between sm:w-96">
                  <div className="flex flex-row">
                    <Link to={`/singleProfile/${post?.createdBy[0]?._id}`}>
                      <div className="flex pe-1 items-center border border-gray-300 rounded-full">
                        <div className="avatar">
                          <div className="w-7 rounded-full">
                            <img
                              src={
                                post?.createdBy[0]?.profilepic ||
                                "./profile.png"
                              }
                            />
                          </div>
                        </div>
                        <span className="ms-2 text-xs">
                          {post?.createdBy[0]?.name || "name "}
                        </span>
                      </div>
                    </Link>
                    <button
                      className="ms-4 flex items-center gap-2"
                      onClick={() => {
                        handleLike(post?._id);
                      }}
                    >
                      {likedPosts[post._id] ||
                      post?.upvoters[0]?._id.includes(setuser?._id) ? (
                        <>
                          <Heart
                            size={20}
                            className="text-red-500 fill-red-500"
                          />
                          <p>{post?.upvoters?.length + 1 || 0}</p>
                        </>
                      ) : (
                        <>
                          <Heart size={20} />
                          <p>{post?.upvoters?.length || 0}</p>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="hidden ms-10 sm:flex items-center text-xs text-gray-500 gap-1">
                    {formatTimeAgo(post?.createdAt)}
                  </span>
                </div>
              </div>
              <>
              
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
                    <p>{post?.blogText}</p>
                  </div>
                </div>
              </>
            </div>

            {/* Right Image Section */}
            <Link to={`/singleblog/${post._id}`}>
              <div className="sm:w-60 w-[100%]">
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="w-full sm:w-60 h-40 sm:h-40 rounded-lg"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeSection03;
