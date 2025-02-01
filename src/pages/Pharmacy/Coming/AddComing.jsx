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

export function AddComing({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [warehouse, setWarehouse] = useState([]);
    const [warehouseId, setWarehouseId] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierId, setSupplierId] = useState(null);

    useEffect(() => {
        GetDataSimple("api/warehouse/list?page=1&limit=10").then((res) => {
            setWarehouse(res.result);
        });
    }, []);
    useEffect(() => {
        GetDataSimple("api/userwarehouse/suppliers/list?page=1&limit=10").then(
            (res) => {
                setSuppliers(res.result);
            }
        );
    }, []);

    const handleOpen = (value) => setSize(value);

    const AddSupplier = (e) => {
        const data = {
            warehouse_id: parseInt(warehouseId),
            invoice_number: number,
            supplier_id: parseInt(supplierId),
            delivery_date: "13-10-2001",
        };

        PostDataTokenJson(`api/userwarehouse/arrival/create`, data)
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
                {language == "ru" ? "добавить приход" : "Kirim qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru" ? "добавить приход" : "Kirim qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full">
                                <div className="mb-5">
                                    <Select label="Выберите склад">
                                        {warehouse.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setWarehouseId(
                                                        item.warehouse_id
                                                    )
                                                }
                                            >
                                                {item?.warehouse_name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mb-5">
                                    <Input
                                        label={language == "ru" ? "имя" : "ism"}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <Select label="Выберите поставщика">
                                        {suppliers.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setSupplierId(
                                                        item.supplier_id
                                                    )
                                                }
                                            >
                                                {item?.supplier_name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mb-5">
                                    <Input
                                        type="date"
                                        label={
                                            language == "ru" ? "дата" : "sana"
                                        }
                                        onChange={(e) =>
                                            setDate(e.target.value)
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
