import { createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import auth from "../Firebase/firebase.config";
import axios from 'axios'; // Corrected import statement

export const AuthContext = createContext(null);

// social auth provider
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }) => {
    const [refetchUser, setRefetchUser] = useState(false);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // create user
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in user
    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update profile
    const UpdateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        });
    };

    async function  saveUser (user)  {
        const currentUser = {
            email: user?.email,
            name: user?.name,
            image: user?.image,
            phoneNumber: user?.phoneNumber,
            role: 'user',
            status: 'Verified',
        };
        const { data } = await axios.put(`https://full-stack-project-server-side.vercel.app/users`, currentUser); // Corrected URL
        return data;
    }


    // google login
    const googleLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };

    // logout
    const logout = () => {
        setUser(null);
        signOut(auth);
    };

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // setUser(user);
            if(user){
                setUser(user)
                setLoader(false)
            }
            setLoader(false);
        });
        return () => unsubscribe();
    }, [refetchUser]);

    const allValues = {
        createUser,
        signInUser,
        googleLogin,
        logout,
        user,
        UpdateUserProfile,
        refetchUser,
        setRefetchUser,
        loader,
        setLoader,
        saveUser
    };

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;

