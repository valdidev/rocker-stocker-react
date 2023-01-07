import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

const ROCKER_STOCKER = 'ROCKER_STOCKER_1';

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(ROCKER_STOCKER));

    const signIn = useCallback(() => {
        localStorage.setItem(ROCKER_STOCKER, true);
        setIsAuthenticated(true);
    }, []);

    const logOut = useCallback(() => {
        localStorage.removeItem(ROCKER_STOCKER);
        setIsAuthenticated(false);
    }, []);
};