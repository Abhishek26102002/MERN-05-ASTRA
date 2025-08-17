import React, { useEffect, useState } from "react";
import { Settings, SquarePlus } from "lucide-react";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";
import { Link, useParams, Navigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import UserPost from "../components/UserPost";
import UserSkeleton from "../components/skeleton/UserSkeleton";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import UserSavedPost from "../components/UserSavedPost";
import UserLikedPost from "../components/UserLikedPost";

const Dashboard = () => {
  const { id } = useParams();
  const {
    isLoading,
    setuser,
    checkAuth,
    toggleFollow,
    isFollowing,
    setIsFollow,
  } = UserStore();
  const [activeTab, setActiveTab] = useState("posts");
  // Local state to track follow status
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [isCheckingFollow, setIsCheckingFollow] = useState(true); // Loading state

  const {
    setPost,
    isLoadingPost,
    fetchpostbyuserid,
    setpostuser,
    fetchuserbyhisid,
  } = PostStore();

  useEffect(() => {
    checkAuth();
    setuser;
  }, [id]);

  const isOwner = Boolean(id === setuser?._id);

  useEffect(() => {
    fetchuserbyhisid(id);
    fetchpostbyuserid(id);
  }, [isOwner, Navigate, id]);

  useEffect(() => {
    let isMounted = true;

    async function checkFollowStatus() {
      try {
        setIsCheckingFollow(true);
        await isFollowing(id);
        if (isMounted) {
          setIsUserFollowing(setIsFollow);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      } finally {
        if (isMounted) {
          setIsCheckingFollow(false);
        }
      }
    }

    checkFollowStatus();

    return () => {
      isMounted = false;
    };
  }, [id, setIsFollow]);

  const handleFollow = async (userId) => {
    setIsUserFollowing((prev) => !prev);
    try {
      await toggleFollow(userId);
    } catch (error) {
      console.log("Error in toggle follow , Location: Dashboard ", error);
    }
  };

  if (isLoading || isCheckingFollow) return <UserSkeleton />;

  return (
    <div className="h-screen sm:h-full pt-5 ">
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
              {isOwner ? (
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">{setpostuser?.name}</h2>
                  <Link
                    to={"/profile"}
                    className="btn btn-sm gap-2 transition-colors"
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
              ) : (
                <>
                  {isUserFollowing ? (
                    <button
                      className="btn btn-sm btn-outline bg-gray-400 text-white"
                      onClick={() => handleFollow(setpostuser?._id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline bg-red-400 text-white"
                      onClick={() => handleFollow(setpostuser?._id)}
                    >
                      Follow
                    </button>
                  )}
                </>
              )}

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span>
                  <strong>{setPost?.length}</strong> posts
                </span>

                <span>
                  <strong>{setpostuser?.follower?.length}</strong> followers
                </span>
                <span>
                  <strong>{setpostuser?.following?.length}</strong> following
                </span>
              </div>

              {/* Name */}
              <p className="text-md font-semibold">
                {setpostuser?.about || "About me"}
              </p>
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
              {isOwner && (
                <>
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
                      activeTab === "liked"
                        ? "border-b-2 border-black"
                        : "opacity-50"
                    }`}
                    onClick={() => setActiveTab("liked")}
                  >
                    Liked
                  </button>
                </>
              )}
            </div>
            {/* Post Grid */}
            {setPost?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 p-4 w-full sm:w-[80%]">
                  {isLoadingPost ? <PostSkeleton /> : ""}
                  {activeTab === "posts" && <UserPost setpost={setPost} />}
                  {isOwner && activeTab === "saved" && <UserSavedPost />}
                  {isOwner && activeTab === "liked" && <UserLikedPost />}
                </div>
              </>
            ) : (
              <div className="h-[25dvh] flex justify-center m-5 ">
                <h1>{isOwner ? "You have" : "User has"} 0 post 😢</h1>
              </div>
            )}
          </div>
          {/* Everything inside these 3 divs */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
