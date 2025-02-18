import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contact-container";
import EmptyContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer /> {/* Sidebar */}
      {/* <EmptyContainer /> Placeholder */}
      <ChatContainer /> {/* Chat Section */}
    </div>
  );
};

export default Chat;
