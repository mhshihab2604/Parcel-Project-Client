import {createContext, useEffect, useState} from "react";
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

export const AuthContext = createContext(null);

// social auth provider
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({children}) => {
    const [refetchUser, setRefetchUser] = useState(false)
    const [user, setUser] = useState(null)
    console.log(user);
    const [loader, setLoader] = useState(true);
    // create user
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
        // .then(result => console.log(result.user))
    }

    // sign in user
    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update profile
    const UpdateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })

    }
    // google login
    const googleLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider)
    }

    // logout
    const logout = () => {
        setUser(null)
        signOut(auth)
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoader(false);
        });
        return() => unsubscribe();
    }, [refetchUser])

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
        setLoader
    }

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;