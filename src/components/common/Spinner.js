import React from "react";
import spinner from "./spinner.gif";
import "../../styles/Spinner.scss";

const Spinner = () => {
  return <img className="spinner" src={spinner} alt="loading..." />;
};

export default Spinner;
