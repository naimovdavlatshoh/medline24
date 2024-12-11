import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    IconButton,
    Select,
    Option,
} from "@material-tailwind/react";
import { GetDataSimple, PostDataTokenJson } from "../../../services";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Delete, Edit } from "../../../utils/constants";

export function EditPatients({ item, changeStatus, language }) {
    const [size, setSize] = React.useState(null);

    const [firstname, setFirstname] = useState(item?.firstname);
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
    const [errors, setErrors] = useState({});

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
        if (!validate()) return;
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

        PostDataTokenJson(`api/diet/update/${item?.patient_id}`, data)
            .then(() => {
                handleOpen(null);
                changeStatus();
            })
            .catch(() => {
                handleOpen(null);
                changeStatus();
            });
    };

    const validate = () => {
        const newErrors = {};
        if (!firstname.trim()) newErrors.firstname = "Это поле обязательным.";
        if (!lastname.trim()) newErrors.lastname = "Это поле обязательным.";
        if (!fathername.trim()) newErrors.fathername = "Это поле обязательным.";
        if (!address.trim()) newErrors.address = "Это поле обязательным.";
        if (!number.trim()) newErrors.number = "Это поле обязательным.";
        if (!birth.trim()) newErrors.birth = "Это поле обязательным.";
        if (gender === null) newErrors.gender = "Это поле обязательным.";
        if (local === null) newErrors.local = "Это поле обязательным.";
        if (!regionId) newErrors.regionId = "Это поле обязательным.";
        if (!districtId) newErrors.districtId = "Это поле обязательным.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <IconButton variant="text" onClick={() => handleOpen("lg")}>
                <PencilIcon className="h-4 w-4" color="orange" />
            </IconButton>

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
                                        value={firstname}
                                        label={
                                            language == "ru" ? "имя :" : "ismi)"
                                        }
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        error={!!errors.firstname}
                                    />
                                    {errors.firstname && (
                                        <p className="text-red-500 text-sm">
                                            {errors.firstname}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={item?.lastname}
                                        label={
                                            language == "ru"
                                                ? "фамилия:"
                                                : "familya"
                                        }
                                        onChange={(e) =>
                                            setlastname(e.target.value)
                                        }
                                        error={!!errors.lastname}
                                    />
                                    {errors.lastname && (
                                        <p className="text-red-500 text-sm">
                                            {errors.lastname}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={item?.fathername}
                                        label={
                                            language == "ru"
                                                ? "отчество:"
                                                : "sharifi"
                                        }
                                        onChange={(e) =>
                                            setFathername(e.target.value)
                                        }
                                        error={!!errors.fathername}
                                    />
                                    {errors.fathername && (
                                        <p className="text-red-500 text-sm">
                                            {errors.fathername}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={item?.address}
                                        label={
                                            language == "ru"
                                                ? "адрес:"
                                                : "Manzil"
                                        }
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        error={!!errors.address}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <Input
                                        defaultValue={item?.phone_number}
                                        maxLength={13}
                                        label={
                                            language == "ru"
                                                ? "номер телефона:"
                                                : "telefon raqam"
                                        }
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                        error={!!errors.phone_number}
                                    />
                                    {errors.phone_number && (
                                        <p className="text-red-500 text-sm">
                                            {errors.phone_number}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="mb-3">
                                    <Input
                                        type="date"
                                        label={
                                            language == "ru"
                                                ? `дата рождения :`
                                                : `tug'ilgan sana :`
                                        }
                                        defaultValue={item?.date_of_birth}
                                        onChange={(e) =>
                                            setBirth(e.target.value)
                                        }
                                        error={!!errors.date_of_birth}
                                    />
                                    {errors.date_of_birth && (
                                        <p className="text-red-500 text-sm">
                                            {errors.date_of_birth}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <Select
                                        error={!!errors.gender}
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
                                    {errors.gender && (
                                        <p className="text-red-500 text-sm">
                                            {errors.gender}
                                        </p>
                                    )}
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
