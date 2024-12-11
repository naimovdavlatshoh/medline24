import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaEye } from "react-icons/fa";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetDataSimple } from "../../../services";
import Pagination from "../../../components/Pagination";
import { Link, useParams } from "react-router-dom";

const TABLE_HEAD = [
    "Услуга/Медикоменты",
    "Наличные",
    "Пластик",
    "Перечисление",
    "Скидка",
    "Кассир",
];
const TABLE_HEADUZ = [
    "Xizmat",
    "Naqd",
    "Plastik",
    "Perechislenie",
    "Skidka",
    "Kassir",
];

const HistoryDetail = () => {
    const { id, name } = useParams();
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
        GetDataSimple(`api/visit/ambulator/paid/history/details/${id}`).then(
            (res) => {
                setPatients(res);
                console.log(res);
            }
        );
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
                                {name}
                            </Typography>
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
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            )}
                        </thead>

                        <tbody>
                            <tr>
                                <td className="p-4">
                                    {patients?.services?.map((item) => (
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {item?.service_name}
                                        </Typography>
                                    ))}
                                </td>
                                <td className="p-4">
                                    {patients?.payment_cash
                                        ? patients?.payment_cash
                                        : 0}
                                </td>
                                <td className="p-4">
                                    {patients?.payment_card
                                        ? patients?.payment_card
                                        : 0}
                                </td>
                                <td className="p-4">
                                    {patients?.payment_transfer
                                        ? patients?.payment_transfer
                                        : 0}
                                </td>
                                <td className="p-4">
                                    {patients?.services?.map((item) => (
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {item?.aksiya_info?.length >= 1
                                                ? "Скидка"
                                                : "Нет данных"}
                                        </Typography>
                                    ))}
                                </td>
                                <td className="p-4">
                                    {patients?.kassa_user_name}
                                </td>
                            </tr>
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

export default HistoryDetail;
