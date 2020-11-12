import React from "react";
import SortBar from "./SortBar";
import FilterRatingBar from "./FilterRatingBar";
import FilterYearBar from "./FilterYearBar";
import "../../styles/SortAndFilterBar.scss";

const SortAndFilterBar = () => {
  return (
    <div className="sort-and-filter">
      <div className="filter-bar">
        <FilterYearBar />
        <FilterRatingBar />
      </div>
      <SortBar />
    </div>
  );
};

export default SortAndFilterBar;
