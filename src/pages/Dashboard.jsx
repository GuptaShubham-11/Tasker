import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { Loader, User } from "lucide-react";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchWeather } from "../features/weatherSlice";

const Spinner = () => (
    <div className="flex items-center justify-center">
        <Loader className="animate-spin w-4 h-4 text-txtLight dark:text-txtDark" />
    </div>
);

export default function Dashboard() {
    const { tasks } = useSelector((state) => state.task);
    const { user } = useSelector((state) => state.auth);
    const { data, loading, error } = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [city, setCity] = useState("");

    const taskCount = tasks.length;
    const highPriority = tasks.filter((task) => task.priority === "High").length;
    const mediumPriority = tasks.filter((task) => task.priority === "Medium").length;
    const lowPriority = tasks.filter((task) => task.priority === "Low").length;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const fetchWeatherData = useCallback(() => {
        if (city) {
            dispatch(fetchWeather(city));
        }
    }, [city, dispatch]);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 mt-20">
            {/* User Info */}
            <div className="flex items-center gap-4 bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md">
                <User className="w-8 h-8 text-[#3B82F6] dark:text-[#D2AFFD]" />
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-[#E0E0E0]">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Task Summary */}
            <div className="grid grid-cols-auto-fit min-[200px] gap-6">
                {[{ label: "Total Tasks", count: taskCount, color: "text-gray-700 dark:text-gray-300" },
                { label: "High Priority", count: highPriority, color: "text-red-600" },
                { label: "Medium Priority", count: mediumPriority, color: "text-yellow-600" },
                { label: "Low Priority", count: lowPriority, color: "text-green-600" }]
                    .map(({ label, count, color }) => (
                        <div key={label} className="p-6 bg-white dark:bg-[#1E1E1E] shadow-md rounded-xl">
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-[#E0E0E0]">{label}</h4>
                            <p className={`text-3xl font-bold ${color}`}>{count}</p>
                        </div>
                    ))}
            </div>

            {/* Weather Section */}
            <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-[#E0E0E0]">Weather</h4>
                <div className="flex flex-col gap-3 mt-3">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-3 border rounded-md w-full bg-gray-100 dark:bg-[#2E2E2E] focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <button
                        onClick={fetchWeatherData}
                        disabled={!city || loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-300"
                    >
                        {loading ? <Spinner /> : "Get Weather"}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Weather Data Display */}
                {data && data.current && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-[#2E2E2E] rounded-lg">
                        <div className="flex items-center gap-2">
                            <img src={data.current.condition.icon} alt="Weather-icon" />
                            <p className="text-lg font-medium text-gray-800 dark:text-[#E0E0E0]">
                                {data.location.name} - {data.current.temp_c}°C ({data.current.condition.text})
                            </p>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 space-y-1">
                            <p>🌬 Wind: {data.current.wind_kph} kph, Gust: {data.current.gust_kph} kph</p>
                            <p>💧 Humidity: {data.current.humidity}%</p>
                            <p>🌿 Air Quality Index: {data.current.air_quality["us-epa-index"]}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
