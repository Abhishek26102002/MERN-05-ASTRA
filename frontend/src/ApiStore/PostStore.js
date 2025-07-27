import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const PostStore = create((set, get) => ({
  setallpost: [],
  setPost: [],
  setpostbyuid: [],
  setpostuser: null,
  isLoadingPost: false,
  isuserLoading: false,
  setonepost: null,

  fetchAllPost: async () => {
    set({ isLoadingPost: true });
    try {
      const res = await axiosInstance.get("/post/fetchall");
      set({ setallpost: res.data.data });
    } catch (error) {
      console.log("Error in fetchAllPost userPostStore", error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isLoadingPost: false });
    }
  },
  fetchLoggedInUserPost: async () => {
    set({ isLoadingPost: true });
    try {
      const res = await axiosInstance.get("/post/fetchone");
      set({ setPost: res.data.data });
    } catch (error) {
      console.log("Error in fetchAllPost userPostStore", error);
    } finally {
      set({ isLoadingPost: false });
    }
  },
  fetchpostbyid: async (postId) => {
    set({ isLoadingPost: true });
    try {
      const res = await axiosInstance.get(`/post/fetchonepost/${postId}`);
      set({ setonepost: res.data.data });
    } catch (error) {
      console.log("Error in fetchAllPost userPostStore", error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isLoadingPost: false });
    }
  },
  fetchpostbyuserid: async (userId) => {
    set({ isLoadingPost: true });
    try {
      const res = await axiosInstance.get(
        `/post/fetchallpostbyuserid/${userId}`
      );
      set({ setpostbyuid: res.data.data });
    } catch (error) {
      console.log("Error in fetchAllPost userPostStore", error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isLoadingPost: false });
    }
  },
  deletePost: async (postId) => {
    try {
      const res = await axiosInstance.delete(`/post/deletepost/${postId}`);
      toast.success(res.data.message);

      set((state) => ({
        setPost: state.setPost
          ? state.setPost.filter((post) => post._id !== postId)
          : [],
        setallpost: state.setallpost
          ? state.setallpost.filter((post) => post._id !== postId)
          : [],
      }));
    } catch (error) {
      console.log("Error in fetchAllPost userPostStore", error);
      toast.error(error.response?.data.message);
    }
  },
  createPost: async (data) => {
    try {
      const res = await axiosInstance.post(`/post/createpost`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({ setPost: [...state.setPost, res.data.data] }));

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in createPost userPostStore", error);
      toast.error(error.response?.data.message);
    }
  },
  updatePost: async (data, postId) => {
    try {
      const res = await axiosInstance.put(`/post/updatepost/${postId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        setPost: state.setPost.map((post) =>
          post._id === postId ? { ...post, ...res.data.data } : post
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in Update userPostStore", error);
      toast.error(error.response?.data.message);
    }
  },
  fetchuserbyhisid: async (userId) => {
    set({ isuserLoading: true });
    try {
      const res = await axiosInstance.get(`/post/getuserbyhisid/${userId}`);
      set({ setpostuser: res.data.data[0] });
    } catch (error) {
      console.log("Error in fetchuserbyhisid userPostStore", error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isuserLoading: false });
    }
  },

  likeUnlike: async (postId) => {
    try {
      const res = await axiosInstance.put(`/post/togglelike/${postId}`);
    } catch (error) {
      console.log("Error in fetchuserbyhisid userPostStore", error);
      if (!error.response?.data.success) {
        toast.error("You must be logged in to Like a post");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }
  },
  comment: async (postId,data) => {
    try {
      return await axiosInstance.put(`/post/createcomment/${postId}`,data);
    } catch (error) {
      console.log("Error in createcomment userPostStore", error);
      if (!error.response?.data.success) {
        toast.error("You must be logged in to comment on a post");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }
  },
}));
