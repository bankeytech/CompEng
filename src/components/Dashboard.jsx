import React from 'react'
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg"
import ProfilePic from "../assets/images/image 2.svg"
import { MdSettings } from "react-icons/md";
import { MdNotificationsNone} from "react-icons/md";
import SidePic from "../assets/images/4219290 1.svg"
import { FiCalendar } from "react-icons/fi";
import Elic from "../assets/images/Ellipse 2.svg"
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.jpeg"
import MobileDashboard from './MobileDashboard';

const Basic = "flex items-center justify-between lg:gap-25 gap-9 text-gray-500 font-light text-[1.3vw]"

const Bbt = "flex flex-col items-center justify-center py-22 font-bold"

const Dashboard = () => {
  const profile = useStudentProfile();
  if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
   <div>
     <div className='relative p-10 lg:flex hidden md:flex'>
        <div className=' relative hidden lg:flex md:flex'>
          <header className="relative px-4 lg:pr-13 pr-6 py-8 text-gray-800 bg-[#914272] rounded-3xl">
            <div className="container flex flex-col gap-10 lg:mx-[2vw] mx-[1.5vw] ">
              <img src={TopPic} alt="img" className='w-[10vw]'/>
              <ul className="hidden lg:flex md:flex flex-col gap-4 justify-start">
                {[
                  { path: "/Dashboard", label: "Dashboard", active: true  },
                  { path: "/PersonalInfo", label: "Personal Info" },
                  { path: "/Course", label: "Courses"},
                  { path: "/Timetable", label: "Timetable" },
                  { path: "/Result", label: "Result" },
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
                    <button type="submit" title="Search" class="p-1 text-gray-500 text-[0.9vw]">
                        Search
                    </button>
                </span>
                <input type="search" name="Search" class="lg:w-full w-auto py-3 px-5 lg:pr-40 pr-10  text-sm rounded-[4vw] 
                 focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 
                shadow-lg focus:shadow-md transition duration-200"/>
              </div>

              <div className='flex items-center lg:gap-22 gap-5'>
                <div className='flex items-center gap-3'>
                  <img src={ProfilePic} alt="img" />
                  <div className='flex flex-col'>
                    <h4 className='font-semibold'>{profile.fullName}</h4>
                    <h6 className='text-gray-500 text-[1vw]'>{profile.level} Level, B.eng, CPE</h6>
                  </div>
                </div>
                <div className='flex text-[2vw] gap-3'>
                  <MdNotificationsNone className="text-gray-700 " />
                  <MdSettings  className="text-gray-700" />               
                </div>
              </div>
              
          </div>

          <div className='bg-[#914272] rounded-[1.1vw] flex lg:pl-15 pl-7 items-center justify-between p-1 text-white'>
            <div className='flex flex-col'>
              <h6 className='flex gap-3.5 font-thin'>
                30th July , 2025
                <span> 
                  <FiCalendar className="text-white text-[1.5vw]" /> 
                </span>
              </h6>
              <h1 className='font-semibold text-[2vw] lg:text-[1.8vw] '>
                Welcome back , {profile.fullName}!!
              </h1>
              <h6 className='font-thin lg:text-[1.5vw] text-[1.3vw]'>
                Always stay updated in your student portal
              </h6>
            </div>
            <img src={SidePic} alt="img" className='w-[25vw] rounded-[1.1vw]' />
          </div>

          <div className='grid grid-cols-3 gap-7'>
            <div className="flex flex-col gap-4">
              <h4 className='pl-4 font-bold text-[1.8vw]'>Basic Info</h4>
                <div className=' px-6 pr-10 bg-gray-100 focus:bg-gray-50 focus:outline-none rounded-3xl 
                flex flex-col justify-center gap-8 shadow-md focus:shadow-lg transition duration-200 lg:p-8 p-6'>
                  <h4 className={Basic}>
                    Courses
                    <span>5</span>
                  </h4>
                  <h4 className={Basic}>
                    CGPA
                    <span>5.0</span>
                  </h4>
                  <h4 className={Basic}>
                    Semester
                    <span>1st</span>
                  </h4>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className='pl-4 font-bold text-[1.8vw]'>Attendance</h4>
              <div className='relative flex flex-col items-center'>
                  <img src={Elic} alt="img" className=""/>
                  <h6 className='absolute bottom-[6vw] text-white'>90.5%</h6>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className='pl-4 font-bold text-[1.8vw]'>Upcoming Deadlines</h4>
                <div>             
                  <ul className='list-disc font-thin pl-10 lg:text-[1.5vw] text-[1.3vw]'>
                    <li>CPE  Assignment</li>
                    <li>EEE  Test </li>
                    <li>Late Registration</li>
                  </ul>
                </div>
            </div>     

          </div>


            <div className='my-20 flex flex-col gap-4 pl-5 text-[1vw]'>
              <h2 className='font-semibold'>Quick Notification!</h2>
              <h6>You have 4 classes scheduled for today 
                <Link 
                to="/Timetable"
                className='text-red-600 pl-10 italic'>
                  Click Here to see more!
                </Link>
              </h6>
            </div>

          <div className="absolute bottom-[2.1vw] right-10">
            <a className='text-[12px]'>
              2025 © FUTA Department of Computer Engineering
            </a>
          </div>


        </div>
      
      </div>


      <div className='block lg:hidden md:hidden'>
        <MobileDashboard />
      </div>



   </div>
  )
}

export default Dashboard