import React, { useContext, useEffect, useRef } from "react";

// Components
import RecommendationSlide from "../recommendations/RecommendationSlide";

// Context
import ProfileContext from "../../context/Profile/ProfileContext";

// Styling
import Slider from "react-slick";
import "../../styles/Recommendations.scss";
import "../../styles/Profile.scss";

// slider style settings
const sliderSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  //variableWidth: true,
  centerPadding: "60px",
  slidesToShow: 2,
  speed: 500,
};

const ReviewRec = ({ id }) => {
  // using the movie context
  const profileContext = useContext(ProfileContext);
  const { getRecommendations, recommendations } = profileContext;
  // on load, get the similar movies
  useEffect(() => {
    if (id) {
      getRecommendations(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="review-rec-inner">
      <h2>Recommendations</h2>
      <p> These recommendations are based on review history</p>
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

export default ReviewRec;
