import React, { useContext } from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Loader2, Lock, Mail, User } from 'lucide-react'

const SignupPage = () => {


const [fullName, setFullName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [bio, setBio] = useState("")


 const navigate = useNavigate();

const { login,loading } = useContext(AuthContext)

const onSubmitHandler = (event)=>{
  event.preventDefault();


  login( 'signup' , {fullName, email, password, bio} )
}


  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center  sm:justify-evenly max-sm:flex-col backdrop-blur-2xl px-4'>

    <div className='flex flex-col items-center justify-center md:gap-2 gap-0 max-sm:mb-8'>
    <h2 className='text-neutral-100 text-3xl md:text-6xl'>Welcome  to <span className='text-teal-500 font-bold'>ChatMate</span></h2>
    <p className='text-neutral-300 text-sm md:text-2xl'>Continue chatting with your mates instantly.</p>
   </div>

      <form onSubmit={onSubmitHandler}
        className=" border border-gray-700/50 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl text-white p-6 md:p-10 flex flex-col gap-5 md:gap-6 rounded-2xl shadow-2xl w-full max-w-md">


        <div className='flex  justify-center'>
          <h2 className='font-medium text-2xl md:text-4xl flex justify-between items-center'>
          Sign up
          
          
        </h2>

        </div>
        

    
        <div className='relative'>
          <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className='w-full text-sm md:text-base pl-11 pr-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500'
            placeholder='Full Name'
            required
          />
        </div>
     

    

   
          <div className='relative'>
          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email Address'
            required
            className='w-full text-sm md:text-base pl-11 pr-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500'
          />
        </div>

         <div className='relative'>
          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            required
            className='w-full text-sm md:text-base pl-11 pr-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-500'
          />
        </div>
        
 
  

      
          {/* <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
          rows={4} className='p-2 border border-gray-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-teal-500 ' placeholder='provide a short bio...' required></textarea> */}
      

       <button type='submit' className='text-sm md:text-base py-2.5  md:py-3 bg-gradient-to-r from-teal-400 to-teal-700 text-white rounded-md cursor-pointer flex items-center justify-center gap-1 hover:opacity-90'>
        {loading ? (
          <>
          <Loader2 className='animate-spin'/>
            Creating account...
            </>
        ): (
"Create Account"
        )}
       
       </button>

   

       <div className='flex flex-col gap-2'>
       
          <p className='text-xs md:text-sm text-gray-600'>Already have an account? 
          <span onClick={()=>{navigate('/login'); }}
          className='font-medium text-teal-500 cursor-pointer'>Login here</span></p>
     
       </div>

      </form>

    </div>
  )
}

export default SignupPage