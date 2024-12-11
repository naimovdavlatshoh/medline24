import React, { useEffect, useState } from "react";
import {
    GetDataSimple,
    PostDataToken,
    PostDataTokenJson,
} from "../../../services";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
    Button,
    Card,
    CardBody,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";

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

const AddVisit = () => {
    const { id } = useParams();
    const [visitType, setVisitType] = useState(null);
    const [visits, setVisits] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [director, setDirector] = useState(null);
    const [depts, setDepts] = useState([]);
    const [deptId, setDeptId] = useState("");
    const [countday, setCountday] = useState(0);
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
        GetDataSimple("api/visittype/list").then((res) => {
            setVisits(res?.main);
            // console.log(res);
        });
    }, []);
    // useEffect(() => {
    //     GetDataSimple("api/refdoctor/list?page=1&limit=10").then((res) => {
    //         setDirectors(res?.result);
    //         // console.log(res);
    //     });
    // }, []);
    useEffect(() => {
        GetDataSimple("api/department/list?page=1&limit=10").then((res) => {
            setDepts(res?.result);
            // console.log(res);
        });
    }, []);
    useEffect(() => {
        if (deptId) {
            GetDataSimple(
                `api/visit/department/services?dept_id=${deptId}&patient_id=${id}`
            ).then((res) => {
                setSelectedDepts((prevDepts) => [...prevDepts, res]);
            });
        }
    }, [deptId]);

    const handleSelectedData = () => {
        const data = {
            patient_id: parseInt(id),
            visit_type_id: parseInt(visitType),
            items: items,
        };
        PostDataTokenJson("api/visit/create", data).then((res) => {
            navigate("/");
        });
    };

    return (
        <div className="min-h-screen w-full bg-theme-bg text-theme-text px-2 py-2 md:px-10 flex flex-col items-start">
            <Link to={"/"} className="">
                <Button
                    variant="text"
                    size="sm"
                    className="flex justify-start gap-2 items-center text-[24px]"
                >
                    <IoIosArrowRoundBack size={40} />{" "}
                    {language == "ru" ? "назад" : "orqaga"}
                </Button>
            </Link>

            <div className="w-full px-4 md:px-20 py-10">
                <h1 className="text-2xl mb-5">
                    {language == "ru"
                        ? "Назначить лечение"
                        : "Davolashni tashkil qilish"}
                </h1>
                <div className="w-full md:w-1/4 mb-4">
                    <Select
                        onChange={(value) => setVisitType(value)}
                        label={language == "ru" ? "Тип визита" : "Visit turi"}
                    >
                        {visits?.map((item, index) => (
                            <Option key={index} value={item?.visit_type_id}>
                                {item?.visit_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="w-full md:w-3/4 mb-4 flex flex-col md:flex-row gap-4">
                    {/* <Select
                        onChange={(value) => setDirector(value)}
                        label={
                            language == "ru" ? "Направитель:" : "Yo'naltiruvchi"
                        }
                    >
                        {directors?.map((item) => (
                            <Option value={item?.referred_id}>
                                {item?.full_name}
                            </Option>
                        ))}
                    </Select> */}
                    <Select
                        onChange={(value) => setDeptId(value)}
                        label={language == "ru" ? "Отделы:" : "Bo'limlar"}
                    >
                        {depts?.map((item) => (
                            <Option value={item?.dept_id}>
                                {item?.department_name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="w-full px-4 md:px-20 mb-4">
                <Card className="h-full w-full bg-theme-bg text-theme-text">
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
                                    dept.services.map((service, ind) => (
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
                                                    {service.service_name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                >
                                                    {service.service_type_name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Select
                                                    label={
                                                        language === "ru"
                                                            ? "весь раздел выбран"
                                                            : "to'liq bo'lim belgilangan"
                                                    }
                                                    onChange={(value) =>
                                                        handleDoctorChange(
                                                            deptId,
                                                            service.service_id,
                                                            value
                                                        )
                                                    }
                                                >
                                                    {/* <Option defaultValue={0}>
                                                        {language === "ru"
                                                            ? "Все отделы"
                                                            : "Hammasi"}
                                                    </Option> */}
                                                    {dept.doctors?.map(
                                                        (doc) => (
                                                            <Option
                                                                key={doc?.id}
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
                                                        language === "ru"
                                                            ? "Кол-во"
                                                            : "Soni"
                                                    }
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            deptId,
                                                            service.service_id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-4 w-[80px]">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                >
                                                    {service.service_price}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
            <div className="w-full flex justify-center my-4">
                <button
                    onClick={handleSelectedData}
                    className="bg-blue-500 text-white px-10 py-2 rounded-md"
                >
                    отправить
                </button>
            </div>
        </div>
    );
};

export default AddVisit;
