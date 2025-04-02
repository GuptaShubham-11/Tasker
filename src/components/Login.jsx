import { useState } from "react";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Mail, Lock } from "lucide-react";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!formData.email || !formData.password) {
            setAlert({ message: "All fields are required", type: "info" });
            return;
        }

        if (!storedUser) {
            setAlert({ message: "No registered user found! Please register first.", type: "info" });
            return;
        }

        if (formData.email !== storedUser.email || formData.password !== storedUser.password) {
            setAlert({ message: "Invalid email or password!", type: "error" });
            return;
        }

        setAlert({ message: "Login successful!", type: "success" });
        dispatch(login(storedUser));

        setTimeout(() => navigate("/dashboard"), 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bgLight text-txtLight dark:bg-bgDark dark:text-txtDark p-6">
            {/* Alert Notification */}
            <div className="fixed top-20 right-4 z-10">
                {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            </div>

            {/* Login Form */}
            <div className="w-full max-w-sm bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl shadow-2xl border border-[#E5E7EB] dark:border-[#BFBFBF] transition-all">
                <h2 className="text-2xl font-semibold text-center mb-5">Sign In</h2>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-12 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] outline-none"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full pl-12 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] outline-none"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        New to Tasker?{" "}
                        <Link to="/register" className="text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
