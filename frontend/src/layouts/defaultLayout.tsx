import Footer from "../components/global/footer";
import Navbar from "../components/global/navbar";

import { ReactNode } from 'react';

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="w-full min-h-[100vh] flex flex-col justify-between">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
}