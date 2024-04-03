import React, { useContext } from "react";
import { GeneralContext } from "../../Context/GeneralContext";
import ReactDOM from "react-dom";
import "../../Styles/GeneralStyles/Modal.css"

function Modal({ children, tittle }) {
  const { modalClasses, closeModal } = useContext(GeneralContext);

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className={modalClasses.join(" ")}>
        <button className="CloseButton" onClick={closeModal}>
          &times;
        </button>
        <div className="ModalHeader">
          <h4>{tittle}</h4>
        </div>
        <div className="ModalCard">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export { Modal };