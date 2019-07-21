import firebase from "firebase";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const FETCH_LIKES = "FETCH_LIKES";
export const FETCH_POSTS_LIKED = "FETCH_POSTS_LIKED";
export const POST_LIKED = "POST_LIKED";

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  };
}

function fetchPosts() {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(requestPosts());
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
          dispatch(fetchLikes(posts));
          dispatch(receivePosts(posts));
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
  } else {
    return true;
  }
}

export const fetchPostsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState)) {
      return dispatch(fetchPosts());
    } else {
      return Promise.resolve();
    }
  };
};

export const fetchPostsLiked = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const uid = getState().firebase.auth.uid;
    getFirestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(querySnapshot => {
        dispatch({
          type: FETCH_POSTS_LIKED,
          postsLiked: querySnapshot.data().postsLiked
        });
      });
  };
};

function fetchLikes(posts) {
  console.log("fetching likes...");
  var postsLikeCounter = posts.reduce((out, post) => {
    return {
      ...out,
      [post.pid]: post.likes
    };
  }, {});
  return {
    type: FETCH_LIKES,
    postsLikeCounter: postsLikeCounter
  };
}

export const likePost = (liked, pid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const uid = getState().firebase.auth.uid;
    var value = getState().posts.postsLikeCounter[pid] || 0;
    const currentUser = getFirestore()
      .collection("users")
      .doc(uid);

    if (liked) {
      currentUser.update({
        postsLiked: getFirebase().firestore.FieldValue.arrayUnion(pid)
      });
      value++;
    } else {
      currentUser.update({
        postsLiked: getFirebase().firestore.FieldValue.arrayRemove(pid)
      });
      value = Math.max(--value, 0);
    }
    getFirestore()
      .collection("posts")
      .doc(pid)
      .update({ likes: value });
    dispatch({ type: POST_LIKED, pid: pid, value: value });
  };
};

export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const posts = getFirestore().collection("posts");
    const uid = getState().firebase.auth.uid;

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
        dispatch({ type: CREATE_POST, post });
      })
      .catch(err => {
        dispatch({ type: CREATE_POST_ERROR, err });
      });
  };
};
