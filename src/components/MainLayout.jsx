import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div className="flex h-[130vh]  text-theme-text bg-secondary-light">
            {/* Sidebar (Static) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-grow  h-[120px]">
                {/* Navbar (Top of Children Component) */}
                <div className="h-[10vh]">
                    <Navbar />
                </div>

                {/* Dynamic Content Area */}
                <div className=" theme-text min-h-[120vh] p-10">
                    <Outlet /> {/* This will render the dynamic content */}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
