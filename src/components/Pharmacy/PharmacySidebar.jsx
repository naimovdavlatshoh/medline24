import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaClinicMedical, FaUsers } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiGitPullRequestBold } from "react-icons/pi";

import { FaHome } from "react-icons/fa";

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

const PharmacySidebar = ({ active, setActive }) => {
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
                        <GiMedicines size={25} />
                        {sidebar ? "Лекарства" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/supplier"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/supplier"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <MdDeliveryDining size={25} />
                        {sidebar ? "Поставщики" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/manafacturer"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/manafacturer"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <GiAutoRepair size={25} />
                        {sidebar ? "Производитель" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/coming"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/coming"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <GiReceiveMoney size={25} />
                        {sidebar ? "Приход" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/remainder"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/remainder"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <MdOutlineProductionQuantityLimits size={25} />
                        {sidebar ? "Остаток" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/relocation-requests"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/relocation-requests"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <PiGitPullRequestBold size={25} />
                        {sidebar ? "Заявки на перемещение" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/return-requests"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/return-requests"
                        className={`flex gap-2   justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <PiGitPullRequestBold size={25} />
                        {sidebar ? "Заявки на возврат" : ""}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default PharmacySidebar;
