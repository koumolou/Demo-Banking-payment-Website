import { createContext, useEffect, useState } from "react";
import {
    login as apiLogin,
    getUser,
    logout as apiLogout,
    register as registerApi,
} from "../services/auth.js";

import { balance as walletbalance } from "../services/wallet.js";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(null);

    const refreshBalance = async () => {
        try {
            const newb = await walletbalance();
            console.log("Raw balance response:", newb);
            console.log("Balance value:", newb?.balance);
            setBalance(newb);
        } catch (error) {
            console.log("Balance error:", error);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const userData = await apiLogin(credentials);
            setUser(userData);
            await refreshBalance();
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
        } finally {
            setUser(null);
            localStorage.removeItem("token");
        }
    };

    const registerUser = async (credentials) => {
        setLoading(true);
        try {
            const userData = await registerApi(credentials);
            setUser(userData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const existingUser = await getUser();
                setUser(existingUser);
                if (existingUser) {
                    await refreshBalance();
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                registerUser,
                balance,
                refreshBalance,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
