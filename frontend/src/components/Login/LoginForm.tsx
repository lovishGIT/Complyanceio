import React, { useState } from 'react';
import { FormData } from '../../types/user';

interface LoginFormProps {
    onSubmit: (formData: FormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block mb-2 font-medium"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your email"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block mb-2 font-medium"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
