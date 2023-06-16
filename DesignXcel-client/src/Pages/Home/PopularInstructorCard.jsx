const PopularInstructorCard = ({ instructor }) => {
  const skills = instructor.skills || []; // Set default value if skills array is undefined

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-64">
        <img className="w-full h-32 object-cover object-center" src={instructor.photo} alt={instructor.name} />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
          <p className="text-gray-600">{instructor.email}</p>
          <div className="flex items-center mt-4">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full ml-2"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full ml-2"></div>
          </div>
          {skills.length > 0 && (
            <p className="text-gray-600 mt-2">Skills: {skills.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructorCard;
