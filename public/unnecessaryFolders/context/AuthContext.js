import React, { useState, useEffect, useContext, createContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Изменение импорта
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut, getAuth } from "firebase/auth";

const AuthContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  // const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = ({ email, password, callback }) => {
    return signInWithEmailAndPassword(firebase, email, password)
      .then((response) => {
        setUser(response.user);
        callback();
        return response.user;
      });
  };
  
  const signup = ({ email, password, callback }) => {
    return createUserWithEmailAndPassword(firebase, email, password)
      .then((response) => {
        setUser(response.user);
        callback();
        return response.user;
      })
      .catch((error) => {
        alert('This user already exists');
      })
      ;
  };

  const signout = () => {
    return signOut(firebase, auth)
      .then(() => {
        setUser(false);
      });
  };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebase]);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    isLoading,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}