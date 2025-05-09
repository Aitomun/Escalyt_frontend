import PropTypes from "prop-types";
import styles from './text.module.css'

const TextArea = ({ label, setValue, value, placeholder }) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
      </div>
      <textarea
        type="text"
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default TextArea;
