import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiHeartbeatFill } from "react-icons/pi";
import { FaClinicMedical } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { MdMedicalServices } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiBuilding2Fill, RiMenuUnfold3Fill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { RiGuideFill } from "react-icons/ri";
import { RiHomeOfficeFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { VscSymbolMethod } from "react-icons/vsc";

import { RiMenuUnfold4Fill } from "react-icons/ri";

import { BiSolidSelectMultiple } from "react-icons/bi";

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

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

const Sidebar = ({ active, setActive }) => {
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
                        <FaHome size={25} />
                        {sidebar ? "Home" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/personal"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/personal"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <IoPerson size={25} />
                        {sidebar ? "Персонал" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/division"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/division"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <IoPeopleSharp size={25} />
                        {sidebar ? "Отделы" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/service"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/service"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <MdMedicalServices size={25} />
                        {sidebar ? "Услуги" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/analyze"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/analyze"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <FaGripfire size={25} />
                        {sidebar ? "Анализы" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/visits"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/visits"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiBuilding2Fill size={25} />

                        {sidebar ? "Визиты" : ""}
                    </Link>
                </li>
                <li
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/objects"
                            ? "bg-main-green text-white"
                            : currenurl == "/palats"
                            ? "bg-main-green text-white"
                            : currenurl == "/beds"
                            ? "bg-main-green text-white"
                            : currenurl == "/koyk"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <p
                        to=""
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiBuilding2Fill size={25} />
                        {sidebar ? (
                            <Accordion
                                open={open === 2}
                                icon={<Icon id={2} open={open} />}
                            >
                                <Link
                                    to={"/objects"}
                                    onClick={() => {
                                        handleOpen(2);
                                    }}
                                    className="w-full flex justify-between"
                                >
                                    Объекты
                                    <IoIosArrowDown />
                                </Link>
                                <AccordionBody>
                                    <ul className="text-white flex flex-col gap-2">
                                        <Link
                                            onClick={() => setActive(!active)}
                                            className={`py-1 px-1 rounded-md ${
                                                currenurl == "/objects"
                                                    ? "bg-white text-main-green "
                                                    : ""
                                            }`}
                                            to={"/objects"}
                                        >
                                            Объекты
                                        </Link>
                                        <Link
                                            onClick={() => setActive(!active)}
                                            className={`py-1 px-1 rounded-md ${
                                                currenurl == "/palats"
                                                    ? "bg-white text-main-green "
                                                    : ""
                                            }`}
                                            to={"/palats"}
                                        >
                                            Палаты
                                        </Link>
                                        <Link
                                            onClick={() => setActive(!active)}
                                            className={`py-1 px-1 rounded-md ${
                                                currenurl == "/beds"
                                                    ? "bg-white text-main-green "
                                                    : ""
                                            }`}
                                            to={"/beds"}
                                        >
                                            Типы
                                        </Link>
                                        <Link
                                            onClick={() => setActive(!active)}
                                            className={`py-1 px-1 rounded-md ${
                                                currenurl == "/koyk"
                                                    ? "bg-white text-main-green "
                                                    : ""
                                            }`}
                                            to={"/koyk"}
                                        >
                                            Койки
                                        </Link>
                                    </ul>
                                </AccordionBody>
                            </Accordion>
                        ) : (
                            ""
                        )}
                    </p>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/method"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/method"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <VscSymbolMethod size={25} />
                        {sidebar ? "Метод ввода лекарств" : ""}
                    </Link>
                </li>

                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/share"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/share"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiGuideFill size={25} />
                        {sidebar ? "Напровители" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/actions"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/actions"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <BiSolidSelectMultiple size={25} />
                        {sidebar ? "Action" : ""}
                    </Link>
                </li>
                <li
                    onClick={() => {
                        handleOpen(0), setActive(!active);
                    }}
                    className={`mb-2 px-3 py-3 rounded-xl rounded-ee-[40px]  ${
                        currenurl == "/warehouse"
                            ? "bg-main-green text-white"
                            : "text-main-green"
                    }`}
                >
                    <Link
                        to="/warehouse"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiHomeOfficeFill size={25} />
                        {sidebar ? "Склады" : ""}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
