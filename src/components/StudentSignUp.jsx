import { useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram, } from 'react-icons/fa6'
import SidePic from "../assets/images/4219290 1.svg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, Formik } from 'formik';
import { lecturerSchema, studentSchema } from "../components/advSchema";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";




const StudentSignUp = () => {
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
    <div className='w-full h-screen'>
      <div className='flex flex-wrap lg:flex-row-reverse '>
            <div className='relative w-full lg:w-[45%] bg-[#F1F6F9] lg:pt-15 pt-6 md:pt-14 hidden lg:block md:block'>
              <div className="ml-8 md:ml-12">
                <h2 className='text-5xl font-extrabold'>
                    Welcome to <br />Computer Engineering
                </h2>
                <h6 className='text-5xl p-0 md:py-2'>Student Portal</h6>
                <h6 className='text-0.5xl text-black/70'>Login to access your account</h6>
              </div>

              <div className='flex gap-4 text-3xl ml-12 mt-4 lg:flex md:hidden'>
                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='LinkedIn'>
                <FaFacebookSquare/>
                </a>

                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='GitHub'>
                <FaInstagram/>
                </a>
                
                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='Instagram'>                
                <FaTwitterSquare/>
                </a>

                <a href="#" 
                target='_blank' 
                rel='noopener noreferrer' 
                aria-label='Twitter'>
                <FaLinkedin/>                
                </a>
             </div>
             <div className=" lg:hidden flex gap-5 items-center justify-center mt-6 absolute md:ml-12">
                <Link 
                to="/MobileSignUp"
                className="py-2 px-15 rounded-[8vw] font-bold text-[3vw] bg-[#914272] text-white ">
                  Sign Up
                </Link>

                <Link 
                to="/StudentLogin"
                className="py-2 px-17 rounded-[8vw] font-bold text-[3vw] border-2 border-[#914272] text-[#914272]">
                  Login
                </Link>
              </div>  
             <img src={SidePic} alt="img" className='w-full'/>
            </div>


            {/* MOBILE  */}

            <div className='relative w-full h-[100vh] bg-[#F1F6F9] lg:hidden md:hidden flex flex-col items-center justify-center'>
              <div className="flex flex-col items-center justify-center text-center absolute top-30">
                <h2 className='text-[14vw] leading-[14vw] font-extrabold p-3'>
                    Welcome to Computer Engineering
                </h2>
                <h6 className='text-[9vw] leading-[9vw] p-3'>Student Portal</h6>
                <h6 className='text-[3vw] text-black/70 p-3'>Login to access your account</h6>
              </div>

              <div className=" absolute bottom-[0vw] md:top-1">
                  <img src={SidePic} alt="img" className='w-full'/>
              </div>             
                
              <div className="flex flex-col gap-5 items-center justify-center mt-15 absolute top-[90vw]">
                <Link 
                to="/MobileSignUp"
                className="border-2 border-[#914272] py-4 px-25 text-[#914272] rounded-[8vw] font-bold text-[5vw]">
                  Sign Up
                </Link>

                <Link 
                to="/MobileLogin"
                className="bg-[#914272] py-4 px-27 text-white rounded-[8vw] font-bold text-[5vw]">
                  Login
                </Link>
              </div>            

             <div className="absolute bottom-3">
                <a className='text-[12px]'>
                 2025 © FUTA Department of Computer Engineering
                </a>
              </div>
             
            </div>

              {/* DESKTOP */}

              <Formik               
                initialValues={userType === "student" ? studentInitialValues : lecturerInitialValues}
                validationSchema={userType === "student" ? studentSchema : lecturerSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
              {({ isSubmitting }) => (
            <Form
            className="relative w-full lg:w-[55%] bg-[#914272] lg:pt-25 pt-6 text-white pb-20 lg:pb-0 hidden lg:block md:hidden">
             <div className='lg:pl-40 pl-8'>
              <h2 className='text-5xl font-extrabold pb-2'>Sign Up</h2>
              <h6 className='text-white/90'>Fill in the Correct details below.</h6>
             </div>

             <div className="flex gap-3 pl-40 pt-5">
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

             <div className='pt-5 flex flex-col w-[68%] lg:pl-40 pl-8'>
               {userType === "student" ? (
                <div className="">
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
                <div className="">

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
              <div className='lg:pl-40 pl-8'>
                <button 
                disabled={isSubmitting}
                type="submit" 
                className='bg-white py-2 px-30 text-black rounded-xl font-bold mt-5'>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
               </button> 
              </div>

              <div className="absolute bottom-[0.7vw] pl-25">
                <a className='text-[12px]'>
                 2025 © FUTA Department of Computer Engineering
                </a>
              </div>
            </Form>  
             )}
           </Formik>
      </div>  
    </div>
  )
}

export default StudentSignUp