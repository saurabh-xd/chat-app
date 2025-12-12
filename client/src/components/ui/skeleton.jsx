import React from 'react'

export default function Skeleton() {
  return (
     


      <div className="flex flex-col gap- px-1 py-2">
       
          <div  className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg animate-pulse">
            <div className="w-14 h-14 rounded-full bg-gray-700"></div>

            <div className="flex-1">
              <div className="w-32 h-3 bg-gray-700 rounded mb-2"></div>
              <div className="w-20 h-3 bg-gray-700 rounded"></div>
            </div>

            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          </div>
    
      </div>
   
  )
}

