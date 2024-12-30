import React from "react";
import Slider from "react-slick";
import b1 from "../../../assets/b-1.png";
import b2 from "../../../assets/b-2.png";
import b3 from "../../../assets/b-3.png";
import b4 from "../../../assets/b-4.png";

const MainCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <div className="pb-8">
      <Slider {...settings}>
        <div className="item">
          <img
            src={window.innerWidth <= 600 ? b3 : b1}
            alt=""
            width="100%"
            loading="lazy"
          />
        </div>
        <div className="item">
          <img
            src={window.innerWidth <= 600 ? b4 : b2}
            alt=""
            width="100%"
            loading="lazy"
          />
        </div>
      </Slider>
    </div>
  );
};

export default MainCarousel;
