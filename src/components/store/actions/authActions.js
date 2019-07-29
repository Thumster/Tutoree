export const SIGNED_IN = "SIGNED_IN";
export const NEW_USER = "NEW_USER";
export const OLD_USER = "OLD_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const STORE_NEW_USER_SUCCESS = "STORE_NEW_USER_SUCCESS";
export const STORE_NEW_USER_ERROR = "STORE_NEW_USER_ERROR";
export const INITIALISATION_SUCESSFUL = "INITIALISATION_SUCESSFUL";

export const fetchInit = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const user = getFirebase().auth().currentUser;
    if (user) {
      dispatch({ type: INITIALISATION_SUCESSFUL });
      dispatch(signIn(user));
    }
  };
};

// Sign in for all accounts - triggered in componentdidmount
export const signIn = user => {
  return (dispatch, getState, { getFirestore }) => {
    getFirestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc) {
          return doc.data();
        }
      })
      .then(doc => {
        dispatch({ type: SIGNED_IN, userDetails: doc });
      })
      .catch(err => {
        console.log("error getting user data", err);
      });
  };
};

export const checkNewUser = authResult => {
  return (dispatch, getState) => {
    const newUser = authResult.additionalUserInfo.isNewUser;
    const user = authResult.user;
    if (newUser) {
      dispatch({ type: NEW_USER });
      dispatch(storeNewUser(user));
    } else {
      dispatch({ type: OLD_USER });
    }
  };
};

// Sign in using email and password
export const signInAccount = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        dispatch(storeNewUser(resp.user, newUser));
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: SIGNUP_ERROR, err });
      });
  };
};

function storeNewUser(newUser, userDeets) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    if (userDeets) {
      firestore
        .collection("users")
        .doc(newUser.uid)
        .set({
          name: userDeets.name,
          email: newUser.email,
          photoURL: "",
          postsLiked: []
        })
        .then(() => {
          dispatch({ type: STORE_NEW_USER_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: STORE_NEW_USER_ERROR, err });
        });
    } else {
      firestore
        .collection("users")
        .doc(newUser.uid)
        .set({
          name: newUser.displayName,
          email: newUser.email,
          photoURL: newUser.photoURL,
          postsLiked: []
        })
        .then(() => {
          dispatch({ type: STORE_NEW_USER_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: STORE_NEW_USER_ERROR, err });
        });
    }
  };
}
