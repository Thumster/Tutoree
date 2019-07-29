import {
  CATEGORY_FILTER_CHANGE,
  SUBJECT_FILTER_CHANGE,
  LOCATION_FILTER_CHANGE,
  SORT_CHANGE,
  SEARCH_CHANGE,
  FILTER_ERROR,
  PER_PAGE_UPDATE,
  PAGE_UPDATE,
  RESET_PAGE
} from "../actions/filterActions";

const initState = {
  checkboxes: {
    category: {
      all: true,
      learn: false,
      teach: false
    },
    subject: {
      all: true,
      english: false,
      chinese: false,
      math: false,
      science: false,
      others: false
    },
    location: {
      all: true,
      north: false,
      south: false,
      east: false,
      west: false,
      central: false,
      others: false
    },
    sort: {
      createdAt: "asc",
      price: false,
      likes: false
    },
    search: ""
  },
  pagination: {
    currentPage: 0,
    offset: 0,
    perPage: 8
  }
};

export const filter = (state = initState, action) => {
  switch (action.type) {
    case CATEGORY_FILTER_CHANGE:
      const categoryTemp = Object.assign({}, state.checkboxes, {
        category: action.newCheckboxes
      });
      console.log("category filter updated", action.newCheckboxes);
      return Object.assign({}, state, { checkboxes: categoryTemp });
    case SUBJECT_FILTER_CHANGE:
      const subjectTemp = Object.assign({}, state.checkboxes, {
        subject: action.newCheckboxes
      });
      console.log("subject filter updated", action.newCheckboxes);
      return Object.assign({}, state, { checkboxes: subjectTemp });
    case LOCATION_FILTER_CHANGE:
      const locationTemp = Object.assign({}, state.checkboxes, {
        location: action.newCheckboxes
      });
      console.log("location filter updated", action.newCheckboxes);
      return Object.assign({}, state, { checkboxes: locationTemp });
    case SORT_CHANGE:
      const sortTemp = Object.assign({}, state.checkboxes, {
        sort: action.newSort
      });
      console.log("sort filter updated", action.newSort);
      return Object.assign({}, state, { checkboxes: sortTemp });
    case SEARCH_CHANGE:
      const searchTemp = Object.assign({}, state.checkboxes, {
        search: action.newSearch
      });
      console.log("search filter updated", action.newSearch);
      return Object.assign({}, state, { checkboxes: searchTemp });

    case PAGE_UPDATE:
      const pageTemp = Object.assign({}, state.pagination, {
        page: action.newPage,
        offset: action.newOffset
      });
      return Object.assign({}, state, { pagination: pageTemp });
    case PER_PAGE_UPDATE:
      const perPageTemp = Object.assign({}, state.pagination, {
        perPage: action.newPerPage
      });
      return Object.assign({}, state, { pagination: perPageTemp });
    case RESET_PAGE:
      const resetPageTemp = Object.assign({}, state.pagination, {
        currentPage: 0,
        offset: 0
      });
      console.log("resetted page to 0");
      return Object.assign({}, state, { pagination: resetPageTemp });
    case FILTER_ERROR:
      console.log("FILTER_ERROR:", action.errorMsg);
      return state;
    default:
      return state;
  }
};
