import asyncHandler from "express-async-handler";
import Blog from "../Models/blogs.js";
import { fileURLToPath } from "url";
import Users from "../Models/users.js";
import cloudinary from "../Config/cloudinary.js";
import Notification from "../Models/notification.js";

const __filename = fileURLToPath(import.meta.url);

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

    const { name, profilepic, email, id } = req.user;

    const userdetails = {
      _id: id,
      name,
      profilepic,
      email,
    };

    // Create new post with Cloudinary image URL
    const newPost = await Blog.create({
      image: uploadResponse.secure_url,
      title,
      description: blogText,
      createdBy: userdetails,
      category,
    });

    await Users.findByIdAndUpdate(
      id,
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

export const fetchAllPost = asyncHandler(async (req, res) => {
  try {
    // Retrieve all post from the database
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email id profilepic")
      .populate("likes", "name email id profilepic")
      .populate("comments.userId", "name email id profilepic");

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

// fetch post by post ID
export const fetchPostById = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const blogs = await Blog.findOne({ _id: req.params.id })
      .populate("createdBy", "name email id profilepic")
      .populate("likes", "name email id profilepic")
      .populate("comments.userId", "name email id profilepic");

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this Id",
      });
    }

    // Respond with the retrieved blogs
    return res.status(200).json({
      success: true,
      message: "post fetched Successfully",
      data: blogs,
    });
  } catch (error) {
    console.log("Error in fetchPostByPostId PostController :", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

export const fetchAllpostOfUser = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const blogs = await Blog.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email id profilepic")
      .populate("likes", "name email id profilepic")
      .populate("comments.userId", "name email id profilepic");

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
    const blogs = await Blog.find({ createdBy: req.params.id })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email id profilepic")
      .populate("likes", "name email id profilepic")
      .populate("comments.userId", "name email id profilepic");

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

export const getUserByHisId = asyncHandler(async (req, res) => {
  try {
    const user = await Users.find({ _id: req.params.id }).select(
      "-password"
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

    const blogCreatorId = blog.createdBy.toString(); // Get the first user ID

    if (blogCreatorId !== userId) {
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

export const toggleLike = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // commig from middleware

    const blog = await Blog.findById(id);
    const currentUser = await Users.findById(userId);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "post not found.",
      });
    }

    const isAlreadyLiked = blog.likes.some(
      (like) => like._id.toString() === userId
    );

    if (!isAlreadyLiked) {
      blog.likes.push(userId);
      // create a notification
      if (userId != blog.createdBy) {
        const newNoti = await Notification.findOne({
          postId: blog.id,
          createdBy: userId,
          createdFor: blog.createdBy,
          type: "LIKE",
        });
        if (!newNoti) {
          await Notification.create({
            content: `likes your post ${blog.title}`,
            createdBy: userId,
            createdFor: blog.createdBy,
            type: "LIKE",
            postId: blog.id,
          });
        }
      }
    } else {
      blog.likes.pull(userId);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: isAlreadyLiked ? "unliked" : "liked",
    });
  } catch (error) {
    console.error("Error in toggleLike PostController:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Please provide blog ID",
      });
    }

    if (!text || text.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide a comment at least 1 character long",
      });
    }

    const blog = await Blog.findById(blogId);
    //  const currentUser = await Users.findById(userId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.comments.push({
      userId,
      text: text.trim(),
    });

    const updatedBlog = await blog.save({ validateModifiedOnly: true });

    if (userId != blog.createdBy) {
      const newNoti = await Notification.findOne({
        postId: blog.id,
        createdBy: userId,
        createdFor: blog.createdBy,
        type: "COMMENT",
      });
      if (!newNoti) {
        await Notification.create({
          content: `comment your post ${blog.title} '${text}'`,
          createdBy: userId,
          createdFor: blog.createdBy,
          type: "COMMENT",
          postId: blog.id,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error in createComment PostController:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
