import React, { useEffect, useState } from 'react';
import { FormData } from '../../types/user';
import axios from 'axios';
import { Country } from '../../types/country';

interface RegisterFormProps {
    onSubmit: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
    });
    const [countries, setCountries] = useState([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get(
                `https://complyanceio.onrender.com/api/country`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
            console.log(response.data.countries);
            setCountries(response.data.countries || []);
        };
        getCountries();
    }, [countries]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block mb-2 font-medium"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your username"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="country"
                    className="block mb-2 font-medium"
                >
                    Country
                </label>

                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                >
                    {countries.map((country: Country) => (
                        <option
                            key={country._id}
                            value={country.name}
                        >
                            {' '}
                            {country.name}{' '}
                        </option>
                    ))}
                </select>
            </div>
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
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
