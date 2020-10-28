import React, { useContext, useEffect } from "react";

// Components
import RecommendationSlide from "../recommendations/RecommendationSlide";

// Context
import ProfileContext from "../../context/Profile/ProfileContext";

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

const ReviewRec = ({ id }) => {
  // using the movie context
  const profileContext = useContext(ProfileContext);
  const { getRecommendations, recommendations } = profileContext;

  // on load, get the similar movies
  useEffect(() => {
    if (id) {
      getRecommendations(id);
    }
  }, [id]);

  console.log(recommendations)
  return (
    <div>
      <h1>Recommendations</h1>
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