import { createContext } from 'react';

export interface User {
    id: string;
    username: string;
    email: string;
    country: string;
    role: string;
}

export const UserContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({
    user: null,
    setUser: () => {},
});
