import React, { useState } from "react";
import LoginImg from "../../assets/images/doctor.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { PostData } from "../../services";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [passwordstatus, setPasswordstatus] = useState(true);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const SignIn = () => {
        const data = {
            username: "admin",
            password: "admin",
        };
        PostData("login", data)
            .then((res) => console.log(res))
            .catch((err) => {
                const myObj = err.response.data;
                toast.error(myObj[Object.keys(myObj)[0]]);
            });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-back">
            <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full">
                <div className="md:w-1/2 bg-gradient-to-tr from-blue-200 to-blue-500 p-8 flex flex-col items-center justify-center">
                    <img
                        src={LoginImg} // Replace with actual image
                        alt="Doctor"
                        className="rounded-full mb-6"
                    />
                </div>

                {/* Right Form Section */}
                <div className="md:w-1/2 flex flex-col p-8 justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700">
                        Давайте защитим себя и тех, кто вас окружает, проведя
                        вакцинацию💉
                    </h2>
                    {/* Registration Options */}
                    {/* Full Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm text-black mb-2">
                            введите логин
                        </label>
                        <input
                            onChange={(e) => setLogin(e.target.value)}
                            type="text"
                            placeholder="логин"
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    {/* Mobile Number Input */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-black">
                            введите свой пароль
                        </label>
                        <div className="flex space-x-2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordstatus ? "password" : "text"}
                                placeholder="пароль"
                                className="w-full p-2 border border-gray-300 rounded-md text-black"
                            />
                            <button
                                onClick={() =>
                                    setPasswordstatus(!passwordstatus)
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                {passwordstatus ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={
                            login.length >= 4 && password.length >= 6
                                ? false
                                : true
                        }
                        onClick={SignIn}
                        className="bg-blue-600 text-white w-full py-2 rounded-md"
                    >
                        войти
                    </Button>
                    {/* Already Registered */}
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            <a href="#" className="text-blue-500 underline">
                                Check your status
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
