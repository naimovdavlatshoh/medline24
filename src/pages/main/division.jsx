import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
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
import {
    DeleteData,
    GetDataSimple,
    PostDataToken,
    PostDataTokenJson,
} from "../../services";
import Pagination from "../../components/Pagination";
import { Add } from "../../utils/constants";

const TABLE_HEAD = ["N", "Роль", "Отдел", "Действия"];
const TABLE_HEADUZ = ["N", "Rol", "Bo'lim", "Amal"];

const Division = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState("");
    const [department_name_ru, setDepartment_name_ru] = useState("");
    const [department_name_uz, setDepartment_name_uz] = useState("");
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
        GetDataSimple("api/department/roles/list").then((res) => setRoles(res));
    }, []);

    useEffect(() => {
        GetDataSimple("api/department/list?page=1&limit=10").then((res) => {
            setUsers(res?.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

    console.log(currentUser);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            role_id: role.role_id,
            department_name_ru: department_name_ru,
            department_name_uz: department_name_uz,
        };

        PostDataTokenJson("api/department/create", data).then(() =>
            handleOpen(null)
        ),
            setStatus(!status).catch(() => {
                handleOpen(null), setStatus(!status);
            });
    };
    const UpdateUser = (e) => {
        e.preventDefault();
        const data = {
            role_id: currentUser?.role_id,
            department_name_ru: currentUser?.department_name_ru,
            department_name_uz: currentUser?.department_name_uz,
        };

        PostDataTokenJson(`api/department/update/${currentUser?.dept_id}`, data)
            .then(() => handleOpen1(null))
            .catch(() => {
                handleOpen1(null), setStatus(!status);
            });
    };

    return (
        <div>
            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size === "md"}
                    size={size || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "Добавить Отдел"
                            : "Bo'lim qo'shish"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => AddUser(e)}>
                            <div className="flex justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбирите роль:"
                                                : "Rol tanlang:"
                                        }
                                        value={
                                            language == "ru"
                                                ? role?.role_name_ru
                                                : role?.role_name_uz
                                        }
                                    >
                                        {roles?.map((item) => (
                                            <Option
                                                onClick={() => {
                                                    setRole(item);
                                                }}
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {language == "ru"
                                                    ? item?.role_name_ru
                                                    : item?.role_name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Название отдела (uz)"
                                                : "Bo'lim nomi (uz)"
                                        }
                                        onChange={(e) =>
                                            setDepartment_name_uz(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setDepartment_name_ru(
                                                e.target.value
                                            )
                                        }
                                        label={
                                            language == "ru"
                                                ? "Название отдела (ru)"
                                                : "Bo'lim nomi (ru)"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="text"
                                    color="red"
                                    onClick={() => handleOpen(null)}
                                    className="mr-1"
                                >
                                    <span>
                                        {language == "ru"
                                            ? Add.rufalse
                                            : Add.uzfalse}
                                    </span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>
                                        {" "}
                                        {language == "ru"
                                            ? Add.rutrue
                                            : Add.uztrue}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </DialogBody>
                </Dialog>
            </>

            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size1 === "md"}
                    size={size1 || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "обновить Отдел"
                            : "bo'limni yangilash"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => UpdateUser(e)}>
                            <div className="flex justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбрать роль : " +
                                                  currentUser?.role_name_ru
                                                : "Rol tanlash : " +
                                                  currentUser?.role_name_uz
                                        }
                                        value={
                                            language == "ru"
                                                ? role?.role_name_ru
                                                : role?.role_name_uz
                                        }
                                    >
                                        {roles?.map((item, index) => (
                                            <Option
                                                onClick={() => {
                                                    setCurrentUser((prev) => ({
                                                        ...prev,
                                                        ["role_id"]:
                                                            item?.role_id,
                                                    }));
                                                }}
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {language == "ru"
                                                    ? item.role_name_ru
                                                    : item.role_name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        defaultValue={
                                            currentUser?.department_name_uz
                                        }
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["department_name_uz"]:
                                                    e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Название отдела (uz)"
                                                : "Bo'limning nomlanishi (uz)"
                                        }
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        defaultValue={
                                            currentUser?.department_name_ru
                                        }
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["department_name_ru"]:
                                                    e.target.value,
                                            }))
                                        }
                                        label={
                                            language == "ru"
                                                ? "Название отдела (ru)"
                                                : "Bo'limning nomlanishi (ru)"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="text"
                                    color="red"
                                    onClick={() => handleOpen1(null)}
                                    className="mr-1"
                                >
                                    <span>
                                        {language == "ru"
                                            ? Add.rufalse
                                            : Add.uzfalse}
                                    </span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>
                                        {" "}
                                        {language == "ru"
                                            ? Add.rutrue
                                            : Add.uztrue}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </DialogBody>
                </Dialog>
            </>

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
                                    ? "Список Отделов"
                                    : "Bo'limlar ro'yxati"}
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
                            <Button
                                className="flex items-center gap-3 "
                                onClick={() => handleOpen("md")}
                                size="sm"
                            >
                                {language == "ru"
                                    ? "Добавить Отдел"
                                    : "Bo'lim qo'shish"}
                            </Button>
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
                            {users.map((item, index) => (
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
                                            className="font-bold"
                                        >
                                            {language == "ru"
                                                ? item?.role_name_ru
                                                : item?.role_name_uz}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {language == "ru"
                                                ? item?.department_name_ru
                                                : item?.department_name_uz}
                                        </Typography>
                                    </td>

                                    <td>
                                        <Tooltip
                                            content={
                                                language == "ru"
                                                    ? "обновить Отдел"
                                                    : "bo'limni yangilash"
                                            }
                                        >
                                            <IconButton
                                                variant="text"
                                                onClick={() => {
                                                    handleOpen1("md"),
                                                        setCurrentUser(item);
                                                }}
                                            >
                                                <PencilIcon
                                                    className="h-4 w-4"
                                                    color="orange"
                                                />
                                            </IconButton>
                                        </Tooltip>
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

export default Division;
