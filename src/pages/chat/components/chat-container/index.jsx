import React from "react";
import ChatHeader from "./components/chat-header";
import MessageContainer from "./components/message-container";
import MessageBar from "./components/message-bar";

const ChatContainer = () => {
  return (
    <div className="flex flex-col flex-grow bg-[#1c1d25]">
      <ChatHeader />
      <div className="flex-grow overflow-auto">
        <MessageContainer />
      </div>
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
