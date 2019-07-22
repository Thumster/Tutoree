const initState = {
  checkboxes: {
    SHOWALL: true,
    SHOWLEARN: false,
    SHOWTEACH: false
  }
};

export const filterCheckboxes = (state = initState.checkboxes, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
