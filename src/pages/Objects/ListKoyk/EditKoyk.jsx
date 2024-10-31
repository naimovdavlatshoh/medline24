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

export function EditKoyk({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [nameuz, setNameuz] = useState(item?.type_name_uz);
    const [nameru, setNameru] = useState(item?.type_name_ru);
    const [price, setPrice] = useState(item?.price_of_food);
    const [localPrice, setLocalPrice] = useState(item?.koyka_local_price);
    const [touristPrice, setTouristPrice] = useState(item?.koyka_tourist_price);

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
            type_name_ru: nameru,
            type_name_uz: nameuz,
            koyka_local_price: localPrice,
            koyka_tourist_price: touristPrice,
        };

        PostDataTokenJson(`api/koykatype/update/${item?.koyka_type_id}`, data)
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
            <IconButton variant="text" onClick={() => handleOpen("lg")}>
                <PencilIcon className="h-4 w-4" color="orange" />
            </IconButton>

            <Dialog
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Изменять Койку."
                        : "Joyni o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="w-full">
                            <div className="mb-3">
                                <Input
                                    defaultValue={nameuz}
                                    label={
                                        language == "ru"
                                            ? "наимевания (uz)"
                                            : "nomi (uz)"
                                    }
                                    onChange={(e) => setNameuz(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    defaultValue={nameru}
                                    label={
                                        language == "ru"
                                            ? "наимевания (ru)"
                                            : "nomi (ru)"
                                    }
                                    onChange={(e) => setNameru(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <Input
                                    defaultValue={localPrice}
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
                                    defaultValue={touristPrice}
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
