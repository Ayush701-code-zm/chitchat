import { useAppStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return <div>Chat</div>;
};

export default Chat;
