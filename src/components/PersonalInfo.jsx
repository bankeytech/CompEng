import React from 'react'
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg"
import ProfilePic from "../assets/images/image 2.svg"
import { MdSettings } from "react-icons/md";
import { MdNotificationsNone} from "react-icons/md";
import Elic1 from "../assets/images/Ellipse 3.svg"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiMaximize2, FiEdit } from "react-icons/fi";
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg"

const Basic = "flex items-center justify-between gap-25 text-gray-500 font-light text-[1.3vw]"

const Bbt = "flex flex-col items-center justify-center py-22 font-bold"

const CustomInput = ({ label, type = "text", name }) => (
  <div className="flex flex-col gap-1">
    <label className='text-[0.9vw]'>{label}</label>
    <input
      type={type}
      name={name}
      className="w-[19vw] py-1 px-5 text-sm rounded-[4vw] 
      focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 
      shadow-lg focus:shadow-md transition duration-200"
    />
  </div>
);

const CustomSelect = ({ label, name, options }) => (
  <div className="flex flex-col">
    <label >{label}</label>
    <select
      name={name}
      className="rounded-[4vw] bg-gray-200 w-[8vw] text-[0.9vw] text-black
      py-1 px-2 focus:outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option} >
          {option}
        </option>
      ))}
    </select>
  </div>
);


const PersonalInfo = () => {
  const profile = useStudentProfile();
    if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
    <div className='relative p-10 flex'>
      <div className=' relative hidden lg:flex'>
        <header className="relative px-4 pr-13 py-8 text-gray-800 bg-[#914272] rounded-3xl ">
          <div className="container flex flex-col gap-10 mx-[2vw]">
            <img src={TopPic} alt="img" className='w-[10vw]'/>
            <ul className="hidden lg:flex flex-col gap-4 justify-start">
              {[
                { path: "/Dashboard", label: "Dashboard" },
                { path: "/PersonalInfo", label: "Personal Info", active: true },
                { path: "/Course", label: "Courses" },
                { path: "/Timetable", label: "Timetable" },
                { path: "#", label: "Result" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`text-white ${item.active ? "font-bold" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>      
          </div>

          <div className='flex mx-[2vw] absolute bottom-[2vw]'>
            <Link 
            to="/StudentLogin" 
            className=" text-white font-thin">
              Logout             
            </ Link>           
          </div>
        </header>
      </div>

      <div className='pl-8 flex flex-col gap-8 w-full'>
        <div class="flex items-center md:space-x-4 justify-between">
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-5">
                  <button type="submit" title="Search" class="p-1  text-gray-500 text-[0.9vw]">
                      Search
                  </button>
              </span>
              <input type="search" name="Search" class="w-full py-3 px-5 pr-40 text-sm rounded-[4vw] 
              sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 
              shadow-lg focus:shadow-md transition duration-200"/>
            </div>

            <div className='flex items-center gap-22'>
              <div className='flex items-center gap-3'>
                <img src={ProfilePic} alt="img" />
                <div className='flex flex-col'>
                  <h4 className='font-semibold'>{profile.fullName}</h4>
                  <h6 className='text-gray-500 text-[1vw]'>{profile.level} Level, Btech , CPE</h6>
                </div>
              </div>
              <div className='flex text-[2vw] gap-3'>
                <MdNotificationsNone className="text-gray-700 " />
                <MdSettings  className="text-gray-700" />               
              </div>
            </div>
            
        </div>

        <div className='flex gap-4'>
          <div className='flex flex-col w-[68%]'>
            <div className='bg-[#914272] rounded-[1.1vw] flex items-center justify-between px-5 py-2 pl-7 text-white pb-8'>
              <div className='flex flex-col w-full'>
                <div >
                  <h4 className='flex items-center justify-between text-[1.5vw]'>
                    Personal Info
                    <HiOutlineDotsHorizontal />
                  </h4>
                  <h6 className='text-[0.9vw] font-thin'>Enter your personal information here</h6>
                </div>
                  <div className="flex flex-col gap-5 font-thin py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <CustomInput label="Full name" name="fullName" />
                      <CustomInput label="Email" type="email" name="email" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      <CustomInput label="Contact number" name="contactNumber" />
                      <CustomInput label="DOB" name="dob" />
                    </div>
                  </div>

              </div>              
            </div>

            <div className='flex gap-5'>
              <div className='bg-[#914272] w-[70%] rounded-[1.1vw] mt-8 flex items-center justify-between px-5 py-2 pl-7 text-white '>
                <div className='flex flex-col w-full gap-6'>
                  <div >
                    <h4 className='flex items-center justify-between text-[1.5vw]'>
                      Professional Info
                       <FiMaximize2 />
                    </h4>                    
                  </div>
                  <div className="flex flex-col gap-5 py-5 bg-[#F5F5F5] rounded-2xl text-black p-4 pr-15">
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
                      <h6>Degree</h6>
                      <h6>Department</h6>
                      <h6 className='text-[0.9vw]'>Btech</h6>
                      <h6 className='text-[0.9vw]'>Computer Engineering</h6>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
                      <h6>Semester</h6>
                      <h6>Matric Number</h6>
                      <h6 className='text-[0.9vw]'>2</h6>
                      <h6 className='text-[0.9vw]'>CPE/30/0011</h6>
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <span className='border-1 w-2 h-2 bg-white rounded-4xl'></span>
                  </div>  

                </div>            
              </div>

              <div className='bg-[#914272] w-[30%] rounded-[1.1vw] mt-8 flex justify-between px-4 pl-3 py-3 text-white pb-8'>
                <div className='flex flex-col w-full'>                 
                    <h4 className='text-[1.5vw]'>
                      Additional Info
                    </h4>
                
                    <div className="flex flex-col gap-5 font-thin py-5">
                      <div className="gap-3 w-full">
                        <label>Resume</label>
                        <input type="text" placeholder='Enter your resume link' className='rounded-[4vw] 
                         bg-gray-200 w-[12vw] placeholder:text-[0.9vw] placeholder:text-black px-2'/>
                      </div>
                      <div className="gap-3 w-full font-thin">
                        <h4>Additional Links</h4>
                        <div className='flex gap-2'>
                         <CustomSelect 
                          options={["Facebook", "Twitter", "Instagram", "LinkedIn", "TikTok"]} 
                        />
                          <input type="text" placeholder='https://' className='rounded-[4vw] 
                         bg-gray-200 w-[4vw] placeholder:text-[0.9vw] placeholder:text-black px-2'/>
                        </div>
                      </div>
                    </div>
                  
                  
                </div>              
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='bg-[#914272] w-[70%] rounded-[1.1vw] mt-8 flex items-center justify-between px-5 py-5 pl-7 text-white '>
                <div className='flex flex-col w-full gap-4 '>
                  
                  <h4 className='flex items-center justify-between text-[1.3vw]'>
                    Areas of Interest                    
                  </h4> 

                  <ul className='flex flex-col gap-2 list-disc text-[0.9vw] font-thin pl-6 pb-7'>
                    <li>Badminton</li>
                    <li>Competitive Programming</li>
                    <li>Web development</li>
                    <li>Badminton</li>
                    <li>Competitive Programming</li>
                    <li>Web development</li>
                    <li>Badminton</li>
                    <li>Competitive Programming</li>
                    <li>Web development</li>
                  </ul>
                  

                    

                </div>            
              </div>

              <div className='bg-[#914272] w-[30%] rounded-[1.1vw] mt-8 flex justify-between py-3 text-white '>
                <div className='flex flex-col w-full '>                 
                  <div className=' px-4 pl-3 '>
                    <h4 className='text-[1.5vw]'>
                      Projects
                    </h4>
                
                    <div className="flex flex-col gap-3 font-thin py-2">
                      <div className="gap-3 w-full ">
                        <label className='text-[0.9vw]'>Upload github link</label>
                        <input type="text" placeholder='https://' className='rounded-[4vw] 
                         bg-gray-200 w-[12vw] placeholder:text-[0.9vw] placeholder:text-black px-2'/>
                      </div>
                      <textarea rows={2} 
                      className='rounded-[1vw] bg-gray-200 w-[12vw] placeholder:text-[0.7vw] placeholder:text-black p-2'
                      placeholder='Tell more about your project..'></textarea>
                    </div>
                  </div>

                    <hr className='w-full' />

                  <div className='flex flex-col items-start gap-3 px-5 py-2'>
                    <h4 className='text-[1.5vw]'>
                      Internship
                    </h4>

                    <h6 className='text-[1vw] font-thin'>
                      Nothing to show here right now....
                    </h6>
                  </div>
                              
                </div>              
              </div>
            </div>

          </div>
          <div className='w-[33%] '>
            <div className='container bg-[#7D7D7D]/20 rounded-[1.1vw] flex flex-col items-center justify-between
             p-1 text-white  shadow-2xl focus:shadow-lg'>
              <div className='flex flex-col w-full px-4 pt-4 gap-6'>
                <div className=' bg-white rounded-2xl text-black p-5'>
                  <div className='flex justify-end'>
                    <FiMaximize2 />
                  </div>
                  <div className='relative flex flex-col items-center justify-center'>
                    <img src={Elic1} alt="img" />
                    <span className=' absolute right-13 -bottom-4 w-16 h-16 flex items-center justify-center 
                    text-3xl bg-black text-white rounded-4xl font-thin'>
                      +
                    </span>
                  </div>
                  <div className='py-8 flex flex-col items-center justify-center'>
                    <h3 className='font-bold text-[1.6vw]'>Kasim Balogun</h3>
                    <h3 className='rounded-[4vw] bg-gray-100 px-8 py-2 shadow-lg focus:shadow-lg'>Student</h3>
                  </div>

                </div>

                <div className=' bg-white rounded-2xl text-black p-5 h-[81vh]'>
                  <div className='flex justify-between font-semibold'>
                    <h3>About Me</h3>
                    <FiEdit />
                  </div>
                  <div className='pt-2'>
                   <textarea rows={8} 
                      className='rounded-[0.7vw] border-2 border-gray-100 placeholder:text-[1.1vw]  p-2'
                      placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies'></textarea>
                  </div>

                </div>

                <div>

                </div>
              </div>
              
            </div>
          </div>
        </div>

        


      </div>

      

      
    </div>
  )
}

export default PersonalInfo