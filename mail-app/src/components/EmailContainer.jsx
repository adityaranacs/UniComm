import { useState, useEffect, useRef } from "react";
import { formatMessageTime } from "../lib/utils";
import { Paperclip } from "lucide-react";
import EmailDetail from "./EmailDetail";
import { mockEmails } from "../lib/mockEmail";

const EmailChatContainer = ({ selectedFolder = "inbox" }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const messageEndRef = useRef(null);
  const emails = mockEmails[selectedFolder] || [];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [emails]);

  if (selectedEmail) {
    return <EmailDetail email={selectedEmail} onBack={() => setSelectedEmail(null)} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-base-200">
      <div className="flex-1 overflow-y-auto p-4">
        {emails.map((email) => (
          <div
            key={email._id}
            className="card bg-base-100 shadow-md hover:bg-base-200 cursor-pointer mb-4"
            onClick={() => setSelectedEmail(email)}
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={email.senderProfilePic || "/avatar.png"}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-base">
                      {selectedFolder === "sent" ? email.recipientName : email.senderName}
                    </h3>
                    <p className="text-sm opacity-70">
                      {selectedFolder === "sent" ? email.recipientEmail : email.senderEmail}
                    </p>
                  </div>
                </div>
                <div className="text-sm opacity-70">
                  {formatMessageTime(email.createdAt)}
                </div>
              </div>

              <div className="mt-2">
                <h2 className="text-base font-semibold">{email.subject}</h2>
                <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                  {email.text}
                </p>
              </div>

              {email.hasAttachments && (
                <div className="mt-3 flex gap-3">
                  {email.attachments?.map((attachment, index) => (
                    <div
                      key={index}
                      className="badge badge-outline badge-md gap-2"
                    >
                      <Paperclip size={14} />
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default EmailChatContainer;
