import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Zoom } from "react-awesome-reveal";
import { default as img1 } from "../../assets/images/banner1.jpg";
import { default as img2 } from "../../assets/images/banner2.jpg";
import { default as img3 } from "../../assets/images/banner3.jpg";
import { default as img4 } from "../../assets/images/banner4.jpg";

const Banner = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Zoom>
        <Carousel
          showThumbs
          thumbWidth={80}
          autoPlay
          infiniteLoop
          interval={5000}
          stopOnHover
        >
          <div>
            <img src={img1} alt="Banner 1" />
          </div>
          <div>
            <img src={img2} alt="Banner 2" />
          </div>
          <div>
            <img src={img3} alt="Banner 3" />
          </div>
          <div>
            <img src={img4} alt="Banner 4" />
          </div>
        </Carousel>
      </Zoom>
    </div>
  );
};

export default Banner;
