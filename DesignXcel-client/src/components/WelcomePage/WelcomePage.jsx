import { useState } from 'react';

const WelcomePage = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const buttonColor = isButtonHovered ? 'bg-blue-800' : 'bg-blue-600';

  return (
    <div className="flex items-center justify-center max-w-screen-xl mx-auto bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center mb-6">
          <img
            src="https://i.ibb.co/wgPkgFV/logo.png"
            alt="DesignXcel Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-3xl font-bold text-gray-800">Welcome to DesignXcel</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Join our vibrant community of designers, creators, and innovators to explore the world of design and unleash your creativity.
        </p>
        <button
          className={`block w-full px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${buttonColor}`}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          Get Started
        </button>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Discover DesignXcel:</h2>
          <div className="flex space-x-4">
            <div className="bg-gray-200 rounded-lg p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Learn</h3>
              <p className="text-gray-600">
                Access a wide range of design resources, tutorials, and educational materials to enhance your skills.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect</h3>
              <p className="text-gray-600">
                Network and collaborate with fellow designers, share your work, and get feedback from the community.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Inspire</h3>
              <p className="text-gray-600">
                Explore inspiring design projects, stay updated with the latest industry trends, and find creative inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
