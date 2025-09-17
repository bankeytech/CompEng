import { useField } from "formik";

const InputClass = "border-b-1 border-white/80 pb-2 placeholder:text-white/80 py-2 outline-none focus:ring-0 w-full "

const CustomInput = ({...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      
      <input
        {...field}
        {...props}
        className={`{meta.touched && meta.error ? "input-error" : ""} ${InputClass}`}
        
      />
      <div className="flex items-center justify-end">
        {meta.touched && meta.error && <div className="error text-[0.8vw]">{meta.error}</div>}
      </div>
    </>
  );
};
export default CustomInput;
