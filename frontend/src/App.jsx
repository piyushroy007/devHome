import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Placeholder Components
const Home = () => (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="navbar bg-gray-300 px-5">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to devHome
        </h1>
        <p className="text-lg text-gray-700">Find your coding match!</p>
        <div className="mt-6 space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Login
            </button>
            <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition">
                Signup
            </button>
        </div>
    </div>
);

const Dashboard = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
            Dashboard
        </h1>
        <p className="text-gray-600 italic">
            Your matches and projects will appear here.
        </p>
    </div>
);

const NotFound = () => (
    <div>
        <h1>404</h1>
        <p>Page not found.</p>
    </div>
);

function App() {
    return (
        <Router>
            <div className="app-container">
                {/* TODO: Add Header/Navbar here */}

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* TODO: Add more routes (e.g., /match, /chat, /profile) */}

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                {/* TODO: Add Footer here */}
            </div>
        </Router>
    );
}

export default App;
