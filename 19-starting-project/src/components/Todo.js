import React, { useState } from "react";

import Modal from "./Modal";
import Backdrop from "./Backdrop";

const Todo = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);

  const deleteHandler = () => {
    setOpenModal(true);
  }
  const closeModalHandler = () => {
    setOpenModal(false);
  }

  return (
    <div className='card'>
      <h2>{title}</h2>
      <div className='actions'>
        <button className='btn' onClick={deleteHandler}>Delete</button>
      </div>
      {openModal && <Modal onClose={closeModalHandler} onConfirm={closeModalHandler} />}
      {openModal && <Backdrop onClose={closeModalHandler} />}
    </div>
  );
}

export default Todo;