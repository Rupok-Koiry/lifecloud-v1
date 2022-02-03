const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'USER-PROFILES':
      return {
        profiledata: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case 'FIREBASE_LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'FIREBASE_LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
