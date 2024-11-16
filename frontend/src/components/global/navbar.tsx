import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { Country } from '../../types/country';

const Navbar: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    const [countries, setCountries] = useState([]);

    const handleLogout = async () => {
        const logout = await axios.get(
            'https://complyanceio-api.vercel.app/api/user/logout',
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!logout) {
            return console.error('Failed to logout');
        }
        setUser(null);
    };

    useEffect(() => {
        function fetchCountries() {
            axios
                .get(
                    'https://complyanceio-api.vercel.app/api/country',
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    setCountries(response.data.countries || []);
                })
                .catch((err) => {
                    console.error('Error fetching countries:', err);
                });
        }
        fetchCountries();
    }, []);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link to="/">BrandName</Link>
                </div>
                <div className="space-x-4">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white"
                    >
                        Home
                    </Link>
                    {user?.role.toLowerCase() == 'admin' && (
                        <Link
                            to="/update"
                            className="text-gray-300 hover:text-white"
                        >
                            Update
                        </Link>
                    )}
                    <Link
                        to="/data"
                        className="text-gray-300 hover:text-white"
                    >
                        Data
                    </Link>

                    {user ? (
                        <>
                            <select
                                name="country"
                                className="text-gray-300 bg-gray-800 hover:text-white"
                                value={user.country}
                                onChange={async (e) => {
                                    const value = e.target.value;
                                    if (typeof value !== 'string') {
                                        console.error(
                                            'Invalid country value'
                                        );
                                        return;
                                    } // SQL / NO-SQL Injection Prevention
                                    await axios.patch(
                                        `https://complyanceio-api.vercel.app/api/user/update/${user._id}`,
                                        {
                                            country: value,
                                        },
                                        {
                                            withCredentials: true,
                                        }
                                    );
                                    setUser({
                                        ...user,
                                        country: value,
                                    });
                                }}
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

                            <button
                                className="text-black bg-white py-2 px-4 rounded-full"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="text-gray-300 hover:text-white"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
