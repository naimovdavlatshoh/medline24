import { IconButton, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GetDataSimple, PostDataTokenJson } from "../../../services";
import Pagination from "../../../components/Pagination";
import { FaCircleArrowRight } from "react-icons/fa6";
import { Payment } from "./Payment";
const TABLE_HEAD = ["N", "Мед услуга", "Сумма", "Действия"];
const TABLE_HEADUZ = ["N", "Med xizmat", "Narxi", "Amal"];

const Priyom = () => {
    const [menuStatus, setMenuStatus] = useState(1);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [patients, setPatients] = useState([]);
    const [payment_id, setPayment_id] = useState(null);
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(
            `api/visit/ambulator/payment/awating?page=${currentPage}&limit=10`
        ).then((res) => {
            setPatients(res?.result);
            console.log(res?.result);
        });
    }, [status]);

    useEffect(() => {
        if (payment_id) {
            GetDataSimple(
                `api/visit/ambulator/payment/read/${payment_id}`
            ).then((res) => {
                setPayment(res);
            });
        }
    }, [payment_id, status]);

    const changeStatus = () => {
        setStatus(!status);
    };

    const DeletePriyom = (id) => {
        const data = {
            comments: "Xato tanlangan",
        };
        PostDataTokenJson(
            `api/visit/ambulator/service/payment/cancel/${id}`,
            data
        ).then(() => {
            changeStatus();
        });
    };

    return (
        <div className="w-full h-full bg-theme-bg text-theme-text p-2 md:p-5">
            <div className="w-full flex justify-center items-center mb-5 md:mb-5">
                <button
                    onClick={() => setMenuStatus(1)}
                    className={`h-[50px] w-1/2 rounded-s-md flex justify-center items-center ${
                        menuStatus == 1
                            ? "bg-main-green text-white"
                            : "bg-white border border-main-green text-black"
                    }`}
                >
                    {language == "ru" ? "Приём платежей" : "Qabul to'lovi"}
                </button>
                <button
                    onClick={() => setMenuStatus(2)}
                    className={`h-[50px] w-1/2 rounded-e-md flex justify-center items-center ${
                        menuStatus == 2
                            ? "bg-main-green"
                            : "bg-white border border-main-green"
                    }`}
                ></button>
            </div>
            <div className="w-full flex flex-col xl:flex-row justify-between items-start">
                <div className="w-full xl:w-[40%] p-3 rounded-md border border-main-green shadow-md mb-5 xl:mb-0">
                    <div className="w-full flex justify-between items-center mb-3">
                        <p className="text-lg">
                            {language == "ru"
                                ? "Приём платежей"
                                : "Qabul to'lovi"}
                        </p>
                        <div className="w-1/2">
                            <Input
                                onChange={(e) => setSearch(e.target.value)}
                                label={language == "ru" ? "поиск" : "qidiruv"}
                                icon={
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                }
                            />
                        </div>
                    </div>
                    <div className="border-b border-main-green flex justify-start items-center py-1 mb-3">
                        <p className="w-[10%] font-bold">
                            {language == "ru" ? "Н" : "N"}
                        </p>
                        <p className="text-center w-[90%] font-bold">
                            {language == "ru" ? "Ф.И.О" : "F.I.O"}
                        </p>
                    </div>
                    {patients?.map((patient, ind) => (
                        <div
                            key={ind}
                            className="border-b border-main-green flex justify-between items-center py-1 mb-2 "
                        >
                            <p className="w-[10%] font-normal">{ind + 1}</p>
                            <p className="text-center w-[70%] font-normal">
                                {patient?.lastname +
                                    " " +
                                    patient?.firstname +
                                    " " +
                                    patient?.fathername}
                            </p>

                            <button
                                onClick={() => {
                                    setPayment_id(patient?.visit_id);
                                    setName(
                                        patient?.lastname +
                                            " " +
                                            patient?.firstname +
                                            " " +
                                            patient?.fathername
                                    );
                                }}
                                className="text-green-400 hover:text-main-green duration-300 cursor-pointer"
                            >
                                <FaCircleArrowRight size={20} />
                            </button>
                        </div>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                {payment_id && (
                    <div className="w-full xl:w-[55%] p-3 rounded-md border border-main-green shadow-md">
                        <p className="text-lg mb-3">{name}</p>
                        <table className="w-full min-w-max table-auto text-left mb-2">
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
                                {payment?.option?.map((item, index) => (
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
                                                {item?.service_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.service_price}
                                            </Typography>
                                        </td>

                                        <td className="flex justify-center w-[70px] items-center h-full pt-1">
                                            <IconButton
                                                onClick={() =>
                                                    DeletePriyom(
                                                        item?.visit_service_item_id
                                                    )
                                                }
                                                variant="text"
                                            >
                                                <TrashIcon
                                                    className="h-4 w-4"
                                                    color="red"
                                                />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-md">
                                {language == "ru" ? "Итого:" : "Jami:"}{" "}
                            </p>
                            <Payment
                                item={payment}
                                changeStatus={changeStatus}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Priyom;
