import { combineReducers } from 'redux';
import authReducer from './auth/AuthReducers'; // Import reducer của auth
import productReducer from './product/ProductReducers'; // Import reducer của product
import categoriesReducer from './categories/CategoriesReducers'; // Import reducer của product
import cartReducer from './CartReducer'; // Import reducer của cart
import userReducer from './user/UserReducers'; // Import reducer của user


const rootReducer = combineReducers({
  auth: authReducer,
  // Thêm reducers khác nếu có
  products : productReducer,
  categories : categoriesReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
