import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { PostStore } from "../ApiStore/PostStore";
import { useParams, Link } from "react-router-dom";
import { UserStore } from "../ApiStore/UserStore";
import { formatDistanceToNowStrict } from "date-fns";

const HomeSection01 = (posts) => {
  // console.log("posts.posts", posts.posts);
  const [liked, setLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked status per post
  const [usernow, setusernow] = useState("");
  const {
    fetchuserbyhisid,
    isuserLoading,
    setpostuser,
    fetchpostbyid,
    isLoadingPost,
    setonepost,
    likeUnlike,
    fetchuserbyhisidSingle,
  } = PostStore();

  const { setuser } = UserStore();

  if (isuserLoading || isLoadingPost) return <div>Loading...</div>;

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown time"; // Handle missing or invalid timestamp
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid date format
    return `${formatDistanceToNowStrict(date)} ago`;
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

  return (
    <div className="flex flex-col sm:flex-row container px-4 py-2 gap-4">
      {/* left  */}
      <div className="pe-3 w-full sm:w-[70%]">
        {/* primary */}
        <div className="flex flex-col sm:flex-row gap-4 p-3">
          <Link to={`/singleblog/${posts.posts[0]?._id}`}>
            <div className="relative">
              <img
                src={posts.posts[0]?.image}
                alt={posts.posts[0]?.title}
                className="max-w-full sm:max-w-xl h-52 sm:h-64 rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-white px-2 py-1 text-blue-600 text-3xl font-bold w-20">
                #1
              </div>
            </div>
          </Link>
          <div className=" flex flex-col justify-between">
            <h3 className="text-3xl font-semibold">{posts.posts[0]?.title}</h3>
            <div className="flex items-center mt-2 ">
              <Link to={`/singleProfile/${posts.posts[0]?.createdBy[0]?._id}`}>
                <div className="flex pe-1 items-center border border-gray-500 rounded-full">
                  <div className="avatar">
                    <div className="w-7 rounded-full">
                      <img
                        src={
                          posts.posts[0]?.createdBy[0]?.profilepic ||
                          "./profile.png"
                        }
                      />
                    </div>
                  </div>
                  <span className="ms-2 text-xs">
                    {posts.posts[0]?.createdBy[0]?.name}
                  </span>
                </div>
              </Link>
              <button
                className="ms-4 flex items-center gap-2"
                onClick={() => {
                  handleLike(posts.posts[0]?._id);
                }}
              >
                {likedPosts[posts.posts[0]?._id] ||
                posts?.posts[0]?.upvoters[0]?._id.includes(setuser?._id) ? (
                  <>
                    <Heart size={20} className="text-red-500 fill-red-500" />
                    <p>{posts.posts[0]?.upvoters?.length + 1 || 0}</p>
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    <p>{posts.posts?.upvoters?.length || 0}</p>
                  </>
                )}
              </button>
              <span className="text-gray-400 text-xs ml-auto">
                {formatTimeAgo(posts.posts[0]?.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Posts */}
        <div className="gap-4 flex flex-col sm:flex-row mt-4 ">
          {posts.posts.slice(1, 3).map((post, index) => (
            <div key={post._id} className="flex gap-4 p-1">
              <Link to={`/singleblog/${post._id}`}>
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-80 h-28 sm:h-40 rounded-lg"
                  />
                  <div className="absolute text-xl bottom-0 left-0 bg-white px-2 py-1 text-blue-600 font-bold">
                    #{index + 2}
                  </div>
                </div>
              </Link>
              <div className="flex flex-col justify-between">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <div className="flex  items-center mt-2 ">
                  <Link to={`/singleProfile/${post?.createdBy[0]?._id}`}>
                    <div className="flex pe-1 items-center sm:border sm:border-gray-500 rounded-full">
                      <div className="avatar">
                        <div className="w-7 rounded-full">
                          <img
                            src={
                              post.createdBy[0]?.profilepic || "./profile.png"
                            }
                          />
                        </div>
                      </div>
                      <span className="ms-2 text-xs">
                        {post.createdBy[0]?.name}
                      </span>
                    </div>
                  </Link>
                  <button
                    className="ms-1 flex items-center gap-2"
                    onClick={() => {
                      handleLike(post._id);
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
                  <span className="hidden sm:flex text-gray-400 text-xs ml-auto">
                    {formatTimeAgo(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="gap-4 sm:gap-6 pe-0 sm:pe-8 flex flex-col pt-3 w-full sm:w-[40%] ">
        {posts.posts.slice(3, 7).map((post, index) => (
          <div key={post._id} className="flex gap-4">
            <Link to={`/singleblog/${post._id}`}>
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-52 h-24 rounded-lg"
                />
                <div className="absolute bottom-0 left-0 bg-white px-2 py-1 text-blue-600 text-xl font-bold w-10">
                  #{index + 4}
                </div>
              </div>
            </Link>
            <div className="flex flex-col justify-between">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <div className="flex items-center mt-2">
                <Link to={`/singleProfile/${post?.createdBy[0]?._id}`}>
                  <div className="flex pe-1  items-center border border-gray-500 rounded-full">
                    <div className="avatar">
                      <div className="w-7 rounded-full">
                        <img
                          src={post.createdBy[0]?.profilepic || "./profile.png"}
                        />
                      </div>
                    </div>
                    <span className="ms-2 text-xs">
                      {" "}
                      {post.createdBy[0]?.name}
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
                      <Heart size={20} className="text-red-500 fill-red-500" />
                      <p>{post?.upvoters?.length + 1 || 0}</p>
                    </>
                  ) : (
                    <>
                      <Heart size={20} />
                      <p>{post?.upvoters?.length || 0}</p>
                    </>
                  )}
                </button>
                <span className="hidden sm:flex text-gray-400 text-xs ml-auto">
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Trending Posts */}
    </div>
  );
};

export default HomeSection01;
