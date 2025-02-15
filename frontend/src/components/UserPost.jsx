import React, { useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import UpdatePost from "./UpdatePost";
import { PostStore } from "../ApiStore/PostStore";
import { UserStore } from "../ApiStore/UserStore";
import { Link } from "react-router-dom";

const UserPost = (setPost) => {
  const { deletePost } = PostStore();

  const { setuser, checkAuth } = UserStore();

  useEffect(() => {
    checkAuth();
  }, []);
  // setpost is accepting array
  const postss = setPost?.setpost || [];

  return (
    <>
      {postss?.map((post) => (
        <div key={post._id} className="relative group">
          {/* Image */}

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[90%] sm:h-64 object-cover rounded-lg"
          />

          {/* Title & Description Overlay */}
          <Link to={`/singleblog/${post._id}`}>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-bold">
                {post.title?.length > 27
                  ? post.title.slice(0, 27) + "..."
                  : post.title}
              </h3>
              <p className="text-white text-sm">
                {post.blogText?.length > 87
                  ? post.blogText.slice(0, 87) + "..."
                  : post.blogText}
              </p>
            </div>
          </Link>

          {/* 3-Dots Icon */}
          {setuser?._id === post.createdBy || setuser?.is_Admin ? (
            <div className="absolute top-2 right-2 text-black ">
              <div className="dropdown dropdown-end glass rounded-lg">
                <EllipsisVertical
                  tabIndex={0}
                  role="button"
                  className="m-1"
                  size={20}
                />

                <ul
                  tabIndex={0}
                  className="-top-5 sm:top-10 menu dropdown-content bg-base-100 rounded-box z-[1] m-5  w-32 p-2 gap-4 shadow"
                >
                  <li>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        document.getElementById("my_modal_4").showModal();
                      }}
                    >
                      Update
                    </button>
                    <dialog
                      id="my_modal_4"
                      className="flex justify-center modal"
                    >
                      <div className="modal-box w-full max-w-6xl">
                        <UpdatePost key={post._id} post={post} />
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </li>
                  <li>
                    <button
                      onClick={() => deletePost(post._id)}
                      className={`btn btn-sm  bg-red-500 hover:bg-red-700 text-white gap-2`}
                    >
                      <span className="inline">delete</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default UserPost;
