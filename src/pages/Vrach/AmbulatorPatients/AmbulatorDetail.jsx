import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PiStethoscopeBold } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import { GiDrop } from "react-icons/gi";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosPulse } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { SlPuzzle } from "react-icons/sl";

import { useParams } from "react-router-dom";
import { GetDataSimple } from "../../../services";
import View from "./componetnDetails/View";
import OtherService from "./componetnDetails/otherService";
import AddService from "./componetnDetails/addService";
import Analyze from "./componetnDetails/analyze";
import Diagnostik from "./componetnDetails/diagnostik";
import Fizioterapy from "./componetnDetails/fizioterpy";
import Document from "./componetnDetails/document";

const TABLE_HEAD = [
    "N",
    "ФИО",
    "Дата рождения",
    "Мед услуга",
    "Направитель",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "FISH",
    "Tug'ilgan sana",
    "Med xizmat",
    "Yo'naltiruvchi",
    "Amal",
];

const AmbulatorDetail = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [deleteId, setDeletedId] = useState(null);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const [menu, setMenu] = useState(1);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(`api/doctor/ambulator/patient/card/read/${id}`).then(
            (res) => {
                setPatient(res);
                console.log(res);
            }
        );
    }, [status]);

    return (
        <div>
            <Card className="h-full w-full bg-theme-bg text-theme-text">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none bg-theme-bg text-theme-text"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:items-start bg-theme-bg text-theme-text">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                {language == "ru"
                                    ? "Амбулаторные пациенты"
                                    : "Ambulatorlar"}
                            </Typography>
                        </div>

                        <div className="flex w-full shrink-0 gap-2   min-h-[200px] bg-green-50 p-5 md:p-5 rounded-xl shadow-lg">
                            <ul className="flex flex-col lg:flex-row justify-start gap-0 lg:gap-10 items-start w-full text-black">
                                <div className="w-full lg:w-1/2">
                                    <li className="font-semibold mb-2">
                                        адрес. :{" "}
                                        <span className="font-normal">
                                            {patient?.address}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        дата назначения :{" "}
                                        <span className="font-normal">
                                            {patient?.appointment_date}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        имя гражданина. :{" "}
                                        <span className="font-normal">
                                            {patient?.patient_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        дата рождения. :{" "}
                                        <span className="font-normal">
                                            {patient?.date_of_birth}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        название района:{" "}
                                        <span className="font-normal">
                                            {patient?.region_name}
                                        </span>
                                    </li>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <li className="font-semibold mb-2">
                                        пол. :{" "}
                                        <span className="font-normal">
                                            {patient?.gender_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        местный?. :{" "}
                                        <span className="font-normal">
                                            {patient?.citizen_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        номер телефона. :{" "}
                                        <span className="font-normal">
                                            {patient?.phone_number}
                                        </span>
                                    </li>

                                    <li className="font-semibold mb-2">
                                        тип посещения. :{" "}
                                        <span className="font-normal">
                                            {patient?.visit_name}
                                        </span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-5">
                    <div className="w-full shrink-0 gap-2  min-h-[300px] bg-green-50  rounded-xl shadow-lg pb-5">
                        <div className="w-full h-[60px] bg-green-400 p-2 md:p-5 rounded-t-xl text-white border-b-2 border-white">
                            <p>Просмотр визита</p>
                        </div>

                        <div className="flex justify-center items-center w-full flex-wrap bg-green-100 text-black mb-5  lg:mb-10">
                            <div
                                onClick={() => setMenu(1)}
                                className={`cursor-pointer text-center  ${
                                    menu == 1
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <PiStethoscopeBold />
                                    </span>
                                    <span>Осмотр</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(2)}
                                className={` cursor-pointer text-center ${
                                    menu == 2
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <LuClipboardList />
                                    </span>
                                    <span>Другие услуги</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(3)}
                                className={` cursor-pointer text-center ${
                                    menu == 3
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <FiPlusCircle />
                                    </span>
                                    <span>Назначенные услуги</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(4)}
                                className={`cursor-pointer text-center ${
                                    menu == 4
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <GiDrop />
                                    </span>
                                    <span>Анализы</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(5)}
                                className={`cursor-pointer text-center ${
                                    menu == 5
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <IoIosPulse />
                                    </span>
                                    <span>Диагностика</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(6)}
                                className={` cursor-pointer text-center ${
                                    menu == 6
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <FiPlusSquare />{" "}
                                    </span>
                                    <span>Физиотерапия</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(7)}
                                className={` cursor-pointer text-center ${
                                    menu == 7
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <IoDocumentsOutline />{" "}
                                    </span>
                                    <span>Документы</span>
                                </p>
                            </div>
                            <div
                                onClick={() => setMenu(8)}
                                className={` cursor-pointer text-center  ${
                                    menu == 8
                                        ? "bg-green-400 text-white"
                                        : "bg-green-100 text-dark"
                                } px-2 md:px-10 py-1`}
                            >
                                <p className="flex gap-2 items-center">
                                    <span>
                                        <SlPuzzle />
                                    </span>
                                    <span> Расходные материалы</span>
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-2 md:px-5 mb-5">
                            {menu == 1 && (
                                <View
                                    title={"Осмотр"}
                                    icon={PiStethoscopeBold}
                                />
                            )}
                            {menu == 2 && (
                                <OtherService
                                    title={"Другие услуги"}
                                    icon={LuClipboardList}
                                />
                            )}
                            {menu == 3 && (
                                <AddService
                                    title={"Назначенные услуги"}
                                    icon={FiPlusCircle}
                                />
                            )}
                            {menu == 4 && (
                                <Analyze title={"Анализы"} icon={GiDrop} />
                            )}
                            {menu == 5 && (
                                <Diagnostik
                                    title={"Диагностика"}
                                    icon={IoIosPulse}
                                />
                            )}
                            {menu == 6 && (
                                <Fizioterapy
                                    title={"Физиотерапия"}
                                    icon={FiPlusSquare}
                                />
                            )}
                            {menu == 7 && (
                                <Document
                                    title={"Документы"}
                                    icon={IoDocumentsOutline}
                                />
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AmbulatorDetail;
