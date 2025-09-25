// src/pages/Result.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg";
import ProfilePic from "../assets/images/image 2.svg";
import { MdSettings, MdNotificationsNone } from "react-icons/md";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AuthContext from "../contexts/AuthContext"; 


const Bbt = "flex flex-col items-center justify-center py-22 font-bold";

export default function Result() {
  const { user, profile, loading } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);

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
          <div className="flex items-center md:space-x-4 justify-between">
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-5">
                <button
                  type="submit"
                  title="Search"
                  className="p-1 text-gray-500 text-[0.9vw]"
                >
                  Search
                </button>
              </span>
              <input
                type="search"
                name="Search"
                className="w-full py-3 px-5 pr-40 text-sm rounded-[4vw] sm:w-auto focus:outline-none
                  bg-gray-100 text-gray-800 focus:bg-gray-50 shadow-lg focus:shadow-md transition duration-200"
              />
            </div>

            <div className="flex items-center gap-22">
              <div className="flex items-center gap-3">
                <img src={ProfilePic} alt="img" />
                <div className="flex flex-col">
                  <h4 className="font-semibold">{profile.fullName}</h4>
                  <h6 className="text-gray-500 text-[1vw]">
                    {profile.level} Level, B.eng, CPE
                  </h6>
                </div>
              </div>
              <div className="flex text-[2vw] gap-3">
                <MdNotificationsNone className="text-gray-700 " />
                <MdSettings className="text-gray-700" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="bg-[#914272] rounded-[1.1vw] px-5 py-5 pl-7 text-white pb-8">
              <div className="p-10 w-full">
                  <h2 className="text-[2vw] font-semibold mb-6">
                    Results for {profile.fullName}
                  </h2>

                  {results.length === 0 ? (
                    <p>No results yet.</p>
                  ) : (
                    results.map((r) => (
                      <div key={r.id} className="bg-[#FFFF]/20 rounded-xl shadow p-6 mb-6">
                        <h3 className="text-[1.6vw]">Semester: {r.id}</h3>

                        <div className="grid grid-cols-2 gap-3 w-full py-2 font-semibold text-[1.4vw]">
                          <span>Course</span>
                          <span>Grade</span>
                        </div>

                        {courses.length > 0 ? (
                          courses.map((c) => (
                            <div key={c.code} className="grid grid-cols-2 gap-3 ">
                              <span>{c.name}</span>
                              <span>{r.grades?.[c.code] || "-"}</span>
                            </div>
                          ))
                        ) : (
                          <p>No courses registered yet.</p>
                        )}

                        <p className="mt-2 font-bold">Present-GPA = {r.GPA}</p>
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