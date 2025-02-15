import React, { useEffect, useState } from "react";
import { Settings, SquarePlus } from "lucide-react";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import UserPost from "../components/UserPost";
import UserSkeleton from "../components/skeleton/UserSkeleton";
import PostSkeleton from "../components/skeleton/PostSkeleton";

const Dashboard = () => {
  const { isLoading, setuser } = UserStore();
  const [activeTab, setActiveTab] = useState("posts");
  const { setPost, fetchLoggedInUserPost, isLoadingPost, deletePost } =
    PostStore();

  useEffect(() => {
    fetchLoggedInUserPost();
  }, []);

  if (isLoading) return <UserSkeleton />;

  // if (isLoadingPost) return <PostSkeleton />;

  return (
    <div className="h-screen sm:h-full pt-5 ">
      <div className="w-full  sm:w-[80%] mx-auto">
        <div className="bg-base-300 pb-10 pt-10 rounded-xl">
          <div className="flex flex-col items-center p-8 md:flex-row md:justify-center md:gap-16">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={setuser?.profilepic || "./profile.png"}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-2 pt-5 sm:pt-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">{setuser?.name}</h2>
                <Link
                  to={"/profile"}
                  className={`
              btn btn-sm gap-2 transition-colors
              
              `}
                >
                  <span className="inline ">Edit Profile</span>
                </Link>
                {/* Modal for create post */}
                <>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      document.getElementById("my_modal_2").showModal();
                    }}
                  >
                    <SquarePlus />
                    create post
                  </button>
                  <dialog id="my_modal_2" className="text-black">
                    <CreatePost />
                  </dialog>
                </>
                <div
                  className="hidden lg:tooltip tooltip-top"
                  data-tip="This is Setting Update me"
                >
                  <Settings className="size-6 cursor-pointer" />
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span>
                  <strong>{setPost?.length ? setPost?.length : 0}</strong> posts
                </span>
                <span>
                  <strong>
                    {setPost?.upvoters?.length ? setPost?.upvoters?.length : 0}
                  </strong>{" "}
                  likes
                </span>
                <span>
                  <strong>121</strong> followers
                </span>
                <span>
                  <strong>191</strong> following
                </span>
              </div>

              {/* Name */}
              <p className="text-md font-semibold">ÄbhïshêK</p>
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
              <button
                className={`pb-2  pt-4 ${
                  activeTab === "saved"
                    ? "border-b-2 border-black"
                    : "opacity-50"
                }`}
                onClick={() => setActiveTab("saved")}
              >
                Saved
              </button>
              <button
                className={`pb-2  pt-4 ${
                  activeTab === "tagged"
                    ? "border-b-2 border-black"
                    : "opacity-50"
                }`}
                onClick={() => setActiveTab("tagged")}
              >
                Liked
              </button>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 p-4 w-full sm:w-[80%]">
              {isLoadingPost ? <PostSkeleton /> : ""}
              {activeTab === "posts" && <UserPost setpost={setPost} />}
            </div>
          </div>
          {setPost?.length === 0 ? (
            <div className="h-[25dvh] flex justify-center m-5 ">
              <h1>You have 0 post 😢</h1>
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

export default Dashboard;
