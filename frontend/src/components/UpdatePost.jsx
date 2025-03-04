import React, { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { PostStore } from "../ApiStore/PostStore";
import { UserStore } from "../ApiStore/UserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdatePost = (post) => {
  // {console.log(post)}
  const navigate = useNavigate();
  const { updatePost } = PostStore();
  const { setuser } = UserStore();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const convertUrlToFile = async (imageUrl, fileName = "default.jpg") => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error converting URL to file:", error);
      return null;
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.post.title || "");
      setDescription(post.post.blogText || "");
      setCategory(post.post.category || "");
      setImage(post.post.image || null);
    }
  }, []);

  const fileInputRef = useRef(null);

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle Submit with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileToUpload = file; // User-selected file
    if (!fileToUpload && post.post.image) {
      fileToUpload = await convertUrlToFile(post.post.image);
    }

    const formData = new FormData();
    formData.append("image", file || fileToUpload); // If the user selected a new file, use it; otherwise, send the existing post image
    formData.append("title", title);
    formData.append("blogText", description);
    formData.append("category", category);

    try {
     await updatePost(formData, post.post._id);
      // Close modal after successful submission
      document.getElementById("my_modal_4").close();
      // navigate(0); // Refreshes the current page
      // toast.success("Refresh page to view update")
    } catch (error) {
      console.log("Error in create post:", error);
    }
  };

  return (
    <>
      <div className=" bg-slate-200 p-4 sm:p-6 rounded-lg w-full sm:w-[80vw] max-w-4xl shadow-xl relative ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-primary absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="text-xl font-semibold text-center">Update Post</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">
          {/* Image Upload */}
          <div className="flex items-center justify-center relative border border-dashed border-gray-300 p-6 rounded-lg w-full h-80 bg-gray-100">
            {!image ? (
              <label className="cursor-pointer flex flex-col items-center">
                <ImagePlus size={40} className="text-gray-500 mb-2" />
                <span className="text-gray-500">Select Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <>
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-full rounded-lg shadow-lg"
                />
                <button
                  onClick={removeImage}
                  className="z-10 absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary
              flex items-center justify-center"
                  type="button"
                >
                  <X className=" size-4" />
                </button>
              </>
            )}
          </div>

          {/* Post Details */}
          <div className="">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={setuser?.profilepic || "./profile.png"}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-semibold">{setuser?.name}</span>
            </div>
            <input
              type="text"
              placeholder="Add a title..."
              className="input input-bordered w-full mb-2 text-black bg-slate-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write a discription..."
              className="textarea textarea-bordered w-full h-24 resize-none text-black bg-slate-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Add Category..."
              className="input input-bordered w-full mt-2 mb-2 text-black bg-slate-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <form method="dialog">
              <button
                className="btn btn-primary w-full mt-4"
                onClick={handleSubmit}
              >
                Share
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
