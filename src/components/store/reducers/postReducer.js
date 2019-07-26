import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  CREATING_POST,
  CREATED_POST,
  CREATE_POST_ERROR,
  FETCH_LIKES,
  FETCH_POSTS_LIKED,
  POST_LIKED,
  FETCHED_USERS
} from "../actions/postActions";

const initState = {
  posts: {
    isFetching: false,
    data: []
  },
  createPost: {
    isCreating: false
  },
  postsLiked: [],
  postsLikeCounter: [],
  users: []
};

export const users = (state = initState.users, action) => {
  switch (action.type) {
    case FETCHED_USERS:
      return Object.assign({}, state, action.usersData);
    default:
      return state;
  }
};

export const postsLiked = (state = initState.postsLiked, action) => {
  switch (action.type) {
    case FETCH_POSTS_LIKED:
      console.log("fetched posts liked", action.postsLiked);
      return Object.assign({}, state, action.postsLiked);

    case POST_LIKED:
      return Object.assign({}, state, {
        [action.pid]: action.liked
      });
    default:
      return state;
  }
};

export const postsLikeCounter = (
  state = initState.postsLikeCounter,
  action
) => {
  switch (action.type) {
    case FETCH_LIKES:
      console.log("fetched likes counter", action.postsLikeCounter);
      return Object.assign({}, state, action.postsLikeCounter);
    case POST_LIKED:
      const newPostsLikeCounter = Object.assign({}, state.postsLikeCounter);
      newPostsLikeCounter[action.pid] = action.value;
      return Object.assign({}, state, newPostsLikeCounter);
    default:
      return state;
  }
};

export const posts = (state = initState.posts, action) => {
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

    case POST_LIKED:
      console.log("updated post like");
      const dataArr = Object.assign([], state.data);
      const idx = dataArr.findIndex(element => element.pid === action.pid);
      dataArr[idx].likes = action.value;
      return Object.assign({}, state, { data: dataArr });

    default:
      return state;
  }
};

export const createPost = (state = initState.createPost, action) => {
  switch (action.type) {
    case CREATING_POST:
      console.log("creating post...");
      return Object.assign({}, state, { isCreating: true });
    case CREATED_POST:
      console.log("created post", action.post);
      return Object.assign({}, state, { isCreating: false });
    case CREATE_POST_ERROR:
      console.log("create post error", action.err);
      return state;

    default:
      return state;
  }
};
