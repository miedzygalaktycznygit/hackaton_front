import React, {createContext, useState, useContext, useEffect} from "react";
import api from '../lib/axiosInstance';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('authToken');
    });
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);
            try {
                const decodedUser: User = jwtDecode(token); 
                setUser(decodedUser); 
            } catch (error) {
                console.error("Nie udało się zdekodować tokena", error);
                setToken(null);
                setUser(null);
                localStorage.removeItem('authToken');
            }
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
            setUser(null);
        }
}, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    const value = {
        token,
        user,
        isAuthenticated: !!token, 
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}