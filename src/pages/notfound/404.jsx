import React from "react";
import NotFoundImg from "../../assets/images/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <img className="mb-5" src={NotFoundImg} alt="" />
                <Link
                    to="/"
                    className="w-[300px] h-[50px] rounded-md bg-blue-400 text-white flex justify-center items-center"
                >
                    перейти на главную страницу
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
