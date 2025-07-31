import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Heart } from "lucide-react";
import UpdatePost from "./UpdatePost";
import { PostStore } from "../ApiStore/PostStore";
import { UserStore } from "../ApiStore/UserStore";
import { Link } from "react-router-dom";
import PostViewModal from "./PostViewModal";

const UserProfilePostCard = ({ post }) => {
  const { deletePost } = PostStore();
  const { setuser } = UserStore();
  const [updatePost, setUpdatePost] = useState(post);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
    } catch (error) {
      console.log("Error in deleting post ", error);
    }
  };

  const handleUpdate = () => {
    setUpdatePost(post);
    setShowModal(true);
  };
  // inside your component
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [showModal]);

  return (
    <>
      <div className="relative group">
        <img
          src={post?.image}
          alt={post.title}
          className="w-full h-40 sm:h-40 rounded-lg"
        />

        {/* Title & Description Overlay */}

        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setShowModal2(true)}
        >
          <h3 className="text-white font-bold">
            {post.title?.length > 27
              ? post.title.slice(0, 27) + "..."
              : post.title}
          </h3>
          <p className="hidden sm:flex text-white text-sm">
            {post.blogText?.length > 87
              ? post.blogText.slice(0, 87) + "..."
              : post.blogText}
          </p>
          <div className="mt-2 flex flex-row">
            <Heart className="text-red-600" />
            <p className="text-white ms-2">{post?.likes?.length} Likes</p>
          </div>
        </div>

        {/* 3-Dots Icon */}
        {(setuser?._id === post.createdBy || setuser?.is_Admin) && (
          <div key={post?._id} className="absolute top-2 right-2 text-black ">
            <div className="dropdown dropdown-end glass rounded-lg">
              <EllipsisVertical
                tabIndex={0}
                role="button"
                className="m-1"
                size={20}
              />
              <ul
                tabIndex={0}
                className="-top-5 sm:top-10 menu dropdown-content bg-base-100 rounded-box z-[1] m-5 w-32 p-2 gap-4 shadow"
              >
                <li>
                  <button className="btn btn-sm" onClick={handleUpdate}>
                    {/* Update Modal */}
                    Update
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDelete}
                    className="btn btn-sm bg-red-500 hover:bg-red-700 text-white gap-2"
                  >
                    <span className="inline">delete</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <dialog id={`modal_${post._id}`} ref={modalRef} className="modal">
          <UpdatePost post={updatePost} />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
      {showModal2 && (
        <PostViewModal post={post} onClose={() => setShowModal2(false)} />
      )}
    </>
  );
};

export default UserProfilePostCard;
