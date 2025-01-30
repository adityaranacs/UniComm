import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage, // get access to sendMessage function
    triggerOtherUserToFetchMessages // Method to trigger the other user to fetch messages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // When selectedUser changes, fetch messages and subscribe to socket events
  useEffect(() => {
    if (!selectedUser) return;

    // Fetch messages when user is selected
    getMessages(selectedUser._id);

    // Subscribe to socket events for this user
    subscribeToMessages();

    // Cleanup: unsubscribe from socket messages when the component unmounts or when the selectedUser changes
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // This will trigger when messages are updated, automatically scrolling the view.

  // New function that sends message and triggers getMessages for the other user
  const handleSendMessage = async (messageData) => {
    await sendMessage(messageData);

    // After sending the message, trigger the API call to get new messages for the other user
    if (selectedUser) {
      // Trigger the getMessages API call for the other user (the one you're chatting with)
      triggerOtherUserToFetchMessages(selectedUser._id);
    }
  };

  if (isMessagesLoading) return <MessageSkeleton />;

  return (
    <div className="flex-1 flex flex-col bg-gray-900/50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[75%] ${
                message.senderId === authUser._id
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <div className="flex-shrink-0">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full border-2 border-gray-700"
                />
              </div>
              <div
                className={`mx-3 ${
                  message.senderId === authUser._id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.senderId === authUser._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-lg mb-2"
                    />
                  )}
                  {message.text && <p className="text-sm">{message.text}</p>}
                </div>
                <span className="text-xs text-gray-400 mt-1 block">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Modify the MessageInput component to use the handleSendMessage */}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
