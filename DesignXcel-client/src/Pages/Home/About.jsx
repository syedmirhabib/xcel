import { FaPalette } from 'react-icons/fa';
import bannerImage from "../../../src/assets/images/homeB.jpg";
import { Slide } from "react-awesome-reveal";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
        <div className="md:w-1/2">
          <Slide>
            <h6 className="text-xl font-semibold uppercase text-red-500 mb-4">Welcome to DesignXcel</h6>
            <h2 className="text-4xl font-bold uppercase text-blue-800 mb-6">
              Unleash Your Design Superpowers
            </h2>
            <p className="text-gray-700 mb-8">
              DesignXcel is your go-to platform for all things design. Whether you're a beginner or an experienced designer, we provide the resources and community to help you level up your skills and stay inspired. Join us on this creative journey and let your imagination run wild!
            </p>
            <button className="flex items-center justify-center btn bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full">
              <FaPalette className="mr-2" />
              Explore Now
            </button>
          </Slide>
        </div>
        
        <div className="relative w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src={bannerImage} alt="Banner" className="rounded-lg shadow-xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
