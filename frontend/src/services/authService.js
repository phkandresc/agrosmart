import { supabase } from '../lib/supabase';

// 1. Función login
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return {
        user: { ...data.user, ...data.user.user_metadata },
        token: data.session.access_token,
    };
};

// 2. Función register
export const register = async (userData) => {
    const { email, password, ...meta } = userData;

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: meta, // Store extra data (firstName, lastName, rol) in user_metadata
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return {
        success: true,
        message: "Usuario registrado con éxito",
        user: { ...data.user, ...data.user.user_metadata },
    };
};

// 3. Logout helper (optional but good)
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
};

export default {
    login,
    register,
    logout
};
