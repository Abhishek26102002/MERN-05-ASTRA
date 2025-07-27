import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    createdFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    isMarkRead: { type: Boolean, default: false },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: false, // optional (only for COMMENT or LIKE notifications)
    },

    type: {
      type: String,
      enum: ["COMMENT", "LIKE", "FOLLOW"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notifications", notificationSchema);
