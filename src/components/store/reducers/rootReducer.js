import authReducer from "./authReducer";
import { posts, postsLiked, postsLikeCounter, createPost } from "./postReducer";
import {filterCheckboxes} from "./filterReducer"
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,

  createPost: createPost,
  postsLiked: postsLiked,
  postsLikeCounter: postsLikeCounter,
  posts: posts,

  filterCheckboxes: filterCheckboxes,

  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
