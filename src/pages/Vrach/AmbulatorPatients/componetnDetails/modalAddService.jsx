import React, { useEffect, useState } from "react";
import { GetDataSimple, PostDataTokenJson } from "../../../../services";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
    Select,
    Option,
    Input,
    Card,
    CardBody,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const TABLE_HEAD = [
    "N",
    "Отдел",
    "Услуга",
    // "Тип",
    "Cпециалист",
    "Кол-во	",
    "Цена",
];
const TABLE_HEADUZ = [
    "N",
    "Bo'lim",
    "Xizmat",
    // "Turi",
    "Maxsus shifor",
    "Soni",
    "Narxi",
];

const ModalAddService = () => {
    const { id, patientId } = useParams();
    const [visitType, setVisitType] = useState(null);
    const [visits, setVisits] = useState([]);

    const [depts, setDepts] = useState([]);
    const [deptId, setDeptId] = useState("");
    const [language, setLanguage] = useState("ru");
    const [selectedDepts, setSelectedDepts] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    // Handler to update quantity
    const handleQuantityChange = (deptId, serviceId, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.dept_id == deptId && item.service_id == serviceId
                    ? { ...item, quantity: parseInt(value) || 0 }
                    : item
            )
        );
    };

    // Handler to update doctor_user_id
    const handleDoctorChange = (deptId, serviceId, value) => {
        console.log(deptId, serviceId, value);
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.dept_id == deptId && item.service_id == serviceId
                    ? { ...item, doctor_user_id: parseInt(value) || 0 }
                    : item
            )
        );
    };

    // Initialize items from selectedDepts
    React.useEffect(() => {
        const newItems = [];
        selectedDepts.forEach((dept) => {
            dept.services.forEach((service) => {
                newItems.push({
                    dept_id: parseInt(deptId),
                    service_id: parseInt(service.service_id),
                    quantity: 1,
                    doctor_user_id: 0,
                });
            });
        });
        setItems(newItems);
    }, [selectedDepts]);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(
            "api/doctor/assigned/services/role/department/list?role_id=9"
        ).then((res) => {
            setDepts(res?.departments);
        });
    }, []);

    useEffect(() => {
        if (deptId) {
            GetDataSimple(
                `api/visit/department/services?dept_id=${deptId}&patient_id=${patientId}`
            ).then((res) => {
                setSelectedDepts((prevDepts) => [...prevDepts, res]);
            });
        }
    }, [deptId]);

    const handleSelectedData = () => {
        const data = {
            items: items,
        };
        PostDataTokenJson(
            `api/doctor/ambulator/visit/add/services/${id}`,
            data
        ).then((res) => {
            navigate("/");
        });
    };

    const [open, setOpen] = useState(false);

    const toggleDialog = () => setOpen(!open);

    return (
        <>
            <button
                onClick={toggleDialog}
                className="flex gap-2 items-center text-main-green"
            >
                <span>
                    <AiOutlinePlus />
                </span>
                <span>Добавить</span>
            </button>

            <Dialog open={open} handler={toggleDialog} size="xl">
                <DialogHeader>
                    <p className="flex items-center gap-2 text-[24px]">
                        Назначить услугу
                    </p>
                </DialogHeader>

                <DialogBody divider>
                    <div className="px-4 md:px-20 py-4">
                        <div className="w-full md:w-3/4 mb-4 flex flex-col md:flex-row gap-4">
                            <Select
                                onChange={(value) => setDeptId(value)}
                                label={
                                    language === "ru" ? "Отделы:" : "Bo'limlar"
                                }
                            >
                                {depts?.map((item) => (
                                    <Option
                                        key={item?.dept_id}
                                        value={item?.dept_id}
                                    >
                                        {item?.department_name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="px-4 md:px-20 mb-4">
                        <Card className="bg-theme-bg text-theme-text">
                            <CardBody className="overflow-scroll px-0">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        {language === "ru" ? (
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
                                        {selectedDepts.map((dept) =>
                                            dept.services.map(
                                                (service, ind) => (
                                                    <tr key={ind}>
                                                        <td className="p-4">
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
                                                            >
                                                                {
                                                                    service.service_name
                                                                }
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                            >
                                                                {
                                                                    service.service_type_name
                                                                }
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Select
                                                                label={
                                                                    language ===
                                                                    "ru"
                                                                        ? "весь раздел выбран"
                                                                        : "to'liq bo'lim belgilangan"
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    handleDoctorChange(
                                                                        dept.dept_id,
                                                                        service.service_id,
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                {dept.doctors?.map(
                                                                    (doc) => (
                                                                        <Option
                                                                            key={
                                                                                doc?.id
                                                                            }
                                                                            value={
                                                                                doc?.doctor_user_id
                                                                            }
                                                                        >
                                                                            {
                                                                                doc.doctor_name
                                                                            }
                                                                        </Option>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </td>
                                                        <td className="p-4 w-[150px]">
                                                            <Input
                                                                type="number"
                                                                defaultValue={1}
                                                                label={
                                                                    language ===
                                                                    "ru"
                                                                        ? "Кол-во"
                                                                        : "Soni"
                                                                }
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        dept.dept_id,
                                                                        service.service_id,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="p-4 w-[80px]">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                            >
                                                                {
                                                                    service.service_price
                                                                }
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button
                        onClick={handleSelectedData}
                        className="bg-blue-500 text-white px-10 py-2 rounded-md"
                    >
                        {language === "ru" ? "отправить" : "Yuborish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ModalAddService;
