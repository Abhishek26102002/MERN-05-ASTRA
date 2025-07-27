import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },

    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
    ],

    category: { type: String, required: true, trim: true },

    comments: [
      {
         _id: false, // <--- prevent _id generation
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Blogs", blogSchema);
