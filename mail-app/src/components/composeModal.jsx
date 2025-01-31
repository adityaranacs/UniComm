import { useState } from 'react';
import { X, Paperclip, Minus, LayoutDashboard } from 'lucide-react';

const ComposeModal = ({ isOpen, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-0 right-4 w-full sm:max-w-[500px] px-4 pl-4 bg-base-100 rounded-t-lg shadow-xl border border-base-300 ${
      isMinimized ? 'h-[48px]' : 'h-[80vh] sm:h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-base-200 p-3 rounded-t-lg flex items-center justify-between cursor-pointer">
        <h3 className="text-sm font-medium">New Mail</h3>
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-ghost btn-xs"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <LayoutDashboard size={14} /> : <Minus size={14} />}
          </button>
          <button 
            className="btn btn-ghost btn-xs"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Form */}
      {!isMinimized && (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col overflow-y-auto h-full">
          <div className="form-control w-full border-b border-base-300">
            <input
              type="email"
              name="to"
              placeholder="Recipients"
              className="input input-ghost input-sm w-full focus:outline-none"
              value={formData.to}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full border-b border-base-300">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="input input-ghost input-sm w-full focus:outline-none"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="body"
            className="flex-1 textarea textarea-ghost focus:outline-none resize-none mt-2"
            placeholder="Write your email here..."
            value={formData.body}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                Send
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                <Paperclip size={16} />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ComposeModal;
