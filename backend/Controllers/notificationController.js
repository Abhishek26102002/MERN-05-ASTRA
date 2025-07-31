import Notifications from "../Models/notification.js";

// fetchForUser
export const getNotification = async (req, res) => {
  try {
    const userId = req.user.id;

    const Notification = await Notifications.find({ createdFor: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: "id name email profilepic",
      })
      .populate({
        path: "postId",
        select: "id image title comments likes description createdBy",
        populate: [
          {
            path: "createdBy",
            select: "name email id profilepic",
          },
          {
            path: "likes",
            select: "name email id profilepic",
          },
          {
            path: "comments.userId",
            select: "name email id profilepic",
          },
        ],
      });
    if (Notification.length <= 0) {
      return res.status(200).json({
        success: true,
        message: "You got 0 notifications.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "notification fetched successfully",
      data: Notification,
    });
  } catch (error) {
    console.error("Error in getNotification Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// mark as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notifications.updateMany(
      { _id: { $in: req.body } },
      { $set: { isMarkRead: true } }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in markNotificationAsRead Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
