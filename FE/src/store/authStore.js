import {create} from 'zustand';	
import axios from 'axios';

axios.defaults.withCredentials = true; // Enable sending cookies with requests

const API_URL = 'http://localhost:5000/api'; 

export const useAuthStore = create((set) => ({
    // Initial state
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    // Functions
    signup: async (username, email, password) => {
        set({isLoading: true, message: null});

        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username,
                email,
                password
            });
            set({user: response.data.user, isLoading: false});         
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || 'An error occurred when signing up',
            });

            throw error;
        }
    },

    signin: async (username, password) => {
        set({isLoading: true, message: null, error: null});

        try {
            const response = await axios.post(`${API_URL}/signin`, {
                username,
                password
            });

            const {user, message} = response.data;
            set({
                user, 
                message,
                isLoading: false
            });
            return {user, message};
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || 'An error occurred when signing in',
            });

            throw error;
        }
    },

    fetchUser: async () => {
        set({fetchingUser: true, error: null});

        try {
            const response = await axios.get(`${API_URL}/fetch-user`);
            set({
                user: response.data.user,
                fetchingUser: false
            });
        } catch (error) {
            set({
                fetchingUser: false,
                error: null,
                user: null
            });

            throw error;
        }
    },

    signout: async () => {
        set({isLoading: true, error: null, message: null});

        try {
            const response = await axios.post(`${API_URL}/signout`);
            const {message} = response.data;
            set({                
                message,
                isLoading: false,
                user: null,
                error: null
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || 'An error occurred when signing out',
            });

            throw error;
        }
    },
}));
