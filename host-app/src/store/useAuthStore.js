import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_URL_SOCKET;

const forwardToChatApi = async (endpoint, method = "GET", data = null) => {
  try {
    const res = await axiosInstance({
      method,
      url: `/chat-api/${endpoint}`,
      data,
    });
    return res;
  } catch (error) {
    console.error(`Error forwarding to Chat API: ${error}`);
    throw error;
  }
};

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  setAuthUser: (user) => set({ authUser: user }),
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("authUser", JSON.stringify(res.data));
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("authUser");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      window.location.href = "http://localhost:3001"; 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Connecting to socket...");
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online Users:", userIds);
      localStorage.setItem("onlineUsers", JSON.stringify(userIds));
      set({ onlineUsers: userIds });
    });

    socket.on("receiveMessage", (message) => {
      console.log("New Message:", message);
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

/// Method to send a message via socket
sendMessage: (messageData) => {
  const { socket } = get();
  
  if (!socket || !socket.connected) {
    console.error("Socket is not connected");
    return;
  }

  socket.emit("sendMessage", messageData, (response) => {
    if (response?.success) {
      console.log("Message sent successfully", response);
      set((state) => ({
        messages: [...state.messages, messageData], 
      }));
    } else {
      console.error("Message sending failed", response);
    }
  });
},

  fetchMessages: async (userId) => {
    try {
      const res = await forwardToChatApi(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));
