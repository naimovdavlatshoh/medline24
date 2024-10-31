import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
    const navigate = useNavigate(); // Use useNavigate from React Router v6

    const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT (assuming it's JWT)
            const currentTime = Date.now() / 1000; // Current time in seconds

            if (decodedToken.exp < currentTime) {
                // Token is expired
                localStorage.removeItem("token"); // Remove expired token
                navigate("/login"); // Redirect to login page
            }
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        // Check for token expiration on component mount
        checkTokenExpiration();

        // Optional: Add an interval to check periodically
        const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [navigate]); // Add navigate to the dependency array
};

export default useTokenExpiration;
