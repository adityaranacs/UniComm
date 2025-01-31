import { ArrowLeft, Star, Trash, Reply, Forward } from 'lucide-react';

const EmailDetail = ({ email, onBack }) => {
  if (!email) return null;

  return (
    <div className="flex-1 bg-base-100 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-sm">
              <Star size={18} />
            </button>
            <button className="btn btn-ghost btn-sm">
              <Reply size={18} />
            </button>
            <button className="btn btn-ghost btn-sm">
              <Forward size={18} />
            </button>
            <button className="btn btn-ghost btn-sm">
              <Trash size={18} />
            </button>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-4">{email.subject}</h2>
        
        <div className="flex items-start gap-4">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={email.senderProfilePic || "/avatar.png"} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{email.senderName}</h3>
                <p className="text-sm opacity-70">{email.senderEmail}</p>
              </div>
              <span className="text-sm opacity-70">{new Date(email.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="prose max-w-none">
          {email.text}
        </div>
        
        {email.hasAttachments && (
          <div className="mt-6 border-t border-base-300 pt-4">
            <h4 className="font-medium mb-3">Attachments</h4>
            <div className="flex flex-wrap gap-3">
              {email.attachments?.map((attachment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 border border-base-300 rounded-lg"
                >
                  <span className="text-sm">{attachment.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailDetail;
