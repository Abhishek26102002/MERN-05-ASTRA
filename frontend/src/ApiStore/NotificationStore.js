import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const NotificationStore = create((set, get) => ({
  notifications: [],
  isLoadingNoti: false,
  fetchAllNotification: async () => {
    try {
      const res = await axiosInstance.get("/notification/getall");
      set({ notifications: res.data.data });
    } catch (error) {
      console.log("Error in fetchAllNotification userNotificationStore", error);
    }
  },
  markAsRead: async (data) => {
    try {
      return await axiosInstance.put(`/notification/markasread`, data);
    } catch (error) {
      console.log("Error in markAsRead userNotificationStore", error);
    }
  },
}));
