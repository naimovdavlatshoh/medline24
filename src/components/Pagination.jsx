import { Button, CardFooter, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, []);

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

    // Sahifalar ro'yxatini yaratish funksiyasi
    const generatePages = () => {
        const pages = [];
        const maxVisiblePages = 5; // Ko'rsatiladigan maksimal sahifalar soni

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 2) {
                pages.push(1);
            }

            if (currentPage > 3) {
                pages.push("...");
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            if (currentPage < totalPages - 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div>
            {totalPages > 1 && (
                <CardFooter className="flex items-center justify-between p-4">
                    <Button
                        variant="outlined"
                        size="sm"
                        className="bg-theme-bg text-theme-text"
                        disabled={currentPage === 1}
                        onClick={handlePrevPage}
                    >
                        {language === "ru" ? "назад" : "orqaga"}
                    </Button>
                    <div className="flex items-center gap-2">
                        {pages.map((page, index) =>
                            page === "..." ? (
                                <span key={index} className="text-theme-text">
                                    ...
                                </span>
                            ) : (
                                <IconButton
                                    key={index}
                                    variant={
                                        currentPage === page
                                            ? "outlined"
                                            : "text"
                                    }
                                    size="sm"
                                    className="bg-theme-bg text-theme-text"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </IconButton>
                            )
                        )}
                    </div>
                    <Button
                        variant="outlined"
                        size="sm"
                        className="bg-theme-bg text-theme-text"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        {language === "ru" ? "вперед" : "keyingi"}
                    </Button>
                </CardFooter>
            )}
        </div>
    );
};

export default Pagination;
