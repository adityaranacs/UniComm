// components/MessageInput.js
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore(); // Ensure this is correctly accessed

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 border-t border-gray-700">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-600"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1
                       border border-gray-600 hover:bg-gray-700 transition-colors"
              type="button"
            >
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                     text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500
                     transition-colors"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex items-center justify-center w-10 h-10
                     rounded-full border border-gray-600 hover:bg-gray-700
                     transition-colors ${
                       imagePreview ? "text-blue-500" : "text-gray-400"
                     }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`flex items-center justify-center w-10 h-10 rounded-full
                   ${
                     !text.trim() && !imagePreview
                       ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                       : "bg-blue-600 text-white hover:bg-blue-700"
                   }
                   transition-colors`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
