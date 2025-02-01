import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Home,
    Login,
    Personal,
    Division,
    Service,
    Analyze,
    NotFound,
    Visits,
    Objects,
    Palats,
    ListKoyk,
    Koyk,
    Method,
    Share,
    Warehouse,
    Actions,
    Diet,
    AllPatients,
    AddVisit,
    RecievePatient,
    AmbulatorDetail,
    Priyom,
    HistoryPayment,
    HistoryDetail,
    PatientVisits,
    NewPatients,
    AmbulatorPatientsLabaratory,
    Refund,
    NewDiagnosticPatients,
    DiagnosticPatients,
    Drugs,
    Supplier,
    Manafacturer,
    Coming,
    Remainder,
    Relocation,
    Return,
    NurseWarehouse,
} from "./pages/data";
import useTokenExpiration from "./components/useTokenExpiration";
import AdminLayout from "./components/MainLayout";
import RegisterLayout from "./components/Register/RegisterLayout";
import VrachLayout from "./components/Vrach/VrachLayout";
import AmbulatorPatient from "./pages/Vrach/AmbulatorPatients/AmbulatorPatients";
import KassaLayout from "./components/Kassa/KassaLayout";
import LabaratoryLayout from "./components/Labaratory/LabaratoryLayout";
import DiagnosticLayout from "./components/Diagnostic/DiagnosticLayout";
import PharmacyLayout from "./components/Pharmacy/PharmacyLayout";
import NurseLayout from "./components/Nurse/NurseLayout";

const App = () => {
    useTokenExpiration();
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {localStorage.getItem("role") == "Admin" && (
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Home />} />
                    <Route path="personal" element={<Personal />} />
                    <Route path="division" element={<Division />} />
                    <Route path="service" element={<Service />} />
                    <Route path="analyze" element={<Analyze />} />
                    <Route path="visits" element={<Visits />} />
                    <Route path="objects" element={<Objects />} />
                    <Route path="palats" element={<Palats />} />
                    <Route path="beds" element={<ListKoyk />} />
                    <Route path="koyk" element={<Koyk />} />
                    <Route path="method" element={<Method />} />
                    <Route path="share" element={<Share />} />
                    <Route path="warehouse" element={<Warehouse />} />
                    <Route path="actions" element={<Actions />} />
                    <Route path="diet" element={<Diet />} />
                </Route>
            )}
            {localStorage.getItem("role") == "Регистратура" && (
                <Route path="/" element={<RegisterLayout />}>
                    <Route index element={<AllPatients />} />
                    <Route
                        path="/patient-visits/:id"
                        element={<PatientVisits />}
                    />
                </Route>
            )}
            {localStorage.getItem("role") == "Врач" && (
                <Route path="/" element={<VrachLayout />}>
                    <Route index element={<RecievePatient />} />
                    <Route
                        path="/ambulator-patients"
                        element={<AmbulatorPatient />}
                    />
                    <Route
                        path="/ambulator-details/:id/:patientId"
                        element={<AmbulatorDetail />}
                    />
                </Route>
            )}
            {localStorage.getItem("role") == "Касса-Регистратура" && (
                <Route path="/" element={<KassaLayout />}>
                    <Route index element={<Priyom />} />
                    <Route
                        path="/history-payments"
                        element={<HistoryPayment />}
                    />
                    <Route
                        path="/payment-detail/:id/:name"
                        element={<HistoryDetail />}
                    />
                    <Route path="/refund" element={<Refund />} />
                </Route>
            )}
            {localStorage.getItem("role") == "Лаборатория" && (
                <Route path="/" element={<LabaratoryLayout />}>
                    <Route index element={<NewPatients />} />
                    <Route
                        path="/ambulatory-patients"
                        element={<AmbulatorPatientsLabaratory />}
                    />
                </Route>
            )}
            {localStorage.getItem("role") == "Диагностика" && (
                <Route path="/" element={<DiagnosticLayout />}>
                    <Route index element={<NewDiagnosticPatients />} />
                    <Route
                        path="/diagnostic-ambulator-patients"
                        element={<DiagnosticPatients />}
                    />
                </Route>
            )}
            {localStorage.getItem("role") == "Медсестра" && (
                <Route path="/" element={<NurseLayout />}>
                    <Route index element={<NurseWarehouse />} />
                    <Route
                        path="/diagnostic-ambulator-patients"
                        element={<DiagnosticPatients />}
                    />
                </Route>
            )}
            {localStorage.getItem("role") == "Аптекарь" && (
                <Route path="/" element={<PharmacyLayout />}>
                    <Route index element={<Drugs />} />
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/manafacturer" element={<Manafacturer />} />
                    <Route path="/coming" element={<Coming />} />
                    <Route path="/remainder" element={<Remainder />} />
                    <Route
                        path="/relocation-requests"
                        element={<Relocation />}
                    />
                    <Route path="/return-requests" element={<Return />} />
                </Route>
            )}
            <Route path="/addvisit/:id" element={<AddVisit />} />
        </Routes>
    );
};

export default App;
