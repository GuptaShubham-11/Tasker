import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/taskSlice";
import { fetchWeather } from "../features/weatherSlice";
import { nanoid } from "nanoid";
import { PlusCircle, Clipboard, FileText, Flag, MapPin, Sun } from "lucide-react";

export default function AddTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        type: "Indoor",
        weather: null,
        city: "",
    });

    const dispatch = useDispatch();
    const { data: weather, loading: weatherLoading, error: weatherError } = useSelector(state => state.weather);

    // Fetch weather when task type is "Outdoor" and city is not empty
    useEffect(() => {
        if (task.type === "Outdoor" && task.city.trim()) {
            dispatch(fetchWeather(task.city));
        }
    }, [task.type, task.city, dispatch]);

    const handleAddTask = () => {
        if (!task.title.trim()) return;

        dispatch(addTask({
            id: nanoid(),
            title: task.title,
            description: task.description,
            priority: task.priority,
            type: task.type,
            weather: task.type === "Outdoor" ? {
                temp_c: weather?.current?.temp_c,
                condition: weather?.current?.condition?.text,
            } : null,
            city: task.type === "Outdoor" ? task.city : "", // Save city only for outdoor tasks
        }));

        // Reset the task state and weather data after adding the task
        setTask({ title: "", description: "", priority: "Medium", type: "Indoor", city: "" });
    };

    return (
        <div className="p-6 bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark shadow-xl rounded-2xl border border-secondary dark:border-[#BFBFBF] max-w-lg mx-auto w-full transition-all duration-300 my-16">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Clipboard className="w-6 h-6 text-primary dark:text-secondary" />
                Add New Task
            </h2>

            <div className="relative mb-4">
                <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="w-full pl-12 p-3 border border-secondary dark:border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark outline-none"
                />
            </div>

            <div className="relative mb-4">
                <FileText className="absolute left-4 top-4 text-gray-500 dark:text-gray-400" />
                <textarea
                    placeholder="Task Description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="w-full pl-12 p-3 h-24 border border-secondary dark:border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark outline-none resize-none"
                ></textarea>
            </div>

            <div className="relative mb-4">
                <Flag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="w-full pl-12 p-3 border border-secondary dark:border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark outline-none"
                >
                    <option value="High">🔥 High Priority</option>
                    <option value="Medium">⚡ Medium Priority</option>
                    <option value="Low">✅ Low Priority</option>
                </select>
            </div>

            <div className="relative mb-4">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <select
                    value={task.type}
                    onChange={(e) => setTask({ ...task, type: e.target.value })}
                    className="w-full pl-12 p-3 border border-secondary dark:border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark outline-none"
                >
                    <option value="Indoor">🏠 Indoor Task</option>
                    <option value="Outdoor">🌤 Outdoor Task</option>
                </select>
            </div>

            {task.type === "Outdoor" && (
                <div className="relative mb-4">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter City"
                        value={task.city}
                        onChange={(e) => setTask({ ...task, city: e.target.value })}
                        className="w-full pl-12 p-3 border border-secondary dark:border-[#BFBFBF] rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark outline-none"
                    />
                </div>
            )}

            {task.type === "Outdoor" && weather && (
                <div className="p-4 mt-4 border border-primary dark:border-[#D2AFFD] rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-500" />
                        Weather for {task.city}
                    </h3>
                    {weatherLoading ? (
                        <p className="text-secondary">Fetching weather...</p>
                    ) : weatherError ? (
                        <p className="text-red-500">{weatherError}</p>
                    ) : (
                        <div className="text-sm mt-2">
                            <p><strong>🌡 Temperature:</strong> {weather.current?.temp_c}°C</p>
                            <p><strong>🌤 Condition:</strong> {weather.current?.condition.text}</p>
                            <p><strong>💨 Wind Speed:</strong> {weather.current?.wind_kph} kph</p>
                        </div>
                    )}
                </div>
            )}

            <button onClick={handleAddTask} className="w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg">
                <PlusCircle className="w-6 h-6" />
                Add Task
            </button>
        </div>
    );
}
