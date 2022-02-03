import { createContext, useEffect, useReducer } from 'react';
import useFirebase from '../hooks/useFirebase';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: '',
  profiledata: [],
  isFetching: false,
  error: false,
  dispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);
  const myFirebase = useFirebase(dispatch);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profiledata: state.profiledata,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        myFirebase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
