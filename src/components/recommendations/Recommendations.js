import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import MovieContext from "../../context/movie/movieContext";

import "../../styles/Recommendations.scss";
import RecommendationSlide from "./RecommendationSlide";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
};

const Recommendations = ({ id }) => {
  const movieContext = useContext(MovieContext);
  const { getRecommendations, recommendations, movie } = movieContext;

  useEffect(() => {
    if (id) {
      getRecommendations(id);
    }
  }, [id]);

  return (
    <div>
      <h1>Recommendations</h1>
      {recommendations === null ? (
        <></>
      ) : (
        <Slider {...sliderSettings}>
          {recommendations.map((rec) => {
            return <RecommendationSlide movie={rec} key={rec.movie_id} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default Recommendations;
