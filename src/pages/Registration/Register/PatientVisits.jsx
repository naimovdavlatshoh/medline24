import { Card, CardHeader, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GetDataSimple } from "../../../services";
import { useParams } from "react-router-dom";

const PatientVisits = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        GetDataSimple(`api/visit/patient/view/${id}`).then((res) =>
            setPatient(res)
        );
    });

    return (
        <div>
            <Card className="bg-theme-bg text-theme-text">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none bg-theme-bg text-theme-text"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:items-start bg-theme-bg text-theme-text">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                {patient?.patient_name}
                            </Typography>
                        </div>

                        <div className="flex w-full shrink-0 gap-2   min-h-[200px] bg-green-50 p-5 md:p-5 rounded-xl shadow-lg">
                            <ul className="flex flex-col lg:flex-row justify-start gap-0 lg:gap-10 items-start w-full text-black">
                                <div className="w-full lg:w-1/2">
                                    <li className="font-semibold mb-2">
                                        адрес. :
                                        <span className="font-normal">
                                            {patient?.address}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        дата назначения :
                                        <span className="font-normal">
                                            {patient?.appointment_date}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        имя гражданина. :
                                        <span className="font-normal">
                                            {patient?.patient_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        дата рождения. :
                                        <span className="font-normal">
                                            {patient?.date_of_birth}
                                        </span>
                                    </li>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <li className="font-semibold mb-2">
                                        название района:
                                        <span className="font-normal">
                                            {patient?.region_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        пол. :
                                        <span className="font-normal">
                                            {patient?.gender_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        местный?. :
                                        <span className="font-normal">
                                            {patient?.citizen_name}
                                        </span>
                                    </li>
                                    <li className="font-semibold mb-2">
                                        номер телефона. :
                                        <span className="font-normal">
                                            {patient?.phone_number}
                                        </span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default PatientVisits;
