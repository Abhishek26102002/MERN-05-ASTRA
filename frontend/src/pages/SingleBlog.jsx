import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  MessageCircle,
  Share2,
  Heart,
  SquareArrowOutUpRight,
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

  // console.log(setonepost?.createdBy[0]);

  const { setuser } = UserStore();

  useEffect(() => {
    fetchpostbyid(id);
  }, [id]); // Runs whenever `id` changes

  //TODO: optimise instant like , already liked or not {working fine if not hard reload}
  useEffect(() => {
    setonepost?.upvoters[0]?._id.includes(setuser?._id)
      ? setLiked(true)
      : setLiked(false);
  }, [setonepost?.createdBy[0]._id]); // Runs whenever `createdBy` changes

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
              to={`/singleProfile/${setonepost?.createdBy[0]._id}`}
              className="gap-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 sm:w-20 rounded-full">
                    <img
                      src={
                        setonepost?.createdBy[0]?.profilepic || "/profile.png"
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="flex gap-6">
                    <p className="font-semibold ">
                      {setonepost?.createdBy[0]?.name}
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
              className="w-full h-72 sm:h-96 object-cover rounded-lg mb-4"
            />

            {/* Description */}
            <p className=" mb-6">{setonepost?.blogText}</p>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button
                className="flex items-center gap-1"
                onClick={() => handleLike(setonepost._id)}
              >
                {liked ? (
                  <>
                    <Heart size={20} className="text-red-500 fill-red-500" />
                    <p>{setonepost?.upvoters.length + 1}</p>
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    <p>{setonepost?.upvoters.length}</p>
                  </>
                )}
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
