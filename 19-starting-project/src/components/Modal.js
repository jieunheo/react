import React from "react";

const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className='modal'>
      <p>Are you sure?</p>
      <button className='btn btn--alt' onClick={onClose}>Cancel</button>
      <button className='btn' onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default Modal;