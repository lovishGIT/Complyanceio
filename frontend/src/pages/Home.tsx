import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
    const { user } = useContext(UserContext);
    const [imageLink, setImageLink] = useState<string>(
        '../assets/india.png'
    );

    useEffect(() => {
        if (user) {
            const fetchImage = async () => {
                const response = await axios.get(
                    `https://complyanceio-api.vercel.app/api/country/name/${user.country.toLowerCase()}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                );
                if (
                    response?.data == null ||
                    response?.data?.country.image?.url == null
                ) {
                    setImageLink('../assets/india.png');
                    return;
                }
                setImageLink(response.data.country.image.url);
            };
            fetchImage();
        }
    }, [user, imageLink]);

    if (!user) {
        return (
            <Link
                to={'/login'}
                className="w-full h-full flex justify-center items-center text-3xl"
            >
                <button className="bg-gray-800 hover:bg-gray-600 text-gray-200 hover:text-white py-2 px-4 rounded-xl">
                    Please Login!!!
                </button>
            </Link>
        );
    }

    return (
        <div className="px-6 h-full flex justify-between items-center">
            <div className="h-full flex flex-col space-y-2">
                <h1 className="text-2xl">
                    Welcome to Complyanceio, {user.username}!
                </h1>
                <p className="text-2xl">
                    This is {user.country}'s flag.
                </p>
                <p className="text-xl text-gray-200 hover:text-white">
                    {user?.role.toLowerCase() === 'admin' && (
                        <Link
                            to={'/update'}
                            className="bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded-2xl"
                        >
                            Change Country Details
                        </Link>
                    )}
                </p>
            </div>
            <div>
                {imageLink && (
                    <img
                        src={imageLink}
                        alt="Flag"
                        className="w-[500px] h-[50vh]"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
