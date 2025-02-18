import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef(null);
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="h-16 md:h-[10vh] bg-[#1c1d25] flex justify-center items-center px-4">
      <div className="flex-1 flex bg-gray-800 rounded-md items-center gap-4 p-2">
        <input
          type="text"
          className="w-full p-3 bg-transparent rounded-md focus:ring-0 text-white placeholder-gray-400"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:outline-none hover:text-white transition">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative" ref={emojiRef}>
          <button
            className="text-neutral-500 focus:outline-none hover:text-white transition"
            onClick={() => setEmojiPickerOpen((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          {emojiPickerOpen && (
            <div className="absolute bottom-16 right-0">
              <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} />
            </div>
          )}
        </div>
        <button
          className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] transition"
          onClick={handleSendMessage}
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
