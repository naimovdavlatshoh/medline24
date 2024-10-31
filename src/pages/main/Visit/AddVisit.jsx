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

export function AddVisit({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [type, setType] = useState(null);
    const [free_name_ru, setFree_name_ru] = useState("");
    const [free_name_uz, setFree_name_uz] = useState("");

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/visittype/list").then((res) => {
            setTypes(res);
            console.log(res);
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            free_visit_name_ru: free_name_ru,
            free_visit_name_uz: free_name_uz,
            visit_type_id: type,
            option: selectedTypes,
        };

        PostDataTokenJson("api/freevisit/create", data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    // Handle adding/removing main and option types
    const handleSelectType = (selectedType) => {
        setSelectedTypes((prevSelectedTypes) => {
            const isAlreadySelected = prevSelectedTypes.some(
                (item) => item.visit_type_id === selectedType.visit_type_id
            );

            if (isAlreadySelected) {
                // Remove if already selected
                return prevSelectedTypes.filter(
                    (item) => item.visit_type_id !== selectedType.visit_type_id
                );
            }

            // Add new type
            return [
                ...prevSelectedTypes,
                { visit_type_id: selectedType.visit_type_id },
            ];
        });
    };

    return (
        <>
            <Button onClick={() => handleOpen("lg")} variant="gradient">
                {language == "ru" ? "Добавить Визит" : "Vizit qo'shish"}
            </Button>

            <Dialog
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Визит" : "Vizit qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-1/2 flex flex-col">
                                {/* Select for main visit type */}
                                <Select
                                    label={
                                        language == "ru"
                                            ? "выбирать"
                                            : "tanlang"
                                    }
                                >
                                    {types?.main?.map((t) => (
                                        <Option
                                            key={t.visit_type_id}
                                            onClick={() =>
                                                setType(t.visit_type_id)
                                            }
                                        >
                                            {language == "ru"
                                                ? t?.visit_name_ru
                                                : t?.visit_name_uz}
                                        </Option>
                                    ))}
                                </Select>

                                {/* Checkboxes for option visit types */}
                                {types?.option?.map((o) => (
                                    <Checkbox
                                        key={o.visit_type_id}
                                        label={
                                            language == "ru"
                                                ? o?.visit_name_ru
                                                : o?.visit_name_uz
                                        }
                                        onChange={() => handleSelectType(o)}
                                    />
                                ))}
                            </div>
                            <div className="w-1/2">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "наимевания(ru)"
                                                : "nomi(ru)"
                                        }
                                        onChange={(e) =>
                                            setFree_name_ru(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "наимевания(uz)"
                                                : "nomi(uz)"
                                        }
                                        onChange={(e) =>
                                            setFree_name_uz(e.target.value)
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