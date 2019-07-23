export const FILTER_CHANGE = "FILTER_CHANGE";
export const FIRST_LOAD = "FIRST_LOAD";

export const checkboxChange = id => {
  return (dispatch, getState) => {
    const checkboxesArr = Object.assign({}, getState().filterCheckboxes);
    for (var element in checkboxesArr) {
      checkboxesArr[element] = false;
    }

    checkboxesArr[id] = true;
    dispatch({ type: FILTER_CHANGE, newCheckboxes: checkboxesArr });
  };
};

