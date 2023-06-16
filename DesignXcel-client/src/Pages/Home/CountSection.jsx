import { useState } from "react";
import CountUp from "react-countup";
import { RiGroupLine, RiUserSmileLine, RiCodeBoxLine, RiChat4Line } from "react-icons/ri";
import ScrollTrigger from "react-scroll-trigger";

const CountSection = () => {
  const [countOn, setCountOn] = useState(false);

  return (
    <ScrollTrigger onEnter={() => setCountOn(true)} onExit={() => setCountOn(false)}>
      <div className="flex flex-col md:flex-row items-center justify-center mt-12">
        <div className="bg-white px-8 py-6 md:px-10 md:py-8 rounded-md text-center md:mr-8 mb-6 md:mb-0">
          {countOn && (
            <CountUp
              className="text-5xl font-extrabold text-blue-500"
              end={200}
              duration={5}
            />
          )}
          <span className="text-5xl text-red-500 font-bold">+</span>
          <div className="text-3xl font-semibold mt-4">Design Classes</div>
        </div>
        <div className="bg-white px-8 py-6 md:px-10 md:py-8 rounded-md text-center md:mr-8 mb-6 md:mb-0">
          {countOn && (
            <CountUp
              className="text-5xl font-extrabold text-blue-500"
              end={70}
              duration={5}
            />
          )}
          <span className="text-5xl text-red-500 font-bold">+</span>
          <div className="text-3xl font-semibold mt-4">Creative Minds</div>
        </div>
        <div className="bg-white px-8 py-6 md:px-10 md:py-8 rounded-md text-center md:mr-8 mb-6 md:mb-0">
          {countOn && (
            <CountUp
              className="text-5xl font-extrabold text-blue-500"
              end={24}
              duration={5}
            />
          )}
          <span className="text-5xl text-red-500 font-bold">+</span>
          <div className="text-3xl font-semibold mt-4">Learning Resources</div>
        </div>
        <div className="bg-white px-8 py-6 md:px-10 md:py-8 rounded-md text-center">
          {countOn && (
            <CountUp
              className="text-5xl font-extrabold text-blue-500"
              end={130}
              duration={5}
            />
          )}
          <span className="text-5xl text-red-500 font-bold">+</span>
          <div className="text-3xl font-semibold mt-4">Satisfied Students</div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default CountSection;
