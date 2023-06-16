import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const ClassCard = ({ cls, handleSelect }) => {
  const { user } = useContext(AuthContext);

  return (
    <Fade>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={cls.image}
            alt="Class"
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-0 left-0 bg-orange-500 text-white py-2 px-4 rounded-tr-md rounded-bl-md">
            {cls.availableSeats} seats left
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{cls.className}</h2>
          <p className="text-gray-600 mb-4">Instructor: {cls.instructorName}</p>
          <p className="text-gray-600 mb-4">Fees: ${cls.price}</p>
          {user && user.email ? (
            <button
              onClick={() => handleSelect(cls)}
              className="block w-full bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Enroll Now
            </button>
          ) : (
            <Link to="/login">
              <button className="block w-full bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                Enroll Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default ClassCard;
