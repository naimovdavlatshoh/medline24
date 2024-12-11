import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
    const navigate = useNavigate();

    const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkTokenExpiration();

        const intervalId = setInterval(checkTokenExpiration, 60000);

        return () => clearInterval(intervalId);
    }, [navigate]);
};

export default useTokenExpiration;
