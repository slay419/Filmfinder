import React, { useContext } from "react";
import MoviesContext from "../../context/moviesList/moviesContext";
import Select from "react-select";

const options = [{ value: "Score", label: "Score" }];

const SortBar = () => {
  const moviesContext = useContext(MoviesContext);
  const { sortByScore } = moviesContext;
  //const [isSorted, setIsSorted] = useState(false);

  const handleSelectChange = (selected) => {
    if (selected.value === "Score") {
      sortByScore();
    }
  };

  return (
    <div className="sort-bar">
      <Select
        onChange={handleSelectChange}
        placeholder={"Sort"}
        options={options}
        styles={{
          control: (styles) => ({
            ...styles,
            height: "30px",
            width: "120px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
          option: (styles) => ({
            ...styles,
            display: "inline-block",
            height: "30px",
            width: "120px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
        }}
      />
    </div>
  );
};

export default SortBar;
