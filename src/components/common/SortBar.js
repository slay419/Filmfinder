import React from "react";
import Select from "react-select";

const options = [{ value: "Score", label: "Score" }];

const SortBar = () => {
  const handleSelectChange = () => {
    console.log("hello");
  };

  return (
    <div>
      <Select
        onChange={handleSelectChange}
        options={options}
        styles={{
          control: (styles) => ({
            ...styles,
            height: "30px",
            width: "120px",
            marginLeft: "20px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
          option: (styles) => ({
            ...styles,
            height: "30px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
        }}
      />
    </div>
  );
};

export default SortBar;
