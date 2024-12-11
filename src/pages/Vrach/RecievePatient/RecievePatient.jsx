import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoIosSettings } from "react-icons/io";

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

import Pagination from "../../../components/Pagination";

import { Link } from "react-router-dom";
import { GetDataSimple, PostSimple } from "../../../services";

const TABLE_HEAD = [
    "N",
    "ФИО",
    "Дата рождения",
    "Дата назначения",
    "Мед услуга",
    "Направитель",
    "Тип визита",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "FISH",
    "Tug'ilgan sana",
    "Tashxis kuni",
    "Med xizmat",
    "Yo'naltiruvchi",
    "Tshrif turi",
    "Amal",
];

const RecievePatient = () => {
    const [patients, setPatients] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(
            `api/doctor/awating/list?page=${currentPage}&limit=10`
        ).then((res) => {
            setPatients(res?.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

    const receivePatient = (id) => {
        PostSimple(`api/doctor/accept/patient/${id}`).then(() => {
            setStatus(!status);
        });
    };

    return (
        <div>
            <Card className="h-full w-full bg-theme-bg text-theme-text">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none bg-theme-bg text-theme-text"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center bg-theme-bg text-theme-text">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                {language == "ru"
                                    ? "Пациенты на приём"
                                    : "Qabuldagi bemorlar ro'yxati"}
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    onChange={(e) => setSearch(e.target.value)}
                                    label={
                                        language == "ru" ? "поиск" : "qidiruv"
                                    }
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            {language == "ru" ? (
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            ) : (
                                <tr>
                                    {TABLE_HEADUZ.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            )}
                        </thead>
                        {search.length >= 2 ? (
                            <tbody>
                                {searchData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.firstname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.lastname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.fathername}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.date_of_birth}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.phone_number}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.region_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.district_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.visit_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.status_name}
                                            </Typography>
                                        </td>
                                        {/*
                                        <td>
                                            <IconButton
                                                variant="text"
                                                onClick={() =>
                                                    deleteData(item.diet_id)
                                                }
                                            >
                                                <TrashIcon
                                                    className="h-4 w-4"
                                                    color="red"
                                                />
                                            </IconButton>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                {patients.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-4 w-[40px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.patient_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.date_of_birth}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.appointment_date}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.service_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.sender_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[50px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className={`${
                                                    item?.visit_name ==
                                                    "Амбулаторный"
                                                        ? "border-main-green  text-main-green"
                                                        : "border-red-500 text-red-500"
                                                } border text-center  rounded-md`}
                                            >
                                                {item?.visit_name}
                                            </Typography>
                                        </td>

                                        <td className="p-4 w-[80px]">
                                            <Button
                                                onClick={() =>
                                                    receivePatient(
                                                        item?.visit_service_item_id
                                                    )
                                                }
                                                className="bg-main-green "
                                                size="sm"
                                            >
                                                принять
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </CardBody>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </Card>
        </div>
    );
};

export default RecievePatient;
