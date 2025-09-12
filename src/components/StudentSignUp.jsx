import React from 'react'
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram, } from 'react-icons/fa6'
import SidePic from "../assets/images/4219290 1.svg"
const StudentSignUp = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-wrap lg:flex-row-reverse '>
            <div className='w-full lg:w-[45%] bg-[#F1F6F9] pt-40'>
              <div className="ml-8">
                <h2 className='text-5xl font-extrabold'>
                    Welcome to <br />Computer Engineering
                </h2>
                <h6 className='text-5xl p-0'>Student Portal</h6>
                <h6 className='text-0.5xl text-black/70'>Login to access your account</h6>
              </div>

              <div className='flex gap-4 text-3xl ml-8 mt-4'>
                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='LinkedIn'>
                <FaFacebookSquare/>
                </a>

                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='GitHub'>
                <FaInstagram/>
                </a>
                
                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='Instagram'>                
                <FaTwitterSquare/>
                </a>

                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='Twitter'>
                <FaLinkedin/>                
                </a>
             </div>
             <img src={SidePic} alt="img" className='w-full'/>
            </div>
            <div className="w-full lg:w-[55%] bg-[#914272] pt-50 text-white pl-40">
             <div>
              <h2 className='text-5xl font-extrabold pb-2'>Sign Up</h2>
              <h6 className='text-white/90'>Fill in the Correct details below.</h6>
             </div>

             <div className='pt-7 flex flex-col w-[65%]'>
              <input 
              type="text" 
              placeholder='UTME or Matric Number' 
              className='border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2' />
              <input 
              type="text" 
              placeholder='Email Address'
              className='border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2'/>
              <input 
              type="text" 
              placeholder='Password'
              className='border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2'/>
              <input 
              type="text" 
              placeholder='Confirm Password'
              className='border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2'/>
              <span className='py-4'>
                Are you a robot? Verify here! 
                <input type="checkbox" name="" id="" className='text-transparent' required />
              </span>
             </div>
            </div>  
      </div>  
    </div>
  )
}

export default StudentSignUp