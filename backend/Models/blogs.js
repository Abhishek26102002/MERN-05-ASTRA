import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    image: { type: String, required: true, trim: true }, // URL or path to the image
    title: { type: String, required: true, trim: true },
    blogText: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }, // User ID from JWT
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

export default mongoose.model("Blogs", blogSchema);
// Blogs is Collection name in database
