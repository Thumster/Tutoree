export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const INVALIDATE_POSTS = "INVALIDATE_POSTS";

export function invalidatePosts() {
  return {
    type: INVALIDATE_POSTS
  };
}

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
    console.log("firestoree", firestore.collection("posts"));
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
    return posts.didInvalidate;
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

export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const posts = getFirestore().collection("posts");
    const uid = getState().firebase.auth.uid;
    posts
      .add({
        ...post,
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
