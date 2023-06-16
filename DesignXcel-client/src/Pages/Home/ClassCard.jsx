import { Link } from "react-router-dom";

const ClassCard = ({ singleClass }) => {
  return (
    <div className="transition-all duration-300 transform hover:scale-105">
      <div className="w-80 h-96 bg-gray-200 shadow-lg rounded-lg flex flex-col justify-between mb-8">
        <figure className="h-3/5">
          <img
            className="h-full w-full object-cover rounded-t-lg"
            src={singleClass.image}
            alt="Class"
          />
        </figure>
        <div className="p-6">
          <h2 className="text-2xl text-center mb-4 font-bold">
            {singleClass.className}
          </h2>
          <p className="text-center text-gray-600 mb-2">
            Instructor:{" "}
            <span className="text-lg font-semibold text-gray-800">
              {singleClass.instructorName}
            </span>
          </p>
          <p className="text-center text-gray-600">
            Current Students:{" "}
            <span className="text-lg font-semibold text-gray-800">
              {singleClass.currentStudent}
            </span>
          </p>

          <Link to="/classes">
            <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
