import { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AppInitializer = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    // 'https://localhost:3000/api/user/verify_token'
                    '/api/user/verify_token',
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    setUser(response.data.data);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        setUser(null);
                    } else if (err.response?.status === 500) {
                        console.error('Failed to fetch user:', err);
                        setUser(null);
                    } else {
                        console.error('Unexpected error:', err);
                    }
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        };

        fetchUser();
    }, [setUser]);

    return <>{children}</>;
};

export default AppInitializer;
