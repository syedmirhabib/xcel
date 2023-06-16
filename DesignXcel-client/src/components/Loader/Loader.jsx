import { useState } from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setLoading(!loading);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Loading</h2>
      <div className="flex items-center mb-4">
        <MoonLoader color="#ff0000" size={80} loading={loading} />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleToggle}
      >
        {loading ? 'Stop Loader' : 'Start Loader'}
      </button>
    </div>
  );
};

export default Loader;
