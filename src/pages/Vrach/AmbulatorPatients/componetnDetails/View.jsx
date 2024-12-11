import React, { useEffect, useState } from "react";
import { PiStethoscopeBold } from "react-icons/pi";
import { IoBagAddSharp } from "react-icons/io5";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import { FaEye } from "react-icons/fa";
const TABLE_HEAD = ["Услуга", "Действия"];
const TABLE_HEADUZ = ["Xizmat", "Amal"];

const View = (item) => {
    console.log(item);
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
                        <p className="flex gap-2 items-center">
                            <span>
                                <IoBagAddSharp />
                            </span>
                            <span>Пакеты</span>
                        </p>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            {language == "ru" ? (
                                <tr className="">
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Услуга
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-right">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Действия
                                        </Typography>
                                    </th>
                                </tr>
                            ) : (
                                <tr className="">
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Xizmat
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-right">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Amal
                                        </Typography>
                                    </th>
                                </tr>
                            )}
                        </thead>

                        <tbody>
                            <tr>
                                <td className="p-4 w-[40px] text-left">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        Пульмонолог
                                    </Typography>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        color="blue"
                                    >
                                        <p className="flex items-center gap-2">
                                            <span>
                                                <FaEye />
                                            </span>
                                            <span>Просмотр</span>
                                        </p>
                                    </Button>
                                    <Button
                                        color="green"
                                        size="sm"
                                        variant="outlined"
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        color="red"
                                        size="sm"
                                        variant="outlined"
                                    >
                                        Отмена
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default View;
