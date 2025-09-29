// src/pages/Course.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg";
import ProfilePic from "../assets/images/image 2.svg";
import {
  MdSettings,
  MdNotificationsNone,
  MdDelete as MdDeleteIcon,
} from "react-icons/md";
import { HiOutlineDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { Formik, Field, Form } from "formik";
import useStudentProfile from "../hooks/useStudentProfile";
import { db } from "../firebaseConfig";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg";

const Fid =
  "w-[22vw] py-3 px-5 text-sm rounded-[4vw] focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 shadow-lg focus:shadow-md transition duration-200";
const Bbt = "flex flex-col items-center justify-center py-22 font-bold";

export default function Course() {
  const { user } = useContext(AuthContext);
  const profile = useStudentProfile();

  const [savedCourses, setSavedCourses] = useState([]);
  // const [editingIndex, setEditingIndex] = useState(null);
  // const [menuOpen, setMenuOpen] = useState(null);

  // Subscribe to courses from Firestore
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(
      collection(db, "students", user.uid, "courses"),
      (snap) => {
        const data = snap.docs.map((d) => d.data());
        setSavedCourses(data);
      }
    );
    return () => unsub();
  }, [user?.uid]);

  // Save courses to Firestore
  const saveCoursesToFirebase = async (courses) => {
    if (!user?.uid) return;
    try {
      for (let c of courses) {
        const code = c.code || c; // if no code provided, use name
        await setDoc(doc(db, "students", user.uid, "courses", code), {
          name: c.name || c,
          code,
        });
      }
    } catch (err) {
      console.error("Error saving courses:", err);
    }
  };

  if (!profile)
    return (
      <p className={Bbt}>
        <img src={FutaLogo} alt="img" className="w-[10vw]" /> Loading...
      </p>
    );

  return (
    <div className="relative p-10 lg:flex hidden md:flex">
      {/* Sidebar */}
      <div className="relative lg:flex hidden md:flex">
        <header className="relative px-4 lg:pr-13 pr-6 py-8 text-gray-800 bg-[#914272] rounded-3xl">
          <div className="container flex flex-col gap-10 lg:mx-[2vw] mx-[1.5vw]">
            <img src={TopPic} alt="img" className='w-[10vw]'/>
            <ul className="hidden lg:flex md:flex flex-col gap-4 justify-start">
              {[
                { path: "/Dashboard", label: "Dashboard" },
                { path: "/PersonalInfo", label: "Personal Info"},
                { path: "/Course", label: "Courses", active: true  },
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

      {/* Main content */}
      <div className="pl-8 flex flex-col gap-8 w-full">
        {/* Top bar */}
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

        {/* Body */}
        <div className="flex gap-4">
          {/* Left: Form */}
          <div className="flex flex-col w-[60%]">
            <div className="bg-[#914272] rounded-[1.1vw] px-5 py-8 pl-7 text-white pb-8">
              <div className="flex flex-col w-full">
                <div className="pb-7">
                  <h4 className="flex items-center justify-between text-[1.5vw]">
                    Course Info
                    <HiOutlineDotsHorizontal />
                  </h4>
                  <h6 className="text-[0.9vw] font-thin">
                    Enter your Registered Courses here
                  </h6>
                </div>

                <Formik
                  initialValues={{ course: "" }}
                  onSubmit={(values, { resetForm }) => {
                    if (values.course.trim() !== "") {
                      const newCourse = { name: values.course, code: values.course };
                      saveCoursesToFirebase([newCourse]);
                      resetForm();
                    }
                  }}
                >
                  <Form className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <label>1.</label>
                      <Field
                        id="course"
                        name="course"
                        placeholder="Enter course name/code"
                        className={Fid}
                      />
                    </div>
                    

                    <div className="flex items-center justify-center mt-3">
                      <button
                        type="submit"
                        className="w-[18vw] bg-white text-[#914272] rounded-[4vw] py-2 px-6 shadow-md hover:bg-gray-200 transition"
                      >
                        Save Course
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          {/* Right: Saved courses */}
          <div className="w-[40%]">
            <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] p-4 text-black shadow-2xl">
              {savedCourses.length > 0 ? (
                <ul className="space-y-3">
                  {savedCourses.map((course, idx) => (
                    <li
                      key={idx}
                      className="bg-white rounded-lg p-3 shadow-md flex items-center justify-between"
                    >
                      <span>{course.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <h2>No Course has been saved yet</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}