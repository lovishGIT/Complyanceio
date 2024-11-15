import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layouts/defaultLayout";
import { User, UserContext } from "./context/UserContext";
import { useState } from "react";

function App() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <DefaultLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </DefaultLayout>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
