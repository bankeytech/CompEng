import React from 'react'
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram, } from 'react-icons/fa6'
import { MdOutlinePersonAdd } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import SidePic from "../assets/images/4219290 1.svg"


const Home = () => {
  return (
    <div className='relative'>
      <div className='hidden lg:block'>
          <header className="p-4 text-gray-800 bg-[#914272]">
          <div className="container flex justify-between h-16 mx-auto">
              <ul className="items-end hidden space-x-3 lg:flex">
                <li className="flex pl-8">
                    <a rel="noopener noreferrer" 
                      href="#" 
                      className="border-b-2 text-white font-bold">
                      Home
                    </a>
                </li>               
              </ul>
            
              <div className="flex flex-col items-center justify-center md:space-x-4">

                <div className='flex gap-2 text-3xl mt-4 lg:flex md:hidden text-white'>
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

                <div className='flex gap-5'>
                  <Link 
                  to="/StudentSignUp" 
                  className="hidden py-2 font-semibold rounded lg:flex items-center justify-center gap-1 text-white">
                    Sign Up
                    <MdOutlinePersonAdd  className="text-xl" />
                  </ Link>
                  <Link 
                  to="/StudentLogin" 
                  className="hidden py-2 font-semibold rounded lg:flex items-center justify-center gap-1 text-white">
                    Log in
                    <MdLogin  className="text-white text-2xl" />     
                  </ Link>
                </div>
                  
              </div>

              <button title="Open menu" type="button" className="p-4 lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
              </button>
          </div>
        </header>

        <div className='mobilePic h-screen w-full flex items-center pl-8'>
          <div className="ml-8 md:ml-12">
            <h2 className='text-5xl font-extrabold'>
                Welcome to <br />Computer Engineering
            </h2>
            <h6 className='text-5xl p-0 md:py-2'>Student Portal</h6>
            <h6 className='text-0.5xl text-black/70'>
            Lorem ipsum Lorem ipsum <br />
            Lorem ipsum Lorem ipsum <br />
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsum
            </h6>
          </div>


          <div className="absolute bottom-[0.7vw] pl-10">
            <a className='text-[12px]'>
            2025 © FUTA Department of Computer Engineering
            </a>
          </div>
        </div>
      </div>

      {/* TABLET */}
      <div className='relative w-full min-h-screen bg-[#F1F6F9] hidden lg:hidden md:flex flex-col justify-center'>
        <div className=" md:ml-12 z-10">
          <h2 className='text-6xl font-extrabold'>
              Welcome to <br />Computer Engineering
          </h2>
          <h6 className='text-5xl p-0 md:py-2'>Student Portal</h6>
          <h6 className='text-0.5xl text-black/70'>Login to access your account</h6>
        </div>
      
        <div className=" lg:hidden flex gap-5 items-center mt-6 md:ml-12 z-10">
          <Link 
          to="/MobileSignUp"
          className="py-2 px-15 rounded-[8vw] font-bold text-[3vw] bg-[#914272] text-white ">
            Sign Up
          </Link>

          <Link 
          to="/StudentLogin"
          className="py-2 px-17 rounded-[8vw] font-bold text-[3vw] border-2 border-[#914272] text-[#914272]">
            Login
          </Link>
        </div>  
        <img src={SidePic} alt="img" className='w-full absolute bottom-0'/>
      </div>
      
      {/* MOBILE */}

      <div className='relative w-full h-[100vh] bg-[#F1F6F9] lg:hidden md:hidden flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center justify-center text-center absolute top-30 z-10">
          <h2 className='text-[14vw] leading-[14vw] font-extrabold p-3'>
              Welcome to Computer Engineering
          </h2>
          <h6 className='text-[9vw] leading-[9vw] p-3'>Student Portal</h6>
          <h6 className='text-[3vw] text-black/70 p-3'>Login to access your account</h6>
        </div>

        <div className=" absolute bottom-[0vw] md:top-1">
            <img src={SidePic} alt="img" className='w-full'/>
        </div>             
          
        <div className="flex flex-col gap-5 items-center justify-center mt-15 absolute top-[90vw]">
          <Link 
          to="/MobileSignUp"
          className="border-2 border-[#914272] py-4 px-25 text-[#914272] rounded-[8vw] font-bold text-[5vw]">
            Sign Up
          </Link>

          <Link 
          to="/MobileLogin"
          className="bg-[#914272] py-4 px-27 text-white rounded-[8vw] font-bold text-[5vw]">
            Login
          </Link>
        </div>            

        <div className="absolute bottom-3">
          <a className='text-[12px]'>
            2025 © FUTA Department of Computer Engineering
          </a>
        </div>
        
      </div>
    </div> 
  )
}

export default Home