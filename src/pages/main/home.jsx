import React from "react";

const Home = () => {
    return (
        <div className="bg-theme-bg text-theme-text h-full rounded-xl ">
            <div className="w-full h-full flex flex-col md:flex-row gap-5">
                <div className="w-1/2 h-full flex flex-col gap-5">
                    <div className="rounded-2xl h-1/2 w-full bg-blue-50 shadow-lg"></div>
                    <div className="flex w-full h-1/2 gap-5">
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-5">
                    <div className="flex w-full h-1/2 gap-5">
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                    </div>
                    <div className="flex w-full h-1/2 gap-5">
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                        <div className="w-1/2 h-full bg-blue-50 shadow-lg rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
