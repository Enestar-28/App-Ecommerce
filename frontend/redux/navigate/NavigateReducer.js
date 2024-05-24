// reducers/navigationReducer.js
const initialState = {
  currentScreen: "Login", // Màn hình ban đầu
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAVIGATE_TO_MAIN_SCREEN":
      return {
        ...state,
        currentScreen: "Main", 
      };
    default:
      return state;
  }
};

export default navigationReducer;
