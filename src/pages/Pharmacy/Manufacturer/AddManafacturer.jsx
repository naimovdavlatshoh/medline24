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

export function AddManafacturer({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");
    const [country, setCountry] = useState(null);

    const [region, setRegion] = useState([]);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/country/list").then((res) => {
            setRegion(res);
        });
    }, []);

    const AddSupplier = (e) => {
        const data = {
            manufacturer_name: name,
            country_id: country,
        };

        PostDataTokenJson(`api/userwarehouse/manufacturer/create`, data)
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
                    ? "добавить Производитель"
                    : "Ishlab chiqaruvchi qo'shish"}
            </Button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
                className="text-theme-text bg-theme-bg"
            >
                <DialogHeader>
                    {language == "ru"
                        ? "Добавить Производитель"
                        : "Ishlab chiqaruvchi qo'shish"}
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
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "страна"
                                                : "mamlakat"
                                        }
                                        onChange={(e) => setCountry(e)}
                                    >
                                        {region?.map((item, index) => (
                                            <Option
                                                key={index}
                                                value={item.country_id}
                                            >
                                                {item.country_name}
                                            </Option>
                                        ))}
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
