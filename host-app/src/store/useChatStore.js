// store/useChatStore.js

import { create } from "zustand";
import { forwardToChatApi } from "../lib/hostAppApiProxy";  
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set) => ({
  messages: [],
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data || [] }); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await forwardToChatApi(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },


  setSelectedUser: (selectedUser) => {
    if (!selectedUser || !selectedUser._id) {
      console.warn("Invalid user selection");
      return;
    }
    set({ selectedUser });
  },
}));
