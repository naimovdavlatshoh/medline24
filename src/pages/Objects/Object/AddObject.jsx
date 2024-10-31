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
import { Add, Delete, Edit } from "../../../utils/constants";

export function AddObject({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [type, setType] = useState(null);
    const [flour, setFlour] = useState(0);
    const [nameru, setNameru] = useState("");
    const [nameuz, setNameuz] = useState("");

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/visittype/list").then((res) => {
            setTypes(res);
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            object_name_ru: nameru,
            object_name_uz: nameuz,
            total_floors: flour,
        };

        PostDataTokenJson("api/object/create", data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    return (
        <>
            <Button onClick={() => handleOpen("xs")} variant="gradient">
                {language == "ru" ? "Добавить Здание" : "Bino qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Здание" : "Bino qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <div className="mb-3 w-1/2">
                                    <Input
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
                                        label={
                                            language == "ru"
                                                ? "Наименование здания (ru):"
                                                : "Bino nomi (ru):"
                                        }
                                        onChange={(e) =>
                                            setNameru(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "Наименование здания (uz):"
                                                : "Bino nomi (uz):"
                                        }
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
