import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiHeartbeatFill } from "react-icons/pi";
import { FaClinicMedical } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { MdMedicalServices } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiBuilding2Fill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { RiGuideFill } from "react-icons/ri";
import { RiHomeOfficeFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

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

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true);

    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div
            className={`${
                sidebar ? "w-80" : "w-20"
            } transition-all duration-300 bg-main-light dark:bg-main-dark text-white p-3 px-6 rounded-xl`}
        >
            <div className="h-[70px]">
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

            <ul>
                <li className="mb-4">
                    <Link
                        to="/"
                        className={`flex gap-2  justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <FaHome size={30} />
                        {sidebar ? "Home" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/personal"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <IoPerson size={30} />
                        {sidebar ? "Персонал" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/division"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <IoPeopleSharp size={30} />
                        {sidebar ? "Класификация персонала" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/service"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <MdMedicalServices size={30} />
                        {sidebar ? "Услуги" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/analyze"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <FaGripfire size={30} />
                        {sidebar ? "Анализы" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiBuilding2Fill size={30} />
                        {sidebar ? (
                            <Accordion
                                open={open === 1}
                                icon={<Icon id={1} open={open} />}
                            >
                                <div
                                    onClick={() => handleOpen(1)}
                                    className="w-full flex justify-between"
                                >
                                    Визиты
                                    <IoIosArrowDown />
                                </div>
                                <AccordionBody>
                                    <p className="text-white">Типы</p>
                                </AccordionBody>
                            </Accordion>
                        ) : (
                            ""
                        )}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiBuilding2Fill size={30} />
                        {sidebar ? (
                            <Accordion
                                open={open === 2}
                                icon={<Icon id={2} open={open} />}
                            >
                                <div
                                    onClick={() => handleOpen(2)}
                                    className="w-full flex justify-between"
                                >
                                    Объекты
                                    <IoIosArrowDown />
                                </div>
                                <AccordionBody>
                                    <ul className="text-white">
                                        <li className="mb-1">Объекты</li>
                                        <li className="mb-1">Палаты</li>
                                        <li className="mb-1">Койки</li>
                                        <li className="mb-1">Типы</li>
                                    </ul>
                                </AccordionBody>
                            </Accordion>
                        ) : (
                            ""
                        )}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <IoIosSettings size={30} />
                        {sidebar ? (
                            <Accordion
                                open={open === 3}
                                icon={<Icon id={3} open={open} />}
                            >
                                <div
                                    onClick={() => handleOpen(3)}
                                    className="w-full flex justify-between"
                                >
                                    Настройки
                                    <IoIosArrowDown />
                                </div>
                                <AccordionBody>
                                    <ul className="text-white">
                                        <li className="mb-1">Методы</li>
                                        <li className="mb-1">Документ</li>
                                        <li className="mb-1">Чек</li>
                                        <li className="mb-1">Панель</li>
                                        <li className="mb-1">Кабинеты</li>
                                    </ul>
                                </AccordionBody>
                            </Accordion>
                        ) : (
                            ""
                        )}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <BiSolidSelectMultiple size={30} />
                        {sidebar ? "Мульти-аккаунт" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiGuideFill size={30} />
                        {sidebar ? "Напровители" : ""}
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/profile"
                        className={`flex gap-2 justify-${
                            sidebar ? "start" : "center"
                        }`}
                    >
                        <RiHomeOfficeFill size={30} />
                        {sidebar ? "Склады" : ""}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
