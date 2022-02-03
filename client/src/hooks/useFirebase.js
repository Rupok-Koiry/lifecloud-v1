import { useEffect, useState } from 'react';
import initializeAuthentication from '../firebase.config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

initializeAuthentication();

const useFirebase = (dispatch) => {
  //All state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  //Sign in provider
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  //Google sign in
  const signInUsingGoogle = (redirectPath) => {
    return signInWithPopup(auth, googleProvider);
  };

  //Facebook sign in
  const signInUsingFacebook = (redirectPath) => {
    return signInWithPopup(auth, facebookProvider);
  };
  //Save user to the DB
  const saveUser = async (user, method) => {
    const res = await fetch('/insertOrUpdate', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const loggedUser = await res.json();
    dispatch({ type: 'FIREBASE_LOGIN', payload: loggedUser });
  };
  //Logout functionality
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'FIREBASE_LOGOUT' });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'FIREBASE_LOGIN', payload: user });
      } else {
        dispatch({ type: 'FIREBASE_LOGOUT' });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return {
    error,
    loading,
    signInUsingGoogle,
    signInUsingFacebook,
    logout,
    saveUser,
  };
};

export default useFirebase;
