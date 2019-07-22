import firebase from "firebase";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CREATING_POST = "CREATING_POST";
export const CREATED_POST = "CREATED_POST";
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
          dispatch(fetchPostsLiked());
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
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
};

function fetchPostsLiked() {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const uid = getState().firebase.auth.uid;
    getFirestore()
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
  };
}

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

function creatingPost() {
  return { type: CREATING_POST };
}

export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const posts = getFirestore().collection("posts");
    const uid = getState().firebase.auth.uid;
    dispatch(creatingPost());
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
