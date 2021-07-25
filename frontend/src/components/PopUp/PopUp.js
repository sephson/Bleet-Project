import React from "react";
import "./PopUp.css";

const PopUp = ({ content, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        {content}
      </div>
    </div>
  );
};

export default PopUp;
