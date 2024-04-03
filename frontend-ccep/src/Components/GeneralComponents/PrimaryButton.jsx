import React from "react";
import "../../Styles/GeneralStyles/PrimaryButton.css";

function PrimaryButton({ icon, text, execute }) {

  return (
    <button onClick={execute} className="primary-button">
      <i className={icon}></i>
      {text}
    </button>
  );
}

export { PrimaryButton };