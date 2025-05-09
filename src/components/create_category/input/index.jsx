import PropTypes from "prop-types";
import styles from './input.module.css'


const TextInput = ({ label, setValue, value, placeholder }) => {
  return (
    
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
      </div>
      <input
        type="text"
        className={styles.input}
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
