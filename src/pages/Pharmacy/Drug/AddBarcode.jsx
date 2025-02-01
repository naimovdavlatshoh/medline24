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
import { BiBarcodeReader } from "react-icons/bi";

export function AddBarcode({ item, language }) {
    const [size, setSize] = React.useState(null);

    const [barcode, setBarcode] = useState("");

    const handleOpen = (value) => setSize(value);

    const AddDrug = (e) => {
        const data = {
            barcode: barcode, // не обязательно
        };

        PostDataTokenJson(
            `api/userwarehouse/medicament/add/barcode/${item?.medicament_id}`,
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
            <button
                onClick={() => handleOpen("xs")}
                disabled={item?.barcode ? true : false}
                className={`px-5 ${
                    !item?.barcode ? "bg-main-green" : "bg-gray-400"
                } bg-main-green text-white py-1 rounded-md`}
            >
                <BiBarcodeReader />
            </button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Штрих-код" : "Dori qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full">
                                <div className="mb-5">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "Штрих-код"
                                                : "shtrix-kod"
                                        }
                                        onChange={(e) =>
                                            setBarcode(e.target.value)
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
                                onClick={(e) => AddDrug(e)}
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
