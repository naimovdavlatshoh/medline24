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
import { GetDataSimple, PostDataTokenJson } from "../../services";
import { Add } from "../../utils/constants";

export function AddDiet({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);
    const [price3, setPrice3] = useState(0);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            diet_name: name,
            breakfast_price: price1,
            lunch_price: price2,
            evening_meal_price: price3,
        };

        PostDataTokenJson("api/diet/create", data)
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
                {language == "ru" ? "Добавление еды" : "Ovqat qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавление еды" : "Ovqat qo'shish"}
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
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "ЦЕНА ЗАВТРАКА:"
                                                : "Nonushta narxi"
                                        }
                                        onChange={(e) =>
                                            setPrice1(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "ЦЕНА ОБЕДА:"
                                                : "Tushlik narxi"
                                        }
                                        onChange={(e) =>
                                            setPrice2(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "ЦЕНА УЖИНА:"
                                                : "Kechki ovqat narxi"
                                        }
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
                                    {" "}
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
