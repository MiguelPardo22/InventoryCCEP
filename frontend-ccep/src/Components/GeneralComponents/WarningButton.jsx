import React from "react";
import "../../Styles/GeneralStyles/WarningButton.css";

function WarningButton({ text, icon, execute }) {
  return (
    <button onClick={execute} className="warning-button">
      <i className={icon}></i>
      {text}
    </button>
  );
}

export { WarningButton };