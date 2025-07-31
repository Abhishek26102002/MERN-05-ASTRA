import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";
import { NotificationStore } from "../ApiStore/NotificationStore";
import NotificationsSkeleton from "../components/skeleton/NotificationSkeleton";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import PostViewModal from "../components/PostViewModal";
import { PostStore } from "../ApiStore/PostStore";
const NotificationPage = () => {
  const { fetchAllNotification, markAsRead, notifications, isLoadingNoti } =
    NotificationStore();
  const { fetchpostbyid } = PostStore();
  const [showModal, setShowModal] = useState(false);
  const [currPost, setCurrPost] = useState(null);
  useEffect(() => {
    fetchAllNotification();
  }, []);

  if (isLoadingNoti) return <NotificationsSkeleton />;
  useEffect(() => {
    try {
      const unreadIds = notifications
        .filter((n) => !n.isMarkRead)
        .map((n) => n._id);
      console.log(unreadIds);

      if (unreadIds.length > 0) markAsRead(unreadIds);
    } catch (error) {
      console.log("Error in marking notifications as read : ", error);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="card border shadow-md ps-4">
        <div className="card-body p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-xl">Notifications</h2>
            <span className="text-sm text-gray-500">
              {notifications?.filter((n) => !n.isMarkRead).length} unread
            </span>
          </div>
        </div>

        <div className="overflow-y-auto h-dvh">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start gap-4 p-4 border-b hover:bg-gray-100 transition ${
                  !notification.isMarkRead ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex-1 space-y-1">
                  {(notification.type === "LIKE" ||
                    notification.type === "COMMENT" ||
                    notification.type === "FOLLOW") && (
                    <div className="text-sm text-gray-600 rounded-md p-1 bg-grey-100 mt-1">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <Link
                              to={`/dashboard/${notification?.createdBy?._id}`}
                            >
                              <img
                                src={
                                  notification.createdBy.profilepic ||
                                  "/avatar.png"
                                }
                                alt="avatar"
                              />
                            </Link>
                          </div>
                        </div>
                        <span className="font-bold">
                          @ {notification.createdBy?.name}
                        </span>
                      </div>
                      <p>{notification.content}</p>
                      {notification?.postId?.image && (
                        <div
                          onClick={() => {
                            setCurrPost(notification?.postId);
                            setShowModal(true);
                          }}
                        >
                          <img
                            src={notification?.postId?.image}
                            alt="Post content"
                            className="mt-2 rounded-md w-full max-w-xs h-auto object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 pl-6">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showModal && (
        <PostViewModal
          post={currPost}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default NotificationPage;
