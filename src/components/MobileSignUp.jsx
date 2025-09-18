import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, Formik } from 'formik';
import { lecturerSchema, studentSchema } from "../components/advSchema";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";

const MobileSignUp = () => {
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showLecturerPassword, setShowLecturerPassword] = useState(false);
  const [showLecturerConfirmPassword, setShowLecturerConfirmPassword] = useState(false);

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
    <div>
      <Formik               
        initialValues={userType === "student" ? studentInitialValues : lecturerInitialValues}
        validationSchema={userType === "student" ? studentSchema : lecturerSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
      <Form
      className="relative w-full lg:hidden bg-[#914272] text-white h-screen 
      flex flex-col items-center justify-center ">
        <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[12vw] font-extrabold pb-2'>Sign Up</h2>
        <h6 className='text-white/90 text-[4vw]'>Fill in the Correct details below.</h6>
        </div>

        <div className="flex gap-3 pt-5">
          <button 
            type="button"
            className={`${
            userType === "student" ? "border-b-3 text-white font-bold" : " "
            }`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button 
          type="button"
          className={`${
            userType === "lecturer" ? "border-b-3 text-white font-bold" : " "
            }`}
            onClick={() => setUserType("lecturer")}
          >
            Lecturer
          </button>
        </div>

        <div className='pt-5 flex flex-col w-[68%]'>
          {userType === "student" ? (
          <div className="flex flex-col gap-3">
            <CustomInput
              name="matricNo"
              type="text"
              placeholder="UTME or Matric Number"                    
            />
            
            <CustomInput         
              name="email"
              type="email"
              placeholder="Email Address"
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
          
          <div className="relative">
            <CustomInput
              name="confirmPassword"
              type={showStudentConfirmPassword ? "text": "password"} 
              placeholder='Confirm Password'
            />

            <button
              type="button"
              onClick={() => setShowStudentConfirmPassword((v) => !v)}
              aria-label={showStudentConfirmPassword ? "Hide password" : "Show password"}
              title={showStudentConfirmPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
            >
              {showStudentConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          </div>              
          ) : (
          <div className="flex flex-col gap-3">

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
            
            <div className="relative">
              <CustomInput
                name="LconfirmPassword"
                type={showLecturerConfirmPassword ? "text": "password"} 
                placeholder='Confirm Password'
              />

              <button
                type="button"
                onClick={() => setShowLecturerConfirmPassword((v) => !v)}
                aria-label={showLecturerConfirmPassword? "Hide password" : "Show password"}
                title={showLecturerConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 -right-2 flex items-center justify-center px-2 text-lg select-none"
              >
                {showLecturerConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

          </div>
            
          )}
          
          <span className='py-4 flex items-center text-[10px] text-white/60'>
            Are you a robot? Verify here! 
            <CustomCheckbox 
              name="acceptedTos" 
              type="checkbox"                     
            />
          </span>
        </div>
        <div className=''>
          <button 
          disabled={isSubmitting}
          type="submit" 
          className='bg-white py-2 px-[30vw] text-black rounded-xl font-bold mt-5'>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button> 
        </div>

        <div className="absolute bottom-[7vw] ">
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