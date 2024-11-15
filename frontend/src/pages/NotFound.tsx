import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleRedirect}
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default NotFound;