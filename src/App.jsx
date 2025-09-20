import { Routes, Route } from "react-router-dom";
import StudentSignUp from './components/StudentSignUp'
import StudentLogin from './/components/StudentLogin'
import MobileSignUp from "./components/MobileSignUp";
import MobileLogin from "./components/MobileLogin";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/StudentSignUp" element={<StudentSignUp />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/MobileSignUp" element={<MobileSignUp />} />
      <Route path="/MobileLogin" element={<MobileLogin/>} />
      <Route path="/Dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App