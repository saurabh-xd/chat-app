import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {Menu, MessageCircleMore, Search, X} from 'lucide-react'

const Sidebar = () => {

const {getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext);


const {logout, onlineUsers} = useContext(AuthContext)
 const [menuOpen, setMenuOpen] = useState(false)

const [input, setInput] = useState("")

  const navigate = useNavigate();

  const filteredUsers =  input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
getUsers()
  },[onlineUsers])

  return (
    <div className="h-full  bg-gray-900  pt-0  overflow-y-scroll text-white ">

     {/* header  */}
      <div className=" sticky bg-gray-900 top-0 p-4 pb-3 z-10 w-full border-b border-neutral-400">
        <div className="flex justify-between items-center">

{/* menu  */}
  <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
              {menuOpen ? <X /> : <Menu />}
            </button>

            {menuOpen && (
              <div className="absolute top-12  left-0 w-40 bg-gray-800 shadow-lg  border border-gray-700 rounded-lg p-2 z-10">
                <p
                  onClick={() => { navigate("/profile"); setMenuOpen(false) }}
                  className="cursor-pointer text-sm p-2 hover:bg-gray-700  rounded">
                  Edit profile
                </p>
                <hr className="my-2 border-gray-700" />
                <p
                  onClick={() => { logout(); setMenuOpen(false) }}
                  className="cursor-pointer text-sm p-2 hover:bg-gray-700  rounded text-red-400">
                  Logout
                </p>
              </div>
            )}
          </div>

         {/* search  */}
          <div className="relative flex-1 ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-100"
            placeholder="Search users..."
          />
        </div>

       
        
        </div>


      </div>


{/* users list  */}
    <div className="flex flex-col gap-1 px-1 pb-5">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
            }}
            key={user._id || index}
            className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer  ${selectedUser?._id === user._id ? 'bg-teal-500/40' : 'hover:bg-gray-800 '}`}>

            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-14 h-14 rounded-full"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">{user.fullName}</p>
              <span className={`text-xs ${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-gray-300'}`}>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </span>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-teal-500 rounded-full text-xs">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
