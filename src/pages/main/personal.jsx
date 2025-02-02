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
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
    DeleteData,
    GetDataSimple,
    PostDataToken,
    PostDataTokenJson,
} from "../../services";
import Pagination from "../../components/Pagination";
import LOADING from "../../assets/images/loader.gif";

const TABLE_HEADRU = ["N", "Логин", "ФИО", "Роль", "Действия"];
const TABLE_HEADUZ = ["N", "Login", "FISH", "Rol", "Amal"];

const Personal = () => {
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
    const [part, setPart] = useState(0);
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple("api/roles/list").then((res) => setRoles(res));
    }, []);
    useEffect(() => {
        GetDataSimple("api/user/dept/list?dept_id=1").then((res) => {
            setParts(res);
        });
    }, []);
    useEffect(() => {
        setLoading(true);

        GetDataSimple(`api/user/list?page=${currentPage}&limit=10`).then(
            (res) => {
                setUsers(res?.result);
                setTotalPages(res?.pages);
                setLoading(false);
            }
        );
    }, [status, currentPage]);

    useEffect(() => {
        if (search.length >= 3) {
            GetDataSimple(
                `/api/user/search?keyword=${search ? search : ""}`
            ).then((res) => {
                setSearchData(res?.result);
            });
        }
    }, [search]);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            fathername: fatherName,
            login: login,
            password: password,
            role_id: parseInt(role.role_id),
            dept_id: parseInt(part ? part : "0"),
        };
        console.log(role, part);
        PostDataTokenJson("/api/user/create", data)
            .then(() => {
                handleOpen(null), setStatus(!status);
            })
            .catch(() => {
                handleOpen(null), setStatus(!status);
            });
    };
    const UpdateUser = (e) => {
        e.preventDefault();
        const data = {
            firstname: currentUser?.firstname,
            lastname: currentUser?.lastname,
            fathername: currentUser.fathername,
            login: currentUser?.login,
            password: currentUser?.password,
            role_id: parseInt(currentUser?.role_id),
            dept_id: parseInt(
                currentUser?.debt_id ? currentUser?.dept_id : "0"
            ),
        };

        PostDataTokenJson(`api/user/update/${currentUser?.user_id}`, data)
            .then(() => {
                handleOpen1(null), setStatus(!status);
            })
            .catch(() => {
                handleOpen1(null), setStatus(!status);
            });
    };

    const DeleteFinish = () => {
        DeleteData(`api/user/delete/${deletedId}`).then((res) => {
            setOpen(!open);
            setStatus(!status);
        });
    };

    const deleteData = (id) => {
        setOpen(!open);
        setDeletedId(id);
    };

    console.log(currentUser);
    console.log(roles);

    return (
        <div>
            <Dialog
                className="bg-theme-bg text-theme-text"
                open={open}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Вы уверены, что хотите удалить?"
                        : "Siz anniq buni o'chirmoqchimisiz?"}
                </DialogHeader>
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
                            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбирите роль:"
                                                : "Rol Tanlang:"
                                        }
                                        value={role?.role_name}
                                    >
                                        {roles?.map((item, index) => (
                                            <div>
                                                <p className="font-bold mb-3">
                                                    {item?.role_name}
                                                </p>
                                                {roles[index]?.child?.map(
                                                    (i) => (
                                                        <Option
                                                            onClick={() => {
                                                                setRole(i);
                                                            }}
                                                            className="text-theme-text bg-theme-bg mb-2"
                                                        >
                                                            {i.role_name}
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
                                                {item?.department_name}
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

            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size1 === "xl"}
                    size={size1 || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "обновить пользователя"
                            : "Foydalanuvchini o'zgartirish"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => UpdateUser(e)}>
                            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбрать роль : "
                                                : "Rol tanlang : "
                                        }
                                        value={currentUser?.role_name}
                                    >
                                        {roles?.map((item, index) => (
                                            <div>
                                                <p className="font-bold mb-3">
                                                    {item?.role_name_ru}
                                                </p>
                                                {roles[index]?.child?.map(
                                                    (i) => (
                                                        <Option
                                                            onClick={() => {
                                                                setCurrentUser(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        ["role_id"]:
                                                                            i?.role_id,

                                                                        ["role_name"]:
                                                                            i?.role_name,
                                                                    })
                                                                );
                                                            }}
                                                            className="text-theme-text bg-theme-bg mb-2"
                                                        >
                                                            {i.role_name}
                                                            {i.role_id}
                                                        </Option>
                                                    )
                                                )}
                                            </div>
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
                                                : "Login"
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
                                            language == "ru" ? "Пароль:" : "Kod"
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
                                                : "Foydalanuvchining ismi"
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
                                                : "Foydalanuvchining sharifi"
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
                                            ? "изменять"
                                            : "o'zgartirish"}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </DialogBody>
                </Dialog>
            </>
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <img src={LOADING} alt="" />
                </div>
            ) : (
                <Card className="h-full w-full bg-theme-bg text-theme-text rounded-2xl px-5">
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
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        label={
                                            language == "ru"
                                                ? "поиск"
                                                : "qidiruv"
                                        }
                                        icon={
                                            <MagnifyingGlassIcon className="h-5 w-5" />
                                        }
                                    />
                                </div>
                                <Button
                                    className="flex items-center gap-3 bg-main-green"
                                    onClick={() => handleOpen("xl")}
                                    size="sm"
                                >
                                    {language == "ru"
                                        ? "добавить пользователя"
                                        : "foydalanuvchi qo'shish"}
                                </Button>
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
                            {search === "" ? (
                                <>
                                    {" "}
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
                                                        {item?.login}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item?.lastname +
                                                            " " +
                                                            item?.firstname +
                                                            " " +
                                                            item?.fathername}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item?.role_name}
                                                    </Typography>
                                                </td>

                                                <td>
                                                    <Tooltip
                                                        content={
                                                            language == "ru"
                                                                ? "удалить пользователя"
                                                                : "foydalanuvchini o'chirish"
                                                        }
                                                    >
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() =>
                                                                deleteData(
                                                                    item.user_id
                                                                )
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
                                                    <Tooltip
                                                        content={
                                                            language == "ru"
                                                                ? "редактировать пользователя"
                                                                : "foydalanuvchini o'zgartirish"
                                                        }
                                                    >
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() => {
                                                                handleOpen1(
                                                                    "xl"
                                                                ),
                                                                    setCurrentUser(
                                                                        item
                                                                    );
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
                                </>
                            ) : (
                                <tbody>
                                    {searchData.map((item, index) => (
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
                                                    {item?.login}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.lastname +
                                                        " " +
                                                        item?.firstname +
                                                        " " +
                                                        item?.fathername}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.role_name_ru}
                                                </Typography>
                                            </td>
                                            <td className="p-4"></td>

                                            <td>
                                                <Tooltip content="Delete User">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() =>
                                                            deleteData(
                                                                item.user_id
                                                            )
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
                                                <Tooltip content="Edit User">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => {
                                                            handleOpen1("xl"),
                                                                setCurrentUser(
                                                                    item
                                                                );
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
                            )}
                        </table>
                    </CardBody>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </Card>
            )}
        </div>
    );
};

export default Personal;
