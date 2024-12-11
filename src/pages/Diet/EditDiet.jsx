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

export function EditDiet({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    console.log(item);

    const [name, setName] = useState(item?.diet_name);
    const [price1, setPrice1] = useState(item?.breakfast_price);
    const [price2, setPrice2] = useState(item?.lunch_price);
    const [price3, setPrice3] = useState(item?.evening_meal_price);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            diet_name: name,
            breakfast_price: price1,
            lunch_price: price2,
            evening_meal_price: price3,
        };

        PostDataTokenJson(`api/diet/update/${item?.diet_id}`, data)
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
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Изменять еду" : "Ovqatni o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "имя (ru):"
                                                : "nomi (ru)"
                                        }
                                        defaultValue={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "имя (ru):"
                                                : "nomi (ru)"
                                        }
                                        defaultValue={price1}
                                        onChange={(e) =>
                                            setPrice1(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "имя (ru):"
                                                : "nomi (ru)"
                                        }
                                        defaultValue={price2}
                                        onChange={(e) =>
                                            setPrice2(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "имя (ru):"
                                                : "nomi (ru)"
                                        }
                                        defaultValue={price3}
                                        onChange={(e) =>
                                            setPrice3(e.target.value)
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
