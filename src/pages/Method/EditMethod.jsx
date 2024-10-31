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

export function EditMethod({ item, changeStatus }) {
    const [size, setSize] = React.useState(null);
    console.log(item);

    const [nameru, setNameru] = useState(item?.method_name_ru);
    const [nameuz, setNameuz] = useState(item?.method_name_uz);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            method_name_ru: nameru,
            method_name_uz: nameuz,
        };

        PostDataTokenJson(`api/injmethod/update/${item?.inj_met_id}`, data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
                changeStatus();
            });
    };

    return (
        <>
            <Tooltip content="Edit User">
                <IconButton variant="text" onClick={() => handleOpen("xs")}>
                    <PencilIcon className="h-4 w-4" color="orange" />
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
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        defaultValue={nameru}
                                        label="
                                        Название (ru)"
                                        onChange={(e) =>
                                            setNameru(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={nameuz}
                                        label="Название (uz)"
                                        onChange={(e) =>
                                            setNameuz(e.target.value)
                                        }
                                    />
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
