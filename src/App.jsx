import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import {
    Home,
    Login,
    Personal,
    Division,
    Service,
    Analyze,
    NotFound,
} from "./pages/data";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="personal" element={<Personal />} />
                    <Route path="division" element={<Division />} />
                    <Route path="service" element={<Service />} />
                    <Route path="analyze" element={<Analyze />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
