import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaEye } from "react-icons/fa";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Input,
    List,
    ListItem,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetDataSimple } from "../../../services";
import { useParams } from "react-router-dom";

const TABLE_HEAD = [
    "N",
    "Услуга/Медикоменты",
    "Наличные",
    "Пластик",
    "Перечисление",
    "Скидка",
    "Кассир",
];
const TABLE_HEADUZ = [
    "N",
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
        GetDataSimple(`api/visit/payment/history/read/${id}`).then((res) => {
            setPatients(res);
            console.log(res);
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
                                {name}
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <div className="w-full flex flex-col md:flex-row">
                        <div className="w-ful md:w-1/2">
                            <List>
                                <ListItem>
                                    {language == "ru"
                                        ? "Дата платежа :"
                                        : "To'lov sanasi :"}
                                    <span className="text-green-600">
                                        &nbsp;
                                        {patients?.payment_date
                                            ? patients?.payment_date
                                            : " dd/mm/yyyy"}
                                    </span>
                                </ListItem>

                                <ListItem>
                                    {" "}
                                    {language == "ru"
                                        ? "Сумма платежа :"
                                        : "To'lov summasi :"}
                                    <span className="text-blue-600">
                                        &nbsp;
                                        {patients?.total_price
                                            ? patients?.total_price
                                            : "0"}
                                    </span>
                                </ListItem>

                                <ListItem>
                                    {language == "ru" ? "Касса :" : "Kassir :"}
                                    <span className="text-red-600">
                                        &nbsp;
                                        {patients?.kassa_user_name
                                            ? patients?.kassa_user_name
                                            : "......"}
                                    </span>
                                </ListItem>
                                <ListItem>
                                    {language == "ru"
                                        ? "возврат :"
                                        : "qaytarilgan pul :"}
                                    <span className="text-red-600">
                                        &nbsp;
                                        {patients?.is_refused
                                            ? patients?.is_refused
                                            : "0"}
                                    </span>
                                </ListItem>
                            </List>
                        </div>
                        <div className="w-ful md:w-1/2">
                            <List>
                                <ListItem>
                                    {language == "ru" ? "Наличные :" : "Naqd :"}
                                    <span className="text-green-600">
                                        &nbsp;
                                        {patients?.payment_cash
                                            ? patients?.payment_cash
                                            : " dd/mm/yyyy"}
                                    </span>
                                </ListItem>

                                <ListItem>
                                    {" "}
                                    {language == "ru"
                                        ? "Пластик :"
                                        : "Plastik :"}
                                    <span className="text-blue-600">
                                        &nbsp;
                                        {patients?.payment_card
                                            ? patients?.payment_card
                                            : "0"}
                                    </span>
                                </ListItem>

                                <ListItem>
                                    {language == "ru"
                                        ? "Перечисление :"
                                        : "Pul ko'chirish :"}
                                    <span className="text-red-600">
                                        &nbsp;
                                        {patients?.payment_transfer
                                            ? patients?.payment_transfer
                                            : "......"}
                                    </span>
                                </ListItem>
                            </List>
                        </div>
                    </div>
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
                            {patients?.option?.map((opt, ind) => (
                                <tr key={ind}>
                                    <td className="p-4 w-[30px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {ind + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {opt?.service_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {opt?.service_price
                                            ? opt?.service_price
                                            : 0}
                                    </td>
                                    <td className="p-4">
                                        {opt?.price_with_aksiya
                                            ? opt?.price_with_aksiya
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
                                    <td className="p-4 w-[70px]">
                                        {opt?.moneyback?.moneyback_user_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                /> */}
            </Card>
        </div>
    );
};

export default HistoryDetail;
