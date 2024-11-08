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

export function AddKoyk_({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);
    const [koykTypes, setKoykTypes] = useState([]);
    const [koykType, setKoykType] = useState(null);
    const [object, setObject] = useState(null);
    const [objects, setObjects] = useState([]);
    const [palats, setPalats] = useState([]);
    const [palat, setPalat] = useState(null);
    const [floor, setFloor] = useState("");
    const [koykanumber, setKoykanumber] = useState("");

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/koykatype/list?page=1&limit=10").then((res) => {
            setKoykTypes(res?.result);
        });
    }, []);
    useEffect(() => {
        GetDataSimple("api/palata/list?page=1&limit=10").then((res) => {
            setPalats(res?.result);
            console.log(res?.result);
        });
    }, []);
    useEffect(() => {
        GetDataSimple("api/object/list?page=1&limit=10").then((res) => {
            setObjects(res?.result);
        });
    }, []);

    const AddUser = (e) => {
        const data = {
            object_id: object,
            floor_number: floor,
            palata_id: palat,
            koyka_number: koykanumber,
            koyka_type_id: koykType,
        };

        PostDataTokenJson("api/koyka/create", data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    // Handle adding/removing main and option types
    return (
        <>
            <Button onClick={() => handleOpen("lg")} variant="gradient">
                {language == "ru" ? "Добавить Койку" : "Koyka qo'shish"}
            </Button>

            <Dialog
                className="text-theme-text bg-theme-bg"
                open={size === "lg"}
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить Койку" : "Koyka qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5 flex-col md:flex-row">
                            <div className="w-1/2 flex  flex-col md:flex-row gap-3">
                                <Select
                                    label={
                                        language == "ru"
                                            ? "Выбирите объект:"
                                            : "Bino tanlang"
                                    }
                                >
                                    {objects?.map((t) => (
                                        <Option
                                            key={t.dept_id}
                                            onClick={() =>
                                                setObject(t.object_id)
                                            }
                                        >
                                            {t?.object_name}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    label={
                                        language == "ru"
                                            ? "тип Койка"
                                            : "Koyka turi"
                                    }
                                >
                                    {koykTypes?.map((t) => (
                                        <Option
                                            key={t.koyka_type_id}
                                            onClick={() =>
                                                setKoykType(t.koyka_type_id)
                                            }
                                        >
                                            {t?.type_name}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    label={
                                        language == "ru"
                                            ? "выбрать палату:"
                                            : "palata tanlang"
                                    }
                                >
                                    {palats?.map((t) => (
                                        <Option
                                            key={t.palata_id}
                                            onClick={() =>
                                                setPalat(t.palata_id)
                                            }
                                        >
                                            {t?.palata_number}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "Выбирите этаж"
                                                : "Qavat tanlang"
                                        }
                                        onChange={(e) =>
                                            setFloor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "Палата"
                                                : "Palata"
                                        }
                                        onChange={(e) =>
                                            setKoykanumber(e.target.value)
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
