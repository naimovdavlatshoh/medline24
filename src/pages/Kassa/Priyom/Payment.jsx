import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Checkbox,
    Input,
    Switch,
} from "@material-tailwind/react";
import { PostDataTokenJson } from "../../../services";

export function Payment({ item, changeStatus }) {
    console.log(item);
    const [size, setSize] = React.useState(null);
    const [language, setLanguage] = useState("ru");
    const [discount, setDiscount] = useState(0);
    const [discountPersent, setDiscountPersent] = useState(0);
    const [paymentCash, setPaymentCash] = useState(0);
    const [paymentCashStatus, setPaymentCashStatus] = useState(false);
    const [paymentCard, setPaymentCard] = useState(0);
    const [paymentCardStatus, setPaymentCardStatus] = useState(false);
    const [paymentTransfer, setPaymentTransfer] = useState(0);
    const [paymentTransferStatus, setPaymentTransferStatus] = useState(false);

    const option_data = item?.option?.map(
        ({ payment_id, visit_service_item_id }) => ({
            payment_id,
            visit_service_item_id,
        })
    );

    console.log(option_data);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const handleOpen = (value) => setSize(value);

    const handlePayment = () => {
        console.log("salom");
        const data = {
            payment_id: item.payment_id,
            discount: discount,
            payment_cash: paymentCash,
            payment_card: paymentCard,
            payment_transfer: paymentTransfer,
            items: option_data,
        };
        PostDataTokenJson(
            `api/visit/ambulator/payment/${item.visit_id}`,
            data
        ).then((res) => {
            if (res.status == 200) {
                changeStatus();
                handleOpen(null);
            }
        });
    };

    return (
        <>
            <button
                disabled={item ? false : true}
                onClick={() => handleOpen("xs")}
                className="px-5 py-2  bg-main-green text-white rounded-lg flex justify-center items-center"
            >
                {language == "ru" ? "оплата" : "to'lov"}
            </button>

            <Dialog
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader className="bg-main-green rounded-t-lg text-white">
                    {language == "ru" ? "Оплата" : "To'lov"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-5">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">
                                    {language == "ru"
                                        ? "Сумма к оплате:"
                                        : "To'lov narxi"}
                                </label>
                                <Input
                                    variant="static"
                                    type="text"
                                    value={0}
                                    disabled
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">
                                    {language == "ru"
                                        ? "Скидка %"
                                        : "Chegirma %"}
                                </label>
                                <Input
                                    variant="static"
                                    type="text"
                                    value={discount}
                                    onChange={(e) => {
                                        setDiscountPersent(
                                            parseInt(e.target.value)
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-5">
                            <p className="w-1/5">Наличный</p>
                            <div className="w-3/5">
                                <input
                                    onChange={(e) => {
                                        setPaymentCash(e.target.value);
                                    }}
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentCashStatus}
                                    placeholder="расчет"
                                    className="border-b border-main-green w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="w-1/5 flex justify-center">
                                {" "}
                                <Switch
                                    color="green"
                                    defaultValue={paymentCashStatus}
                                    onChange={(e) =>
                                        setPaymentCashStatus(!paymentCashStatus)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-5">
                            <p className="w-1/5">Наличный</p>
                            <div className="w-3/5">
                                <input
                                    onChange={(e) => {
                                        setPaymentCard(e.target.value);
                                    }}
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentCardStatus}
                                    placeholder="расчет"
                                    className="border-b border-main-green w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="w-1/5 flex justify-center">
                                {" "}
                                <Switch
                                    color="green"
                                    defaultValue={paymentCashStatus}
                                    onChange={(e) =>
                                        setPaymentCardStatus(!paymentCardStatus)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-5">
                            <p className="w-1/5">Наличный</p>
                            <div className="w-3/5">
                                <input
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentTransferStatus}
                                    onChange={(e) => {
                                        setPaymentTransfer(e.target.value);
                                    }}
                                    placeholder="расчет"
                                    className="border-b border-main-green w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="w-1/5 flex justify-center">
                                {" "}
                                <Switch
                                    color="green"
                                    defaultValue={paymentTransferStatus}
                                    onChange={(e) =>
                                        setPaymentTransferStatus(
                                            !paymentTransferStatus
                                        )
                                    }
                                />
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
                                <span>Cancel</span>
                            </Button>
                            <Button
                                onClick={handlePayment}
                                variant="gradient"
                                color="green"
                            >
                                <span>Confirm</span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
