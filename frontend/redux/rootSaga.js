import { all } from 'redux-saga/effects';
import { watchLogout, watchLogin, watchRegister } from './auth/AuthSaga.js'; // Import các saga của bạn
import { watchFetchProducts,watchfetchProductsByCategorySaga } from './product/ProductSaga.js'; // Import các saga của bạn
import { watchFetchCategories } from './categories/CategoriesSaga.js'; // Import các saga của bạn
import { watchNavigate } from './navigate/NavigateSaga.js'; // Import các saga của bạn
// import {watchCartActions  } from './cart/CartSaga.js'; // Import các saga của bạn
import {watchFetchUser} from './user/UserSaga.js'; // Import các saga của bạn
export default function* rootSaga() {
  yield all([
    watchLogout(),
    watchLogin(),
    watchRegister(),
    watchFetchProducts(),
    watchfetchProductsByCategorySaga(),
    watchNavigate(),
    watchFetchCategories(),
    // watchCartActions(),
    watchFetchUser()

  ]);
}