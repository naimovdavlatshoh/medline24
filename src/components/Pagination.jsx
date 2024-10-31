import { Button, CardFooter, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, [language]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <div>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button
                    variant="outlined"
                    size="sm"
                    className="bg-theme-bg text-theme-text"
                    disabled={currentPage == 1}
                    onClick={() => handlePrevPage()}
                >
                    {language == "ru" ? "назад" : "orqaga"}
                </Button>
                <div className="flex items-center gap-2">
                    {[...Array(totalPages)?.keys()]?.map((page) => (
                        <IconButton
                            variant={
                                currentPage == page + 1 ? "outlined" : "text"
                            }
                            size="sm"
                            className="bg-theme-bg text-theme-text"
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant="outlined"
                    onClick={() => handleNextPage()}
                    disabled={currentPage == totalPages}
                    size="sm"
                    className="bg-theme-bg text-theme-text"
                >
                    {language == "ru" ? "вперед" : "keyingi"}
                </Button>
            </CardFooter>
        </div>
    );
};

export default Pagination;
