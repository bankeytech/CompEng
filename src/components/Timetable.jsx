import React from 'react'
import ProfilePic from "../assets/images/image 2.svg"
import { MdSettings } from "react-icons/md";
import { MdNotificationsNone} from "react-icons/md";
import TopPic from "../assets/images/image 1.svg"
import { Link } from "react-router-dom";
import useStudentProfile from "../hooks/useStudentProfile";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg"

const Th = "px-6 py-3 border-b border-gray-300";

const Bbt = "flex flex-col items-center justify-center py-22 font-bold"

const Timetable = () => {
  const profile = useStudentProfile();
    if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;
  return (
    <div className='relative lg:block hidden'>
      <div>
        <header className=" text-gray-800 bg-[#914272] pt-15">            
          <div className="container flex justify-end mx-auto">                    
            <div className="flex flex-col items-center justify-center md:space-x-4">
              <div className='flex items-center gap-22 text-white'>
                <div className='flex items-center gap-3'>
                  <img src={ProfilePic} alt="img" />
                  <div className='flex flex-col'>
                    <h4 className='font-semibold'>{profile.fullName}</h4>
                    <h6 className='text-[1vw]'>{profile.level} Level, B.eng, CPE</h6>
                  </div>
                </div>
                <div className='flex text-[2vw] gap-3'>
                  <MdNotificationsNone />
                  <MdSettings />               
                </div>
              </div>             
            </div>          
          </div>
          <div className='flex items-end justify-center text-white text-[3vw]'>
             <h4>{profile.level} Level Timetable</h4> 
           </div>
        </header>

        <div className=' absolute top-[3vw] left-[3vw] hidden lg:flex'>
          <header className="relative px-4 py-8 text-gray-800 bg-black rounded-3xl ">
            <div className="container flex flex-col gap-10 h-[110vh] mx-[2vw]">
              <img src={TopPic} alt="img" className='w-[10vw]'/>
              <ul className="hidden lg:flex flex-col gap-4 justify-start">
                {[
                  { path: "/PersonalInfo", label: "..." },
                  { path: "/Dashboard", label: "Dashboard" },
                  { path: "/PersonalInfo", label: "Personal Info" },
                  { path: "/Course", label: "Courses"},
                  { path: "/Timetable", label: "Timetable", active: true  },
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

            <div className='flex mx-[2vw] absolute bottom-[2vw] '>
              <Link 
              to="/StudentLogin" 
              className=" text-white font-thin">
                Logout             
              </ Link>           
            </div>
          </header>
       </div>

       <div className='relative flex flex-col items-center'>
         <h4 className='font-bold text-[3vw]'>2025/2026 Session</h4>

         <div className='relative pt-5 flex justify-center items-center w-full text-[1.5vw] '>
            <h5>
              <span className='font-bold'>WEEKLY </span>SCHEDULE
            </h5>
            <h5 className='absolute right-10'>WEEK <span className='font-bold'>32, 30th JUL</span></h5>         
         </div>

         <div className='lg:w-[78vw] w-[95vw] -z-10 absolute top-[8.5vw] right-3'>
            <div className="m-1">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-center text-white">
                    <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="lg:w-39 w-50 h-15 border-r border-gray-300 bg-black ">
                                
                            </th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-300 bg-[#393939]">
                               Monday
                            </th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-300 bg-black">
                                Tuesday
                            </th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-300 bg-[#393939]">
                                Wednesday
                            </th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-300 bg-black">
                                Thursday
                            </th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-300 bg-[#393939]">
                                Friday
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        <tr className="bg-white">
                            <th scope="row" className="w-39 h-15 border-r border-gray-300 bg-[#393939]">
                                8 -10AM
                            </th>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`flex flex-col items-center text-black ${Th}`}>
                                <span className='border-1 border-black w-4 h-4 bg-green-600 rounded-4xl'></span>
                                <span>CPE</span>
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`border-r border-gray-300 ${Th}`}>
                                
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="w-39 h-15 border-r border-gray-300 bg-black">
                               10 - 12PM
                            </th>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td  className={`flex flex-col items-center text-black ${Th}`}>
                               <span className='border-1 border-black w-4 h-4 bg-green-600 rounded-4xl'></span>
                               <span>EEE</span> 
                            </td>
                            <td className={`border-r border-gray-300 ${Th}`}>
                                
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="w-39 h-15 border-r border-gray-300 bg-[#393939]">
                                12 - 2PM
                            </th>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`flex flex-col items-center text-black ${Th}`}>
                              <span className='border-1 border-black w-4 h-4 bg-[#FF0000] rounded-4xl'></span>
                              <span>CPE </span>
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`border-r border-gray-300 ${Th}`}>
                                
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="w-39 h-15 border-r border-gray-300 bg-black">
                                2 - 4PM
                            </th>
                            <td className={`flex flex-col items-center text-black ${Th}`}>
                              <span className='border-1 border-black w-4 h-4 bg-[#EAFF00] rounded-4xl'></span>
                              <span>CPE </span>
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`border-r border-gray-300 ${Th}`}>
                                
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="w-39 h-15 border-r border-gray-300 bg-[#393939]">
                                4 - 6PM
                            </th>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td  className={`flex flex-col items-center text-black ${Th}`}>
                               <span className='border-1 border-black w-4 h-4 bg-green-600 rounded-4xl'></span>
                               <span>EEE </span> 
                            </td>
                            <td className={`${Th}`}>
                                
                            </td>
                            <td className={`border-r border-gray-300 ${Th}`}>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
            
            <div className='flex flex-col items-center font-thin py-5 text-[0.8vw]'>
              <div className='flex gap-3'>
                <h6 className='flex items-center gap-1 '>
                  <span className='border-1 w-4 h-4 bg-[#EAFF00] rounded-4xl'></span>
                  Uncertain
                </h6>
                <h6 className='flex items-center gap-1'>
                  <span className='border-1 w-4 h-4 bg-green-600 rounded-4xl'></span>
                  Certain 
                </h6>
                <h6 className='flex items-center gap-1'>
                  <span className='border-1 w-4 h-4 bg-[#FF0000] rounded-4xl'></span>
                  Cancelled
                </h6>
              </div>

              <h5 className='font-bold pt-1'>
                PS: Always confirm cancelled lectures with your Class Representatives
              </h5>
            </div>

            <div className="absolute -bottom-[3vw] right-2">
              <a className='text-[12px]'>
                2025 © FUTA Department of Computer Engineering
              </a>
            </div>  
        </div>
        
       </div>
     </div>    
    </div>
  )
}

export default Timetable