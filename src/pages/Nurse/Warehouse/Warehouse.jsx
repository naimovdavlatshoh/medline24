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
import { BiBarcodeReader } from "react-icons/bi";

import { Link } from "react-router-dom";

import Pagination from "../../../components/Pagination";
import { GetDataSimple, PostSimple } from "../../../services";

const TABLE_HEAD = [
    "N",
    "Наименование",
    "Производитель",
    "Стоимость",
    "Кол-во доступно/бронь",
    "Срок годности",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Nomi",
    "Ishlab chiqaruvchi",
    "Narxi",
    "Nechtaligi/bron",
    "Yaroqlilik muddati",
    "Amal",
];

const NurseWarehouse = () => {
    const [coming, setComing] = useState([]);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const [warehouseId, setWarehouseId] = useState(
        localStorage.getItem("warehouse_id")
    );

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(
            `api/nursewarehouse/storage/list?warehouse_id=${warehouseId}&page=${currentPage}&limit=10`
        ).then((res) => {
            setComing(res?.result);
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
                                    ? "Список приходы"
                                    : "Kirimlar ro'yxati"}
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
                            {coming.map((item, index) => (
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
                                    <td className="p-4 ">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.invoice_number}
                                        </Typography>
                                    </td>
                                    <td className="p-4 ">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.supplier_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4 ">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.delivery_date}
                                        </Typography>
                                    </td>
                                    <td className="p-4 w-[80px]">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {/* {item} */}
                                        </Typography>
                                    </td>

                                    <td className="p-4 w-[80px]"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                {search.length >= 3 ? (
                    ""
                ) : (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </Card>
        </div>
    );
};

export default NurseWarehouse;
