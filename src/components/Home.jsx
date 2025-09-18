import React from 'react'
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram, } from 'react-icons/fa6'
import { MdOutlinePersonAdd, MdPersonAdd } from "react-icons/md";
import { MdLogin } from "react-icons/md";


const Home = () => {
  return (
    <div>
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
                <button 
                type="button" 
                className="hidden py-2 font-semibold rounded lg:flex items-center justify-center gap-1 text-white">
                  Sign Up
                  <MdOutlinePersonAdd  className="text-xl" />
                </button>
                <button 
                type="button" 
                className="hidden py-2 font-semibold rounded lg:flex items-center justify-center gap-1 text-white">
                  Log in
                  <MdLogin  className="text-white text-2xl" />     
                </button>
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

      </div>
    </div>
  )
}

export default Home