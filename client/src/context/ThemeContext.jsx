import { createContext, useEffect, useState } from "react"
import "../index.css";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to "dark"
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    const handleToggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        // Apply the theme class to the body element
        if (theme === "light") {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }

        // Save the theme to localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
