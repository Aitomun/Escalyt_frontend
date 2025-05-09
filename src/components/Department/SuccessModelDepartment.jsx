import Button from "./ButtonDepartment";
import Tick from "../../assets/Tick.svg";
import closeIcon from "../../assets/x-close.svg";
import PropTypes from "prop-types";

const Modal = ({ closeModal }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-[300px] bg-white rounded p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 p-2"
          onClick={closeModal}
        >
          <img src={closeIcon} alt="Close" className="w-5 h-5" />
        </button>
        <img src={Tick} alt="Success" className="mx-auto" />
        <h5 className="text-dark text-left font-medium my-4">
          Department Created Successfully
        </h5>
      
        <Button onClick={closeModal} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;