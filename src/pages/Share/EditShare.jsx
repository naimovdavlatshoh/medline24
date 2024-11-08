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
import { Edit } from "../../utils/constants";

export function EditShare({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState(item?.full_name);
    const [share, setShare] = useState(item?.share);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            full_name: name,
            share: share,
            share_type: 1,
        };

        PostDataTokenJson(`api/refdoctor/update/${item?.referred_id}`, data)
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
            <IconButton variant="text" onClick={() => handleOpen("xs")}>
                <PencilIcon className="h-4 w-4" color="orange" />
            </IconButton>

            <Dialog
                className="text-theme-text bg-theme-bg"
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Изменять метод."
                        : "yo'naltiruvchini o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru" ? "имя :" : "ism :"
                                        }
                                        defaultValue={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={share}
                                        label={
                                            language == "ru"
                                                ? "Сумма :"
                                                : "Summa :"
                                        }
                                        onChange={(e) =>
                                            setShare(e.target.value)
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
                                <span>
                                    {language == "ru"
                                        ? Edit.rufalse
                                        : Edit.uzfalse}
                                </span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => AddUser(e)}
                            >
                                <span>
                                    {" "}
                                    {language == "ru"
                                        ? Edit.rutrue
                                        : Edit.uztrue}
                                </span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
