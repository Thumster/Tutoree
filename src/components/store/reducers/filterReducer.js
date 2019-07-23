import { FIRST_LOAD, FILTER_CHANGE } from "../actions/filterActions";

const initState = {
  checkboxes: {
    SHOWALL: true,
    SHOWLEARN: false,
    SHOWTEACH: false
  },
  currentFilter: {}
};

// export const filter = (state = initState, action) => {
//   switch (action.type) {
//     case FIRST_LOAD:
//       return Object.assign({}, state, initState);
//     default:
//       return state;
//   }
// };
export const filterCheckboxes = (state = initState.checkboxes, action) => {
  switch (action.type) {
    case FILTER_CHANGE:
      return Object.assign({}, state, action.newCheckboxes);
    default:
      return state;
  }
};
