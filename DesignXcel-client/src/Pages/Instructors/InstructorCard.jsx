import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const InstructorCard = ({ instructor }) => {
  const { name, photo, email } = instructor;
  return (
    <div className="card bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-4">
        <img src={photo} alt="Instructor" className="w-24 h-24 rounded-full" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-center">{name}</h2>
      <div className="flex justify-center mb-4">
        <div className="tooltip" data-tip="Facebook">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 text-xl hover:text-blue-700 mr-2" />
          </a>
        </div>
        <div className="tooltip" data-tip={email}>
          <a href={`mailto:${email}`}>
            <SiGmail className="text-red-500 text-xl hover:text-red-700 mx-2" />
          </a>
        </div>
        <div className="tooltip" data-tip="017451641">
          <a href="tel:017451641">
            <BsTelephoneFill className="text-green-500 text-xl hover:text-green-700 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
