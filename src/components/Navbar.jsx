import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <div className="bg-main-light dark:bg-main-dark h-[80px] flex items-center justify-end px-3 rounded-xl transition-all duration-300">
            <ThemeToggle />
        </div>
    );
};

export default Navbar;
