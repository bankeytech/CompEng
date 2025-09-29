import { useState } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg"
import ProfilePic from "../assets/images/image 2.svg"
import { MdSettings } from "react-icons/md";
import { MdNotificationsNone} from "react-icons/md";
import SidePic from "../assets/images/4219290 1.svg"
import { FiCalendar } from "react-icons/fi";
import Elic from "../assets/images/Ellipse 2.svg"
import { FiMenu, FiX } from "react-icons/fi";
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.jpeg"

const Basic = "flex items-center justify-between gap-25 text-gray-500 font-light text-[4vw]"

const Bbt = "flex flex-col items-center justify-center py-22 font-bold"

const MobileDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/Dashboard", label: "Dashboard", active: true },
    { path: "/PersonalInfo", label: "Personal Info" },
    { path: "/Course", label: "Courses" },
    { path: "/Timetable", label: "Timetable" },
    { path: "/Result", label: "Result" },
  ];

  const profile = useStudentProfile();
  if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
   <div>
     <div className='relative p-7 flex lg:hidden'>
        <div className=' relative'>

            {/* Sidebar */}
            <aside
              className={`fixed top-0 left-0 h-full w-64 bg-[#914272] text-white rounded-r-3xl p-6 transform transition-transform duration-300 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex flex-col gap-10 h-full">
                <img src={TopPic} alt="img" className="w-[10vw]" />
                <ul className="flex flex-col gap-4">
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.path}
                        className={`${
                          item.active ? "font-bold text-white" : "text-gray-200"
                        } hover:text-white`}
                        onClick={() => setIsOpen(false)} // close menu after click
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    to="/StudentLogin"
                    className="text-white font-thin"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
            )}
            </div>

            <div className='flex flex-col gap-8 w-full'>
              <div class="flex items-center md:space-x-4 justify-between">
                <div className='flex items-center'>
                  <div className='flex items-center gap-3'>
                    <img src={ProfilePic} alt="img" className="w-[15vw]"/>
                    <div className='flex flex-col'>
                      <h4 className='font-semibold text-[4vw]'>{profile.fullName}</h4>
                      <h6 className='text-gray-500 text-[3vw]'>{profile.level}, B.eng, CPE</h6>
                    </div>
                  </div>
                </div>

                  <div className="flex items-center justify-between text-[#914272]">            
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-[8vw] lg:hidden"
                    >
                      {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                 </div>
                  
              </div>

              <div class="relative">
                <span class="absolute inset-y-0 right-0 flex items-center pr-5">
                    <button type="submit" title="Search" class="p-1  text-gray-500 text-[4vw]">
                        Search
                    </button>
                </span>
                <input type="search" name="Search" class="w-full py-7 px-5 pr-40 text-sm rounded-[4vw] 
                focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 
                shadow-lg focus:shadow-md transition duration-200"/>
              </div>  

              <div className='bg-[#914272] rounded-3xl flex flex-col p-5 pt-6 text-white'>
                <div className='flex flex-col'>
                  <h6 className='flex items-center gap-3.5'>
                    30th July, 2025
                    <span> 
                      <FiCalendar   className="text-white text-[3vw]" /> 
                    </span>
                  </h6>
                  <h1 className='font-semibold text-[4.4vw] py-2'>
                    Welcome back , {profile.fullName}!!
                  </h1>
                  <h6 className='text-[2.4vw]'>
                    Always stay updated in your student portal
                  </h6>
                </div>
                <img src={SidePic} alt="img" className=' rounded-3xl mt-5' />
              </div>

              <div className="flex flex-col gap-4">
                <h4 className='pl-4 font-bold text-[4.4vw]'>Basic Info</h4>
                 <div className=' px-6 pr-10 bg-gray-100 focus:bg-gray-50 focus:outline-none rounded-3xl 
                  flex flex-col justify-center gap-8 shadow-md focus:shadow-lg transition duration-200 p-8'>
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
                <h4 className='pl-4 font-bold text-[4.4vw]'>Attendance</h4>
                <div className='relative flex flex-col items-center'>
                    <img src={Elic} alt="img" className=""/>
                    <h6 className='absolute bottom-[10vw] text-white'>90.5%</h6>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className='pl-4 font-bold text-[4.4vw]'>Upcoming Deadlines</h4>
                 <div>             
                    <ul className='list-disc font-thin pl-10'>
                      <li>CPE  Assignment</li>
                      <li>EEE  Test </li>
                      <li>Late Registration</li>
                    </ul>
                  </div>
              </div>         

              <div className='my-20 flex flex-col gap-4 pl-4 '>
                <h2 className='font-semibold'>Quick Notification!</h2>
                <h6>You have 4 classes scheduled for today </h6>
                <Link 
                  to="/Timetable"
                  className='text-red-600 italic'>
                    Click Here to see more!
                  </Link>
              </div>

              <div className="absolute bottom-[2.1vw] right-10">
                <a className='text-[12px]'>
                  2025 © FUTA Department of Computer Engineering
                </a>
              </div>


        </div>
      
      </div>


      



   </div>
  )
}

export default MobileDashboard