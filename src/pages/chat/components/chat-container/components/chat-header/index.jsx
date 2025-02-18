import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-4 md:px-10 lg:px-20">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 hover:text-white focus:ring-0 transition-colors duration-300">
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
