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

export function EditManafacturer({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState(item?.manufacturer_name);
    const [country, setCountry] = useState(item?.country_id);

    const [region, setRegion] = useState([]);

    useEffect(() => {
        GetDataSimple("api/country/list").then((res) => {
            setRegion(res);
        });
    }, []);

    const handleOpen = (value) => setSize(value);

    const UpdateManafacturer = (e) => {
        const data = {
            manufacturer_name: name,
            country_id: country,
        };

        PostDataTokenJson(
            `api/userwarehouse/manufacturer/update/${item?.manufacturer_id}`,
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
                        ? "Изменить Производитель"
                        : "Ishlab chiqaruvchini o'zgartirish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="">
                            <div className="w-full">
                                <div className="mb-5">
                                    <Input
                                        defaultValue={name}
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
                                        ? Edit.rufalse
                                        : Edit.uzfalse}
                                </span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => UpdateManafacturer(e)}
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
