import { HOST } from "@/utils/constaints";
import axios from "axios";
import { create } from "zustand";

interface AuthStore {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isCheckingAuth: boolean;
    error: Error | null;
    signup: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    checkAuth: () => Promise<void>;
}

axios.defaults.withCredentials = true

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    isLoading: false,
    error: null,
    signup: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${HOST}/api/auth/register`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response; 
        } catch (error) {
            set({ error: error as Error || "Error signing up", isLoading: false });
            throw error; 
        }
    },

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${HOST}/api/auth/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response; 
        } catch (error) {
            set({ error: error as Error || "Error logging in", isLoading: false });
            throw error; 
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${HOST}/api/auth/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
}))