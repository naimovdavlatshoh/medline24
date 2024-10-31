import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    Input,
    Option,
    Select,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GetDataSimple, PostDataTokenJson } from "../../services";

const AddAction = () => {
    const [language, setLanguage] = useState("ru");
    const [size, setSize] = useState(null);
    const handleOpen = (value) => setSize(value);
    const [koykprices, setKoykprices] = useState([]);
    const [services, setServices] = useState([]);

    const [nameuz, setNameuz] = useState("");
    const [nameru, setNameru] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [aksiyaItems, setAksiyaItems] = useState([
        { service_id: 0, koyka_price_id: 0, discount_percent: 0 },
    ]);
    useEffect(() => {
        GetDataSimple(`api/koykatype/list?page=1&limit=10`).then((res) => {
            setKoykprices(res?.result);
        });
    }, []);
    useEffect(() => {
        GetDataSimple(`api/services/list?page=1&limit=10`).then((res) => {
            setServices(res?.result);
            console.log(res?.result);
        });
    }, []);

    const handleAddAction = () => {
        setAksiyaItems([
            ...aksiyaItems,
            { service_id: 0, koyka_price_id: 0, discount_percent: 0 },
        ]);
    };

    const handleInputChange = (index, key, value) => {
        const updatedItems = aksiyaItems.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setAksiyaItems(updatedItems);
    };

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const AddUser = (e) => {
        e.preventDefault();
        const data = {
            aksiya_name_ru: nameru,
            aksiya_name_uz: nameuz,
            start_date: startdate,
            end_date: enddate,
            aksiya_item: aksiyaItems,
        };

        PostDataTokenJson("/api/aksiya/create", data)
            .then(() => {
                handleOpen(null), setAksiyaItems([]);
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    console.log(aksiyaItems);

    return (
        <div>
            <Button
                className="flex items-center gap-3 py-3"
                onClick={() => handleOpen("sm")}
                size="sm"
            >
                {language == "ru"
                    ? "добавить пользователя"
                    : "foydalanuvchi qo'shish"}
            </Button>
            <>
                <Dialog
                    className="bg-theme-bg text-theme-text"
                    open={size === "sm"}
                    size={size || "md"}
                    handler={handleOpen}
                >
                    <DialogHeader>
                        {language == "ru"
                            ? "Добавить пользователя"
                            : "Yangi foydalanuvchi qo'shish"}
                    </DialogHeader>
                    <DialogBody>
                        <form onSubmit={(e) => AddUser(e)}>
                            <div className="flex flex-col justify-between gap-3 mb-5">
                                <div className="w-full flex  gap-4">
                                    <Input
                                        onChange={(e) =>
                                            setNameru(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "название акций (ru)"
                                                : "aksiya nomi (ru)"
                                        }
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setNameuz(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "название акций (uz)"
                                                : "aksiya nomi (uz)"
                                        }
                                    />
                                </div>
                                <div className="w-full flex  gap-4">
                                    <Input
                                        type="date"
                                        onChange={(e) =>
                                            setStartdate(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Фамилия пользователя:"
                                                : "Foydalanuvchining familyasi"
                                        }
                                    />
                                    <Input
                                        type="date"
                                        onChange={(e) =>
                                            setEnddate(e.target.value)
                                        }
                                        color="blue"
                                        label={
                                            language == "ru"
                                                ? "Фамилия пользователя:"
                                                : "Foydalanuvchining familyasi"
                                        }
                                    />
                                </div>
                                <div className="w-full flex flex-col items-center gap-4">
                                    {aksiyaItems.map((aksiyaItem, index) => (
                                        <div
                                            className="w-full flex gap-4"
                                            key={index}
                                        >
                                            <Select
                                                color="blue"
                                                label={
                                                    language === "ru"
                                                        ? "Выберите услуга:"
                                                        : "Xizmat Tanlang:"
                                                }
                                                value={
                                                    language === "ru"
                                                        ? aksiyaItem?.service_name_ru
                                                        : aksiyaItem?.service_name_uz
                                                }
                                            >
                                                {services?.map((item, idx) => (
                                                    <Option
                                                        key={idx}
                                                        onClick={() =>
                                                            handleInputChange(
                                                                index,
                                                                "service_id",
                                                                parseInt(
                                                                    item?.service_id
                                                                )
                                                            )
                                                        }
                                                        className="text-theme-text bg-theme-bg mb-2"
                                                    >
                                                        {language === "ru"
                                                            ? item?.service_name_ru
                                                            : item?.service_name_uz}
                                                    </Option>
                                                ))}
                                            </Select>
                                            <Select
                                                color="blue"
                                                label={
                                                    language === "ru"
                                                        ? "Выберите койки:"
                                                        : "Koyka Tanlang:"
                                                }
                                                value={
                                                    language === "ru"
                                                        ? aksiyaItem.type_name_ru
                                                        : aksiyaItem.type_name_uz
                                                }
                                            >
                                                {koykprices?.map((item) => (
                                                    <Option
                                                        key={item.id}
                                                        onClick={() =>
                                                            handleInputChange(
                                                                index,
                                                                "koyka_price_id",
                                                                parseInt(
                                                                    item.koyka_price_id
                                                                )
                                                            )
                                                        }
                                                        className="text-theme-text bg-theme-bg mb-2"
                                                    >
                                                        {language === "ru"
                                                            ? item?.type_name_ru
                                                            : item?.type_name_uz}
                                                    </Option>
                                                ))}
                                            </Select>
                                            <Input
                                                type="number"
                                                color="blue"
                                                label={
                                                    language === "ru"
                                                        ? "процент акций"
                                                        : "Aksiya foizi"
                                                }
                                                value={
                                                    aksiyaItem.discount_percent
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "discount_percent",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                    <Button onClick={handleAddAction}>
                                        {language === "ru"
                                            ? "добавить действие"
                                            : "aksiya qo'shish"}
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="text"
                                    color="red"
                                    onClick={() => handleOpen(null)}
                                    className="mr-1"
                                >
                                    <span>
                                        {language == "ru"
                                            ? "закрыть"
                                            : "Yopish"}
                                    </span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    type="submit"
                                >
                                    <span>
                                        {language == "ru"
                                            ? "Добавить"
                                            : "Qo'shish"}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </DialogBody>
                </Dialog>
            </>
        </div>
    );
};

export default AddAction;
