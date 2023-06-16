import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "./ClassCard";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const PopularClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://design-xcel-server.vercel.app/classes");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <section className="bg-gray-200 max-w-screen-xl mx-auto mt-8 mb-8 px-8 py-10">
      <div className="text-center">
        <h6 className="text-xl font-semibold uppercase text-red-400">
          ---------- Explore Our Classes ------------
        </h6>
        <h2 className="text-4xl font-bold pt-3 pb-3 uppercase text-gray-800">
          <Fade cascade damping={0.15} direction="down" duration={800}>
            Unleash Your{" "}
            <span className="text-blue-900">Unleash YourCreative Power</span>
          </Fade>
        </h2>
      </div>
      <div className="flex justify-between items-center mt-3 mb-4"></div>
      <p className="text-gray-600">
        Discover a wide range of design classes and enhance your skills. Choose
        your preferred dance style and begin your creative journey with
        DesignXcel.
      </p>
      <Link
        to="/classes"
        className="flex items-center justify-center bg-red-400 hover:bg-red-500 text-white px-2 py-3 m-9 rounded-md"
      >
        View All <BsArrowRight className="ml-2" />
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.slice(0, 6).map((singleClass) => (
          <ClassCard key={singleClass._id} singleClass={singleClass} />
        ))}
      </div>
    </section>
  );
};

export default PopularClass;
