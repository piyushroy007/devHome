import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

// Placeholder Components
const Home = () => (
    <>
        <NavBar />
        <div>
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
                Welcome to devHome
            </h1>
            <p className="text-lg text-gray-700">Find your coding match!</p>
        </div>
    </>
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
