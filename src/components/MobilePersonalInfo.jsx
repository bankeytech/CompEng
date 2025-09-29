import { useState } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg"
import ProfilePic from "../assets/images/image 2.svg"
import { MdSettings } from "react-icons/md";
import { MdNotificationsNone} from "react-icons/md";
import Elic1 from "../assets/images/Ellipse 3.svg"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiMaximize2, FiEdit } from "react-icons/fi";
import { FiMenu, FiX } from "react-icons/fi";
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg"

const Basic = "flex items-center justify-between gap-25 text-gray-500 font-light text-[1.3vw]"

const Bbt = "flex flex-col items-center justify-center py-22 font-bold"

const TheBox = "bg-[#914272] rounded-[5vw] flex justify-between p-8 text-white pb-8"

const CustomInput = ({ label, type = "text", name }) => (
  <div className="flex flex-col gap-1">
    <label className='text-[3.2vw]'>{label}</label>
    <input
      type={type}
      name={name}
      className="w-full py-3 px-5 text-sm rounded-[4vw] 
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
      className="rounded-[4vw] bg-gray-200 w-full text-[2.9vw] text-black
      py-3 px-3 focus:outline-none"
    >
      <option value="" >Select {label}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option} >
          {option}
        </option>
      ))}
    </select>
  </div>
);


const MobilePersonalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  
    const menuItems = [
      { path: "/Dashboard", label: "Dashboard"},
      { path: "/PersonalInfo", label: "Personal Info", active: true  },
      { path: "/Course", label: "Courses" },
      { path: "/Timetable", label: "Timetable" },
      { path: "/Result", label: "Result" },
    ];
  const profile = useStudentProfile();
    if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
    <div className='relative p-8 flex lg:hidden'>
      <div className=' relative '>
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
      

     <div className=' flex flex-col gap-8 w-full'>
        <div class="flex items-center md:space-x-4 justify-between">  
          <div className='flex items-center gap-3'>
            <img src={ProfilePic} alt="img" className="w-[15vw]"/>
            <div className='flex flex-col'>
              <h4 className='font-semibold text-[4vw]'>{profile.fullName}</h4>
              <h6 className='text-gray-500 text-[3vw]'>{profile.level}, B.eng, CPE</h6>
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


         <div className='container bg-[#7D7D7D]/20 rounded-[5vw] p-3 text-white shadow-2xl focus:shadow-lg'>
            <div className='flex flex-col w-full px-4 pt-4 gap-6'>
              <div className=' bg-white rounded-2xl text-black p-5'>
                <div className='flex justify-end text-2xl'>
                  <FiMaximize2 />
                </div>
                <div className='relative flex flex-col items-center justify-center pt-3'>
                  <img src={Elic1} alt="img" />
                  <span className='absolute right-[14vw] bottom-[0vw] w-[10vw] h-[10vw] flex items-center justify-center 
                  text-3xl bg-black text-white rounded-4xl font-thin'>
                    +
                  </span>
                </div>
                <div className='py-8 flex flex-col items-center justify-center gap-3'>
                  <h3 className='font-bold text-[5.6vw]'>{profile.fullName}</h3>
                  <h3 className='rounded-[4vw] bg-gray-100 px-8 py-2 shadow-lg focus:shadow-lg text-[3.6vw]'>Student</h3>
                </div>

              </div>

              <div className=' bg-white rounded-2xl text-black p-5'>
                <div className='flex justify-between font-semibold text-[4.6vw]'>
                  <h3>About Me</h3>
                  <FiEdit />
                </div>
                <div className='pt-2'>
                  <textarea rows={8} 
                    className='w-full rounded-[0.7vw] border-2 border-gray-100 placeholder:text-[1.1vw]  p-2'
                    placeholder=''></textarea>
                </div>

              </div>

              <div>

              </div>
            </div>
            
          </div>

          <div className={TheBox}>
            <div className='flex flex-col w-full'>
              <div >
                <h4 className='flex items-center justify-between text-[4.5vw]'>
                  Personal Info
                  <HiOutlineDotsHorizontal />
                </h4>
                <h6 className='text-[2.9vw] font-thin'>Enter your personal information here</h6>
              </div>
                <div className="flex flex-col gap-5 font-thin py-5">
                  <div className="grid grid-cols-1 gap-3 w-full">
                    <CustomInput label="Full name" name="fullName" />
                    <CustomInput label="Email" type="email" name="email" />
                  </div>
                  <div className="grid grid-cols-2  gap-3 w-full">
                    <CustomInput label="Contact number" name="contactNumber" />
                    <CustomInput label="DOB" name="dob" />
                  </div>
                </div>

            </div>              
          </div>


          <div className={TheBox}>
            <div className='flex flex-col w-full gap-6'>
              <div >
                <h4 className='flex items-center justify-between text-[4.5vw]'>
                  Professional Info
                    <FiMaximize2 />
                </h4>                    
              </div>
              <div className="flex flex-col gap-5 py-5 bg-[#F5F5F5] rounded-2xl text-black p-4 pr-15">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
                  <h6>Degree</h6>
                  <h6>Department</h6>
                  <h6 className='text-[2.3vw]'>B.eng</h6>
                  <h6 className='text-[2.3vw]'>Computer Engineering</h6>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full">
                  <h6>Semester</h6>
                  <h6>Matric Number</h6>
                  <h6 className='text-[2.3vw]'>1</h6>
                  <h6 className='text-[2.3vw]'>{profile.matricNo}</h6>
                </div>
              </div>

              <div className='flex justify-center'>
                <span className='border-1 w-2 h-2 bg-white rounded-4xl'></span>
              </div>  

            </div>            
          </div>

          <div className={TheBox}>
            <div className='flex flex-col w-full'>                 
                <h4 className='text-[4.5vw]'>
                  Additional Info
                </h4>
            
                <div className="flex flex-col gap-5 font-thin py-5">
                  <div className="flex flex-col gap-1 w-full">
                    <label>Resume</label>
                    <input type="text" placeholder='Enter your resume link' className='rounded-[4vw] 
                      bg-gray-200 placeholder:text-[2.9vw] placeholder:text-black p-3 focus:outline-none text-black'/>
                  </div>
                  <div className="gap-3 w-full font-thin">
                    <h4>Additional Links</h4>
                    <div className='flex flex-col gap-4'>
                      <CustomSelect 
                      options={["Facebook", "Twitter", "Instagram", "LinkedIn", "TikTok"]} 
                    />
                      <input type="text" placeholder='https://' className='rounded-[4vw] py-3 px-5  
                      bg-gray-200 placeholder:text-[2.9vw] placeholder:text-black focus:outline-none'/>
                    </div>
                  </div>
                </div>
                          
            </div>              
          </div>

           <div className={TheBox}>
            <div className='flex flex-col w-full gap-4 '>
              
              <h4 className='flex items-center justify-between text-[4.5vw]'>
                Areas of Interest                    
              </h4> 

              <ul className='flex flex-col gap-2 list-disc text-[3.9vw] font-thin pl-6'>
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


          <div className={TheBox}>
            <div className='flex flex-col w-full '>                 
              <div className=''>
                <h4 className='text-[4.5vw]'>
                  Projects
                </h4>
            
                <div className="flex flex-col gap-4 font-thin py-2">
                  <div className="flex flex-col gap-2 w-full ">
                    <label className='text-[2.9vw]'>Upload github link</label>
                    <input type="text" placeholder='https://' className='rounded-[4vw] 
                      bg-gray-200 placeholder:text-[2.9vw] placeholder:text-black p-3'/>
                  </div>
                  <textarea rows={3} 
                  className='rounded-[2vw] bg-gray-200 placeholder:text-[2.7vw] placeholder:text-black p-2'
                  placeholder='Tell more about your project..'></textarea>
                </div>
              </div>

                <hr className='w-full' />

              <div className='flex flex-col items-start gap-3 py-2'>
                <h4 className='text-[4.5vw]'>
                  Internship
                </h4>

                <h6 className='text-[3vw] font-thin'>
                  Nothing to show here right now....
                </h6>
              </div>
                          
            </div>              
          </div>

      </div>

      

      
    </div>
  )
}

export default MobilePersonalInfo