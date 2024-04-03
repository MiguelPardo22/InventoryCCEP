import React from "react";
import "../../Styles/GeneralStyles/DangerButton.css";

function DangerButton({ text, icon, execute }) {
  return (
    <button onClick={execute} className="danger-button">
      <i className={icon}></i>
      {text}
    </button>
  );
}

export { DangerButton };