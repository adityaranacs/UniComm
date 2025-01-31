import { useState } from "react";
import { Plus, Mail, Inbox, Send } from "lucide-react";
import EmailChatContainer from "../components/EmailContainer";
import { folders } from "../lib/mockEmail";
import ComposeModal from "../components/composeModal";

const MailPage = () => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const getIcon = (iconName) => {
    const icons = {
      Inbox: <Inbox size={20} />,
      Send: <Send size={20} />,
    };
    return icons[iconName] || <Mail size={20} />;
  };

  const EmailSidebar = () => (
    <div className="w-full md:w-72 bg-base-300 border-r border-base-200">
      <div className="p-5">
        <button
          className="btn btn-primary w-full gap-2"
          onClick={() => setIsComposeOpen(true)}
        >
          <Plus size={18} />
          Compose
        </button>
      </div>
      <nav className="px-4 py-3">
        <ul className="menu bg-base-300 rounded-box">
          {folders.map((item) => (
            <li key={item.id}>
              <a
                className={`flex items-center gap-4 text-base ${
                  selectedFolder === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedFolder(item.id)}
              >
                {getIcon(item.icon)}
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && (
                  <span className="badge badge-md">{item.count}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-6" style={{ paddingTop: "5rem" }}>
        <div className="card bg-base-200 shadow-xl">
          <div className="flex flex-col md:flex-row h-[calc(100vh-7rem)]">
            <EmailSidebar />
            <div className="flex-1">
              <EmailChatContainer selectedFolder={selectedFolder} />
            </div>
          </div>
        </div>
      </div>

      {/* Ensure ComposeModal has proper full screen or height */}
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        style={{ maxWidth: "800px", width: "100%" }} // Adjust modal max width for consistency
      />
    </div>
  );
};

export default MailPage;
