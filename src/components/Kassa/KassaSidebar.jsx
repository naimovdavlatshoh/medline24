import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaClinicMedical } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";

import { RiMenuUnfold4Fill } from "react-icons/ri";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${
                id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    );
}

const KassaSidebar = ({ active, setActive }) => {
    const [sidebar, setSidebar] = useState(true);
    const url = useLocation();
    const currenurl = url.pathname;

    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div
            className={`${
                sidebar ? "w-80" : "w-25"
            } transition-all duration-300  text-white p-3 px-6  min-h-[120vh] bg-theme-bg text-theme-text`}
        >
            <div className="h-[70px] text-main-green py-3 hidden md:block">
                {!sidebar ? (
                    <div className="h-full w-full  flex justify-center">
                        <FaClinicMedical
                            size={40}
                            onClick={() => setSidebar(!sidebar)}
                        />
                    </div>
                ) : (
                    <h2
                        onClick={() => setSidebar(!sidebar)}
                        className="text-2xl font-bold  "
                    >
                        Close
                    </h2>
                )}
            </div>
            <div
                className="md:hidden text-main-green h-[70px] flex justify-start items-center"
                onClick={() => setActive(!active)}
            >
                <RiMenuUnfold4Fill size={30} />
            </div>

            <ul>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <FaCoins size={25} />
                        {sidebar ? "Приём платежей" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/refund"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/refund"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <FaCoins size={25} />
                        {sidebar ? "Возврат" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/history-payments"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/history-payments"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <MdWorkHistory size={25} />
                        {sidebar ? "История платежей" : ""}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default KassaSidebar;
