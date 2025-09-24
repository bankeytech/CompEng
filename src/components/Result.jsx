// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg";
import ProfilePic from "../assets/images/image 2.svg";
import {
  MdSettings,
  MdNotificationsNone,
  MdDelete as MdDeleteIcon,
} from "react-icons/md";
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg"



  const Bbt = "flex flex-col items-center justify-center py-22 font-bold"
export default function Result() {
  

  const profile = useStudentProfile();
      if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
    <div className="relative p-10 flex">
      {/* Sidebar */}
      <div className="relative hidden lg:flex">
        <header className="relative px-4 pr-13 py-8 text-gray-800 bg-[#914272] rounded-3xl ">
          <div className="container flex flex-col gap-10 mx-[2vw] h-screen">
            <img src={TopPic} alt="img" className="w-[10vw]" />
            <ul className="hidden lg:flex flex-col gap-4 justify-start">
              {[
                { path: "/Dashboard", label: "Dashboard" },
                { path: "/PersonalInfo", label: "Personal Info" },
                { path: "/Course", label: "Courses" },
                { path: "/Timetable", label: "Timetable" },
                { path: "/Result", label: "Result", active: true },
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

          <div className="flex mx-[2vw] absolute bottom-[2vw]">
            <Link to="/StudentLogin" className="text-white font-thin">
              Logout
            </Link>
          </div>
        </header>
      </div>

      {/* Main content */}
      <div className="pl-8 flex flex-col gap-8 w-full">
        {/* Top bar */}
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
                  <h6 className='text-gray-500 text-[1vw]'>{profile.level} Level, B.eng, CPE</h6>
                </div>
              </div>
              <div className='flex text-[2vw] gap-3'>
                <MdNotificationsNone className="text-gray-700 " />
                <MdSettings  className="text-gray-700" />               
              </div>
            </div>
            
        </div>

        {/* Body */}
        <div className="flex gap-4">
          {/* Left: Form */}
          <div className="flex flex-col w-full">
            <div className="bg-[#914272] rounded-[1.1vw] px-5 py-5 pl-7 text-white pb-8">
              <h3 className="flex items-center justify-center font-bold text-2xl py-3">
                Result for {profile.fullName} (2023/2024) Session
              </h3>
              <div className="flex flex-col items-center justify-center rounded-[1.1vw] p-4 shadow-2xl focus:shadow-lg">
                <h3>
                  1st Semester 
                </h3>
                 <div className="flex flex-col w-full gap-5 py-5 pl-48 ">
                    <div className="grid grid-cols-3 gap-3 w-full">
                      <h4>Course</h4>
                      <h4>Unit</h4>
                      <h4>Marks</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 font-thin  w-full">
                      <h4>CPE 501</h4>
                      <h4>3</h4>
                      <h4>72A</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 font-thin  w-full">
                      <h4>CPE 503</h4>
                      <h4>2</h4>
                      <h4>70A</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 font-thin  w-full">
                      <h4>MTS 507</h4>
                      <h4>3</h4>
                      <h4>69B</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 font-thin  w-full">
                      <h4>GNS 505</h4>
                      <h4>2</h4>
                      <h4>79A</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 font-thin  w-full">
                      <h4>EEE 509</h4>
                      <h4>3</h4>
                      <h4>80A</h4>
                    </div>
                    
                  </div>
                
              </div>
               <h3 className="flex items-center justify-center py-4">
                Cum GPA = <span>5.0</span>
               </h3>
            </div>
          </div>

          
         
        </div>
      </div>
    </div>
  );
}
