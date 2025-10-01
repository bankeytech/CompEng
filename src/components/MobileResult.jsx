// src/pages/Result.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg";
import ProfilePic from "../assets/images/image 2.svg";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AuthContext from "../contexts/AuthContext"; 
import { FiMenu, FiX } from "react-icons/fi";


const Bbt = "flex flex-col items-center justify-center py-22 font-bold";

export default function MobileResult() {
  const { user, profile, loading } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
    
  const menuItems = [
    { path: "/Dashboard", label: "Dashboard"},
    { path: "/PersonalInfo", label: "Personal Info" },
    { path: "/Course", label: "Courses"},
    { path: "/Timetable", label: "Timetable" },
    { path: "/Result", label: "Result", active: true   },
  ];

  useEffect(() => {
    if (!user?.uid) return;

    const unsubCourses = onSnapshot(
      collection(db, "students", user.uid, "courses"),
      (snap) => {
        setCourses(snap.docs.map((d) => d.data()));
      }
    );

    const unsubResults = onSnapshot(
      collection(db, "students", user.uid, "results"),
      (snap) => {
        setResults(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    );

    return () => {
      unsubCourses();
      unsubResults();
    };
  }, [user?.uid]);

  if (loading) {
    return (
      <p className="flex flex-col items-center justify-center py-20 font-bold">
        <img src={FutaLogo} alt="logo" className="w-[10vw]" /> Loading...
      </p>
    );
  }

  if (!profile) {
    return (
      <p className="flex flex-col items-center justify-center py-20 font-bold">
        <img src={FutaLogo} alt="logo" className="w-[10vw]" /> No profile found 
      </p>
    );
  }

  return (  
        <div className="relative p-8 flex lg:hidden">
          {/* Sidebar */}
          <div className=' relative '>         
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

              {/* Main content */}
          <div className="flex flex-col gap-8 w-full">
            {/* Top bar */}
             <div className="flex items-center md:space-x-4 justify-between">  
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
      
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-5">
                    <button type="submit" title="Search" className="p-1  text-gray-500 text-[4vw]">
                        Search
                    </button>
                </span>
                <input type="search" name="Search" className="w-full py-7 px-5 pr-40 text-sm rounded-[4vw] 
                focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 
                shadow-lg focus:shadow-md transition duration-200"/>
              </div> 

            <div className="flex flex-col w-full">
              <div className="bg-[#914272] rounded-[1.1vw] px-5 py-5 pl-7 text-white pb-3">
                <div className="p-2 w-full">
                    <h2 className="text-[4.5vw] font-semibold mb-6">
                      Results for {profile.fullName}
                    </h2>

                    {results.length === 0 ? (
                      <p>No results yet.</p>
                    ) : (
                      results.map((r) => (
                        <div key={r.id} className="bg-[#FFFF]/20 rounded-xl shadow p-6 mb-6">
                          <h3 className="text-[3.6vw]">Semester: {r.id}</h3>

                          <div className="grid grid-cols-2 gap-3 w-full py-2 font-semibold text-[2.8vw]">
                            <span>Course</span>
                            <span>Grade</span>
                          </div>

                          {courses.length > 0 ? (
                            courses.map((c) => (
                              <div key={c.code} className="grid grid-cols-2 gap-3 text-[2.4vw]">
                                <span>{c.name}</span>
                                <span>{r.grades?.[c.code] || "-"}</span>
                              </div>
                            ))
                          ) : (
                            <p>No courses registered yet.</p>
                          )}

                          <p className="mt-2 font-semibold text-[2.4vw]">Present-GPA = {r.GPA}</p>
                        </div>
                      ))
                    )}
                </div>    
              </div>
            </div>
          </div>

          
      </div>

  );
}