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
} from "@material-tailwind/react";
import { GetDataSimple, PostDataTokenJson } from "../../../services";
import { Add } from "../../../utils/constants";

export function AddPalat({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [object, setObject] = useState(null);
    const [objects, setObjects] = useState([]);
    const [floor, setFloor] = useState(0);
    const [palat, setPalat] = useState(0);

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

        PostDataTokenJson("api/palata/create", data)
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
            <Button onClick={() => handleOpen("lg")} variant="gradient">
                {language == "ru" ? "Добавить Палату" : "Palata qo'shish"}
            </Button>

            <Dialog
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Палату" : "Palata qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
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
                                            {language == "ru"
                                                ? t?.object_name_ru
                                                : t?.object_name_uz}
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
                                            {language == "ru"
                                                ? t?.department_name_ru
                                                : t?.department_name_uz}
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
                                    {language == "ru"
                                        ? Add.rufalse
                                        : Add.uzfalse}
                                </span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => AddUser(e)}
                            >
                                <span>
                                    {language == "ru" ? Add.rutrue : Add.uztrue}
                                </span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
