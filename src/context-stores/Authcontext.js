import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// Global context that saves and authenticated user.
export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(false);
    const [user_data, setUser_data] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(!user) {
                setLoading(false); 
            }

            setUser(user);
        });
    
        return () => {
          unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (user) {

            const getUserData = async () => {
                const q = query(collection(db, "user_data"), where("user_id", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUser_data(doc.data());
                })

                setLoading(false);
            }

            getUserData();
        }
    }, [user])

    const value = {
        user: user,
        user_data: user_data,
        loading: loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
