import { createSelector } from "reselect";
import Moment from "react-moment";

export const CATEGORY_FILTER_CHANGE = "CATEGORY_FILTER_CHANGE";
export const SUBJECT_FILTER_CHANGE = "SUBJECT_FILTER_CHANGE";
export const LOCATION_FILTER_CHANGE = "LOCATION_FILTER_CHANGE";
export const SORT_CHANGE = "SORT_CHANGE";

export const UPDATE_CURRENT_FILTER = "UPDATE_CURRENT_FILTER";
export const FILTERING_POSTS = "FILTERING_POSTS";
export const DONE_FILTERING = "DONE_FILTERING";

export const categoryCheckboxChange = id => {
  return (dispatch, getState) => {
    const categoryArr = Object.assign(
      {},
      getState().filter.checkboxes.category
    );
    Object.keys(categoryArr).forEach(key => (categoryArr[key] = false));
    categoryArr[id] = true;
    dispatch({ type: CATEGORY_FILTER_CHANGE, newCheckboxes: categoryArr });
    // dispatch(filterPosts());
  };
};

export const subjectCheckboxChange = id => {
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
    dispatch({ type: SUBJECT_FILTER_CHANGE, newCheckboxes: subjectArr });
  };
};

export const locationCheckboxChange = id => {
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
    dispatch({ type: LOCATION_FILTER_CHANGE, newCheckboxes: locationArr });
  };
};

export const sortButtonChange = id => {
  return (dispatch, getState) => {
    let sortArr = Object.assign({}, getState().filter.checkboxes.sort);
    if (sortArr[id] !== false) {
      sortArr[id] == "asc" ? (sortArr[id] = "desc") : (sortArr[id] = "asc");
    } else {
      Object.keys(sortArr).forEach(key => (sortArr[key] = false));
      sortArr[id] = "asc";
    }

    dispatch({ type: SORT_CHANGE, newSort: sortArr });
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

export const getVisiblePosts = createSelector(
  getSortedVisiblePosts,
  posts => {
    return posts;
  }
);
