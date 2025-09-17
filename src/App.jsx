import { Routes, Route } from "react-router-dom";
import StudentSignUp from './components/StudentSignUp'
import StudentLogin from './/components/StudentLogin'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentSignUp />} />
      <Route path="/StudentSignUp" element={<StudentLogin />} />
    </Routes>
  )
}

export default App