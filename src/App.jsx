import { Routes, Route } from "react-router-dom";
import StudentSignUp from './components/StudentSignUp'
import StudentLogin from './/components/StudentLogin'
import MobileSignUp from "./components/MobileSignUp";
import MobileLogin from "./components/MobileLogin";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable"
import PersonalInfo from "./components/PersonalInfo"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalInfo/>} />
      <Route path="/StudentSignUp" element={<StudentSignUp />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/MobileSignUp" element={<MobileSignUp />} />
      <Route path="/MobileLogin" element={<MobileLogin/>} />
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Timetable" element={<Timetable/>}/>
      <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
    </Routes>
  )
}

export default App