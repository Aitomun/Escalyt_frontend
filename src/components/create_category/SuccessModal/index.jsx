import Button from "../button";
import logo from "../../../assets/logo.svg";
import closeIcon from "../../../assets/x-close.svg";
import PropTypes from "prop-types";
import styles from './success.module.css'

const Modal = ({ closeModal }) => {
  return (
    <div
      className={styles.overlay}
      onClick={closeModal}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeIcon}
          onClick={closeModal}
        >
          <img src={closeIcon} alt="Close" className="w-5 h-5" />
        </button>
        <img src={logo} alt="Success" className="mx-auto" />
        <h5 className={styles.modalHeader}>
          Category Created Successfully
        </h5>
        <p className={styles.modalParagraph}>
          Your new ticket category has been created and is now available for use.
          You can start assigning tickets to this category immediately.
        </p>
        <Button onClick={closeModal} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
