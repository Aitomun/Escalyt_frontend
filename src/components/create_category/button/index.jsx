import PropTypes from "prop-types";
import styles from './button.module.css'

const Button = ({ onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      Confirm
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
