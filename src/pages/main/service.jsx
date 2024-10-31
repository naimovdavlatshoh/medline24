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
import { Add, Delete, Edit } from "../../utils/constants";

const TABLE_HEAD = [
    "N",
    "Роль",
    "Отдел",
    "Название",
    "Тип",
    "Цена",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Rol",
    "Bo'lim",
    "Nomlanishi",
    "Tur",
    "Narx",
    "Amal",
];

const Service = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [parts, setParts] = useState([]);
    const [part, setPart] = useState(null);

    const [users, setUsers] = useState([]);
    const [deletedId, setDeletedId] = useState(null);

    const [status, setStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [serviceru, setServiceru] = useState("");
    const [serviceuz, setServiceuz] = useState("");
    const [priceru, setPriceru] = useState(0);
    const [priceuz, setPriceuz] = useState(0);
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
        GetDataSimple("api/services/visits").then((res) => {
            setTypes(res);
        });
    }, []);

    useEffect(() => {
        GetDataSimple("api/department/list?page=1&limit=10").then((res) => {
            setParts(res.result);
        });
    }, []);

    useEffect(() => {
        GetDataSimple("api/department/roles/list").then((res) => {
            setRoles(res);
        });
    }, []);

    useEffect(() => {
        GetDataSimple("api/services/list?page=1&limit=10").then((res) => {
            setUsers(res?.result);
            setTotalPages(res?.pages);
        });
    }, [status, currentPage]);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            service_name_ru: serviceru,
            service_name_uz: serviceuz,
            price_for_locals: priceuz,
            price_for_tourist: priceru,
            role_id: role,
            service_type: type?.visit_type_id,
            dept_id: part,
        };

        PostDataTokenJson("api/services/create", data).then(() =>
            handleOpen(null)
        );
        setStatus(!status).catch(() => {
            handleOpen(null), setStatus(!status);
        });
    };

    console.log(currentUser);

    const UpdateUser = (e) => {
        e.preventDefault();
        const data = {
            firstname: currentUser?.firstname,
            lastname: currentUser?.lastname,
            fathername: currentUser.fathername,
            login: currentUser?.login,
            password: currentUser?.password,
            role_id: currentUser?.role_id,
        };

        PostDataTokenJson(`api/user/update/${currentUser?.user_id}`, data)
            .then(() => handleOpen1(null))
            .catch(() => {
                handleOpen1(null), setStatus(!status);
            });
    };

    const DeleteFinish = () => {
        DeleteData(`api/services/delete/${deletedId}`).then((res) => {
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

            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size === "xl"}
                    size={size || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "добавить услугу"
                            : "xizmat qo'shish"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => AddUser(e)}>
                            <div className="flex justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "выбрать роль:"
                                                : "Rol tanlang:"
                                        }
                                    >
                                        {roles.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setRole(item?.role_id)
                                                }
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {language == "ru"
                                                    ? item?.role_name_ru
                                                    : item?.role_name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "выбрать отдел:"
                                                : "bo'lim tanlang:"
                                        }
                                    >
                                        {parts.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setPart(item?.role_id)
                                                }
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {language == "ru"
                                                    ? item?.department_name_ru
                                                    : item?.department_name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбирите тип:"
                                                : "tur tanlang:"
                                        }
                                        value={
                                            language == "ru"
                                                ? role?.role_name_ru
                                                : role?.role_name_uz
                                        }
                                    >
                                        {types?.map((item) => (
                                            <Option
                                                onClick={() => {
                                                    setType(item);
                                                }}
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {language == "ru"
                                                    ? item.visit_name_ru
                                                    : item.visit_name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setServiceru(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "имя службы (ru):"
                                                : "xizmat nomi (ru):"
                                        }
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setServiceuz(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "имя службы (uz):"
                                                : "xizmat nomi (uz):"
                                        }
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setPriceuz(e.target.value)
                                        }
                                        label={
                                            language == "ru"
                                                ? "цена за местный:"
                                                : "mahalliy aholi uchun narx:"
                                        }
                                    />
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setPriceru(e.target.value)
                                        }
                                        label={
                                            language == "ru"
                                                ? "цена для туриста:"
                                                : "turistlar uchun narx:"
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
                    open={size1 === "xl"}
                    size={size1 || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "обновить услугу"
                            : "xizmatni yangilash"}
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
                                    {/* <Select
                                        color="blue"
                                        label="Отдел:"
                                        disabled={currentUser?.role_id !== "7"}
                                    >
                                        {parts.map((item, index) => (
                                            <Option
                                                onClick={() =>
                                                    setCurrentUser((prev) => ({
                                                        ...prev,
                                                        ["department"]:
                                                            item?.department_id,
                                                    }))
                                                }
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {item?.department_name_ru}
                                            </Option>
                                        ))}
                                    </Select> */}
                                    <Input
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["lastname"]: e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        defaultValue={currentUser?.lastname}
                                        label={
                                            language == "ru"
                                                ? "Фамилия пользователя:"
                                                : "Foydalanuvchining familyasi"
                                        }
                                    />
                                </div>

                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        defaultValue={currentUser?.login}
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["login"]: e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Логин:"
                                                : "Login:"
                                        }
                                    />
                                    <Input
                                        defaultValue={currentUser?.password}
                                        required
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["password"]: e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Пароль:"
                                                : "Kod:"
                                        }
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        defaultValue={currentUser?.firstname}
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["firstname"]: e.target.value,
                                            }))
                                        }
                                        label={
                                            language == "ru"
                                                ? "Имя пользователя:"
                                                : "Foydalanuvchi nomi:"
                                        }
                                    />
                                    <Input
                                        color="blue"
                                        defaultValue={currentUser?.fathername}
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["fathername"]: e.target.value,
                                            }))
                                        }
                                        label={
                                            language == "ru"
                                                ? "Отчество пользователя:"
                                                : "Foydalanuvchi sharifi:"
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
                                            ? Edit.rufalse
                                            : Edit.uzfalse}
                                    </span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>
                                        {language == "ru"
                                            ? Edit.rutrue
                                            : Edit.uztrue}
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
                                Список Пользователей
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    onChange={(e) => setSearch(e.target.value)}
                                    label="поиск"
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                />
                            </div>
                            <Button
                                className="flex items-center gap-3 "
                                onClick={() => handleOpen("xl")}
                                size="sm"
                            >
                                добавить пользователя
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
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {language == "ru"
                                                ? item?.service_name_ru
                                                : item?.service_name_uz}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {item?.visit_name_ru}
                                    </td>
                                    <td className="p-4">
                                        {item?.price_for_locals +
                                            "/" +
                                            item?.price_for_tourist}
                                    </td>

                                    <td>
                                        <IconButton
                                            variant="text"
                                            onClick={() =>
                                                deleteData(item.service_id)
                                            }
                                        >
                                            {
                                                <TrashIcon
                                                    className="h-4 w-4"
                                                    color="red"
                                                />
                                            }
                                        </IconButton>

                                        <IconButton
                                            variant="text"
                                            onClick={() => {
                                                handleOpen1("xl"),
                                                    setCurrentUser(item);
                                            }}
                                        >
                                            <PencilIcon
                                                className="h-4 w-4"
                                                color="orange"
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

export default Service;
