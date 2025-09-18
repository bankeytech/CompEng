import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, Formik } from 'formik';
import { lecturerSchema, studentSchema } from "../components/advSchema";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import MobilePic from "../assets/images/4219290 1.svg"
import Wave1 from "../assets/images/wave2.png";
import Wave2 from "../assets/images/wave2.svg";

const MobileSignUp = () => {
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showLecturerPassword, setShowLecturerPassword] = useState(false);

  const studentInitialValues = { matricNo: "", email: "", password: "", confirmPassword: "", acceptedTos: false };
  const lecturerInitialValues = { staffEmail: "", Lpassword: "", LconfirmPassword: "", acceptedTos: false };

  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();

  navigate("/");
 };
  return (
    <div className="w-full">
      <Formik               
        initialValues={userType === "student" ? studentInitialValues : lecturerInitialValues}
        validationSchema={userType === "student" ? studentSchema : lecturerSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
      <Form
      className="relative w-full lg:hidden bg-[#914272] text-white min-h-screen
      flex flex-col items-center">

        <div >
          <img src={MobilePic} alt="img" className="md:w-[150vw] rounded-bl-4xl rounded-br-4xl"/>       
        </div>
        

        <div className="flex gap-4 pb-5 mt-[20vw]">
          <button 
              type="button"
              className={`${
              userType === "student" ? "border-2 text-white font-bold text-[5vw] py-2 px-8 rounded-2xl" : "border-1 text-[6vw]  py-2 px-8 rounded-2xl"
              }`}
              onClick={() => setUserType("student")}
          >
              Student
          </button>
          <button 
          type="button"
          className={`${
              userType === "lecturer" ? "border-2 text-white font-bold text-[5vw] py-2 px-8 rounded-2xl" : "border-1 text-[6vw] py-2 px-8 rounded-2xl"
              }`}
              onClick={() => setUserType("lecturer")}
          >
              Lecturer
          </button>
        </div>

        <div className='flex flex-col items-center justify-center py-4'>
          <h2 className='text-5xl font-extrabold pb-4'>Login</h2>
          <h6 className='text-white/90 text-[2.5vw]'>Enter your UTME[Fresher]/Matric No below.</h6>
        </div>

        <div className='pt-5 flex flex-col w-[68%]'>
          {userType === "student" ? (
            <div className="flex flex-col gap-4">
              <CustomInput
                name="matricNo"
                type="text"
                placeholder="UTME or Matric Number"                    
              />

              <div className="relative ">
              <CustomInput 
                name="password" 
                type={showStudentPassword ? "text": "password"} 
                placeholder='Password'
              />

              <button
                type="button"
                onClick={() => setShowStudentPassword((v) => !v)}
                aria-label={showStudentPassword ? "Hide password" : "Show password"}
                title={showStudentPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
              >
                {showStudentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          
        </div>         

          ) : (

        <div className="flex flex-col gap-4">

          <CustomInput         
            name="staffEmail"
            type="email"
            placeholder="Staff Email Address"
          />

          <div className="relative">
            <CustomInput 
              name="Lpassword" 
              type={showLecturerPassword ? "text": "password"} 
              placeholder='Password'
          />

            <button
              type="button"
              onClick={() => setShowLecturerPassword((v) => !v)}
              aria-label={showLecturerPassword ? "Hide password" : "Show password"}
              title={showLecturerPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
            >
              {showLecturerPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
                            
        </div>
            
          )}
                
            <span className='pt-6 pb-4 flex items-center text-[2.9vw] text-white/60'>
              Forgot Password?                   
            </span>
          </div>
         <div className='py-[3vw] mb-[5vw]'>
            <button 
            disabled={isSubmitting}
            type="submit" 
            className='bg-black py-4 px-30 text-white rounded-xl font-bold '>
            {isSubmitting ? "Please Wait..." : "Login"}
            </button> 
          </div>

          <div className="absolute bottom-[0.7vw] mt-7">
            <a className='text-[12px]'>
              2025 © FUTA Department of Computer Engineering
            </a>
          </div>
      </Form>  
        )}
      </Formik>
    </div>
  )
}

export default MobileSignUp