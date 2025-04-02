import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle menu visibility on mobile
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-10 p-4 border-b bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark transition-all">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold cursor-pointer hover:text-primary">
                    Tasker
                </Link>

                <div className="flex items-center space-x-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-xl"
                        onClick={handleMenuToggle}
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation Links */}
                    <nav
                        className={`md:flex space-x-6 font-semibold ${menuOpen ? 'block' : 'hidden'} md:block`}
                    >
                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/tasks"
                                    className="hover:text-primary transition-colors"
                                >
                                    Tasks
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
