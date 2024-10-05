import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div className="flex h-screen p-3 gap-3 bg-theme-bg text-theme-text">
            {/* Sidebar (Static) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-grow gap-3">
                {/* Navbar (Top of Children Component) */}
                <Navbar />

                {/* Dynamic Content Area */}
                <div className="flex-grow  theme-bg theme-text">
                    <Outlet /> {/* This will render the dynamic content */}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
