import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-4  text-gray-100  rounded-2xl flex justify-center items-center"
        >
            {theme === "light" ? (
                <IoMoonOutline size={25} />
            ) : (
                <FiSun size={25} />
            )}
        </button>
    );
}

export default ThemeToggle;
