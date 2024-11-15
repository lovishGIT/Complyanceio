import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const getImage = async (country: string | undefined): Promise<string> => {
    const image = await import(
        `../assets/${country?.toLocaleLowerCase()}.png`
    );
    return image.default || '../assets/india.png';
};

const Home: React.FC = () => {
    const { user } = useContext(UserContext);
    const [imageLink, setImageLink] = useState<string>('');

    useEffect(() => {
        if (user) {
            const fetchImage = async () => {
                const link = await getImage(user.country);
                setImageLink(link);
            };
            fetchImage();
        }
    }, [user]);

    if (!user) {
        return (
            <Link
                to={'/login'}
                className="w-full h-full flex justify-center items-center text-3xl"
            >
                <button className='bg-gray-800 hover:bg-gray-600 text-gray-200 hover:text-white py-2 px-4 rounded-xl'>Please Login!!!</button>
            </Link>
        );
    }

    return (
        <div className="px-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl">
                    Welcome to Complyanceio, {user.username}!
                </h1>
                <p className="text-2xl">
                    This is the home page of Complyanceio.
                </p>
                <p className='text-2xl'>
                    This is {user.country}'s flag.
                </p>
            </div>
            <div>
                {imageLink && (
                    <img
                        src={imageLink}
                        alt="Flag"
                        className="w-[500px] h-auto"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
