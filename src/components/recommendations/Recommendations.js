import React, { useContext, useEffect } from "react";

// Components
import RecommendationSlide from "./RecommendationSlide";

// Context
import MovieContext from "../../context/movie/movieContext";

// Styling
import Slider from "react-slick";
import "../../styles/Recommendations.scss";

// slider style settings
const sliderSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
};

const Recommendations = ({ id }) => {
  // using the movie context
  const movieContext = useContext(MovieContext);
  const { getRecommendations, recommendations } = movieContext;

  // on load, get the similar movies
  useEffect(() => {
    if (id) {
      getRecommendations(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>Recommendations</h1>
      <br />
      <br />
      {recommendations === null ? (
        <></>
      ) : (
        // If the recomendations are not null, show the slider with recommended movies
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
