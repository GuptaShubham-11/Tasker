import { Header, Footer } from './index.js';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark transition-all">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-grow flex-col">
                <main className="flex-grow p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
