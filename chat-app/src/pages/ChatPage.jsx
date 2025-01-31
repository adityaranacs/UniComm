import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto py-4 px-4">
        <div className="card bg-base-200 shadow-xl">
          <div className="flex h-[calc(100vh-8rem)]">
            <Sidebar />
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center bg-base-300">
                <div className="text-center p-8">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-base-content"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium">No Chat Selected</h3>
                  <p className="mt-2 text-base-content/70">
                    Choose a conversation to start messaging
                  </p>
                </div>
              </div>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
