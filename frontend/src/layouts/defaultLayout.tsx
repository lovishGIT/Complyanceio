import Footer from '../components/global/footer';
import Navbar from '../components/global/navbar';

import { ReactNode } from 'react';
import { User, UserContext } from '../context/UserContext';
import AppInitializer from '../api/appInitializer';
import { BrowserRouter as Router } from 'react-router-dom';

import { useState } from 'react';

export default function DefaultLayout({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <AppInitializer>
                    <Router>
                        <div className="w-full min-h-[100vh] flex flex-col justify-between">
                            <Navbar />
                            {children}
                            <Footer />
                        </div>
                    </Router>
                </AppInitializer>
            </UserContext.Provider>
        </>
    );
}
