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
import { Add, Edit } from "../../../utils/constants";
import { MdOutlineEdit } from "react-icons/md";

export function EditSupplier({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState(item?.supplier_name);
    const [number, setNumber] = useState(item?.phone_number);
    const [address, setAddress] = useState(item?.address);

    const handleOpen = (value) => setSize(value);

    const UpdateSupplier = (e) => {
        const data = {
            supplier_name: name,
            phone_number: number,
            address: address,
        };

        PostDataTokenJson(
            `api/userwarehouse/suppliers/update/${item?.supplier_id}`,
            data
        )
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
                className="flex items-center gap-3 bg-yellow-400"
                onClick={() => handleOpen("xs")}
                size="sm"
            >
                <MdOutlineEdit size={15} />
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Изменить поставщика"
                        : "Yetkazuvchi o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full">
                                <div className="mb-5">
                                    <Input
                                        defaultValue={item?.supplier_name}
                                        label={language == "ru" ? "имя" : "ism"}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <Input
                                        defaultValue={item?.phone_number}
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
                                        defaultValue={item?.address}
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
                                        ? Edit.rufalse
                                        : Edit.uzfalse}
                                </span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => UpdateSupplier(e)}
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
