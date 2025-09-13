import { useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram, } from 'react-icons/fa6'
import SidePic from "../assets/images/4219290 1.svg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputClass = "border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2 outline-none focus:ring-0"

const combinedClass = "pb-2 placeholder:text-white/80 py-2 outline-none focus:ring-0";

const StudentSignUp = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
   const [userType, setUserType] = useState("student");
  return (
    <div className='w-full'>
      <div className='flex flex-wrap lg:flex-row-reverse '>
            <div className='w-full lg:w-[45%] bg-[#F1F6F9] lg:pt-40 pt-6 hidden lg:block'>
              <div className="ml-8">
                <h2 className='text-5xl font-extrabold'>
                    Welcome to <br />Computer Engineering
                </h2>
                <h6 className='text-5xl p-0'>Student Portal</h6>
                <h6 className='text-0.5xl text-black/70'>Login to access your account</h6>
              </div>

              <div className='flex gap-4 text-3xl ml-8 mt-4 '>
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


            {/* MOBILE  */}

            <div className='relative w-full h-[100vh] bg-[#F1F6F9] lg:hidden flex flex-col items-center justify-center'>
              <div className="flex flex-col items-center justify-center text-center absolute top-30">
                <h2 className='text-[14vw] leading-[14vw] font-extrabold p-3'>
                    Welcome to Computer Engineering
                </h2>
                <h6 className='text-[9vw] leading-[9vw] p-3'>Student Portal</h6>
                <h6 className='text-[3vw] text-black/70 p-3'>Login to access your account</h6>
              </div>

              <div className=" absolute bottom-[0vw]">
                  <img src={SidePic} alt="img" className='w-full'/>
              </div>             
                
              <div className="flex flex-col gap-5 items-center justify-center mt-15 absolute top-[90vw]">
                <a 
                href="#"
                className="border-2 border-[#914272] py-4 px-25 text-[#914272] rounded-[8vw] font-bold text-[5vw]">
                  Sign Up
                </a>

                <a 
                href="#"
                className="bg-[#914272] py-4 px-27 text-white rounded-[8vw] font-bold text-[5vw]">
                  Login
                </a>
              </div>            

             <div className="absolute bottom-3">
                <a className='text-[12px]'>
                 2025 © FUTA Department of Computer Engineering
                </a>
              </div>
             
            </div>

              {/* DESKTOP */}

            <div className="relative w-full lg:w-[55%] bg-[#914272] lg:pt-50 pt-6 text-white pb-20 lg:pb-0 hidden lg:block">
             <div className='lg:pl-40 pl-8'>
              <h2 className='text-5xl font-extrabold pb-2'>Sign Up</h2>
              <h6 className='text-white/90'>Fill in the Correct details below.</h6>
             </div>

             <div className="flex gap-3 pl-40 pt-5">
                <a 
                 className={`${
                  userType === "student" ? "border-b-3 text-white font-bold" : " "
                 }`}
                 onClick={() => setUserType("student")}
                >
                  Student
                </a>
                <a 
                className={`${
                  userType === "lecturer" ? "border-b-3 text-white font-bold" : " "
                  }`}
                  onClick={() => setUserType("lecturer")}
                >
                  Lecturer
                </a>
             </div>

             <div className='pt-5 flex flex-col w-[65%] lg:pl-40 pl-8'>
               {userType === "student" ? (
                <div className="border-b-1 border-white/80 ">
                  <input 
                  type="text" 
                  placeholder='UTME or Matric Number' 
                  className={`border-b-1 w-full ${combinedClass}`} />

                  <input 
                  type="email" 
                  placeholder='Email Address'
                  className={combinedClass} />

                </div>              
                ) : (
                  <input 
                  type="email" 
                  placeholder='Staff Email Address'
                  className={InputClass} />
                 
                )}

                <div className="relative border-b-1 border-white/80">
                  <input 
                  type={visible ? "text": "password"} 
                  placeholder='Password'
                  className={combinedClass} />

                  <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    title={visible ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
                  >
                    {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
                
                <div className="relative border-b-1 border-white/80">
                  <input 
                  type={visible1 ? "text": "password"} 
                  placeholder='Confirm Password'
                  className={combinedClass} />

                  <button
                    type="button"
                    onClick={() => setVisible1((v) => !v)}
                    aria-label={visible1 ? "Hide password" : "Show password"}
                    title={visible1 ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
                  >
                    {visible1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>

                {/* <input 
                type="password" 
                placeholder='Confirm Password'
                className={InputClass} /> */}

                <span className='py-4 flex items-center text-[10px] text-white/60'>
                  Are you a robot? Verify here! 
                  <input 
                  type="checkbox" 
                  className='my-checkbox ml-3' 
                  required />
                </span>
             </div>
              <div className='lg:pl-40 pl-8'>
                <button 
                type="button" 
                className='bg-white py-2 px-30 text-black rounded-xl font-bold mt-5'>
                Sign Up
               </button> 
              </div>

              <div className="absolute bottom-7 pl-25">
                <a className='text-[12px]'>
                 2025 © FUTA Department of Computer Engineering
                </a>
              </div>
            </div>  
      </div>  
    </div>
  )
}

export default StudentSignUp