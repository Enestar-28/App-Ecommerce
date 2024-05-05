import {
    ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY,DECREMENT_QUANTITY,CLEAN_CART
  } from "../../constants/constants.js";
  
  
  

const initialState = {
    cart: [],
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const itemPresent = state.cart.find((item) => item.id === action.payload.id);
        if (itemPresent) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case INCREMENT_QUANTITY:
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      case DECREMENT_QUANTITY:
        const item = state.cart.find((item) => item.id === action.payload.id);
        if (item.quantity === 1) {
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload.id),
          };
        } else {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        }
      case CLEAN_CART:
        return {
          ...state,
          cart: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  