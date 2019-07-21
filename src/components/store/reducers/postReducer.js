import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  CREATE_POST,
  CREATE_POST_ERROR,
  INVALIDATE_POSTS
} from "../actions/postActions";

const initState = {
  isFetching: false,
  didInvalidate: false,
  data: []
};

export const posts = (state = initState, action) => {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return Object.assign({}, state, { didInvalidate: true });

    case REQUEST_POSTS:
      console.log("requesting posts...");
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case RECEIVE_POSTS:
      console.log("received posts", action.posts);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.posts
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

// export default {postReducer,postsByCategoryReducer};
