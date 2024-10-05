import { PencilIcon } from "@heroicons/react/24/solid";
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
import { GetDataSimple } from "../../services";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        date: "Wed 3:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
    },
];

const Analyze = () => {
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [role, setRole] = useState(null);
    const [part, setPart] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [fatherName, setFathername] = useState("");
    const [cabine, setCabine] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        GetDataSimple("role/list").then((res) => console.log(res));
        console.log("salom");
    }, []);

    const AddUser = (e) => {
        e.preventDefault();
        console.log("hello");
        setSize(null);
    };
    return (
        <div>
            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size === "xl"}
                    size={size || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>Добавить пользователя</DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => AddUser(e)}>
                            <div className="flex justify-between gap-3 mb-5">
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Select color="blue" label="Выбирите роль:">
                                        <Option
                                            onClick={() => setRole(7)}
                                            className="text-theme-text bg-theme-bg mb-2"
                                        >
                                            Material Tailwind HTML
                                        </Option>
                                    </Select>
                                    <Select
                                        color="blue"
                                        label="Отдел:"
                                        disabled={role !== 7}
                                    >
                                        <Option
                                            onClick={() => setRole()}
                                            className="text-theme-text bg-theme-bg mb-2"
                                        >
                                            Material Tailwind HTML
                                        </Option>
                                    </Select>
                                    <Input
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        color="blue"
                                        label="Фамилия пользователя:"
                                    />
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        label="Имя пользователя:"
                                    />
                                    <Input
                                        color="blue"
                                        onChange={(e) =>
                                            setFathername(e.target.value)
                                        }
                                        label="Отчество пользователя:"
                                    />
                                    <Select color="blue" label="Кабинет:">
                                        <Option
                                            onClick={() => setCabine(1)}
                                            className="text-theme-text bg-theme-bg mb-2"
                                        >
                                            Material Tailwind HTML
                                        </Option>
                                    </Select>
                                </div>
                                <div className="w-1/3 flex flex-col gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setLogin(e.target.value)
                                        }
                                        color="blue"
                                        label="Логин:"
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        color="blue"
                                        label="Пароль:"
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        color="blue"
                                        label="Повторите пароль:"
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
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>Добавить</span>
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
                                Список Анализов
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
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
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(
                                (
                                    {
                                        img,
                                        name,
                                        amount,
                                        date,
                                        status,
                                        account,
                                        accountNumber,
                                        expiry,
                                    },
                                    index
                                ) => {
                                    const isLast =
                                        index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={img}
                                                        alt={name}
                                                        size="md"
                                                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                    />
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {amount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={status}
                                                        color={
                                                            status === "paid"
                                                                ? "green"
                                                                : status ===
                                                                  "pending"
                                                                ? "amber"
                                                                : "red"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                        <Avatar
                                                            src={
                                                                account ===
                                                                "visa"
                                                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                                            }
                                                            size="sm"
                                                            alt={account}
                                                            variant="square"
                                                            className="h-full w-full object-contain p-1"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal capitalize"
                                                        >
                                                            {account
                                                                .split("-")
                                                                .join(" ")}{" "}
                                                            {accountNumber}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {expiry}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button
                        variant="outlined"
                        size="sm"
                        className="bg-theme-bg text-theme-text"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton
                            variant="outlined"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            1
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            2
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            3
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            ...
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            8
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            9
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                        >
                            10
                        </IconButton>
                    </div>
                    <Button
                        variant="outlined"
                        size="sm"
                        className="bg-theme-bg text-theme-text"
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Analyze;
