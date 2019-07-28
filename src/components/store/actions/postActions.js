import { createSelector } from "reselect";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVED_POSTS = "RECEIVED_POSTS";
export const CREATING_POST = "CREATING_POST";
export const CREATED_POST = "CREATED_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const FETCH_LIKES = "FETCH_LIKES";
export const FETCH_POSTS_LIKED = "FETCH_POSTS_LIKED";
export const POST_LIKED = "POST_LIKED";
export const RECEIVED_USERS = "RECEIVED_USERS";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_TYPE = "UPDATE_TYPE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_COMPLETE = "EDIT_COMPLETE";

const fetchProfilePage = uid => {
  return (dispatch, getState) => {
    const userData = getState().users[uid];
    dispatch({ type: UPDATE_PROFILE, uid: uid, userData: userData });
  };
};

export const editProfileData = event => {
  const id = event.target.id;
  return (dispatch, getState) => {
    const newData = Object.assign({}, getState().profilePage.newData, {
      [id]: event.target.value
    });
    dispatch({ type: EDIT_PROFILE, newData: newData });
  };
};

export const submitEditProfile = event => {
  console.log("CALEEEDDDDDD");
  const id = event.target.id;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const newData = Object.assign({}, getState().profilePage.newData);
    const data = Object.assign({}, getState().profilePage.data);
    if (newData[id] !== data[id]) {
      console.log("DIFFERENT");
      const uid = getState().profilePage.currentUid;
      const user = getFirestore()
        .collection("users")
        .doc(uid);
      data[id] = newData[id];
      user
        .update({ [id]: newData[id] })
        .then(() => dispatch({ type: EDIT_COMPLETE, data: data }));
    } else {
      console.log("SAME");
    }
  };
};

// const posts = getFirestore().collection("posts");
//     const uid = getState().firebase.auth.uid;
//     dispatch({ type: CREATING_POST });
//     posts
//       .add({
//         ...post,
//         likes: 0,
//         uid: uid,
//         createdAt: new Date().toString()
//       })
//       .then(docRef => {
//         posts.doc(docRef.id).update({ pid: docRef.id });
//       })

export const changeProfilePageView = event => {
  const id = event.target.id;
  return dispatch => {
    if (id === "listings") {
      dispatch({ type: UPDATE_TYPE, bool: true });
    } else {
      dispatch({ type: UPDATE_TYPE, bool: false });
    }
  };
};

const getProfilePage = state => state.profilePage;
const getPosts = state => state.posts.data;
const getUsers = state => state.users;

export const getProfilePosts = createSelector(
  [getProfilePage, getPosts, getUsers],
  (profilePage, posts, users) => {
    const uid = profilePage.currentUid;
    const showListings = profilePage.showListings;
    let reducedPosts;
    if (showListings) {
      reducedPosts = posts.filter(post => post.uid === uid);
    } else {
      let postsLiked = Object.assign([], users[uid].postsLiked);
      postsLiked = postsLiked.map(likedId => {
        return posts.find(post => post.pid === likedId);
      });
      reducedPosts = postsLiked;
    }
    return reducedPosts;
  }
);

function fetchPosts() {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({
      type: REQUEST_POSTS
    });
    const firestore = getFirestore();
    return firestore
      .collection("posts")
      .get()
      .then(reponse => {
        return reponse.docs.map(doc => {
          return doc.data();
        });
      })
      .then(posts => {
        if (posts) {
          dispatch({
            type: RECEIVED_POSTS,
            posts: posts
          });
          dispatch(fetchPostsLiked());
          dispatch(fetchLikes());
        } else {
          console.log("Could not retrieve posts");
        }
      });
  };
}

function shouldFetchPosts(state) {
  const posts = state.posts;
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return true;
}

export function fetchPostsIfNeeded(uid) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      dispatch(fetchPosts());
    }
    dispatch(fetchUsers(uid));
  };
}

function fetchPostsLiked() {
  return (dispatch, getState, { getFirestore }) => {
    const uid = getState().firebase.auth.uid;
    if (uid) {
      return getFirestore()
        .collection("users")
        .doc(uid)
        .get()
        .then(docs => {
          return docs.data().postsLiked.reduce((out, doc) => {
            return {
              ...out,
              [doc]: true
            };
          }, {});
        })
        .then(finalResponse => {
          dispatch({
            type: FETCH_POSTS_LIKED,
            postsLiked: finalResponse
          });
        });
    } else {
      return Promise.resolve();
    }
  };
}

export const fetchLikes = () => {
  return (dispatch, getState) => {
    const posts = getState().posts.data;
    console.log("fetching likes...");
    var postsLikeCounter = posts.reduce((out, post) => {
      return {
        ...out,
        [post.pid]: post.likes
      };
    }, {});
    dispatch({
      type: FETCH_LIKES,
      postsLikeCounter: postsLikeCounter
    });
  };
};

function fetchUsers(uid) {
  console.log("fetching users...");
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("users")
      .get()
      .then(response => {
        return response.docs.reduce((out, doc) => {
          return {
            ...out,
            [doc.id]: doc.data()
          };
        }, {});
      })
      .then(users => {
        if (users) {
          dispatch({ type: RECEIVED_USERS, usersData: users });
        } else {
          console.log("Could not retrieve users data");
        }
      })
      .then(() => {
        if (uid) {
          dispatch(fetchProfilePage(uid));
        }
      });
  };
}

export const likePost = pid => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const uid = getState().firebase.auth.uid;
    var value = getState().postsLikeCounter[pid] || 0;
    const currentUser = getFirestore()
      .collection("users")
      .doc(uid);
    const currentLike = getState().postsLiked[pid] ? true : false;
    if (currentLike) {
      currentUser.update({
        postsLiked: getFirebase().firestore.FieldValue.arrayRemove(pid)
      });
      value = Math.max(--value, 0);
    } else {
      currentUser.update({
        postsLiked: getFirebase().firestore.FieldValue.arrayUnion(pid)
      });
      ++value;
    }
    const newLike = !currentLike;
    getFirestore()
      .collection("posts")
      .doc(pid)
      .update({ likes: value });
    dispatch({ type: POST_LIKED, pid: pid, liked: newLike, value: value });
  };
};

export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const posts = getFirestore().collection("posts");
    const uid = getState().firebase.auth.uid;
    dispatch({ type: CREATING_POST });
    posts
      .add({
        ...post,
        likes: 0,
        uid: uid,
        createdAt: new Date().toString()
      })
      .then(docRef => {
        posts.doc(docRef.id).update({ pid: docRef.id });
      })
      .then(() => {
        dispatch({ type: CREATED_POST, post });
      })
      .catch(err => {
        dispatch({ type: CREATE_POST_ERROR, err });
      });
  };
};
