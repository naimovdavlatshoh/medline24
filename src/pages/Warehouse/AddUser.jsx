import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
    Input,
    Checkbox,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { GetDataSimple, PostDataTokenJson } from "../../services";
import { PencilIcon } from "@heroicons/react/24/solid";
import { IoIosSettings } from "react-icons/io";

export function AddUser({ item, changeStatus }) {
    const [size, setSize] = React.useState(null);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedVisibility, setSelectedVisibility] = useState([]);

    const [data, setData] = useState(null);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple(`api/warehouse/settings/${item?.warehouse_id}`).then(
            (res) => {
                setData(res);
            }
        );
    }, []);

    const handleUserChange = (userId) => {
        setSelectedUsers((prev) =>
            prev.some((user) => user.user_id === userId)
                ? prev.filter((user) => user.user_id !== userId)
                : [...prev, { user_id: userId }]
        );
    };

    const handleVisibilityChange = (visitTypeId, deptId) => {
        setSelectedVisibility((prev) =>
            prev.some((v) => v.visit_type_id === visitTypeId)
                ? prev.filter((v) => v.visit_type_id !== visitTypeId)
                : [...prev, { visit_type_id: visitTypeId, dept_id: deptId }]
        );
    };

    const AddUser = (e) => {
        const data = {
            users: [{ user_id: 13 }],
            visibility: selectedVisibility,
        };

        PostDataTokenJson(`api/warehouse/settings/${item?.warehouse_id}`, data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
                changeStatus();
            });
    };

    console.log(selectedUsers);
    console.log(selectedVisibility);

    return (
        <>
            <Tooltip content="Settings">
                <IconButton onClick={() => handleOpen("xs")} variant="text">
                    <IoIosSettings className="h-4 w-4" color="green" />
                </IconButton>
            </Tooltip>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>Изменять метод.</DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-full flex justify-between items-start">
                                <div className="w-1/2">
                                    <p>Добавить Пользователь:</p>

                                    {data?.users?.map((o) => (
                                        <Checkbox
                                            key={o.visit_type_id}
                                            label={
                                                o?.firstname + " " + o?.lastname
                                            }
                                            onChange={() =>
                                                handleUserChange(
                                                    parseInt(o.user_id)
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                                <div className="w-1/2">
                                    <p>Добавить Видимость:</p>
                                    {data?.visibility?.map((o) => (
                                        <Checkbox
                                            key={o.visit_type_id}
                                            label={o?.visit_name_ru}
                                            onChange={() =>
                                                handleVisibilityChange(
                                                    parseInt(o.visit_type_id),
                                                    parseInt(o.dept_id)
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => {
                                    handleOpen(null);
                                }}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => AddUser(e)}
                            >
                                <span>Confirm</span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
