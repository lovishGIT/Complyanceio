import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const Navbar: React.FC = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {

        const logout = await axios.get(
            'http://localhost:3000/api/user/logout', {
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
                            to="#about"
                            className="text-gray-300 hover:text-white"
                        >
                            Update
                        </Link>
                    )}
                    <Link
                        to="#services"
                        className="text-gray-300 hover:text-white"
                    >
                        Services
                    </Link>
                    <Link
                        to="#contact"
                        className="text-gray-300 hover:text-white"
                    >
                        Contact
                    </Link>
                    {user ? (
                        <>
                            <select
                                name="country"
                                className="text-gray-300 bg-gray-800 hover:text-white"
                                value={user.country}
                                onChange={(e) => {
                                    // console.log(user);
                                    setUser({
                                        ...user,
                                        country: e.target.value,
                                    });
                                }}
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="China">China</option>
                            </select>

                            <button className='text-black bg-white py-2 px-4 rounded-full' onClick={handleLogout}>
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
