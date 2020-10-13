import React from "react";
import spinner from "./spinner.gif";
import "../../styles/Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <img className="spinner" src={spinner} alt="loading..." />
    </div>
  );
};

export default Spinner;
