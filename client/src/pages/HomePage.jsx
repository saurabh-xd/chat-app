import React, { useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className=" w-full h-screen ">
      <div className="backdrop-blur-xl border border-white/10 h-full">
        {/* Mobile Layout*/}
        <div className="md:hidden h-full">
          {!selectedUser ? (
            <Sidebar />
          ) : (
            <>
              <ChatContainer />
            </>
          )}
        </div>

        {/* Desktop Layout */}
        <div
          className={`hidden md:grid h-full ${
            selectedUser
              ? "grid-cols-[360px_1fr_280px] xl:grid-cols-[400px_1fr_300px]"
              : "grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr]"
          }`}
        >
          <Sidebar />

          <ChatContainer />

          {selectedUser && <RightSidebar />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
