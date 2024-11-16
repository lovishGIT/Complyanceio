import {
    Route,
    Routes,
} from 'react-router-dom';
import DefaultLayout from './layouts/defaultLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CountryManagement from './pages/countryManagement';
import DataManagement from './pages/dataManagement';

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/update"
                    element={<CountryManagement />}
                />
                <Route path="/data" element={<DataManagement />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </DefaultLayout>
    );
}

export default App;
