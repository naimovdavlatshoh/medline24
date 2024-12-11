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
import { Add, Delete } from "../../../utils/constants";

export function AddPatients({ changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [firstname, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [fathername, setFathername] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState(0);
    const [local, setLocal] = useState(0);
    const [region, setRegion] = useState([]);
    const [regionId, setRegionId] = useState(null);
    const [district, setDistrict] = useState([]);
    const [districtId, setDistrictId] = useState(null);

    const handleOpen = (value) => setSize(value);

    useEffect(() => {
        GetDataSimple("api/region/list").then((res) => {
            setRegion(res);
        });
    }, []);
    useEffect(() => {
        if (regionId) {
            GetDataSimple(`api/district/list/${regionId}`).then((res) => {
                setDistrict(res);
            });
        }
    }, [regionId]);

    const AddUser = (e) => {
        const data = {
            firstname: firstname,
            lastname: lastname,
            fathername: fathername,
            date_of_birth: birth,
            gender: gender,
            is_local: local,
            region_id: parseInt(regionId),
            district_id: parseInt(districtId),
            address: address,
            phone_number: number,
        };

        PostDataTokenJson("api/patient/create", data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
            });
    };

    return (
        <>
            <Button onClick={() => handleOpen("lg")} variant="gradient">
                {language == "ru" ? "Добавить пациентов" : "Bemor qo'shish"}
            </Button>

            <Dialog
                open={size === "lg"}
                size={size || "lg"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {language == "ru" ? "Добавить пациентов" : "Bemor qo'shish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full md:w-1/2">
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru" ? "имя :" : "ismi)"
                                        }
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "фамилия:"
                                                : "familya"
                                        }
                                        onChange={(e) =>
                                            setlastname(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "отчество:"
                                                : "sharifi"
                                        }
                                        onChange={(e) =>
                                            setFathername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={
                                            language == "ru"
                                                ? "адрес:"
                                                : "Manzil"
                                        }
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={"+998"}
                                        maxLength={13}
                                        label={
                                            language == "ru"
                                                ? "номер телефона:"
                                                : "telefon raqam"
                                        }
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="mb-3">
                                    <Input
                                        type="date"
                                        label={
                                            language == "ru"
                                                ? "дата рождения :"
                                                : "tug'ilgan sana"
                                        }
                                        onChange={(e) =>
                                            setBirth(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "выберите пол:"
                                                : "jinsni tanlang"
                                        }
                                    >
                                        <Option onClick={() => setGender(1)}>
                                            {language == "ru"
                                                ? "мужчина"
                                                : "erkak"}
                                        </Option>
                                        <Option onClick={() => setGender(0)}>
                                            {language == "ru"
                                                ? "женщина"
                                                : "ayol"}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "местный?:"
                                                : "mahalliymi?"
                                        }
                                    >
                                        <Option onClick={() => setLocal(1)}>
                                            {language == "ru"
                                                ? Delete.rutrue
                                                : Delete.uztrue}
                                        </Option>
                                        <Option onClick={() => setLocal(0)}>
                                            {language == "ru"
                                                ? Delete.rufalse
                                                : Delete.uzfalse}
                                        </Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        label={
                                            language == "ru"
                                                ? "область:"
                                                : "viloyat:"
                                        }
                                    >
                                        {region?.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setRegionId(item?.region_id)
                                                }
                                            >
                                                {language == "ru"
                                                    ? item?.name_ru
                                                    : item?.name_uz}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <Select
                                        disabled={!regionId}
                                        label={
                                            language == "ru"
                                                ? "округ:"
                                                : "tuman:"
                                        }
                                    >
                                        {district?.map((item) => (
                                            <Option
                                                onClick={() =>
                                                    setDistrictId(
                                                        item?.district_id
                                                    )
                                                }
                                            >
                                                {language == "ru"
                                                    ? item?.name_ru
                                                    : item?.name_uz}
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
                                onClick={(e) => AddUser(e)}
                            >
                                <span>
                                    {" "}
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
