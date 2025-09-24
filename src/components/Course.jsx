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
import FutaLogo from "../assets/images/Federal-University-of-Technology-Akure-FUTA-Logo.svg"

const Fid =
  "w-[22vw] py-3 px-5 text-sm rounded-[4vw] focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 shadow-lg focus:shadow-md transition duration-200";

  const Bbt = "flex flex-col items-center justify-center py-22 font-bold"
export default function Course() {
  // <-- CHANGE THIS to true if you want sessionStorage (tab-only). 
  // Set to false to use localStorage (persists across browser restarts).
  const useSession = false;

  // Initialize state from storage synchronously (prevents overwrite race)
  const [savedCourses, setSavedCourses] = useState(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = (useSession ? sessionStorage : localStorage).getItem(
        "savedCourses"
      );
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("Could not read savedCourses from storage:", err);
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  // Save to storage whenever savedCourses changes
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      (useSession ? sessionStorage : localStorage).setItem(
        "savedCourses",
        JSON.stringify(savedCourses)
      );
    } catch (err) {
      console.error("Could not write savedCourses to storage:", err);
    }
  }, [savedCourses, useSession]);

  // Safe setter that also fixes editing/menu state if indexes become invalid
  const safeSetSavedCourses = (updater) => {
    setSavedCourses((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (editingIndex != null && (editingIndex < 0 || editingIndex >= next.length)) {
        setEditingIndex(null);
      }
      setMenuOpen((m) => (m != null && m >= next.length ? null : m));
      return next;
    });
  };

  const profile = useStudentProfile();
      if (!profile) return <p className={`${Bbt}`}><img src={FutaLogo} alt="img" className='w-[10vw]' /> Loading...</p>;

  return (
    <div className="relative p-10 flex">
      {/* Sidebar */}
      <div className="relative hidden lg:flex">
        <header className="relative px-4 pr-13 py-8 text-gray-800 bg-[#914272] rounded-3xl ">
          <div className="container flex flex-col gap-10 mx-[2vw]">
            <img src={TopPic} alt="img" className="w-[10vw]" />
            <ul className="hidden lg:flex flex-col gap-4 justify-start">
              {[
                { path: "/Dashboard", label: "Dashboard" },
                { path: "/PersonalInfo", label: "Personal Info" },
                { path: "/Course", label: "Courses", active: true },
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
          <div className="flex flex-col w-[60%]">
            <div className="bg-[#914272] rounded-[1.1vw] px-5 py-2 pl-7 text-white pb-8">
              <div className="flex flex-col w-full">
                <div className="pb-4">
                  <h4 className="flex items-center justify-between text-[1.5vw]">
                    Course Info
                    <HiOutlineDotsHorizontal />
                  </h4>
                  <h6 className="text-[0.9vw] font-thin">
                    Enter your Registered Course for the semester here
                  </h6>
                </div>

                <Formik
                  enableReinitialize
                  initialValues={Object.fromEntries(
                    Array.from({ length: 8 }, (_, i) => [
                      `course${i + 1}`,
                      i === 0 && editingIndex !== null && savedCourses[editingIndex] != null
                        ? savedCourses[editingIndex]
                        : "",
                    ])
                  )}
                  onSubmit={(values, { resetForm }) => {
                    try {
                      const filtered = Object.values(values).filter((c) => c && c.trim() !== "");
                      if (editingIndex !== null && filtered[0] !== undefined) {
                        // update single course at editingIndex using course1
                        safeSetSavedCourses((prev) => {
                          const next = [...prev];
                          next[editingIndex] = filtered[0];
                          return next;
                        });
                        setEditingIndex(null);
                      } else if (filtered.length > 0) {
                        // append new courses
                        safeSetSavedCourses((prev) => [...prev, ...filtered]);
                      }
                    } catch (err) {
                      console.error("submit error:", err);
                    } finally {
                      resetForm();
                      setMenuOpen(null);
                    }
                  }}
                >
                  <Form className="flex flex-col gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div className="flex gap-2" key={i}>
                        <label>{i + 1}.</label>
                        <Field
                          id={`course${i + 1}`}
                          name={`course${i + 1}`}
                          placeholder={`Course ${i + 1}`}
                          className={Fid}
                        />
                      </div>
                    ))}

                    <div className="flex items-center justify-center mt-3">
                      <button
                      type="submit"
                      className="w-[18vw] bg-white text-[#914272] rounded-[4vw] py-2 px-6 shadow-md hover:bg-gray-200 transition"
                      >
                        {editingIndex !== null ? "Update Course" : "Submit"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          {/* Right: Saved courses (3-dot menu with edit/delete) */}
          <div className="w-[40%]">
            <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] p-4 text-black shadow-2xl">
              {savedCourses.length > 0 ? (
                <ul className="space-y-3">
                  {savedCourses.map((course, idx) => (
                    <li
                      key={idx}
                      className="relative bg-white rounded-lg p-3 shadow-md flex items-center justify-between"
                    >
                      <span className="break-words pr-4">{course}</span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setMenuOpen(menuOpen === idx ? null : idx)}
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
                                setEditingIndex(idx);
                                setMenuOpen(null);
                              }}
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                            >
                              <FiEdit className="text-gray-600" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                safeSetSavedCourses((prev) => prev.filter((_, i) => i !== idx));
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
