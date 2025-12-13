import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import {
  ArrowBigUp,
  ArrowLeft,
  EllipsisVertical,
  Image,
  MessageCircleMore,
  MessageSquare,
  Phone,
  Radio,
  Search,
} from "lucide-react";
import { toast } from "sonner";

const features = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Send Messages",
    description: "Chat with your friends instantly",
  },
  {
    id: 2,
    icon: Image,
    title: "Share Media",
    description: "Send photos and images easily",
  },
  {
    id: 3,
    icon: Radio,
    title: "Stay Connected",
    description: "Real-time online status",
  },
];

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  //handle sending a message

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // handle sending an image

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* header  */}
      <div className="flex items-center justify-between py-2.5 px-2 bg-gray-900  md:px-5 border-b border-neutral-700">
        <div className="flex items-center justify-center gap-3 ">
          <ArrowLeft
            onClick={() => setSelectedUser(null)}
            className="md:hidden size-6 cursor-pointer text-gray-400 hover:text-white "
          />
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className=" text-lg text-white ">{selectedUser.fullName} </p>

            <span
              className={`text-xs ${
                onlineUsers.includes(selectedUser._id)
                  ? "text-green-400"
                  : "text-gray-500"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center text-gray-400 gap-6 ">
          <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
          <Search className="w-5 h-5 cursor-pointer hover:text-white" />

          <EllipsisVertical className=" w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* chaTBox */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end 
        ${msg.senderId !== authUser._id && "flex-row-reverse"}`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-teal-700 text-white 
              ${
                msg.senderId === authUser._id
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                className="w-7 rounded-full object-cover"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center  p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full mx-2">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="send a message"
            className="flex-1 text-sm p-4 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="cursor-pointer p-2 hover:bg-neutral-600/20 rounded-full"
          >
            <Image className="size-5 text-neutral-400 " />
          </label>
        </div>

        <button
          className="p-2.5 bg-teal-600 hover:bg-teal-700 rounded-full text-neutral-100  cursor-pointer"
          onClick={handleSendMessage}
        >
          <ArrowBigUp strokeWidth={2.5} />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full  px-8">
      <div className="size-24 rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
        <MessageCircleMore size={56} className="text-teal-500" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        Welcome to ChatMate
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Select a chat to start messaging
      </p>

      <div className="grid gap-4 max-w-md">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
          >
            <feature.icon className="size-7 text-teal-500 " />
            <div>
              <h3 className="text-white font-medium ">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
