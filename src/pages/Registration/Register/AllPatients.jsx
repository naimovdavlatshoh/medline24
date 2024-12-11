import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoIosSettings } from "react-icons/io";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Select,
    Option,
    DialogFooter,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { DeleteData, GetDataSimple } from "../../../services";

import { Delete } from "../../../utils/constants";
import Pagination from "../../../components/Pagination";
import { AddPatients } from "./AddPatients";
import { EditPatients } from "./EditPatients";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    "N",
    "Имя",
    "Фамилия",
    "Отчество",
    "Дата рождения",
    "Номер телефона",
    "Область",
    "Округ",
    "Тип визита",
    "Статус",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Ism",
    "Familya",
    "Sharif",
    "Tug'ilgan sana",
    "Telefon raqam",
    "Viloyat",
    "Tuman",
    "Tashrif turi",
    "Status",
    "Amal",
];

const AllPatients = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };
    const [patients, setPatients] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [deleteId, setDeletedId] = useState(null);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(`api/visit/list?page=${currentPage}&limit=10`).then(
            (res) => {
                setPatients(res?.result);
                console.log(res.result);
                setTotalPages(res?.pages);
            }
        );
    }, [status, currentPage]);

    console.log(search);

    useEffect(() => {
        if (search.length >= 3) {
            GetDataSimple(`api/visit/patientsearch?keyword=${search}`).then(
                (res) => {
                    setSearchData(res?.result);
                    console.log(res.result);
                    setTotalPages(res?.pages);
                }
            );
        }
    }, [search]);

    const changeStatus = () => {
        setStatus(!status);
    };

    // const DeleteFinish = () => {
    //     DeleteData(`/api/diet/delete/${deleteId}`).then((res) => {
    //         setOpen(!open);
    //         setStatus(!status);
    //     });
    // };

    // const deleteData = (id) => {
    //     setOpen(!open);
    //     setDeletedId(id);
    // };

    return (
        <div>
            {/* <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    {language == "ru" ? Delete.titleru : Delete.titleuz}
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-1"
                    >
                        <span>
                            {language == "ru" ? Delete.rufalse : Delete.uzfalse}
                        </span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={DeleteFinish}
                    >
                        <span>
                            {language == "ru" ? Delete.rutrue : Delete.uztrue}
                        </span>
                    </Button>
                </DialogFooter>
            </Dialog> */}
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
                                    ? "Список пациентов"
                                    : "Bemorlar ro'yxati"}
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
                            <AddPatients
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
                        {search.length >= 2 ? (
                            <tbody>
                                {searchData.map((item, index) => (
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
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.firstname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.lastname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.fathername}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.date_of_birth}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.phone_number}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.region_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.district_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.visit_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.status_name}
                                            </Typography>
                                        </td>

                                        <td>
                                            <EditPatients
                                                item={item}
                                                changeStatus={changeStatus}
                                                language={language}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                {patients.map((item, index) => (
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
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.firstname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.lastname}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.fathername}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.date_of_birth}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.phone_number}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.region_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.district_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.visit_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4 w-[80px]">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {item?.status_name}
                                            </Typography>
                                        </td>

                                        <td>
                                            <EditPatients
                                                item={item}
                                                changeStatus={changeStatus}
                                                language={language}
                                            />

                                            {/* <IconButton
                                                variant="text"
                                                onClick={() =>
                                                    deleteData(item.diet_id)
                                                }
                                            >
                                                <TrashIcon
                                                    className="h-4 w-4"
                                                    color="red"
                                                />
                                            </IconButton> */}
                                            <Menu placement="left">
                                                <MenuHandler>
                                                    <Button
                                                        size="sm"
                                                        className="p-1 rounded-full text-white"
                                                        color="amber"
                                                    >
                                                        <CiMenuKebab />
                                                    </Button>
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem>
                                                        <Link
                                                            to={`/addvisit/${item?.patient_id}`}
                                                        >
                                                            Назначить визит
                                                            (Aмбулаторный)
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem
                                                        className="w-full"
                                                        onClick={() =>
                                                            navigate(
                                                                `/patient-visits/${item?.patient_id}`
                                                            )
                                                        }
                                                    >
                                                        Визиты
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
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

export default AllPatients;
