import axios from "axios";
import { useEffect, useState } from "react";
import PopularInstructorCard from "./PopularInstructorCard";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("https://design-xcel-server.vercel.app/instructors");
        setInstructors(response.data.slice(0, 6)); // Limiting to 6 instructors
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="container mx-auto mt-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-400">
          <Fade cascade damping={0.1}>
            Meet Our Instructors
          </Fade>
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Discover our talented instructors who will guide you on your creative
          journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {instructors.map((instructor) => (
          <PopularInstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/instructors"
          className="btn bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default Instructors;
