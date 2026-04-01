import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import Body from "./Body";
import Login from "./Login";

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Body />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
        // <Router>
        //     <div className="app-container">
        //         {/* TODO: Add Header/Navbar here */}

        //         <main>
        //             <Routes>
        //                 <Route path="/" element={<Home />} />
        //                 <Route path="/dashboard" element={<Dashboard />} />
        //                 {/* TODO: Add more routes (e.g., /match, /chat, /profile) */}

        //                 <Route path="*" element={<NotFound />} />
        //             </Routes>
        //         </main>

        //         {/* TODO: Add Footer here */}
        //     </div>
        // </Router>
    );
}

export default App;
