import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");
        return token ? { token, role } : null;
    });

    useEffect(() => {
        if (!auth) return;
        sessionStorage.setItem("token", auth.token);
        sessionStorage.setItem("role", auth.role);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
