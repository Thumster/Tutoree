import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  CREATE_POST,
  CREATE_POST_ERROR,
  FETCH_LIKES,
  FETCH_POSTS_LIKED,
  POST_LIKED
} from "../actions/postActions";

const initState = {
  isFetching: false,
  data: [],
  postsLiked: [],
  postsLikeCounter: []
};

// data.reduce((out, post) => {
//   return {
//     ...out,
//     [post.id]: post.likes
//   };
// }, {})

// state.categories.find((item) => item.id === Number(categoryId))

export const posts = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      console.log("requesting posts...");
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_POSTS:
      console.log("received posts", action.posts);
      return Object.assign({}, state, {
        isFetching: false,
        data: action.posts
      });
    case FETCH_POSTS_LIKED:
      console.log("fetched posts liked", action.postsLiked);
      return Object.assign({}, state, {
        postsLiked: action.postsLiked
      });
    case FETCH_LIKES:
      console.log("fetched likes counter", action.postsLikeCounter);
      return Object.assign({}, state, {
        postsLikeCounter: action.postsLikeCounter
      });
    case POST_LIKED:
      const newPostsLikeCounter = Object.assign({},state.postsLikeCounter);
      newPostsLikeCounter[action.pid] = action.value;
      return Object.assign({}, state, {
        postsLikeCounter: newPostsLikeCounter
      });
    default:
      return state;
  }
};

export const createPostReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_POST:
      console.log("created post", action.post);
      return state;

    case CREATE_POST_ERROR:
      console.log("create post error", action.err);
      return state;

    default:
      return state;
  }
};
