// src/pages/Course.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopPic from "../assets/images/image 1.svg";
import ProfilePic from "../assets/images/image 2.svg";
import { MdDelete as MdDeleteIcon,} from "react-icons/md";
import { HiOutlineDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { Formik, Field, Form } from "formik";
import useStudentProfile from "../hooks/useStudentProfile";
import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import AuthContext from "../contexts/AuthContext";
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg";
import { FiMenu, FiX } from "react-icons/fi";

const Fid =
  "py-3 px-5 text-sm rounded-[4vw] focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 shadow-lg transition duration-200";
const Bbt = "flex flex-col items-center justify-center py-22 font-bold";

export default function MobileCourse() {
  const { user } = useContext(AuthContext);
  const profile = useStudentProfile();

  const [savedCourses, setSavedCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); // store course being edited
  const [menuOpen, setMenuOpen] = useState(null);

   const [isOpen, setIsOpen] = useState(false);
  
    const menuItems = [
      { path: "/Dashboard", label: "Dashboard"},
      { path: "/PersonalInfo", label: "Personal Info" },
      { path: "/Course", label: "Courses", active: true  },
      { path: "/Timetable", label: "Timetable" },
      { path: "/Result", label: "Result" },
    ];

  // Subscribe to Firestore courses
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(
      collection(db, "students", user.uid, "courses"),
      (snap) => {
        setSavedCourses(snap.docs.map((d) => d.data()));
      }
    );
    return () => unsub();
  }, [user?.uid]);

  // Save or update a course
  const saveCourseToFirebase = async (course) => {
    if (!user?.uid) return;
    try {
      const code = course.code || course.name;
      await setDoc(doc(db, "students", user.uid, "courses", code), {
        name: course.name,
        code,
      });
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  // Delete a course
  const deleteCourseFromFirebase = async (code) => {
    if (!user?.uid) return;
    try {
      await deleteDoc(doc(db, "students", user.uid, "courses", code));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  if (!profile)
    return (
      <p className={Bbt}>
        <img src={FutaLogo} alt="img" className="w-[10vw]" /> Loading...
      </p>
    );

   
  return (
    <div className="relative p-8 flex lg:hidden">
      {/* Sidebar */}
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

      {/* Main content */}
      <div className=" flex flex-col gap-8 w-full">
        {/* Top bar */}
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

        {/* Body */}
        <div className="flex flex-col gap-4">
          {/* Left: Form */}
          <div className="flex flex-col">
            <div className="bg-[#914272] rounded-[1.1vw] px-5 py-2 text-white pb-8">
              <div className="flex flex-col w-full">
                <div className="pb-4">
                  <h4 className="flex items-center justify-between text-[4.5vw]">
                    Course Info
                    <HiOutlineDotsHorizontal />
                  </h4>
                  <h6 className="text-[2.2vw] font-thin">
                    Enter your Registered Courses here
                  </h6>
                </div>

                <Formik
                  enableReinitialize
                  initialValues={{
                    course: editingCourse ? editingCourse.name : "",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    if (values.course.trim() !== "") {
                      const newCourse = {
                        name: values.course,
                        code: values.course,
                      };
                      saveCourseToFirebase(newCourse);
                      resetForm();
                      setEditingCourse(null);
                    }
                  }}
                >
                  <Form className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <label>Course:</label>
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
                        className=" bg-white text-[#914272] rounded-[4vw] py-2 px-6 shadow-md hover:bg-gray-200 transition"
                      >
                        {editingCourse ? "Update Course" : "Save Course"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          {/* Right: Saved courses */}
          <div className="">
            <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] p-4 text-black shadow-2xl">
              {savedCourses.length > 0 ? (
                <ul className="space-y-3">
                  {savedCourses.map((course, idx) => (
                    <li
                      key={idx}
                      className="relative bg-white rounded-lg p-3 shadow-md flex items-center justify-between"
                    >
                      <span>{course.name}</span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setMenuOpen(menuOpen === idx ? null : idx)
                          }
                          className="p-1"
                          aria-label="open menu"
                        >
                          <HiDotsVertical className="text-gray-600 text-xl" />
                        </button>

                        {menuOpen === idx && (
                          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md flex flex-col z-50">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCourse(course);
                                setMenuOpen(null);
                              }}
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                            >
                              <FiEdit className="text-gray-600" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deleteCourseFromFirebase(course.code);
                                setMenuOpen(null);
                              }}
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                            >
                              <MdDeleteIcon className="text-gray-600" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
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
