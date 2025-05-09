import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      Submit
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;