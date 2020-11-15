import React, { useContext, useEffect } from "react";

// Components
import RecommendationSlide from "./RecommendationSlide";

// Context
import MovieContext from "../../context/movie/movieContext";

// Styling
import Slider from "react-slick";
import "../../styles/Recommendations.scss";


const Recommendations = ({ id }) => {
  // using the movie context
    // slider style settings
  var sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };


  const movieContext = useContext(MovieContext);
  const { getRecommendations, recommendations } = movieContext;


  // on load, get the similar movies
  useEffect(() => {
    if (id) {
      getRecommendations(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

    if (recommendations !== null && recommendations.length < 3){
      sliderSettings.slidesToShow = recommendations.length;
    } else {
      sliderSettings.slidesToShow = 3;
    }
 

  return (
    <div>
      <h2>Recommendations</h2>
      <br />
      <br />
      {recommendations === null ? (
        <p>Recommendations are Loading...</p>
      ) : (
        <div>
          {recommendations.length === 0 ? (
            <p>This film has no recommendations</p>
          ) : (
            <div>
              <Slider {...sliderSettings}>
                {recommendations.map((rec) => {
                  return <RecommendationSlide movie={rec} key={rec.movie_id} />;
                })}
              </Slider>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
