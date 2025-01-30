import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_URL_SOCKET;

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data || [] }); // Ensure users array is never null
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] }); // Ensure messages array is never null
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    console.log({ selectedUser, messages })

    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...(messages || []), res.data] }); // Ensure messages is never null
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser || !selectedUser._id) {
      console.warn("No selected user. Subscription skipped.");
      return;
    }

    const socket = io(BASE_URL, {
      query: {
        userId: selectedUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    if (!socket) {
      console.warn("Socket not available. Retrying...");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      if (!newMessage?.senderId || newMessage.senderId !== selectedUser._id) return;

      set({ messages: [...(get().messages || []), newMessage] }); // Ensure messages is never null
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.warn("Socket not available for unsubscribe.");
      return;
    }
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    if (!selectedUser || !selectedUser._id) {
      console.warn("Invalid user selection");
      return;
    }
    set({ selectedUser });
  },
}));
