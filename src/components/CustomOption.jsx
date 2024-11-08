import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { PencilIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DeleteData, PostDataTokenJson } from "../services";

export function CustomOption({ item, changeStatus }) {
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // To track which item is being edited
    const [editedFields, setEditedFields] = useState({}); // To store updated values
    const [updateId, setUpdateId] = useState(null);
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const UpdateOption = () => {
        PostDataTokenJson(
            `api/analizy/option/update/${updateId}`,
            editedFields
        ).then(() => {
            setOpen(!open), changeStatus();
        });
    };

    const handleOpen = () => setOpen(!open);

    const handleEditClick = (index, id) => {
        setEditIndex(index);
        setEditedFields(item.option[index]);
        setUpdateId(id);
        console.log("hello");
    };

    const handleSaveClick = () => {
        setEditIndex(null);
        UpdateOption();
    };

    const handleInputChange = (e, fieldName) => {
        setEditedFields({
            ...editedFields,
            [fieldName]: e.target.value,
        });
    };

    const deleteOption = (id) => {
        DeleteData(`api/analizy/option/delete/${id}`).then(() => {
            setOpen(!open), changeStatus();
        });
    };

    return (
        <>
            <Button onClick={handleOpen}>
                {language == "ru" ? "нажмите" : "bosing"}
            </Button>
            <Dialog className="" open={open} handler={handleOpen}>
                <DialogHeader>
                    {language == "ru"
                        ? "нормы для этого анализа"
                        : "shu analizning normalari"}
                </DialogHeader>
                <DialogBody>
                    {item?.option?.map((i, index) => (
                        <div
                            className="w-full flex flex-col md:flex-row gap-2 justify-center"
                            key={index}
                        >
                            <div className="w-1/3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        defaultValue={
                                            editedFields.analizy_option_name
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                "analizy_option_name"
                                            )
                                        }
                                        className="border rounded p-1"
                                    />
                                ) : (
                                    `${
                                        language == "ru"
                                            ? "Названия(ru)"
                                            : "Nomi(ru)"
                                    } : ${i.analizy_option_name}`
                                )}
                            </div>
                            <div className="w-1/3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        defaultValue={editedFields.standart}
                                        onChange={(e) =>
                                            handleInputChange(e, "standart")
                                        }
                                        className="border rounded p-1"
                                    />
                                ) : (
                                    `${
                                        language == "ru" ? "Норма" : "Norma"
                                    } : ${i.standart}`
                                )}
                            </div>

                            <div className="w-1/3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        defaultValue={
                                            editedFields.unit_of_measurement
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                "unit_of_measurement"
                                            )
                                        }
                                        className="border rounded p-1"
                                    />
                                ) : (
                                    `${language == "ru" ? "Ед" : "Birlik"} : ${
                                        i.unit_of_measurement
                                    }`
                                )}
                            </div>
                            <div className="w-1/10 flex justify-end">
                                {editIndex === index ? (
                                    <Tooltip content="Save">
                                        <IconButton
                                            variant="text"
                                            onClick={handleSaveClick}
                                        >
                                            <CheckIcon
                                                className="h-4 w-4"
                                                color="green"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Edit">
                                        <IconButton
                                            variant="text"
                                            onClick={() =>
                                                handleEditClick(
                                                    index,
                                                    i.analizy_option_id
                                                )
                                            }
                                        >
                                            <PencilIcon
                                                className="h-4 w-4"
                                                color="orange"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Tooltip content="Edit">
                                    <IconButton
                                        variant="text"
                                        onClick={() =>
                                            deleteOption(i.analizy_option_id)
                                        }
                                    >
                                        <TrashIcon
                                            className="h-4 w-4"
                                            color="red"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>отмена</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
