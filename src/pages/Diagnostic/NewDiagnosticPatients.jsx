import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Button } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { FaEye } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { GetDataSimple, PostSimple } from "../../services";

const TABLE_HEAD = [
    "N",
    "ФИО",
    "Дата рождения",
    "Дата назначения",
    "Услуги",
    "Направитель",
    "Тип визита",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "FISH",
    "Tug'ilgan sana",
    "Tashxis sana",
    "Xizmat",
    "Yo'naltiruvchi",
    "Tashrif turi",
    "Amal",
];

const NewDiagnosticPatients = () => {
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
            `api/diagnostics/awating/list?page=${currentPage}&limit=10`
        ).then((res) => {
            setPatients(res?.result);
            console.log(res.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

    const changeStatus = () => {
        setStatus(!status);
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
                                    : "Qabuldagi bemorlar"}
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
                                    <td className="p-4 w-[80px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.visit_name}
                                        </Typography>
                                    </td>

                                    <td className="p-4 w-[80px]">
                                        <button
                                            onClick={() =>
                                                PostSimple(
                                                    `api/diagnostics/accept/patient/${item?.visit_service_item_id}`
                                                ).then(() => {
                                                    setStatus(!status);
                                                })
                                            }
                                            className="px-5 bg-main-green text-white py-1 rounded-md"
                                        >
                                            {language == "ru"
                                                ? "принять"
                                                : "qabul qilish"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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

export default NewDiagnosticPatients;
