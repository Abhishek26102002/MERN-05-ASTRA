import mongoose from "mongoose";

const userdata = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
  },
  profilepic: {
    type: String,
  },
  email: {
    type: String,
  },
});

const blogSchema = mongoose.Schema(
  {
    image: { type: String, required: true, trim: true }, // URL or path to the image
    title: { type: String, required: true, trim: true },
    blogText: { type: String, required: true },
    createdBy: [userdata], // User ID from JWT
    upvoters: [userdata],
    category: { type: String, required: true, trim: true },
    comments: [userdata, { text: String }],
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

export default mongoose.model("Blogs", blogSchema);
// Blogs is Collection name in database
