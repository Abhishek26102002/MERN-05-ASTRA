import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import { Heart } from "lucide-react";
import Pagination from "./Pagination";
import HomeSection01Skeleton from "./skeleton/HomeSection01Skeleton";

const HomeSection04 = (posts) => {
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

  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = posts.posts?.slice(firstPostIndex, lastPostIndex);

  if (isuserLoading || isLoadingPost) return <HomeSection01Skeleton />;
  return (
    <>
      <div className="flex flex-row p-0 sm:p-6 w-full">
        {/* Left Container: Blog Posts */}
        <div className="w-full sm:w-[70%]">
          {currentPost.map((post) => (
            <div key={post._id} className=" flex gap-4 p-4 border-b">
              <Link to={`/singleblog/${post._id}`}>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-60 h-28 sm:h-40 rounded-lg"
                />
              </Link>
              <div className="flex  w-[70%]">
                <div className="flex flex-col justify-between">
                  <div className="p-1">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="hidden sm:block text-gray-600 text-sm">
                      {post.blogText}
                    </p>
                  </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-end">
        <Pagination
          totalItems={posts.posts?.length}
          itemsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default HomeSection04;
