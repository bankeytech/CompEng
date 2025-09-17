import { Form, Formik } from "formik";
import { studentSchema } from "../components/advSchema";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import { useNavigate } from "react-router-dom";



const StudentLogin = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();

  navigate("/");
 };
  

  
  return (
    <Formik
      
      initialValues={{ matricNo: "", email:"", staffEmail:"", password:"",
         confirmPassword:"", jobType: "", acceptedTos: false }}
      validationSchema={studentSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form
         className="w-full h-screen flex flex-col items-center justify-center"
        >
          <div 
             className="border-2 border-red-700 flex flex-col items-center justify-center"
          >
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
          <CustomInput            
            name="staffEmail"
            type="email"
            placeholder="Staff Email Address"
          />
          <CustomInput           
            name="password"
            type="password"
            placeholder="Enter your password "
          />
          <CustomInput            
            name="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
          />
          <CustomCheckbox type="checkbox" name="acceptedTos" />
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
          </div>
          
        </Form>
      )}
    </Formik>
  );
};
export default StudentLogin;