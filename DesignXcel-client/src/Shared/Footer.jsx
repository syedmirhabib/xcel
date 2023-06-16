import { FaPalette, FaHome, FaQuestion, FaHeadset, FaBalanceScale, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className="bg-gray-900 text-gray-200">
      <footer className="container mx-auto py-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-extrabold text-lg text-primary-500 flex items-center">
              <FaPalette className="mr-2" />
              <p className="mt-3">
                Design<span className="text-orange-500">Xcel</span>
              </p>
            </Link>
            <p className="mt-4 text-sm font-semibold text-gray-300">
              DesignXcel is a platform dedicated to fostering creativity and expanding design skills. It offers a wide range of classes taught by experienced instructors, empowering individuals to unlock their artistic potential and create exceptional designs.
            </p>
          </div>
          <div className="md:text-center">
            <h4 className="text-lg font-semibold text-primary-500">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaBalanceScale className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaFileAlt className="mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaHeadset className="mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:text-center">
            <h4 className="text-lg font-semibold text-primary-500">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaFileAlt className="mr-2" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaQuestion className="mr-2" />
                  FAQs
                </a>
              </li>
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaHeadset className="mr-2" />
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="md:text-center">
            <h4 className="text-lg font-semibold text-primary-500">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaFileAlt className="mr-2" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaFileAlt className="mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#!" className="text-gray-300 hover:text-primary-300 flex items-center">
                  <FaFileAlt className="mr-2" />
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-300 py-2 text-sm text-gray-500">
          <div className="container mx-auto">
            <p className="text-center">&copy; 2023 DesignXcel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
