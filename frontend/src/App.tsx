import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import DefaultLayout from './layouts/defaultLayout';
import { User, UserContext } from './context/UserContext';
import { useState } from 'react';
import AppInitializer from './api/appInitializer';
import CountryManagement from './pages/countryManagement';

function App() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppInitializer>
                <Router>
                    <DefaultLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/login"
                                element={<Login />}
                            />
                            <Route
                                path="/update"
                                element={<CountryManagement />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </DefaultLayout>
                </Router>
            </AppInitializer>
        </UserContext.Provider>
    );
}

export default App;
