import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Private from "./pages/Private";
import Navbar from "./components/Navbar";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Rutas protegidas */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/private" element={<Private />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

