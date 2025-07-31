import { Heart, MessageCircle, Send, LogIn, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { UserStore } from "../../ApiStore/UserStore";
import { PostStore } from "../../ApiStore/PostStore";
import { Link } from "react-router-dom";
const HomeMobile = ({ SinglePost }) => {
  const { setuser } = UserStore();
  const { likeUnlike,comment } = PostStore();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    SinglePost.likes.some((like) => like._id === setuser?._id)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(
    SinglePost.likes.length
  );
  const [showComments, setShowComments] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
  });
  const toggleReadMore = () => setIsExpanded((prev) => !prev);
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
  const isSubmitDisabled = !formData.text.trim();
  const handleAddComment = async (e) => {
    e.preventDefault();
    setFormData({ text: "" });
    SinglePost.comments.push({
      userId: {
        _id: setuser._id,
        name: setuser.name,
        profilepic: setuser.profilepic,
      },
      text: formData.text,
      createdAt:`${new Date()}`
    });
    await comment(SinglePost._id, formData);
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4 w-full">
        {/* Header */}
        <div className="flex gap-3">
          <Link to={`/dashboard/${SinglePost?.createdBy?._id}`}>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={SinglePost.createdBy?.profilepic || "/avatar.png"} />
              </div>
            </div>
          </Link>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
              <Link to={`/dashboard/${SinglePost?.createdBy?._id}`}>
                <p className="font-semibold">{SinglePost.createdBy?.name}</p>
              </Link>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <a href={`/dashboard/${SinglePost?.createdBy?._id}`}>
                  @{SinglePost.createdBy?.name}
                </a>
                <span>•</span>
                <span>{formatTimeAgo(SinglePost.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Text */}
        <p className="text-sm text-gray-700">{SinglePost.title}</p>

        {/* Post Image */}
        {SinglePost.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={SinglePost.image}
              alt="Post"
              className="w-full h-auto object-cover"
            />
            <p className="text-sm text-gray-700 mt-2">
              {isExpanded
                ? SinglePost?.description
                : `${SinglePost?.description.slice(0, 55)}... `}
              <button
                onClick={toggleReadMore}
                className="text-blue-500 hover:underline ml-1"
              >
                {isExpanded ? "show less" : "read more"}
              </button>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center gap-2 btn btn-sm btn-ghost ${
              hasLiked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            {hasLiked ? (
              <Heart className="w-5 h-5 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
            <span>{optimisticLikes}</span>
          </button>

          <button
            className="flex items-center gap-2 btn btn-sm btn-ghost hover:text-blue-500"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{SinglePost.comments.length}</span>
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="pt-4 border-t space-y-4">
            {SinglePost.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full">
                    <img src={comment.userId?.profilepic || "/avatar.png"} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 flex-wrap text-sm text-gray-500">
                    <span className="text-black font-medium">
                      {comment.userId?.name}
                    </span>
                    <span>@{comment.userId.name}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(comment?.createdAt)}</span>
                  </div>
                  <p className="text-sm">{comment?.text}</p>
                </div>
              </div>
            ))}

            {setuser ? (
              <div className="flex gap-3">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full">
                    <img src={setuser?.profilepic || "/avatar.png"} />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    className="textarea textarea-bordered w-full h-20"
                    placeholder="Write a comment..."
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="btn btn-sm btn-primary flex items-center gap-2"
                      onClick={handleAddComment}
                      disabled={isSubmitDisabled}
                    >
                      {isCommenting ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Comment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded bg-gray-100 text-center">
                <button className="btn btn-outline btn-sm gap-2">
                  <LogIn className="w-4 h-4" /> Sign in to comment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeMobile;
