import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const matricRules = /^CPE\/\d{2}\/\d{4}$/;


export const lecturerSchema = yup.object().shape({
  staffEmail: yup
  .string()
  .email("Please enter a valid email")
  .required("Required"),
  Lpassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  LconfirmPassword: yup
    .string()
    .oneOf([yup.ref("Lpassword"), null], "Passwords must match")
    .required("*required"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});

export const studentSchema = yup.object().shape({
   matricNo: yup
    .string()
    .matches(matricRules, { message: "Computer Engineering student only"  })
    .required("*required"),
   fullName: yup.string().required("Full name is required"),
   level: yup.string().required("Level is required"),
   email: yup
   .string()
   .email("Please enter a valid email")
   .required("*required"),   
   password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("*required"),
   confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("*required"), 
   acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});

export const lecturerLoginSchema = yup.object().shape({
  staffEmail: yup
  .string()
  .email("Please enter a valid email")
  .required("Required"),
  Lpassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const studentLoginSchema = yup.object().shape({
   matricNo: yup
    .string()
    .matches(matricRules, { message: "Computer Engineering student only" })
    .required("*required"), 
   password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("*required"),
});
