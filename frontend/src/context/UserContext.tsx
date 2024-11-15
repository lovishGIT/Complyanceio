import React, { createContext, useState, ReactNode } from 'react';

export interface User {
    id: string;
    username: string;
    email: string;
    country: string;
    role: string;
}

export const UserContext = createContext<{
    user: User | null;
    setUser: (user: User) => void;
}>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
