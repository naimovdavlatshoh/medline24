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

export function AddDrug({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [drugname, setDrugname] = useState("");
    const [barcode, setBarcode] = useState("");

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/userwarehouse/medicament/category/list").then(
            (res) => {
                setCategories(res);
                console.log(res);
            }
        );
    }, []);

    const AddDrug = (e) => {
        const data = {
            category_id: parseInt(category),
            medicament_name: drugname,
            barcode: parseInt(barcode), // не обязательно
        };

        PostDataTokenJson("api/userwarehouse/medicament/create", data)
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
                {language == "ru" ? "Добавление лекарства" : "Dori qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить лекарства" : "Dori qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full mb-5">
                                {/* Select for main visit type */}
                                <Select
                                    label={
                                        language == "ru"
                                            ? "выбор категории"
                                            : "kategoriya tanlang"
                                    }
                                >
                                    {categories?.map((t) => (
                                        <Option
                                            key={t.category_id}
                                            onClick={() =>
                                                setCategory(t.category_id)
                                            }
                                        >
                                            {t?.category_name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full">
                                <div className="mb-5">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "наимевания"
                                                : "nomi"
                                        }
                                        onChange={(e) =>
                                            setDrugname(e.target.value)
                                        }
                                    />
                                </div>
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
