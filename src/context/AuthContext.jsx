import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '../supabaseClient';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const session = supabase.auth.getSession();

        supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        if (session?.user) {
          setUser(session.user);
        }
        setLoading(false);
      }, []);

      const signIn = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            throw new Error(error.message);
          }
          setUser(data.user);
          return data.user;
        } catch (error) {
          throw error;
        }
      };

      const signOut = async () => {
        try {
          await supabase.auth.signOut();
          setUser(null);
        } catch (error) {
          throw error;
        }
      };

      const value = {
        user,
        loading,
        signIn,
        signOut,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
      return useContext(AuthContext);
    };
