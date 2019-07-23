import {
  UPDATE_CURRENT_FILTER,
  FILTER_CHANGE,
  FILTERING_POSTS,
  DONE_FILTERING
} from "../actions/filterActions";

const initState = {
  checkboxes: {
    SHOWALL: true,
    SHOWLEARN: false,
    SHOWTEACH: false
  },
  currentFilter: "SHOWALL"
};

export const filter = (state = initState, action) => {
  switch (action.type) {
    case FILTER_CHANGE:
      return Object.assign({}, state, { checkboxes: action.newCheckboxes });
    case UPDATE_CURRENT_FILTER:
      return Object.assign({}, state, { currentFilter: action.id });
    default:
      return state;
  }
};

const displayedPostsInitState = {
  isFiltering: false,
  data: {}
}
export const displayedPosts = (state = displayedPostsInitState, action) => {
  switch (action.type) {
    case FILTERING_POSTS:
      console.log("filtering posts...")
      return Object.assign({}, state, { isFiltering: true });
    case DONE_FILTERING:
      console.log("done filtering")
      return Object.assign({}, state, {
        isFiltering: false,
        data: action.posts
      });
    default:
      return state;
  }
};

// export const filterCheckboxes = (state = initState.checkboxes, action) => {
//   switch (action.type) {
//     case FILTER_CHANGE:
//       return Object.assign({}, state, action.newCheckboxes);
//     default:
//       return state;
//   }
// };
