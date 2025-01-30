import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Base URL for Socket connection (using the VITE_URL_SOCKET from environment variables)
const BASE_URL = import.meta.env.VITE_URL_SOCKET;

// A helper function to forward API requests from Host to Chat App
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
      window.location.href = "http://localhost:3001"; // Redirect to Host App
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

  // Socket connection for messaging between Host App and Chat App
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

    // Listen for online users
    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online Users:", userIds);
      localStorage.setItem("onlineUsers", JSON.stringify(userIds));
      set({ onlineUsers: userIds });
    });

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      console.log("New Message:", message);
      // Forward the message to the Host App (using Zustand)
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  // Disconnect the socket when the user logs out or leaves the app
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

  // Emit the message over the socket connection
  socket.emit("sendMessage", messageData, (response) => {
    if (response?.success) {
      console.log("Message sent successfully", response);
      set((state) => ({
        messages: [...state.messages, messageData], // Add the sent message to state
      }));
    } else {
      console.error("Message sending failed", response);
    }
  });
},

  // Fetch all chat messages for the user from the Chat App API
  fetchMessages: async (userId) => {
    try {
      const res = await forwardToChatApi(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));
