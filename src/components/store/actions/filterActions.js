import { createSelector } from "reselect";
export const FILTER_CHANGE = "FILTER_CHANGE";
export const UPDATE_CURRENT_FILTER = "UPDATE_CURRENT_FILTER";
export const FILTERING_POSTS = "FILTERING_POSTS";
export const DONE_FILTERING = "DONE_FILTERING";

export const checkboxChange = id => {
  return (dispatch, getState) => {
    const checkboxesArr = Object.assign({}, getState().filter.checkboxes);
    for (var element in checkboxesArr) {
      checkboxesArr[element] = false;
    }

    checkboxesArr[id] = true;
    dispatch({ type: FILTER_CHANGE, newCheckboxes: checkboxesArr });
    dispatch(updateCurrentFilter(id));
    dispatch(filterPosts());
  };
};

function updateCurrentFilter(id) {
  return {
    type: UPDATE_CURRENT_FILTER,
    id: id
  };
}

export const filterPosts = () => {
  return (dispatch, getState) => {
    dispatch({ type: FILTERING_POSTS });
    const displayedPosts = getVisiblePosts(getState());
    dispatch({ type: DONE_FILTERING, posts: displayedPosts });
  };
};

const getVisibilityFilter = state => state.filter.currentFilter;

const getPosts = state => state.posts.data;

const getVisiblePosts = createSelector(
  [getVisibilityFilter, getPosts],
  (visibilityFilter, posts) => {
    switch (visibilityFilter) {
      case "SHOWALL":
        console.log("showall filter called");
        return posts;
      case "SHOWLEARN":
        console.log("showlearn filter called");
        return posts.filter(t => t.category === "learn");
      case "SHOWTEACH":
        console.log("showteach filter called");
        return posts.filter(t => t.category === "teach");
    }
  }
);
