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
import { MdOutlineEdit } from "react-icons/md";

export function AddSupplier({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    const handleOpen = (value) => setSize(value);

    const AddSupplier = (e) => {
        const data = {
            supplier_name: name,
            phone_number: number,
            address: address,
        };

        PostDataTokenJson(`api/userwarehouse/suppliers/create`, data)
            .then(() => {
                handleOpen(null);
            })
            .then(() => changeStatus())
            .catch(() => {
                handleOpen(null);
            });
    };

    return (
        <>
            <Button
                className="flex items-center gap-3 bg-main-green"
                onClick={() => handleOpen("xs")}
                size="sm"
            >
                {language == "ru"
                    ? "добавить поставщика"
                    : "yetkazuvchi qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Добавить поставщика"
                        : "Yetkazuvchi qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full">
                                <div className="mb-5">
                                    <Input
                                        label={language == "ru" ? "имя" : "ism"}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "номер телефона"
                                                : "telefon raqam"
                                        }
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "адрес"
                                                : "manzil"
                                        }
                                        onChange={(e) =>
                                            setAddress(e.target.value)
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
                                onClick={(e) => AddSupplier(e)}
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
