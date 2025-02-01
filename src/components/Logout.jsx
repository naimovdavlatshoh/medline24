import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [lang, setLang] = useState(localStorage.getItem("lang"));
    const navigate = useNavigate();
    const [size, setSize] = React.useState(null);
    const handleOpen = (value) => setSize(value);

    const logoutSite = () => {
        localStorage.clear();
        handleOpen(null);
        navigate("/login");
    };
    return (
        <div>
            <button
                onClick={() => handleOpen("xs")}
                className="text-red-400  rounded-2xl flex justify-center items-center"
            >
                <FaPowerOff size={25} />
            </button>
            <Dialog
                className="bg-theme-bg text-theme-text"
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>
                    {lang == "ru"
                        ? "Вы хотите покинуть проект?"
                        : "Tizimdan chiqishni hoxlaysizmi?"}
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="mr-1"
                    >
                        <span>{lang == "ru" ? "Нет" : "Yoq"}</span>
                    </Button>
                    <Button
                        onClick={() => logoutSite()}
                        variant="gradient"
                        color="green"
                    >
                        <span>{lang == "ru" ? "Да" : "Ha"}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Logout;
