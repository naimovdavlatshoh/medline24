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

export function EditWarehouse({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    console.log(item);

    const [nameru, setNameru] = useState(item?.warehouse_name_ru);
    const [nameuz, setNameuz] = useState(item?.warehouse_name_uz);
    const [mainStatus, setMainStatus] = useState(1);
    const [wareStatus, setWareStatus] = useState(1);
    const [externalType, setexternalType] = useState(1);
    const [internalType, setinternalType] = useState(1);
    const [operatingType, setoperatingType] = useState(1);

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            warehouse_name_ru: nameru,
            warehouse_name_uz: nameuz,
            main_status: mainStatus,
            warehouse_status: wareStatus,
            external_type: externalType,
            internal_type: internalType,
            operating_type: operatingType,
        };

        PostDataTokenJson(`api/warehouse/update/${item?.warehouse_id}`, data)
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
            <Tooltip content="Edit User">
                <IconButton variant="text" onClick={() => handleOpen("xs")}>
                    <PencilIcon className="h-4 w-4" color="orange" />
                </IconButton>
            </Tooltip>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>Изменять метод.</DialogHeader>
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
                                        defaultValue={nameru}
                                        onChange={(e) =>
                                            setNameru(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={nameuz}
                                        label={
                                            language == "ru"
                                                ? "имя (uz):"
                                                : "nomi (uz)"
                                        }
                                        onChange={(e) =>
                                            setNameuz(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "это главное?"
                                                : "Bu asosiy?"
                                        }
                                    >
                                        <Option
                                            onClick={() => setMainStatus(0)}
                                        >
                                            {language == "ru" ? "да" : "ha"}
                                        </Option>
                                        <Option
                                            onClick={() => setMainStatus(1)}
                                        >
                                            {language == "ru" ? "нет" : "yo'q"}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "Это платно?"
                                                : "Bu pullikmi?"
                                        }
                                    >
                                        <Option
                                            onClick={() => setWareStatus(1)}
                                        >
                                            {language == "ru" ? "да" : "ha"}
                                        </Option>
                                        <Option
                                            onClick={() => setWareStatus(0)}
                                        >
                                            {language == "ru" ? "нет" : "yo'q"}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "Внешний?"
                                                : "Tashqimi?"
                                        }
                                    >
                                        <Option
                                            onClick={() => setexternalType(0)}
                                        >
                                            {language == "ru" ? "да" : "ha"}
                                        </Option>
                                        <Option
                                            onClick={() => setexternalType(1)}
                                        >
                                            {language == "ru" ? "нет" : "yo'q"}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "Внутренний"
                                                : "Ichkimi?"
                                        }
                                    >
                                        <Option
                                            onClick={() => setinternalType(0)}
                                        >
                                            {language == "ru" ? "да" : "ha"}
                                        </Option>
                                        <Option
                                            onClick={() => setinternalType(1)}
                                        >
                                            {language == "ru" ? "нет" : "yo'q"}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "Операционный?"
                                                : "Operatsion?"
                                        }
                                    >
                                        <Option
                                            onClick={() => setoperatingType(0)}
                                        >
                                            {language == "ru" ? "да" : "ha"}
                                        </Option>
                                        <Option
                                            onClick={() => setoperatingType(1)}
                                        >
                                            {language == "ru" ? "нет" : "yo'q"}
                                        </Option>
                                    </Select>
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
