import {
  CATEGORY_FILTER_CHANGE,
  SUBJECT_FILTER_CHANGE,
  LOCATION_FILTER_CHANGE,
  SORT_CHANGE
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
      others: false
    },
    sort: {
      createdAt: "asc",
      price: false,
      likes: false
    }
  }
};

export const filter = (state = initState, action) => {
  switch (action.type) {
    case CATEGORY_FILTER_CHANGE:
      const categoryTemp = Object.assign({}, state.checkboxes, {
        category: action.newCheckboxes
      });
      return Object.assign({}, state, { checkboxes: categoryTemp });
    case SUBJECT_FILTER_CHANGE:
      const subjectTemp = Object.assign({}, state.checkboxes, {
        subject: action.newCheckboxes
      });
      return Object.assign({}, state, { checkboxes: subjectTemp });
    case LOCATION_FILTER_CHANGE:
      const locationTemp = Object.assign({}, state.checkboxes, {
        location: action.newCheckboxes
      });
      return Object.assign({}, state, { checkboxes: locationTemp });
    case SORT_CHANGE:
      const sortTemp = Object.assign({}, state.checkboxes, {
        sort: action.newSort
      });
      return Object.assign({}, state, { checkboxes: sortTemp });
    default:
      return state;
  }
};