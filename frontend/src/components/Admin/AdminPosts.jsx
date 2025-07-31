import React, { useEffect, useState } from "react";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";
import { PostStore } from "../../ApiStore/PostStore";
import SingleUserSkeleton from "../skeleton/SingleUserSkeleton";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../Pagination";

const AdminPosts = () => {
  const navigate = useNavigate();
  const { fetchAllPost, setallpost, deletePost, isLoadingPost } = PostStore();
  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = setallpost?.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    fetchAllPost();
  }, [deletePost]);

  if (isLoadingPost) return <SingleUserSkeleton />;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Blogs</th>
              <th>Ids</th>
              <th>Posted/Updated At</th>
              <th>Likes</th>
              <th>category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPost?.map((post) => (
              <tr key={post._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <Link to={`/singleblog/${post._id}`}>
                    <div className="gap-3">
                      <img
                        className="w-40 rounded-xl"
                        src={post?.image || "/profile.png"}
                        alt="Avatar Tailwind CSS Component"
                      />

                      <div>
                        <h1 className="font-bold">
                          {post?.title?.length > 27
                            ? post.title.slice(0, 27) + "..."
                            : post.title}
                        </h1>
                        <p className="text-wrap text-sm text-teal-500">
                          {post?.blogText?.length > 27
                            ? post.blogText.slice(0, 27) + "..."
                            : post.blogText}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                {/* ids */}
                <td>
                  <div className="flex flex-col">
                    <span>postId: {post?._id}</span>
                    <br />
                    <Link to={`/dashboard/${post?.createdBy._id}`}>
                      <div className="flex flex-col ">
                        <span className="text-gray-500 hover:text-primary">
                          UserId : {post?.createdBy._id}
                        </span>
                        <span className="text-gray-500 hover:text-primary">
                          Name : {post?.createdBy.name}
                        </span>
                        <span className="text-gray-500 hover:text-primary">
                          email : {post?.createdBy.email}
                        </span>
                      </div>
                    </Link>
                  </div>
                </td>
                {/* post/update at */}
                <td>
                  <div className="flex flex-col">
                    <span>created: {post.createdAt?.split("T")[0]}</span>
                    <br />
                    <span>Updated: {post.updatedAt?.split("T")[0]}</span>
                  </div>
                </td>

                {/* Likes */}
                <td>{post?.likes.length}</td>
                {/* category */}
                <td>{post?.category}</td>

                {/* Actions */}
                <td>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="btn bg-transparent btn-sm me-6 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/singleblog/${post._id}`)}
                    className="btn bg-transparent btn-sm text-sky-300 hover:text-sky-500"
                  >
                    <SquareArrowOutUpRight className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
        <div className=" flex justify-end">
          <Pagination
            totalItems={setallpost?.length}
            itemsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminPosts;
