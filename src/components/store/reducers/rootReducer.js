import { auth } from "./authReducer";
import {
  posts,
  postsLiked,
  postsLikeCounter,
  createPost,
  users
} from "./postReducer";
import { filter } from "./filterReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: auth,

  createPost: createPost,
  postsLiked: postsLiked,
  postsLikeCounter: postsLikeCounter,
  posts: posts,
  users: users,

  filter: filter,

  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
