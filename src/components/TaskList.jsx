import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/taskSlice";
import { Trash2, Thermometer } from "lucide-react";
import { useState, useMemo } from "react";

export default function TaskList() {
    const tasks = useSelector((state) => state.task.tasks);
    const weatherData = useSelector((state) => state.weather.data); // Weather data from Redux
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("All");

    // Optimized filtering using useMemo
    const filteredTasks = useMemo(() => {
        return filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);
    }, [tasks, filter]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id));
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Filter Dropdown */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-[#E0E0E0]">
                    Task List
                </h2>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2E2E2E] text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary shadow-md"
                >
                    <option value="All">All</option>
                    <option value="High">🔥 High</option>
                    <option value="Medium">⚡ Medium</option>
                    <option value="Low">🟢 Low</option>
                </select>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks found.</p>
            ) : (
                <div className="space-y-6">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="p-6 border rounded-2xl shadow-lg dark:shadow-xl bg-white dark:bg-[#1E1E1E] hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Task Header */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#E0E0E0]">
                                    {task.title}
                                </h3>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-600 hover:text-red-800 dark:hover:text-red-500 transition-colors flex items-center gap-1"
                                    aria-label="Delete Task"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Task Description */}
                            <p className="text-gray-700 dark:text-gray-400 leading-relaxed break-words">
                                {task.description}
                            </p>

                            {/* Task Footer */}
                            <div className="mt-4 flex justify-between items-center">
                                {/* City Name Display */}
                                {task.type === "Outdoor" && task.city && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        📍 {task.city}
                                    </span>
                                )}

                                {/* Display Temperature for Outdoor Tasks */}
                                {task.type === "Outdoor" && task.weather && task.city && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Thermometer className="w-4 h-4 text-blue-500" />
                                        {task.weather.temp_c}°C {" "}
                                        {task.weather.condition}
                                    </span>
                                )}

                                {/* Priority Badge */}
                                <span
                                    className={`px-4 py-2 text-sm font-semibold rounded-full text-white flex items-center gap-1 ${task.priority === "High"
                                        ? "bg-red-500"
                                        : task.priority === "Medium"
                                            ? "bg-yellow-500"
                                            : "bg-green-600"
                                        }`}
                                >
                                    {task.priority === "High" && "🔥"}
                                    {task.priority === "Medium" && "⚡"}
                                    {task.priority === "Low" && "🟢"}
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
