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

export function AddKoyk({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [localPrice, setLocalPrice] = useState(0);
    const [touristPrice, setTouristPrice] = useState(0);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            type_name: name,
            koyka_local_price: localPrice,
            koyka_tourist_price: touristPrice,
        };

        PostDataTokenJson("api/koykatype/create", data)
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
                {language == "ru" ? "Добавить Койку" : "Joy qo'shish"}
            </Button>

            <Dialog
                className="text-theme-text bg-theme-bg"
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Койку" : "Joy qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "наимевания (ru)"
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
                                                ? "местная цена"
                                                : "mahaliy narx"
                                        }
                                        onChange={(e) =>
                                            setLocalPrice(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "туристическая цена"
                                                : "turist narx"
                                        }
                                        onChange={(e) =>
                                            setTouristPrice(e.target.value)
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
                                    {language == "ru"
                                        ? Add.rutrue
                                        : Add.uzfalse}
                                </span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
