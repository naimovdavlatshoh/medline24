import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaEye } from "react-icons/fa";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Input,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
    GetDataSimple,
    PostDataTokenJson,
    PostSimple,
} from "../../../services";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
    "N",
    "ФИО",
    "Мед услуга",
    "Дата назначения",
    "Направитель",
    "Отдел",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "FIO",
    "Tibbiy Xizmat",
    "Tibbiy tashxis",
    "Yo'naltiruvchi",
    "Bo'lim",
    "Amal",
];

const Unaccepted = () => {
    const [patients, setPatients] = useState([]);
    const [status, setStatus] = useState(false);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(
            `api/visit/unaccepted/services/list?page=${currentPage}&limit=10`
        ).then((res) => {
            setPatients(res?.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

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
                                    ? "Не принятые услуги"
                                    : "Qabul qilinmagan xizmatlar"}
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
                                                className="font-bold leading-none opacity-70"
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
                                    <td className="p-4 w-[20px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4 w-[60px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.patient_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.service_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.service_date}
                                        </Typography>
                                    </td>
                                    <td className="p-4 w-[60px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.sender_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.department_name}
                                        </Typography>
                                    </td>

                                    <td className="p-4">
                                        <Button
                                            onClick={() =>
                                                PostSimple(
                                                    `api/visit/cancellation/services/${item?.visit_service_item_id}`
                                                ).then((res) => {
                                                    setStatus(!status);
                                                })
                                            }
                                            color="red"
                                            variant="outlined"
                                            size="sm"
                                        >
                                            {language == "ru"
                                                ? "Отмена"
                                                : "Bekor qilish"}
                                        </Button>
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

export default Unaccepted;
