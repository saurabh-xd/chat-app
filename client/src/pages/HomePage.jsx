import React from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null) // Changed from false to null

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full'>
        
        {/* Mobile Layout: Show one component at a time */}
        <div className='md:hidden h-full'>
          {!selectedUser ? (
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          ) : (
            <>
              <ChatContainer />
              <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </>
          )}
        </div>

        {/* Desktop Layout: Grid system */}
        <div className={`hidden md:grid h-full ${
          selectedUser 
            ? 'grid-cols-[300px_1fr_280px] xl:grid-cols-[320px_1fr_300px]' 
            : 'grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]'
        }`}>
          
          {/* Sidebar - Always visible on desktop */}
          <Sidebar />
          
          {/* Chat Container - Always visible */}
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          
          {/* Right Sidebar - Only visible when user is selected */}
          {selectedUser && (
            <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          )}
        </div>

      </div>
    </div>
  )
}

export default HomePage