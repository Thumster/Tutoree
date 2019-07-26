import { createSelector } from "reselect";

export const CATEGORY_FILTER_CHANGE = "CATEGORY_FILTER_CHANGE";
export const SUBJECT_FILTER_CHANGE = "SUBJECT_FILTER_CHANGE";
export const LOCATION_FILTER_CHANGE = "LOCATION_FILTER_CHANGE";
export const SORT_CHANGE = "SORT_CHANGE";
export const SEARCH_CHANGE = "SEARCH_CHANGE";
export const FILTER_ERROR = "FILTER_ERROR";
export const PAGE_UPDATE = "PAGE_UPDATE";
export const PER_PAGE_UPDATE = "PER_PAGE_UPDATE";
export const RESET_PAGE = "RESET_PAGE";

export const UPDATE_CURRENT_FILTER = "UPDATE_CURRENT_FILTER";
export const FILTERING_POSTS = "FILTERING_POSTS";
export const DONE_FILTERING = "DONE_FILTERING";

export const categoryCheckboxChange = event => {
  const id = event.target.id;
  return (dispatch, getState) => {
    const categoryArr = Object.assign(
      {},
      getState().filter.checkboxes.category
    );
    Object.keys(categoryArr).forEach(key => (categoryArr[key] = false));
    categoryArr[id] = true;
    dispatch({ type: RESET_PAGE });
    dispatch({ type: CATEGORY_FILTER_CHANGE, newCheckboxes: categoryArr });
  };
};

export const subjectCheckboxChange = event => {
  const id = event.target.id;
  return (dispatch, getState) => {
    let subjectArr = Object.assign({}, getState().filter.checkboxes.subject);

    if (id === "all") {
      Object.keys(subjectArr).forEach(key => (subjectArr[key] = false));
      subjectArr[id] = true;
    } else {
      subjectArr["all"] = false;
      subjectArr[id] = !subjectArr[id];
    }

    if (!Object.values(subjectArr).some(t => t)) {
      subjectArr["all"] = true;
    }
    dispatch({ type: RESET_PAGE });
    dispatch({ type: SUBJECT_FILTER_CHANGE, newCheckboxes: subjectArr });
  };
};

export const locationCheckboxChange = event => {
  const id = event.target.id;
  return (dispatch, getState) => {
    let locationArr = Object.assign({}, getState().filter.checkboxes.location);

    if (id === "all") {
      Object.keys(locationArr).forEach(key => (locationArr[key] = false));
      locationArr[id] = true;
    } else {
      locationArr["all"] = false;
      locationArr[id] = !locationArr[id];
    }

    if (!Object.values(locationArr).some(t => t)) {
      locationArr["all"] = true;
    }
    dispatch({ type: RESET_PAGE });
    dispatch({ type: LOCATION_FILTER_CHANGE, newCheckboxes: locationArr });
  };
};

export const sortButtonChange = event => {
  return (dispatch, getState) => {
    if (event.target.id) {
      const id = event.target.id;
      let sortArr = Object.assign({}, getState().filter.checkboxes.sort);
      if (sortArr[id] !== false) {
        sortArr[id] == "asc" ? (sortArr[id] = "desc") : (sortArr[id] = "asc");
      } else {
        Object.keys(sortArr).forEach(key => (sortArr[key] = false));
        sortArr[id] = "asc";
      }
      dispatch({ type: RESET_PAGE });
      dispatch({ type: SORT_CHANGE, newSort: sortArr });
    } else {
      dispatch({ type: FILTER_ERROR, errorMsg: "sort ID not picked up" });
    }
  };
};

export const searchFilterChange = event => {
  return dispatch => {
    const id = event.target.id;
    if (id == "input") {
      console.log(event.target.value);
      dispatch({ type: RESET_PAGE });
      dispatch({ type: SEARCH_CHANGE, newSearch: event.target.value });
    } else if (id == "clear") {
      dispatch({ type: RESET_PAGE });
      dispatch({ type: SEARCH_CHANGE, newSearch: "" });
    } else {
      dispatch({ type: FILTER_ERROR, errorMsg: "search ID not picked up" });
    }
  };
};

export const pageUpdate = event => {
  return (dispatch, getState) => {
    let selected = event.selected;
    let offset = Math.ceil(selected * getState().filter.pagination.perPage);

    dispatch({ type: PAGE_UPDATE, newPage: selected, newOffset: offset });
  };
};

export const perPageUpdate = event => {
  console.log(event);
  return dispatch => {
    dispatch({
      type: PER_PAGE_UPDATE,
      newPerPage: parseInt(event.target.innerText, 10)
    });
    dispatch({ type: RESET_PAGE });
  };
};

const getCategoryVisibilityFilter = state => state.filter.checkboxes.category;
const getPosts = state => state.posts.data;

const getCategoryVisiblePosts = createSelector(
  [getCategoryVisibilityFilter, getPosts],
  (visibilityFilter, posts) => {
    const filter = Object.keys(visibilityFilter).reduce((acc, key) => {
      if (visibilityFilter[key] === true) {
        return key;
      } else {
        return acc;
      }
    }, "NOFILTER");

    if (filter === "all" || filter === "NOFILTER") {
      return posts;
    } else {
      return posts.filter(t => t.category === filter);
    }
  }
);

const getSubjectVisibilityFilter = state => state.filter.checkboxes.subject;

const getSubjectVisiblePosts = createSelector(
  [getSubjectVisibilityFilter, getCategoryVisiblePosts],
  (visibilityFilter, posts) => {
    const filters = Object.keys(visibilityFilter).filter(
      key => visibilityFilter[key]
    );
    if (filters.some(filter => filter === "all")) {
      return posts;
    }
    return posts.filter(post =>
      filters.some(filter => filter === post.subject.toLowerCase())
    );
  }
);

const getLocationVisibilityFilter = state => state.filter.checkboxes.location;

const getLocationVisiblePosts = createSelector(
  [getLocationVisibilityFilter, getSubjectVisiblePosts],
  (visibilityFilter, posts) => {
    const filters = Object.keys(visibilityFilter).filter(
      key => visibilityFilter[key]
    );
    if (filters.some(filter => filter === "all")) {
      return posts;
    }
    return posts.filter(post =>
      filters.some(filter => filter === post.location.toLowerCase())
    );
  }
);

const getVisibilitySort = state => state.filter.checkboxes.sort;

const getSortedVisiblePosts = createSelector(
  [getVisibilitySort, getLocationVisiblePosts],
  (sortFilter, posts) => {
    const sortReducer = Object.keys(sortFilter).reduce(
      (acc, key) => {
        if (sortFilter[key] !== false) {
          return [key, sortFilter[key]];
        } else {
          return acc;
        }
      },
      ["", ""]
    );

    const sortKey = sortReducer[0];
    const sortType = sortReducer[1];

    const mySort = (a, b) => {
      if (sortKey === "createdAt") {
        return sortType === "asc"
          ? new Date(a.createdAt.toString()).getTime() -
              new Date(b.createdAt.toString()).getTime()
          : new Date(b.createdAt.toString()).getTime() -
              new Date(a.createdAt.toString()).getTime();
      } else if (sortKey === "price") {
        return sortType === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortKey === "likes") {
        return sortType === "asc" ? a.likes - b.likes : b.likes - a.likes;
      }
    };

    const newPosts = Object.assign([], posts).sort(mySort);
    return newPosts;
  }
);

const getSearchVisibilityFilter = state => state.filter.checkboxes.search;
const getUsers = state => state.users;

const getSearchVisiblePosts = createSelector(
  [getSearchVisibilityFilter, getSortedVisiblePosts, getUsers],
  (visibilityFilter, posts, users) => {
    var stringSimilarity = require("string-similarity");
    const searchText = visibilityFilter.toLowerCase();
    console.log("POSTS", posts);
    if (!visibilityFilter) {
      return posts;
    } else {
      return posts.filter(post => {
        const desc = post.description.toLowerCase();
        const title = post.title.toLowerCase();
        const userName = users[post.uid].name.toLowerCase();
        console.log(desc, title, userName);
        const result =
          stringSimilarity.compareTwoStrings(searchText, desc) +
          stringSimilarity.compareTwoStrings(searchText, title) +
          stringSimilarity.compareTwoStrings(searchText, userName);
        return result > 0.5;
      });
    }
  }
);

export const getVisiblePosts = createSelector(
  getSearchVisiblePosts,
  posts => {
    return posts;
  }
);
