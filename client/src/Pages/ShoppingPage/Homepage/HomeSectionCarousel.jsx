import React, { useRef } from "react";
import HomeSectionCard from "./HomeSectionCard";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Slider from "react-slick";

const HomeSectionCarousel = ({ category, section }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-12 slider-container">
      <h2 className="px-7 text-xl md:text-2xl text-blue-950 font-extrabold mb-6 capitalize">
        {section} <span>#</span>
      </h2>
      <div className="py-4 px-2">
        <Slider ref={sliderRef} {...settings}>
          {category &&
            category?.length > 0 &&
            category.map((product) => (
              <div key={product?._id} className="item">
                <HomeSectionCard product={product} />
              </div>
            ))}
        </Slider>
      </div>
      <Button
        onClick={() => sliderRef.current.slickPrev()}
        variant="contained"
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%) rotate(90deg)",
          bgcolor: "white",
          color: "black",
        }}
      >
        <ChevronLeftIcon sx={{ transform: "rotate(-90deg)" }} />
      </Button>
      <Button
        onClick={() => sliderRef.current.slickNext()}
        variant="contained"
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%) rotate(90deg)",
          bgcolor: "white",
          color: "black",
        }}
      >
        <ChevronLeftIcon sx={{ transform: "rotate(90deg)" }} />
      </Button>
    </div>
  );
};

export default HomeSectionCarousel;
