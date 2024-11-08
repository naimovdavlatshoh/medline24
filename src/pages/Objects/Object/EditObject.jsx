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
import { GetDataSimple, PostDataTokenJson } from "../../../services";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Edit } from "../../../utils/constants";

export function EditObject({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    console.log(item);

    const [flour, setFlour] = useState(item?.total_floors);
    const [name, setName] = useState(item?.object_name);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/visittype/list").then((res) => {
            setTypes(res);
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            object_name: name,
            total_floors: flour,
        };

        PostDataTokenJson(`api/object/update/${item?.object_id}`, data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    // Handle adding/removing main and option types

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
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru?"
                        ? "Изменять Здание."
                        : "Binoni o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5 flex-col md:flex-row">
                            <div className="w-full">
                                <div className="mb-3 w-1/2">
                                    <Input
                                        defaultValue={item?.total_floors}
                                        label={
                                            language == "ru"
                                                ? "Кол-во этажей:"
                                                : "qavatlar soni:"
                                        }
                                        onChange={(e) =>
                                            setFlour(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={item?.object_name}
                                        label={
                                            language == "ru"
                                                ? "Наименование здания (ru):"
                                                : "Bino nomi (ru):"
                                        }
                                        onChange={(e) =>
                                            setName(e.target.value)
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
                                    {" "}
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
