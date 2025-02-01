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
import { AddDrug } from "./AddDrug";
import { AddBarcode } from "./AddBarcode";

const TABLE_HEAD = [
    "N",
    "Название препарата",
    "Штрих-код",
    "Название категории",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Dori nomi",
    "Shtrix kod",
    "Kategoriya nomi",
    "Amal",
];

const Drugs = () => {
    const [drugs, setDrugs] = useState([]);
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
            `api/userwarehouse/medicoments/list?page=${currentPage}&limit=10`
        ).then((res) => {
            setDrugs(res?.result);
            console.log(res.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

    useEffect(() => {
        if (search.length >= 3) {
            GetDataSimple(
                `api/userwarehouse/medicament/search?keyword=${
                    search ? search : ""
                }`
            ).then((res) => {
                setSearchData(res);
            });
        }
    }, [search]);

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
                                    ? "Список лекарств"
                                    : "Dorilar ro'yxati"}
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
                            <AddDrug
                                changeStatus={changeStatus}
                                language={language}
                            />
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

                        {search.length >= 3 ? (
                            <tbody>
                                {searchData.map((item, index) => (
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
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.medicament_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.barcode}
                                            </Typography>
                                        </td>
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.category_name}
                                            </Typography>
                                        </td>

                                        <td className="p-4 w-[80px]">
                                            <AddBarcode
                                                item={item}
                                                language={language}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                {drugs.map((item, index) => (
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
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.medicament_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.barcode}
                                            </Typography>
                                        </td>
                                        <td className="p-4 ">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.category_name}
                                            </Typography>
                                        </td>

                                        <td className="p-4 w-[80px]">
                                            <AddBarcode
                                                item={item}
                                                language={language}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
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

export default Drugs;
