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

export function EditVisit({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [type, setType] = useState(null);
    const [free_name, setFree_name] = useState(item?.free_visit_name);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/visittype/list").then((res) => {
            setTypes(res);
   
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            free_visit_name: free_name,
            visit_type_id: type,
            option: selectedTypes,
        };

        PostDataTokenJson(`api/freevisit/update/${item?.free_visit_id}`, data)
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
            <IconButton variant="text" onClick={() => handleOpen("lg")}>
                <PencilIcon className="h-4 w-4" color="orange" />
            </IconButton>

            <Dialog
                className="bg-theme-bg text-theme-text"
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Изменять Визит."
                        : "Vizitni o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row gap-5">
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
                                            {t?.visit_name}
                                        </Option>
                                    ))}
                                </Select>

                                {/* Checkboxes for option visit types */}
                                {types?.option?.map((o) => (
                                    <Checkbox
                                        className="text-theme-text"
                                        key={o.visit_type_id}
                                        label={o?.visit_name}
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
                                        defaultValue={item?.free_visit_name}
                                        onChange={(e) =>
                                            setFree_name(e.target.value)
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
