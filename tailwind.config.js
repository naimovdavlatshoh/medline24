/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // Enables dark mode using the 'class' strategy
    theme: {
        extend: {
            colors: {
                "primary-light": "#ffffff",
                "primary-dark": "#1F1E25",
                "secondary-light": "#f1f3ef",
                "secondary-back": "#17161D",
                "secondary-dark": "#16213e",
                "main-light": "#00a6fb",
                "main-dark": "#003554",
                "main-green": "#36c95f",
            },
            // Define custom utility classes
            backgroundColor: {
                "theme-bg": "var(--bg-color)",
            },
            textColor: {
                "theme-text": "var(--text-color)",
            },
        },
    },
    plugins: [],
};
