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
    const [size, setSize] = React.useState(null);
    const [language, setLanguage] = useState("ru");
    const [comment, setComment] = useState("");
    const [paymentCash, setPaymentCash] = useState(0);
    const [paymentCashStatus, setPaymentCashStatus] = useState(false);
    const [paymentCard, setPaymentCard] = useState(0);
    const [paymentCardStatus, setPaymentCardStatus] = useState(false);
    const [paymentTransfer, setPaymentTransfer] = useState(0);
    const [paymentTransferStatus, setPaymentTransferStatus] = useState(false);
    const [remainingAmount, setRemainingAmount] = useState(
        item?.finally_price_with_discount || 0
    );

    const option_data = item?.option?.map(
        ({ payment_id, visit_service_item_id }) => ({
            payment_id,
            visit_service_item_id,
        })
    );

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const handleOpen = (value) => setSize(value);

    const calculateRemaining = () => {
        const usedAmount =
            (paymentCashStatus ? parseFloat(paymentCash || 0) : 0) +
            (paymentCardStatus ? parseFloat(paymentCard || 0) : 0) +
            (paymentTransferStatus ? parseFloat(paymentTransfer || 0) : 0);
        const remaining = (item?.finally_price_with_discount || 0) - usedAmount;
        return remaining > 0 ? remaining : 0;
    };

    useEffect(() => {
        setRemainingAmount(calculateRemaining());
    }, [paymentCash, paymentCard, paymentTransfer]);

    const handlePayment = () => {
        const data = {
            refused_payment_cash: parseInt(paymentCash),
            refused_payment_card: parseInt(paymentCard),
            refused_payment_transfer: parseInt(paymentTransfer),
            refused_comments: comment,
        };
        PostDataTokenJson(
            `api/visit/service/moneyback/${item.unique_payment_id}`,
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
                    {language == "ru" ? "Возврат" : "Qaytarish"}
                </DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center  mb-5">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">
                                    {language == "ru"
                                        ? "Сумма к оплате:"
                                        : "To'lov narxi"}
                                </label>
                                <Input
                                    variant="static"
                                    type="text"
                                    value={item?.finally_price_with_discount}
                                    disabled
                                />
                            </div>
                        </div>
                        <p className="w-1/5 block lg:hidden">Наличный</p>
                        <div className="flex justify-between items-center mb-5 gap-2">
                            <p className="w-1/5 hidden lg:block">Наличный</p>
                            <div className="w-3/5">
                                <input
                                    onChange={(e) => {
                                        setPaymentCash(e.target.value);
                                    }}
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentCashStatus}
                                    placeholder={remainingAmount}
                                    className="border-b border-main-green w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="w-1/5 flex justify-center">
                                <Switch
                                    color="green"
                                    defaultValue={paymentCashStatus}
                                    onChange={(e) =>
                                        setPaymentCashStatus(!paymentCashStatus)
                                    }
                                />
                            </div>
                        </div>
                        <p className="w-1/5 block lg:hidden">Пластиковый</p>
                        <div className="flex justify-between items-center mb-5 gap-2">
                            <p className="w-1/5 hidden lg:block">Пластиковый</p>
                            <div className="w-3/5">
                                <input
                                    onChange={(e) => {
                                        setPaymentCard(e.target.value);
                                    }}
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentCardStatus}
                                    placeholder={remainingAmount}
                                    className="border-b border-main-green w-full bg-transparent outline-none"
                                />
                            </div>
                            <div className="w-1/5 flex justify-center">
                                <Switch
                                    color="green"
                                    defaultValue={paymentCashStatus}
                                    onChange={(e) =>
                                        setPaymentCardStatus(!paymentCardStatus)
                                    }
                                />
                            </div>
                        </div>
                        <p className="w-1/5 block lg:hidden">Перечисление</p>

                        <div className="flex justify-between items-center mb-5 gap-2">
                            <p className="w-1/5 hidden lg:block">
                                Перечисление
                            </p>
                            <div className="w-3/5">
                                <input
                                    label="расчет"
                                    type="text"
                                    disabled={!paymentTransferStatus}
                                    onChange={(e) => {
                                        setPaymentTransfer(e.target.value);
                                    }}
                                    placeholder={remainingAmount}
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
                        <div className="flex justify-between items-center mb-5 gap-2">
                            <div className="w-full">
                                <input
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                    type="text"
                                    placeholder={
                                        language == "ru"
                                            ? "комментарий"
                                            : "izoh"
                                    }
                                    className="border-b border-main-green w-full bg-transparent outline-none"
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
                                <span>
                                    {language == "ru"
                                        ? "Отмена"
                                        : "Bekor qilish"}
                                </span>
                            </Button>
                            <Button
                                onClick={handlePayment}
                                variant="gradient"
                                color="green"
                            >
                                <span>
                                    {language == "ru" ? "Оплата" : "To'lov"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
