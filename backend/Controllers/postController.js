import asyncHandler from "express-async-handler";
import Blog from "../Models/blogs.js"; // Ensure the correct file extension
import path from "path";
import { fileURLToPath } from "url";
import Users from "../Models/users.js";
import fs from "fs";
import cloudinary from "../Config/cloudinary.js";
// import upload from "../Middlewares/multer.js";
// import cloudinary from "cloudinary";

// Convert __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc create a post
// @route POST /api/createpost
// @access private (user Specific)
export const createPost = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const { title, blogText, category } = req.body;
    if (!title || !blogText || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, blogText, category) are required.",
      });
    }

    // Upload file to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    const userId = req.user.id;

    // Create new post with Cloudinary image URL
    const newPost = await Blog.create({
      image: uploadResponse.secure_url,
      title,
      blogText,
      createdBy: userId,
      category,
    });

    await Users.findByIdAndUpdate(
      userId,
      { $push: { blogs: newPost._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Blog post created successfully.",
      data: newPost,
    });
  } catch (error) {
    console.error("Error in createPost PostController:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @desc Get All post Available
// @route GET /api/getpost
// @access public
export const fetchAllPost = asyncHandler(async (req, res) => {
  try {
    // Retrieve all post from the database
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Check if users are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blog found",
      });
    }

    // Respond with all users
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log("Error in getPost PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
  //get all Blog
});

// @desc all post belong to logged in user
// @route POST /api/register
// @access private
export const fetchAllpostOfUser = asyncHandler(async (req, res) => {
  try {
    const id = req.user.id;
    // Retrieve blogs created by a specific user
    const blogs = await Blog.find({ createdBy: id }).sort({ createdAt: -1 });

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log("Error in getPostUsingId PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});
export const fetchAllpostByUserId = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const blogs = await Blog.find({ createdBy: req.params.id }).sort({
      createdAt: -1,
    });

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log("Error in getPostUsingId PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc
// @route GET /api/register
// @access public
export const getUserByHisId = asyncHandler(async (req, res) => {
  try {
    const user = await Users.find({ _id: req.params.id }).select(
      "-password -is_Admin -_id -createdAt -updatedAt -__v"
    );
    // Check if any blogs are found
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No User Exits for this post",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Error in getUserInfoByPostId PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc get category
// @route POST /api/getcategory
// @access public
export const getcategory = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const categories = await Blog.distinct("category");

    // Check if any blogs are found
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      message: "Success Fetching category",
      data: categories,
    });
  } catch (error) {
    console.log("Error in getCategory PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc get post of specifi category (eg. fetch all post that belong to the category MCU)
// @route POST /api/getpostbycategoryname
// @access public
export const getpostbycategoryname = asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    // Check if any blog exists with the given category
    const categoryExists = await Blog.exists({ category: category }).sort({
      createdAt: -1,
    });

    if (!categoryExists) {
      return res
        .status(404)
        .json({ message: `No blogs found for category: ${category}` });
    }

    // Fetch blogs with the given category
    const blogs = await Blog.find({ category: category });

    res.status(200).json({
      success: true,
      message: "Success Fetching post according to category",
      data: blogs,
    });
  } catch (error) {
    console.log(
      "Error in getPostBycategoryName PostController :",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc update post
// @route PUT /api/update post
// @access private
// update Blog is by specific user we can do that either by jwt or by id but here jwt is best option
// give jwt
// give id as http string
export const updatePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the authenticated user is the creator of the blog
    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to update this blog",
      });
    }

    // Extract updatable fields from the request body
    const { title, blogText, category } = req.body;

    // Handle image file if provided
    // Upload file to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    // Update the blog fields
    blog.title = title || blog.title;
    blog.blogText = blogText || blog.blogText;
    blog.category = category || blog.category;

    if (uploadResponse) {
      blog.image = uploadResponse.secure_url;
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Respond with the updated blog
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("Error in updatePost PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc delete post
// @route POST /api/deletepost
// @access private
export const deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT
    const isAdmin = req.user.is_Admin; // Check if the user is an admin

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the authenticated user is the creator or an admin
    if (blog.createdBy.toString() !== userId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to delete this blog",
      });
    }

    // Delete the blog from the database
    await blog.deleteOne();

    await Users.updateOne(
      { _id: blog.createdBy }, // Find the user who created the blog
      { $pull: { blogs: id } } // Remove the blog ID from the `blogs` array
    );

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Error in deletePost PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// @desc Like or unlike post
// @route POST /api/upcount
// @access private
export const upcount = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if user has already upvoted
    const userIndex = blog.upvoters ? blog.upvoters.indexOf(userId) : -1;

    if (userIndex === -1) {
      // User hasn't upvoted, increment the count and add user to upvoters
      blog.blogUpPoint += 1;
      blog.upvoters = blog.upvoters || [];
      blog.upvoters.push(userId);
    } else {
      // User has already upvoted, decrement the count and remove user from upvoters
      blog.blogUpPoint -= 1;
      blog.upvoters.splice(userIndex, 1);
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: userIndex === -1 ? "Upvoted successfully" : "Upvote removed",
      data: {
        blogUpPoint: updatedBlog.upvoters.length,
        upvoters: updatedBlog.upvoters,
      },
    });
  } catch (error) {
    console.log("Error in upCount PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

export const fetchPostByPostId = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const blogs = await Blog.findOne({ _id: req.params.id });

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this Id",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log("Error in fetchPostByPostId PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});
