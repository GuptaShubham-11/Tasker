import { useState } from "react";
import { Alert } from "./";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setAlert({ message: "All fields are required", type: "info" });
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.email === formData.email) {
            setAlert({ message: "User already registered. Please login.", type: "warning" });
            return;
        }

        localStorage.setItem("user", JSON.stringify(formData));
        setAlert({ message: "Registration successful!", type: "success" });

        setTimeout(() => navigate("/login"), 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bgLight text-txtLight dark:bg-bgDark dark:text-txtDark p-6">
            {/* Alert Message */}
            <div className="fixed top-20 right-4 z-10">
                {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            </div>

            {/* Registration Form */}
            <div className="w-full max-w-sm bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl shadow-2xl border border-[#E5E7EB] dark:border-[#BFBFBF] transition-all">
                <h2 className="text-2xl font-semibold text-center mb-5">Create Account</h2>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <input
                            id="name"
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-12 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent focus:ring-2 focus:ring-primary dark:focus:ring-[#D2AFFD] outline-none"
                            aria-label="Full Name"
                        />
                    </div>

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
                            aria-label="Email"
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
                            aria-label="Password"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary dark:bg-secondary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Register
                    </button>
                </form>

                {/* Already Registered? */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
