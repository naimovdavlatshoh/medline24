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

import { DeleteData, GetDataSimple } from "../../services";

import { Delete } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import { AddDiet } from "./AddDiet";
import { EditDiet } from "./EditDiet";

const TABLE_HEAD = [
    "N",
    "Еда",
    "ЦЕНА ЗАВТРАКА",
    "ЦЕНА ОБЕДА",
    "ЦЕНА УЖИНА",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Ovqat",
    "Nonushta narxi",
    "Tushlik vaqti",
    "Kechki ovqat narxi",
    "Amal",
];

const Diet = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };
    const [diets, setDiets] = useState([]);
    const [deleteId, setDeletedId] = useState(null);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(`api/diet/list?page=${currentPage}&limit=10`).then(
            (res) => {
                setDiets(res?.result);
                console.log(res.result);
                setTotalPages(res?.pages);
            }
        );
    }, [status, currentPage]);

    const changeStatus = () => {
        setStatus(!status);
    };

    const DeleteFinish = () => {
        DeleteData(`/api/diet/delete/${deleteId}`).then((res) => {
            setOpen(!open);
            setStatus(!status);
        });
    };

    const deleteData = (id) => {
        setOpen(!open);
        setDeletedId(id);
    };

    return (
        <div>
            <Dialog open={open} handler={handleOpen}>
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
            </Dialog>
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
                                    ? "Список склад"
                                    : "Omborxona ro'yxati"}
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
                            <AddDiet
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
                            {diets.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.diet_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.breakfast_price}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.lunch_price}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            {item?.evening_meal_price}
                                        </Typography>
                                    </td>

                                    <td>
                                        <EditDiet
                                            item={item}
                                            changeStatus={changeStatus}
                                            language={language}
                                        />

                                        <IconButton
                                            variant="text"
                                            onClick={() =>
                                                deleteData(item.diet_id)
                                            }
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

export default Diet;
