import PropTypes from "prop-types";
const TextInput = ({ label, setValue, value, placeholder }) => {
  return (
    <div className="my-3 relative">
      <div className="font-light my-2  flex items-center justify-start text-dark">
        {label}
      </div>
      <input
        type="text"
        className="px-2 w-full border-solid border-[1.5px] border-gray text-dark
        focus:outline-none focus:border-primary py-2 bg-white"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default TextInput;