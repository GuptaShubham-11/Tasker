import { useDispatch, useSelector } from "react-redux";
import { themeToggle } from "../features/themeSlice.js";
import { useEffect } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    // Set the theme class on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.classList.add(savedTheme);
    }, []);

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        // Update Redux state and persist theme
        dispatch(themeToggle());
        localStorage.setItem("theme", newTheme);

        // Apply the new theme to the document
        document.documentElement.classList.replace(theme, newTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded border border-gray-700"
        >
            {theme === "dark" ? <LightbulbOff size={20} /> : <Lightbulb size={20} />}
        </button>
    );
};

export default ThemeToggle;
