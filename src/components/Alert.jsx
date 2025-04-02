import { useEffect } from "react";
import { X } from "lucide-react";

const Alert = ({ message, type = "info", onClose, duration = 3000 }) => {
    const alertStyles = {
        success: "bg-green-100 text-green-700 border-green-500",
        error: "bg-red-100 text-red-700 border-red-500",
        info: "bg-blue-100 text-blue-700 border-blue-500",
    };

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div className={`flex items-center justify-between p-3 rounded-md border ${alertStyles[type]}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 text-lg font-bold"><X /></button>
        </div>
    );
};

export default Alert;
