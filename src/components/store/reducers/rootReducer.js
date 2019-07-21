import authReducer from "./authReducer";
import { posts, createPostReducer } from "./postReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  createPost: createPostReducer,
  posts: posts,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
