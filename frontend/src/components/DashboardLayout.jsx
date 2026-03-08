import { Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-30 md:static md:block transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center gap-4 p-4 bg-white border-0 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 text-xl"
                    >
                        ☰
                    </button>
                    <h2 className="text-lg font-bold text-blue-600">
                        💳 BankApp
                    </h2>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
