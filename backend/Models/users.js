import mongoose from "mongoose";

const userScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store the hashed password
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blogs" }],
    profilepic: {
      type: String,
      default: "",
    }, // Reference to Blog collection
    is_Admin: { type: Boolean, default: false }, // Defaults to false and is not required
    bio: { type: String },
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

export default mongoose.model("Users", userScheme);
// Users is Collection name in database
