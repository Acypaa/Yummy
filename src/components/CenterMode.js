import React from "react";
import Slider from "react-slick";
import CardSlider from "./CardSlider";
import '../styles/CenterMode.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src="./img/nextArrow.png" alt="" 
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src="./img/prevArrow.png" alt="" 
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Rus.png'}
          text={'русская национальная кухня'}
          flag={'./img/CardMain/RusFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/italy.png'}
          text={'итальянская национальная кухня'}
          flag={'./img/CardMain/italyFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/French.png'}
          text={'французская национальная кухня'}
          flag={'./img/CardMain/franceFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Korea.png'}
          text={'корейская национальная кухня'}
          flag={'./img/CardMain/KoreaFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Spanish.png'}
          text={'испанская национальная кухня'}
          flag={'./img/CardMain/SpanishFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Georgia.png'}
          text={'грузинская национальная кухня'}
          flag={'./img/CardMain/GeorgiaFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Uz.png'}
          text={'узбекская национальная кухня'}
          flag={'./img/CardMain/UzFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/China.png'}
          text={'китайская национальная кухня'}
          flag={'./img/CardMain/ChinaFlag.png'}
        />
        </div>
        <div className="slider-container__card">
        <CardSlider
          img={'./img/CardMain/Japan.png'}
          text={'японская национальная кухня'}
          flag={'./img/CardMain/JapanFlag.png'}
        />
        </div>
      </Slider>
    </div>
  );
}

export default CenterMode;