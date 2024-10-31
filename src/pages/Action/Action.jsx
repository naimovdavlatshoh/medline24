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
import AddAction from "./AddAction";

const TABLE_HEADRU = [
    "N",
    "Название",
    "время начала",
    "время окончания",
    "Действия",
];
const TABLE_HEADUZ = [
    "N",
    "Aksiya",
    "Boshlanish vaqti",
    "Tugash vaqti",
    "Amal",
];

const Action = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [parts, setParts] = useState([]);
    const [part, setPart] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [fatherName, setFathername] = useState("");
    const [cabine, setCabine] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [deletedId, setDeletedId] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [status, setStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(`api/aksiya/list?page=${currentPage}&limit=10`).then(
            (res) => {
                setUsers(res?.result);
                setTotalPages(res?.pages);
            }
        );
    }, [status, currentPage]);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            fathername: fatherName,
            login: login,
            password: password,
            role_id: parseInt(role.role_id),
            dept_id: parseInt(part),
        };
        console.log(role, part);
        PostDataTokenJson("/api/user/create", data)
            .then(() => handleOpen(null))
            .catch(() => {
                handleOpen(null), setStatus(!status);
            });
    };

    const DeleteFinish = () => {
        const data = {
            comments: comment,
        };
        DeleteData(`api/aksiya/delete/${deletedId}`, {
            comments: "salom",
        }).then(() => {
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
                    {language == "ru"
                        ? "Вы уверены, что хотите удалить?"
                        : "Siz anniq buni o'chirmoqchimisiz?"}
                </DialogHeader>
                <DialogBody>
                    <Typography className="mb-5">
                        Добавить комментарий
                    </Typography>
                    <Input
                        onChange={(e) => setComment(e.target.value)}
                        label="комментарий"
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-1"
                    >
                        <span>{language == "ru" ? "нет" : "yo'q"}</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={DeleteFinish}
                    >
                        <span>{language == "ru" ? "да" : "ha"}</span>
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
                            ? "Добавить пользователя"
                            : "Yangi foydalanuvchi qo'shish"}
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
                                                : "Rol Tanlang:"
                                        }
                                        value={
                                            language == "ru"
                                                ? role?.role_name_ru
                                                : role?.role_name_uz
                                        }
                                    >
                                        {roles?.map((item, index) => (
                                            <div>
                                                <p className="font-bold mb-3">
                                                    {language == "ru"
                                                        ? item?.role_name_ru
                                                        : item?.role_name_uz}
                                                </p>
                                                {roles[index]?.child?.map(
                                                    (i) => (
                                                        <Option
                                                            onClick={() => {
                                                                setRole(i);
                                                            }}
                                                            className="text-theme-text bg-theme-bg mb-2"
                                                        >
                                                            {language == "ru"
                                                                ? i.role_name_ru
                                                                : i.role_name_uz}
                                                        </Option>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </Select>
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Отдел:"
                                                : "Bo'lim:"
                                        }
                                        disabled={role?.role_id !== "7"}
                                    >
                                        {parts.map((item, index) => (
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
                                    <Input
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Фамилия пользователя:"
                                                : "Foydalanuvchining familyasi"
                                        }
                                    />
                                </div>

                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setLogin(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Логин:"
                                                : "Login"
                                        }
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru" ? "Пароль:" : "Kod"
                                        }
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Повторите пароль:"
                                                : "Kodni qaytaring"
                                        }
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        label={
                                            language == "ru"
                                                ? "Имя пользователя:"
                                                : "Foydalanuvchining ismi"
                                        }
                                    />
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setFathername(e.target.value)
                                        }
                                        label={
                                            language == "ru"
                                                ? "Отчество пользователя:"
                                                : "Foydalanuvchinig sharifi"
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
                                            ? "закрыть"
                                            : "Yopish"}
                                    </span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>
                                        {language == "ru"
                                            ? "Добавить"
                                            : "Qo'shish"}
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
                                    ? "Список Пользователей"
                                    : "Foydalanuvchilar ro'yxati"}
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
                            <AddAction />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            {language == "ru" ? (
                                <tr>
                                    {TABLE_HEADRU.map((head) => (
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
                                                ? item?.aksiya_name_ru
                                                : item?.aksiya_name_uz}
                                        </Typography>
                                    </td>

                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.start_date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.end_date}
                                        </Typography>
                                    </td>

                                    <td>
                                        <Tooltip
                                            content={
                                                language == "ru"
                                                    ? "удалить акции"
                                                    : "foydalanuvchini o'chirish"
                                            }
                                        >
                                            <IconButton
                                                variant="text"
                                                onClick={() =>
                                                    deleteData(item.aksiya_id)
                                                }
                                            >
                                                {
                                                    <TrashIcon
                                                        className="h-4 w-4"
                                                        color="red"
                                                    />
                                                }
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

export default Action;
