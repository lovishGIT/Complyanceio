import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/Login/LoginForm';
import RegisterForm from '../components/Login/RegisterForm';
import { FormData } from '../types/user';
import axios from 'axios';

const LoginRegisterPage: React.FC = () => {
    axios.defaults.baseURL = 'https://complyanceio-api.vercel.app';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.delete['Content-Type'] =
        'application/json';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] =
        'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] =
        'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.patch['Access-Control-Allow-Origin'] =
        'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] =
        'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.delete['Access-Control-Allow-Origin'] =
        'htttps://complyanceio-api.vercel.app';
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const handleLoginOrRegister = async (formData: FormData) => {
        try {
            const endpoint = isLoginMode
                ? 'https://complyanceio-api.vercel.app/api/user/login'
                : 'https://complyanceio-api.vercel.app/api/user/register';

            const response = await axios.post(endpoint, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setUser(response.data.data);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        {isLoginMode ? 'Login' : 'Register'}
                    </h2>
                    <button
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        onClick={toggleMode}
                    >
                        {isLoginMode ? 'Register' : 'Login'}
                    </button>
                </div>
                {isLoginMode ? (
                    <LoginForm onSubmit={handleLoginOrRegister} />
                ) : (
                    <RegisterForm onSubmit={handleLoginOrRegister} />
                )}
            </div>
        </div>
    );
};

export default LoginRegisterPage;
