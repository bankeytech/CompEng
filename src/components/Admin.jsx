// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Elic1 from "../assets/images/Ellipse 3.svg";
import { FiMaximize2, FiEdit } from "react-icons/fi";
import { onSnapshot } from "firebase/firestore";

const Sid =
  "focus:outline-none border-b border-white text-gray-800 flex mb-4 w-[20vw]";
const Fid =
  "lg:w-[22vw] w-[38vw] py-3 pl-4 pr-1 text-black rounded-[4vw] focus:outline-none bg-gray-100 appearance-none";

function AdminPage({ user }) {
  const [role, setRole] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [semesterId, setSemesterId] = useState("");
  const [GPA, setGPA] = useState("");
  const [grades, setGrades] = useState({});
  const [aboutMe, setAboutMe] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Check if logged-in user is admin
  useEffect(() => {
    const checkRole = async () => {
      if (!user?.uid) return;
      const docRef = doc(db, "students", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setRole(snap.data().role || "student");
      }
    };
    checkRole();
  }, [user]);

  // Load all students
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    };
    fetchStudents();
  }, []);

  // 🔹 Load once + subscribe to changes
  useEffect(() => {
    if (!user?.uid) return;

    const ref = doc(db, "admins", user.uid);

    // 👇 Listen for changes so About Me reloads after refresh
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setAboutMe(snap.data().aboutMe || "");
      }
    });

    return () => unsub();
  }, [user]);

  const saveAboutMe = async () => {
    if (!user?.uid) return;
    try {
      const ref = doc(db, "admins", user.uid);
      // 👇 merge:true so we don’t overwrite other fields (like email, role)
      await setDoc(ref, { aboutMe, role: "admin" }, { merge: true });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving aboutMe:", err);
    }
  };


  // Load courses for selected student
  const handleSelectStudent = async (uid) => {
    setSelectedStudent(uid);
    const snapshot = await getDocs(collection(db, "students", uid, "courses"));
    const data = snapshot.docs.map((doc) => doc.data());
    setCourses(data);
  };

  // Send result to student
  const handleSendResult = async () => {
    if (!selectedStudent || !semesterId || !GPA) {
      alert("Please fill in Semester ID and GPA.");
      return;
    }

    try {
      await setDoc(doc(db, "students", selectedStudent, "results", semesterId), {
        GPA,
        grades,
        createdAt: new Date(),
      });
      alert("✅ Result sent successfully!");
    } catch (err) {
      console.error("Error sending result:", err);
    }
  };

  // Update grade
  const handleGradeChange = (courseCode, grade) => {
    setGrades({ ...grades, [courseCode]: grade });
  };

  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-red-600 text-2xl font-bold">
          🚫 Access Denied – Admins only
        </h2>
      </div>
    );
  }

  

  return (
   <div>
     <div className="lg:flex md:flex gap-8 p-10 hidden">

      <div className="w-[33%]">
        <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] flex flex-col items-center justify-between p-1 text-white shadow-2xl focus:shadow-lg">
          <div className="flex flex-col w-full px-4 pt-4 gap-6">
            <div className="bg-white rounded-2xl text-black p-5">
              <div className="flex justify-end">
                <FiMaximize2 />
              </div>
              <div className="relative flex flex-col items-center justify-center">
                <img src={Elic1} alt="img" />
                <span className="absolute right-[3vw] -bottom-[1vw] w-16 h-16 flex items-center justify-center text-3xl bg-black text-white rounded-4xl font-thin">
                  +
                </span>
              </div>
              <div className="py-8 flex flex-col items-center justify-center">
                <h3 className="font-bold text-[1.6vw]">Exam Office</h3>
                <h3 className="rounded-[4vw] bg-gray-100 px-8 py-2 shadow-lg focus:shadow-lg">
                  Admin
                </h3>
              </div>
            </div>

            {/* <div className="bg-white rounded-2xl text-black p-5 h-[81vh]">
              <div className="flex justify-between font-semibold">
                <h3>About Me</h3>
                <FiEdit />
              </div>
              <div className="pt-2">
                <textarea
                  rows={8}
                  className="rounded-[0.7vw] border-2 border-gray-100 placeholder:text-[1.1vw] p-2"
                  placeholder="Enter admin notes here..."
                ></textarea>
              </div>
            </div> */}

            <div className="bg-white rounded-2xl text-black p-5 h-[81vh]">
              <div className="flex justify-between font-semibold">
                <h3>About Me</h3>
                <FiEdit
                  className="cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
              </div>

              <div className="pt-2">
                <textarea
                  rows={8}
                  className="rounded-[0.7vw] border-2 border-gray-100 placeholder:text-[1.1vw] p-2 w-full"
                  placeholder="Enter admin notes here..."
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  readOnly={!isEditing}
                  onBlur={saveAboutMe}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-[67%] bg-[#914272] p-10 rounded-[1.1vw]">
        <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] flex flex-col items-center justify-between p-4 text-white shadow-2xl w-full">
          <h2 className="font-bold text-[3vw]">Admin Panel</h2>

          {/* Student Selector */}
          <h3 className="text-[1.5vw]">Select Student</h3>
          <select
            className={`${Fid}`}
            onChange={(e) => handleSelectStudent(e.target.value)}
          >
            <option value="">-- Choose Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.matricNo})
              </option>
            ))}
          </select>

          {selectedStudent && (
            <>
              <h3 className="font-bold text-[1.5vw] py-4">Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.code || course.id} className=" bg-opacity-10 p-4 rounded-lg">
                  <label className="block text-white text-sm font-medium mb-2">
                    {course.name || course.courseName} ({course.code || course.courseCode})
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 bg-opacity-20 border border-white border-opacity-30 rounded text-white
                    placeholder-white placeholder-opacity-60 focus:outline-none "
                    placeholder="Enter Grade"
                    value={grades[course.code] || ""}
                    onChange={(e) => handleGradeChange(course.code, e.target.value)}
                  />
                </div>
              ))}
            </div>

              <h3 className="font-bold text-[1.3vw] py-5">Enter Result</h3>
              <input
                className={Sid}
                placeholder="Semester ID (e.g., 2023-2024-1st)"
                value={semesterId}
                onChange={(e) => setSemesterId(e.target.value)}
              />
              <input
                className={Sid}
                placeholder="GPA"
                value={GPA}
                onChange={(e) => setGPA(e.target.value)}
              />

              <button
                onClick={handleSendResult}
                className="mt-4 bg-white text-[#914272] font-bold px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Send Result
              </button>
            </>
          )}
        </div>
      </div>
    </div>

    {/* MOBILE SECTION */}

     <div className="flex flex-col gap-8 p-6  lg:hidden md:hidden">

      <div className="">
        <div className="container bg-[#7D7D7D]/20 rounded-[1.1vw] flex flex-col items-center justify-between p-1 text-white shadow-2xl focus:shadow-lg">
          <div className="flex flex-col w-full px-4 pt-4 gap-6">
            <div className="bg-white rounded-2xl text-black p-5">
              <div className="flex justify-end">
                <FiMaximize2 />
              </div>
              <div className="relative flex flex-col items-center justify-center">
                <img src={Elic1} alt="img" />
                <span className="absolute right-[10vw] -bottom-[1vw] w-16 h-16 flex items-center justify-center text-3xl bg-black text-white rounded-4xl font-thin">
                  +
                </span>
              </div>
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <h3 className="font-bold text-[7.6vw]">Exam Office</h3>
                <h3 className="rounded-[4vw] bg-gray-100 px-8 py-2 shadow-lg focus:shadow-lg text-[5.6vw]">
                  Admin
                </h3>
              </div>
            </div>

            
            <div className="bg-white rounded-2xl text-black p-5">
              <div className="flex justify-between font-semibold text-[5vw] ">
                <h3>About Me</h3>
                <FiEdit
                  className="cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
              </div>

              <div className="pt-2">
                <textarea
                  rows={8}
                  className="rounded-[0.7vw] border-2 border-gray-100 placeholder:text-[3.2vw] p-2 w-full"
                  placeholder="Enter admin notes here..."
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  readOnly={!isEditing}
                  onBlur={saveAboutMe}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className=" bg-[#914272] p-5 rounded-[1.1vw]">
        <div className="container bg-[#7D7D7D]/20 rounded-[3.1vw] flex flex-col items-center justify-between p-4 text-white shadow-2xl w-full">
          <h2 className="font-bold text-[5vw]">Admin Panel</h2>

          {/* Student Selector */}
          <h3 className="text-[3.5vw]">Select Student</h3>
          <select
            className={Fid}
            onChange={(e) => handleSelectStudent(e.target.value)}
          >
            <option value="">-- Choose Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.matricNo})
              </option>
            ))}
          </select>

          {selectedStudent && (
            <>
              <h3 className="font-bold text-[3.5vw] py-4">Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.code || course.id} className=" bg-opacity-10 p-4 rounded-lg">
                  <label className="block text-white text-sm font-medium mb-2">
                    {course.name || course.courseName} ({course.code || course.courseCode})
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 bg-opacity-20 border border-white border-opacity-30 rounded text-white
                    placeholder-white placeholder-opacity-60 focus:outline-none "
                    placeholder="Enter Grade"
                    value={grades[course.code] || ""}
                    onChange={(e) => handleGradeChange(course.code, e.target.value)}
                  />
                </div>
              ))}
            </div>

              <h3 className="font-bold text-[3vw] py-5">Enter Result</h3>
              <input
                className={Sid}
                placeholder="Semester ID (e.g., 2023-2024-1st)"
                value={semesterId}
                onChange={(e) => setSemesterId(e.target.value)}
              />
              <input
                className={Sid}
                placeholder="GPA"
                value={GPA}
                onChange={(e) => setGPA(e.target.value)}
              />

              <button
                onClick={handleSendResult}
                className="mt-4 bg-white text-[#914272] font-bold px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Send Result
              </button>
            </>
          )}
        </div>
      </div>
    </div>
   </div>
  );
}

export default AdminPage;