import React, { useEffect, useState } from "react";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import { Link, useNavigate } from "react-router-dom";
import UserPost from "../components/UserPost";
import UserSkeleton from "../components/skeleton/UserSkeleton";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import { useParams } from "react-router-dom";
import UserSavedPost from "../components/UserSavedPost";
import UserLikedPost from "../components/UserLikedPost";

const SingleProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, setuser } = UserStore();
  const [activeTab, setActiveTab] = useState("posts");
  const {
    isLoadingPost,
    fetchpostbyuserid,
    setpostuser,
    fetchuserbyhisid,
    setPost
  } = PostStore();

  const     setpostbyuid=setPost;

  useEffect(() => {
    if (id === setuser?._id) {
      navigate("/dashboard"); // Redirect user to the dashboard
    }
    if (id) {
      fetchuserbyhisid(id);
      fetchpostbyuserid(id);
    }
  }, [id, setuser, navigate]);

  if (isLoading) return <UserSkeleton />;

  return (
    <div className="h-full pt-5 ">
      <div className="w-full  sm:w-[80%] mx-auto">
        <div className="bg-base-300 pb-10 pt-10 rounded-xl">
          <div className="flex flex-col items-center p-8 md:flex-row md:justify-center md:gap-16">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={setpostuser?.profilepic || "./profile.png"}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-2 pt-5 sm:pt-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">{setpostuser?.name}</h2>

                {/* Modal for create post */}
                <>
                  <button
                    className="btn btn-sm btn-outline bg-red-400 text-white"
                    onClick={() => {
                      console.log("Followed");
                    }}
                  >
                    Follow
                  </button>
                </>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span>
                  <strong>
                    {setpostbyuid?.length ? setpostbyuid?.length : 0}
                  </strong>{" "}
                  posts
                </span>
               
                <span>
                  <strong>0</strong> followers
                </span>
                <span>
                  <strong>0</strong> following
                </span>
              </div>

              {/* Name */}
              <p className="text-md font-semibold">About you</p>
            </div>
          </div>
          <hr />
          {/* POSTS */}
          <div className="flex flex-col items-center w-full">
            {/* Tabs */}
            <div className="flex gap-6 text-md w-full justify-center">
              <button
                className={`pb-2 pt-4 ${
                  activeTab === "posts"
                    ? "border-b-2 border-black"
                    : "opacity-50"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
             
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 p-4 w-full sm:w-[80%]">
              {isLoadingPost ? <PostSkeleton /> : ""}
              {activeTab === "posts" && <UserPost setpost={setpostbyuid} />}
          
            </div>
          </div>
          {setpostbyuid?.length === 0 ? (
            <div className="h-[25dvh] flex justify-center m-5 ">
              <h1>User has 0 post 😢</h1>
            </div>
          ) : (
            ""
          )}
          {/* Everything inside these 3 divs */}
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
