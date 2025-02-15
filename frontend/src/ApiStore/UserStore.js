import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const UserStore = create((set) => ({
  setuser: null,
  allUsers: null,
  isLoading: false,
  isLogin: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/checkAuth");
      set({ setuser: res.data.data });
    } catch (error) {
      console.log("login ur self");
      // console.log("Error in Check Auth userStore", error);
      // toast.error(error.response.data.message);
      set({ setuser: null });
    }
  },

  // Login a user
  loginUser: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ setuser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in Login userStore", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogin: false });
    }
  },
  googleAuth: async (code) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/googleAuth", { code });
      set({ setuser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in GoogleAuth userStore", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogin: false });
    }
  },
  // Register a new user
  signup: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      console.log("This is response", res);
      set({ setuser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in signup userStore", error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isLogin: false });
    }
  },
  profilepicUpdate: async (formData) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.put("/profilepicUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in profilepicUpdate userStore", error);
      toast.error(error.response?.data?.message || "Upload failed!");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch all users
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/fetchall");
      set({ allUsers: res.data.data });
      // toast.success(res.data.message);
    } catch (error) {
      console.error("Error fetching users:", error);
      // toast.error(error.response?.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Update a user
  updateUser: async (updatedUser) => {
    try {
      const res = await axiosInstance.put("/userupdate", updatedUser);
      set({ setuser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data.message);
    }
  },

  // Delete a user
  deleteUser: async (email) => {
    try {
      const res = await axiosInstance.delete("/userdelete", {
        data: { email },
      });

      if (res.data.success) {
        // Update the state to remove the deleted user
        set((state) => ({
          allUsers: state.allUsers
            ? state.allUsers.filter((user) => user.email !== email)
            : [],
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in deleteuser userStore", error);
      toast.error(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/logout");
      set({ setuser: null });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in logout userStore", error);
      toast.error(error.response.data.message);
    }
  },
}));
