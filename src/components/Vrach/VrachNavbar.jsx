import React, { useState } from "react";
import VrachThemeToggle from "./VrachThemeToggle";

const VrachNavbar = ({ setTheme1 }) => {
    const [lang, setLang] = useState(localStorage.getItem("lang"));

    return (
        <div className="bg-theme-bg text-theme-text flex items-center justify-end px-3 h-[80px]  transition-all duration-300">
            <div className="flex gap-2">
                <div
                    className={` cursor-pointer hover:text-main-green hover:bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[20px] transition-[300ms] ${
                        lang == "uz"
                            ? " text-main-green shadow-md shadow-main-green"
                            : "text-main-green"
                    }`}
                    onClick={() => {
                        localStorage.setItem("lang", "uz"),
                            setLang(1),
                            window.location.reload();
                    }}
                >
                    uz
                </div>
                <div
                    className={` cursor-pointer hover:text-main-green hover:bg-white w-[40px] h-[40px] flex justify-center items-center rounded-[20px] transition-[300ms] ${
                        lang == "ru"
                            ? "text-main-green shadow-md shadow-main-green"
                            : "text-main-green"
                    }`}
                    onClick={() => {
                        localStorage.setItem("lang", "ru"),
                            setLang(2),
                            window.location.reload();
                    }}
                >
                    ru
                </div>
            </div>
            <VrachThemeToggle setTheme1={setTheme1} />
        </div>
    );
};

export default VrachNavbar;
