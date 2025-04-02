import { Rocket, CheckCircle, LogIn, UserPlus, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-bgLight text-txtLight dark:bg-bgDark dark:text-txtDark flex flex-col items-center justify-center p-6 py-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                    Welcome to Our App <Rocket className="text-primary" />
                </h1>
                <p className="text-lg text-secondary max-w-lg">
                    Experience a seamless way to manage tasks and collaborate with ease.
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                    <Link to='/login' className="border-2 text-txtLight dark:text-txtDark px-4 py-2 rounded flex items-center gap-2 cursor-pointer hover:opacity-85">
                        <LogIn size={20} /> Login
                    </Link>
                    <Link to='/register' className="bg-secondary text-white px-4 hover:opacity-85 py-2 rounded flex items-center gap-2 cursor-pointer">
                        <UserPlus size={20} /> Sign Up
                    </Link>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 border rounded-lg shadow-lg dark:border-gray-700">
                    <CheckCircle className="text-green-500 mx-auto" size={40} />
                    <h2 className="text-xl font-semibold mt-2">Easy to Use</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Intuitive UI for a smooth experience.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg dark:border-gray-700">
                    <Rocket className="text-primary mx-auto" size={40} />
                    <h2 className="text-xl font-semibold mt-2">Fast & Reliable</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Optimized for performance and speed.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg dark:border-gray-700">
                    <ArrowUpRight className="text-secondary mx-auto" size={40} />
                    <h2 className="text-xl font-semibold mt-2">Prioritize Work</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Categorize tasks into different priority levels.
                    </p>
                </div>
            </div>
        </div>
    );
}