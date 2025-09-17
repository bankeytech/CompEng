import { useField } from "formik";

const checkClass ="my-checkbox ml-3"

const CustomCheckbox = ({...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex items-center gap-2">
      <div className="checkbox">
        <input
          {...field}
          {...props}
          type="checkbox"
          checked={field.value}
          className={`{meta.touched && meta.error ? "input-error" : ""} ${checkClass}`}
        />
        {/* <span>I accept the terms of service</span> */}
      </div>

      <div className="">
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </div>
    </div>
  );
};
export default CustomCheckbox;