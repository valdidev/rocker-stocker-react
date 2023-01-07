import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const AuthContext = createContext();

const ROCKER_STOCKER = 'RS_JWT';

export function AuthContextProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = useCallback(() => {
        localStorage.setItem(ROCKER_STOCKER, true);
        setIsAuthenticated(true);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(ROCKER_STOCKER);
        setIsAuthenticated(false);
    }, []);

    const value = useMemo(() => ({
        signIn,
        signOut,
        isAuthenticated
    }), [signIn, signOut, isAuthenticated]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
    return useContext(AuthContext);
};