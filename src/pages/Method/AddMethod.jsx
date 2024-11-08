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
import { GetDataSimple, PostDataTokenJson } from "../../services";

export function AddMethod({ changeStatus }) {
    const [size, setSize] = React.useState(null);

    const [name, setName] = useState("");

    const handleOpen = (value) => setSize(value);

    const AddUser = (e) => {
        const data = {
            method_name: name,
        };

        PostDataTokenJson("api/injmethod/create", data)
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
            <Button onClick={() => handleOpen("xs")} variant="gradient">
                Добавить метод
            </Button>

            <Dialog
            className="text-theme-text bg-theme-bg"
                open={size === "xs"}
                size={size || "xs"}
                handler={handleOpen}
            >
                <DialogHeader>Добавить метод.</DialogHeader>
                <DialogBody>
                    <div className="w-full">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <div className="mb-3">
                                    <Input
                                        label="
                                        Название (ru)"
                                        onChange={(e) =>
                                            setName(e.target.value)
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
                                <span>Cancel</span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={(e) => AddUser(e)}
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
