import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DiagnosticSidebar from "./DiagnosticSidebar";
import DiagnosticNavbar from "./DiagnosticNavbar";

import { useState } from "react";
import DiagnosticThemeToggle from "./DiagnosticThemeToggle";
import { RiMenuUnfold3Fill } from "react-icons/ri";

const DiagnosticLayout = () => {
    const [lang, setLang] = useState(localStorage.getItem("lang"));
    const [mode, setMode] = useState(localStorage.getItem("theme"));
    const [active, setActive] = useState(false);
    const [theme1, setTheme1] = useState("light");
    useEffect(() => {
        const color = localStorage.getItem("theme");
        if (color) {
            setTheme1(color);
        }
    }, [theme1]);

    return (
        <>
            <div
                className={`hidden md:flex  theme-text ${
                    theme1 == "dark"
                        ? "bg-secondary-back"
                        : "bg-secondary-light"
                }`}
            >
                {/* Sidebar (Static) */}
                <DiagnosticSidebar />

                {/* Main Content Area */}
                <div className="flex flex-col flex-grow">
                    {/* Navbar (Top of Children Component) */}
                    <div className="h-[10vh]">
                        <DiagnosticNavbar setTheme1={setTheme1} />
                    </div>

                    {/* Dynamic Content Area */}
                    <div className=" theme-text  p-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div
                className={`flex md:hidden h-[130vh] relative ${
                    theme1 == "dark"
                        ? "bg-secondary-back"
                        : "bg-secondary-light"
                }`}
            >
                <div
                    className={`absolute transition-transform duration-300 z-[999] ${
                        active ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <DiagnosticSidebar active={active} setActive={setActive} />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col flex-grow h-[120px] w-full ">
                    {/* Navbar (Top of Children Component) */}
                    <div className="h-[10vh] ">
                        <div className="bg-theme-bg text-theme-text flex items-center justify-between px-3 h-[80px] transition-all duration-300">
                            <button
                                onClick={() => setActive(!active)}
                                className="text-main-green"
                            >
                                <RiMenuUnfold3Fill size={30} />
                            </button>
                            <div className="flex justify-end items-center">
                                <div className="flex gap-2">
                                    <div
                                        className={`cursor-pointer hover:text-main-green hover:bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[20px] transition-[300ms] ${
                                            lang == "uz"
                                                ? " text-main-green shadow-md shadow-main-green"
                                                : "text-main-green"
                                        }`}
                                        onClick={() => {
                                            localStorage.setItem("lang", "uz");
                                            setLang(1);
                                            window.location.reload();
                                        }}
                                    >
                                        uz
                                    </div>
                                    <div
                                        className={`cursor-pointer hover:text-main-green hover:bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[20px] transition-[300ms] ${
                                            lang == "ru"
                                                ? "text-main-green shadow-md shadow-main-green"
                                                : "text-main-green"
                                        }`}
                                        onClick={() => {
                                            localStorage.setItem("lang", "ru");
                                            setLang(2);
                                            window.location.reload();
                                        }}
                                    >
                                        ru
                                    </div>
                                </div>
                                <DiagnosticThemeToggle setTheme1={setTheme1} />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content Area */}
                    <div className="w-full theme-text min-h-[140vh] p-2 md:p-10">
                        <Outlet /> {/* This will render the dynamic content */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiagnosticLayout;
