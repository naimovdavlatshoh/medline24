import React, { useEffect, useState } from "react";
import { PiStethoscopeBold } from "react-icons/pi";
import { IoBagAddSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import { FaEye } from "react-icons/fa";
const TABLE_HEAD = [
    "№",
    "Отдел/Специалист",
    "Дата визита",
    "Дата завершения",
    "Мед услуга",
    "Статус",
    "Действия",
];
const TABLE_HEADUZ = [
    "№",
    "Bolim/Specialist",
    "Vizit vaqti",
    "Tugash vaqti",
    "Tibbiy Xizmat",
    "Status",
    "Amal",
];

const AddService = (item) => {
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);
    return (
        <div className="">
            <Card className="h-full w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none "
                >
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <p className="flex gap-2 items-center">
                            <span>
                                <item.icon />
                            </span>
                            <span>{item.title}</span>
                        </p>
                        <button className="flex gap-2 items-center text-main-green">
                            <span>
                                <AiOutlinePlus />
                            </span>
                            <span>Пакеты</span>
                        </button>
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

                        <tbody></tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddService;
