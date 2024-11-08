import {
    PencilIcon,
    PlusCircleIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Option,
    Input,
    Select,
    Button,
    Dialog,
    Textarea,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Add, Delete, Edit } from "../../utils/constants";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import {
    DeleteData,
    GetDataSimple,
    PostDataToken,
    PostDataTokenJson,
} from "../../services";
import { CustomOption } from "../../components/CustomOption";
import Pagination from "../../components/Pagination";

const TABLE_HEAD = ["N", "Анализ", "Код", "Название", "Норма/Ед", "Действия"];
const TABLE_HEADUZ = ["N", "Analiz", "Kod", "Nomi", "Norma/birlik", "Amal"];

const Analyze = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const [size2, setSize2] = useState(null);

    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([]);
    const [deletedId, setDeletedId] = useState(null);
    const [status, setStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [analyze, setAnalyze] = useState("");
    const [analizy_option_name, setAnalizy_option_name] = useState("");
    const [standart, setStandart] = useState("");
    const [unit_of_measurement, setUnit_of_measurement] = useState("");
    const [code, setCode] = useState("");
    const [analyze_id, setAnalyze_id] = useState(null);
    const [language, setLanguage] = useState("ru");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const handleOpen = (value) => setSize(value);
    const handleOpen2 = (item) => {
        setOpen2(!open2), setAnalyze_id(item.analizy_id);
    };

    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };

    useEffect(() => {
        GetDataSimple("api/services/list?page=1&limit=10").then((res) => {
            setRoles(res?.result);
        });
    }, []);
    // useEffect(() => {
    //     GetDataSimple("api/user/dept/list?dept_id=1").then((res) => {
    //         setParts(res);
    //     });
    // }, []);
    useEffect(() => {
        GetDataSimple("api/analizy/list?page=1&limit=10").then((res) => {
            setUsers(res?.result);
            setTotalPages(res?.pages);
        });
    }, [status]);

    useEffect(() => {
        GetDataSimple(
            `api/analizy/search?keyword=${search ? search : ""}`
        ).then((res) => {
            setSearchData(res?.result);
        });
    }, [search]);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            service_id: role.service_id,
            analizy_name: analyze,
            analizy_code: code,
        };

        PostDataTokenJson("api/analizy/create", data)
            .then(() => {
                handleOpen(null), setStatus(!status);
            })
            .catch(() => {
                handleOpen(null), setStatus(!status);
            });
    };

    const AddOption = (e) => {
        e.preventDefault();
        const data = {
            analizy_option_name: analizy_option_name,
            standart: standart,
            unit_of_measurement: unit_of_measurement,
        };

        PostDataTokenJson(`api/analizy/option/add/${analyze_id}`, data)
            .then(() => {
                handleOpen2(!open), setStatus(!status);
            })
            .catch(() => {
                handleOpen2(!open), setStatus(!status);
            });
    };

    const UpdateUser = (e) => {
        e.preventDefault();
        const data = {
            service_id: currentUser.service_id,
            analizy_name: currentUser.analizy_name,
            analizy_code: currentUser.analizy_code,
            standart: "asbdvhbshfbvsaz",
            unit_of_measurement: "ansbdvhab dfsjkn",
        };

        PostDataTokenJson(`api/analizy/update/${currentUser?.analizy_id}`, data)
            .then(() => handleOpen1(null))
            .catch(() => {
                handleOpen1(null), setStatus(!status);
            });
    };

    const DeleteFinish = () => {
        DeleteData(`api/analizy/delete/${deletedId}`).then((res) => {
            setOpen(!open);
            setStatus(!status);
        });
    };

    const deleteData = (id) => {
        setOpen(!open);
        setDeletedId(id);
    };

    const changeStatus = () => {
        setStatus(!status);
    };

    return (
        <div>
            <Dialog
                className="bg-theme-bg text-theme-text"
                open={open}
                handler={handleOpen}
            >
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
            <Dialog
                size="xs"
                open={open2}
                handler={handleOpen2}
                className="p-4 bg-theme-bg text-theme-text"
            >
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        {language == "ru" ? "добавить норму" : "norma qo'shish"}
                    </Typography>

                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen2}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            {language == "ru"
                                ? "название опции анализа ru"
                                : "tahlil variantining nomi ru"}
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder=""
                            name="name"
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                            onChange={(e) =>
                                setAnalizy_option_name(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            {language == "ru"
                                ? "название опции анализа uz"
                                : "tahlil variantining nomi uz"}
                        </Typography>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                {language == "ru" ? "Норматив" : "Normativ"}
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder=""
                                name="weight"
                                className="placeholder:opacity-100 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                                onChange={(e) => setStandart(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                {language == "ru" ? "Ед:" : "Birlik:"}
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder=""
                                name="size"
                                className="placeholder:opacity-100 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                                onChange={(e) =>
                                    setUnit_of_measurement(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button className="ml-auto" onClick={(e) => AddOption(e)}>
                        {language == "ru" ? "добавить норму" : "norma qo'shish"}
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
                            ? "Добавить Анализ"
                            : "Analiz qo'shish"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => AddUser(e)}>
                            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                                <div className="w-1/2 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбирите Услуга:"
                                                : "Xizmatni tanlang"
                                        }
                                        value={role?.service_name}
                                    >
                                        {roles?.map((item) => (
                                            <Option
                                                onClick={() => {
                                                    setRole(item);
                                                }}
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {item.service_name}
                                            </Option>
                                        ))}
                                    </Select>
                                    {/* <Select
                                        color="blue"
                                        label="Отдел:"
                                        disabled={role?.role_id !== "7"}
                                    >
                                        {parts.map((item, index) => (
                                            <Option
                                                onClick={() =>
                                                    setPart(item?.role_id)
                                                }
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {item?.department_name_ru}
                                            </Option>
                                        ))}
                                    </Select> */}
                                    <Input
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru" ? "Код:" : "Kod"
                                        }
                                    />
                                </div>

                                <div className="w-1/2 flex flex-col gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setAnalyze(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Название (ру):"
                                                : "Nomlanishi (ru):"
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
                            ? "обновить Анализ"
                            : "Analizni yangilash"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => UpdateUser(e)}>
                            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                                <div className="w-1/2 flex flex-col gap-4">
                                    <Select
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Выбирите Услуга:"
                                                : "Xizmatni tanlang"
                                        }
                                        defaultValue={currentUser?.service_name}
                                    >
                                        {roles?.map((item) => (
                                            <Option
                                                onClick={() => {
                                                    setCurrentUser((prev) => ({
                                                        ...prev,
                                                        ["service_id"]:
                                                            item.service_id,
                                                    }));
                                                }}
                                                className="text-theme-text bg-theme-bg mb-2"
                                            >
                                                {item.service_name}
                                            </Option>
                                        ))}
                                    </Select>

                                    <Input
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["analyze_code"]:
                                                    e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        label={
                                            language == "ru" ? "Код:" : "Kod"
                                        }
                                        defaultValue={currentUser?.analizy_code}
                                    />
                                </div>

                                <div className="w-1/2 flex flex-col gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                ["analizy_name"]:
                                                    e.target.value,
                                            }))
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Название (ру):"
                                                : "Nomi (ru)"
                                        }
                                        defaultValue={currentUser?.analizy_name}
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
                                    ? "Список Анализов"
                                    : "Analiz ro'yxati"}
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
                                onClick={() => handleOpen("xl")}
                                size="sm"
                            >
                                {language == "ru"
                                    ? "добавить Анализ"
                                    : "Analiz qo'shish"}
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
                                                    {item?.service_name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.analizy_code}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.analizy_name}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <CustomOption
                                                    changeStatus={changeStatus}
                                                    item={item}
                                                />
                                            </td>

                                            <td>
                                                <IconButton
                                                    variant="text"
                                                    onClick={() =>
                                                        deleteData(
                                                            item.analizy_id
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

                                                <IconButton
                                                    variant="text"
                                                    onClick={() => {
                                                        handleOpen2(item),
                                                            setCurrentUser(
                                                                item
                                                            );
                                                    }}
                                                >
                                                    <PlusCircleIcon
                                                        className="h-5 w-6"
                                                        color="green"
                                                    />
                                                </IconButton>
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
                                                {item?.service_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item?.analizy_code}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item?.analizy_name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <CustomOption
                                                changeStatus={changeStatus}
                                                item={item}
                                            />
                                        </td>

                                        <td>
                                            <IconButton
                                                variant="text"
                                                onClick={() =>
                                                    deleteData(item.analizy_id)
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

                                            <IconButton
                                                variant="text"
                                                onClick={() => {
                                                    handleOpen2(item),
                                                        setCurrentUser(item);
                                                }}
                                            >
                                                <PlusCircleIcon
                                                    className="h-5 w-6"
                                                    color="green"
                                                />
                                            </IconButton>
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

export default Analyze;
