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

export function AddShare({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");
    const [share, setShare] = useState(0);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            full_name: name,
            share: share,
            share_type: 1,
        };

        PostDataTokenJson("api/refdoctor/create", data)
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
                {language == "ru" ? "Добавить метод" : "Metod qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="bg-theme-bg text-theme-text"
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить метод" : "Metod qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru" ? "имя :" : "ism :"
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
                                                ? "Сумма :"
                                                : "Summa :"
                                        }
                                        onChange={(e) =>
                                            setShare(e.target.value)
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
