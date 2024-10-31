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
    Visits,
    Objects,
    Palats,
    ListKoyk,
    Koyk,
    Method,
    Share,
    Warehouse,
    Actions,
} from "./pages/data";
import useTokenExpiration from "./components/useTokenExpiration";

const App = () => {
    useTokenExpiration(); // Check for token expiration
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="personal" element={<Personal />} />
                <Route path="division" element={<Division />} />
                <Route path="service" element={<Service />} />
                <Route path="analyze" element={<Analyze />} />
                <Route path="visits" element={<Visits />} />
                <Route path="objects" element={<Objects />} />
                <Route path="palats" element={<Palats />} />
                <Route path="beds" element={<ListKoyk />} />
                <Route path="koyk" element={<Koyk />} />
                <Route path="method" element={<Method />} />
                <Route path="share" element={<Share />} />
                <Route path="warehouse" element={<Warehouse />} />
                <Route path="actions" element={<Actions />} />
            </Route>
        </Routes>
    );
};

export default App;
