import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { AddMethod } from "./AddMethod";
import { EditMethod } from "./EditMethod";
import { DeleteData, GetDataSimple } from "../../services";

const TABLE_HEAD = ["N", "Название", "Действия"];

const Method = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const [size1, setSize1] = useState(null);
    const handleOpen = (value) => setSize(value);
    const handleOpen1 = (value) => {
        setSize1(value), setStatus(!status);
    };

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const [deleteId, setDeletedId] = useState(null);

    useEffect(() => {
        GetDataSimple("api/injmethod/list?page=1&limit=10").then((res) => {
            setUsers(res?.result);
        });
    }, [status]);

    const changeStatus = () => {
        setStatus(!status);
    };

    const DeleteFinish = () => {
        DeleteData(`api/palata/delete/${deleteId}`).then((res) => {
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
                <DialogHeader>Are you sure delete this wiki?</DialogHeader>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-1"
                    >
                        <span>No</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={DeleteFinish}
                    >
                        <span>Yes</span>
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
                                Список метод
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
                            <AddMethod changeStatus={changeStatus} />
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
                                                    {item?.method_name_ru}
                                                </Typography>
                                            </td>

                                            <td>
                                                <EditMethod
                                                    item={item}
                                                    changeStatus={changeStatus}
                                                />
                                                <Tooltip content="Delete User">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() =>
                                                            deleteData(
                                                                item.palata_id
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon
                                                            className="h-4 w-4"
                                                            color="red"
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
                                {/* {searchData.map((item, index) => (
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
                                                        deleteData(item.user_id)
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
                                ))} */}
                            </tbody>
                        )}
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

export default Method;
