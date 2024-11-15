import React from 'react';

import IndianFlag from '../assets/india.png';

const Home: React.FC = () => {
    return (
        <div className="px-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl">Welcome to Complyanceio</h1>
                <p className="text-2xl">
                    This is the home page of Complyanceio.
                </p>
            </div>
            <div>
                <img src={IndianFlag} alt="" />
            </div>
        </div>
    );
};

export default Home;