import { Routes, Route } from "react-router-dom";
import StudentSignUp from './components/StudentSignUp'
import StudentLogin from './/components/StudentLogin'
import MobileSignUp from "./components/MobileSignUp";
import MobileLogin from "./components/MobileLogin";
import Home from "./components/Home"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/MobileSignUp" element={<MobileSignUp />} />
      <Route path="/MobileLogin" element={<MobileLogin/>} />
    </Routes>
  )
}

export default App