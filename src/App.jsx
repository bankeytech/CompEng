import { Routes, Route } from "react-router-dom";
import StudentSignUp from './components/StudentSignUp'
import StudentLogin from './/components/StudentLogin'
import MobileSignUp from "./components/MobileSignUp";
import MobileLogin from "./components/MobileLogin";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable"
import PersonalInfo from "./components/PersonalInfo"
import Course from "./components/Course"
import Result from "./components/Result"
import Admin from "./components/Admin"
import MobileDashboard from "./components/MobileDashboard"
import MobilePersonalInfo from "./components/MobilePersonalInfo"
import MobileCourse from "./components/MobileCourse";
import MobileResult from "./components/MobileResult";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/StudentSignUp" element={<StudentSignUp />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/MobileSignUp" element={<MobileSignUp />} />
      <Route path="/MobileLogin" element={<MobileLogin/>} />
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Timetable" element={<Timetable/>}/>
      <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
      <Route path="/Course" element={<Course/>}/>
      <Route path="/Result" element={<Result/>} />
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/MobileDashboard" element={<MobileDashboard/>} />
      <Route path="/MobilePersonalInfo" element={<MobilePersonalInfo/>} />
      <Route path="/MobileCourse" element={<MobileCourse/>}/>
      <Route path="/MobileResult" element={<MobileResult/>} />
    </Routes>
  )
}

export default App