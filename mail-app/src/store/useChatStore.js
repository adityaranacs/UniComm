import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_URL_SOCKET;

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],
  socket: null,

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
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      if (res?.data) {
        set({ messages: res.data });
      } else {
        toast.error("No messages found.");
        set({ messages: [] });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
  
    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected");
      return;
    }
  
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...(messages || []), res.data] });
  
      // Manually trigger API for the other user to get updated messages
      if (selectedUser._id) {
        await axiosInstance.get(`/messages/${selectedUser._id}`);
      }
  
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },
  
  subscribeToMessages: () => {
    const { selectedUser, socket } = get();
    if (!selectedUser || !selectedUser._id) {
      console.warn("No selected user. Subscription skipped.");
      return;
    }

    // Only connect to the socket once per user
    if (socket && socket.connected) {
      console.log("Socket already connected");
      return;
    }

    const newSocket = io(BASE_URL, {
      query: {
        userId: selectedUser._id,
      },
    });

    newSocket.connect();
    set({ socket: newSocket });

    console.log("Socket connected for user:", selectedUser._id);

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("newMessage", (newMessage) => {
      // Only append if the message is for the selected user
      if (newMessage?.receiverId === selectedUser._id) {
        set((state) => ({
          messages: [...(state.messages || []), newMessage],
        }));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = get();
    if (socket) {
      socket.off("newMessage");
      console.log("Unsubscribed from newMessage");
    }
  },

  setSelectedUser: (selectedUser) => {
    if (!selectedUser || !selectedUser._id) {
      console.warn("Invalid user selection");
      return;
    }
    set({ selectedUser });
    get().getMessages(selectedUser._id); // Ensure messages are fetched
    get().subscribeToMessages(); // Subscribe to socket
  },
}));
