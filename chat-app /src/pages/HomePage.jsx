import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-16">
      <div className="container mx-auto py-4 px-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="flex h-[calc(100vh-8rem)]">
            <Sidebar />
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center bg-gray-900/50">
                <div className="text-center p-8">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-200">No Chat Selected</h3>
                  <p className="mt-2 text-gray-400">Choose a conversation to start messaging</p>
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

export default HomePage;