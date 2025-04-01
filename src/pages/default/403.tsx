// src/components/errors/Forbidden403.tsx
import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Forbidden403: FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto border-4 border-red-500 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-red-500">403</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
              {countdown}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Forbidden
          </h2>
          <p className="text-gray-600 mb-6">
            You will be redirected to the home page in {countdown} seconds.
          </p>

          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-300"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              Go Home Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden403;
