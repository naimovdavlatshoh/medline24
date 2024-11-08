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

export function EditPalat({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [object, setObject] = useState(null);
    const [objects, setObjects] = useState([]);
    const [floor, setFloor] = useState(0);
    const [palat, setPalat] = useState(item?.palata_number);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/department/list?page=1&limit=10").then((res) => {
            setTypes(res?.result);
        });
    }, []);
    useEffect(() => {
        GetDataSimple("api/object/list?page=1&limit=10").then((res) => {
            setObjects(res?.result);
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            object_id: parseInt(object),
            floor_number: parseInt(floor),
            dept_id: parseInt(type),
            palata_number: palat,
        };

        PostDataTokenJson(`api/palata/update/${item?.palata_id}`, data)
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
                <IconButton variant="text" onClick={() => handleOpen("lg")}>
                    <PencilIcon className="h-4 w-4" color="orange" />
                </IconButton>
            </Tooltip>

            <Dialog
            className="text-theme-text bg-theme-bg"
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Изменять Палату."
                        : "Palatani o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5 flex-col md:flex-row">
                            <div className="w-1/2 flex flex-col gap-3">
                                <Select
                                    label={
                                        language == "ru"
                                            ? "Выбирите здание:"
                                            : "Bino tanlang"
                                    }
                                >
                                    {objects?.map((t) => (
                                        <Option
                                            key={t.dept_id}
                                            onClick={() =>
                                                setObject(t.object_id)
                                            }
                                        >
                                            {t?.object_name}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    label={
                                        language == "ru" ? "Отдел:" : "Bo'lim"
                                    }
                                >
                                    {types?.map((t) => (
                                        <Option
                                            key={t.dept_id}
                                            onClick={() => setType(t.dept_id)}
                                        >
                                            {t?.department_name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "Выбирите этаж"
                                                : "Qavat tanlang"
                                        }
                                        onChange={(e) =>
                                            setFloor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={palat}
                                        label={
                                            language == "ru"
                                                ? "Палата"
                                                : "Palata"
                                        }
                                        onChange={(e) =>
                                            setPalat(e.target.value)
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
