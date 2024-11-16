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
import axios from 'axios';

function App() {
    axios.defaults.baseURL = 'https://complyanceio-api.vercel.app';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.delete['Content-Type'] = 'application/json';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.patch['Access-Control-Allow-Origin'] = 'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = 'htttps://complyanceio-api.vercel.app';
    axios.defaults.headers.delete['Access-Control-Allow-Origin'] = 'htttps://complyanceio-api.vercel.app';
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
