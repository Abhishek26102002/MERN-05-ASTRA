import { Heart, MessageCircle, Share2, Bookmark, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PostStore } from "../ApiStore/PostStore";
import { UserStore } from "../ApiStore/UserStore";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
const PostViewModal = ({ post, onClose }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const { comment, likeUnlike } = PostStore();
  const { setuser } = UserStore();
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like._id === setuser?._id)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(post.likes.length);

  const isSubmitDisabled = !formData.text.trim();

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      console.log("Liked");

      await likeUnlike(post._id);
    } catch (error) {
      setOptmisticLikes(post.likes.length);
      setHasLiked(post.likes.some((like) => like._id === setuser?._id));
    } finally {
      setIsLiking(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ text: "" });
    post.comments.push({
      userId: {
        _id: setuser._id,
        name: setuser.name,
        profilepic: setuser.profilepic,
      },
      text: formData.text,
    });
    await comment(post._id, formData);
  };
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid date"
      : `${formatDistanceToNowStrict(date)} ago`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col sm:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-500 z-10"
        >
          ✕
        </button>

        {/* Left - Post Image */}
        <div className="w-full sm:w-1/2 h-full bg-gray-100 flex items-center justify-center p-4 flex-col">
          <p className="absolute top-7 p-4 font-semibold text-xl">
            {post?.title}
          </p>
          <img
            src={post.image}
            alt="Post"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <p className="p-4 text-lg">{post?.description}</p>
        </div>

        {/* Right - Details */}
        <div className="w-full sm:w-1/2 h-full flex flex-col justify-between p-4 overflow-y-auto">
          {/* Top - User Info */}
          <Link to={`/dashboard/${post.createdBy?._id}`}>
            <div className="flex items-center space-x-3 border-b pb-3 mb-3">
              <img
                src={post.createdBy?.profilepic || "./profile.png"}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-semibold">
                {post.createdBy?.name || "Unknown"}
              </span>
            </div>
          </Link>

          {/* Middle - Comments */}
          <div className="flex-1 overflow-y-auto mb-3">
            <h3 className="font-medium mb-2 text-gray-700">Comments</h3>
            {post.comments?.length > 0 ? (
              <ul className="space-y-2">
                {post.comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 rounded flex flex-row gap-2 items-center"
                  >
                    <Link to={`/dashboard/${comment?.userId?._id}`}>
                      <img
                        src={comment.userId?.profilepic || "./profile.png"}
                        alt="User"
                        className="w-10 h-10 rounded-full border"
                      />
                    </Link>
                    <p className="text-sm">
                      <span className="font-semibold">
                        {comment.userId.name} :
                      </span>{" "}
                      {comment.text}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>

          {/* Bottom - Actions */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2">
                <button className="flex items-center" onClick={handleLike}>
                  {hasLiked ? <Heart className=" fill-red-500" /> : <Heart />}
                </button>

                {/* <MessageCircle className="cursor-pointer hover:text-blue-500" /> */}
                <Share2 className="cursor-pointer hover:text-green-500" />
              </div>
              <Bookmark className="cursor-pointer hover:text-yellow-500" />
            </div>
            <div className="flex flex-col">
              <span>{optimisticLikes} Likes</span>
              <span className="hidden sm:flex text-ghost text-xs mb-2">
                {formatTimeAgo(post?.createdAt)}
              </span>
            </div>

            {/* Add Comment Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 input input-bordered bg-gray-100 text-black"
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="btn btn-secondary"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewModal;
