import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  MessageCircle,
  Share2,
  Heart,
  SquareArrowOutUpRight,
  Bookmark,
} from "lucide-react";
import { PostStore } from "../ApiStore/PostStore";
import { useParams, Link } from "react-router-dom";
import { UserStore } from "../ApiStore/UserStore";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import SinglePostSkeleton from "../components/skeleton/SinglePostSkeleton";

const SingleBlog = () => {
  const [liked, setLiked] = useState();
  const { id } = useParams(); // this is post id
  const {
    isuserLoading,
    fetchpostbyid,
    isLoadingPost,
    setonepost,
    likeUnlike,
  } = PostStore();

  // console.log(setonepost?.createdBy);

  const { setuser } = UserStore();

  useEffect(() => {
    fetchpostbyid(id);
  }, [id]); // Runs whenever `id` changes

  //TODO: optimise instant like , already liked or not {working fine if not hard reload}
  useEffect(() => {
    setonepost?.likes?.some((upvoter) => upvoter?._id === setuser?._id)
      ? setLiked(true)
      : setLiked(false);
  }, [setonepost?.createdBy._id]); // Runs whenever `createdBy` changes

  const handleLike = async (postId) => {
    liked ? setLiked(false) : setLiked(true);
    await likeUnlike(postId);
  };

  if (isuserLoading || isLoadingPost) return <SinglePostSkeleton />;

  return (
    <>
      <div className="min-h-dvh pt-1">
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            {/* User Info */}
            <Link
              to={`/singleProfile/${setonepost?.createdBy._id}`}
              className="gap-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 sm:w-20 rounded-full">
                    <img
                      src={setonepost?.createdBy?.profilepic || "/profile.png"}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex gap-6">
                    <p className="font-semibold ">
                      {setonepost?.createdBy?.name}
                    </p>
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
              className="w-full sm:w-[60%] h-72 sm:h-full object-cover rounded-lg mb-4 sm:mx-auto"
            />

            {/* Description */}
            <p className=" mb-6">{setonepost?.blogText}</p>

            {/* Actions */}
            <div className="flex items-center gap-8 sm:gap-6">
              <button
                className="flex items-center gap-1"
                onClick={() => handleLike(setonepost._id)}
              >
                {liked ? (
                  <>
                    <Heart size={20} className="text-red-500 fill-red-500" />
                    <p>{setonepost?.likes.length + 1}</p>
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    <p>{setonepost?.likes.length}</p>
                  </>
                )}
              </button>
              <button
                onClick={() =>
                  document.getElementById("comment_modal").showModal()
                }
                className="flex items-center gap-1 hover:text-red-500"
              >
                <MessageCircle size={20} />{" "}
                <span className="hidden sm:block">Comments</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <Share2 size={20} />{" "}
                <span className="hidden sm:block">Share</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <Bookmark size={20} />{" "}
                <span className="hidden sm:block">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Commenst Dialogue */}

      <dialog
        id="comment_modal"
        className=" max-h-[70%] p-4 sm:p-6 rounded-lg w-full sm:w-[40vw] max-w-4xl shadow-xl"
      >
        <div className="">
          <h3 className="font-bold text-lg">{setonepost?.title}</h3>
          <ul className="mt-3">
            <li>
              <span className="font-semibold me-2">Abhishek</span>
              <span>This is awesome post</span>
            </li>
          </ul>
        </div>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle bg-white text-black absolute top-1 right-1 ">
            X
          </button>
        </form>
      </dialog>
    </>
  );
};

export default SingleBlog;
