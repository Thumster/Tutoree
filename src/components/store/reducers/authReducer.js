import {
  INITIALISATION_SUCESSFUL,
  SIGNED_IN,
  NEW_USER,
  OLD_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  STORE_NEW_USER_SUCCESS,
  STORE_NEW_USER_ERROR
} from "../actions/authActions";

const initState = {
  isSignedIn: false,
  isNewUser: false,
  userDetails: {
    uid: "",
    name: "",
    email: "",
    photoURL: ""
  }
};

export const auth = (state = initState, action) => {
  switch (action.type) {
    case INITIALISATION_SUCESSFUL:
      console.log("initialisation succesful");
      return state;
    case SIGNED_IN:
      console.log("signed in as", action.userDetails);
      return Object.assign({}, state, {
        isSignedIn: true,
        userDetails: action.userDetails
      });
    case NEW_USER:
      console.log("new user...");
      return Object.assign({}, state, { isNewUser: true });
    case OLD_USER:
      console.log("old user...");
      return state;
    case LOGIN_ERROR:
      console.log("login error");
      return {
        ...state,
        authError: "Login Failed! Please try again"
      };
    case LOGIN_SUCCESS:
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_SUCCESS:
      console.log("signup success");
      return {
        ...state,
        signUpError: null
      };
    case SIGNUP_ERROR:
      console.log("signup error");
      return {
        ...state,
        signUpError: action.err.message
      };
    case STORE_NEW_USER_SUCCESS:
      console.log("store new user sucess");
      return Object.assign({}, state, { isNewUser: false });
    case STORE_NEW_USER_ERROR:
      console.log("store new user error");
      return {
        ...state,
        signUpProviderError: action.err.message
      };

    case SIGNOUT_SUCCESS:
      console.log("signout success");
      return Object.assign({}, state, { isSignedIn: false });

    default:
      return state;
  }
};

// export default authReducer;
