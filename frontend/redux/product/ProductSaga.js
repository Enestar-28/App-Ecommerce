import { call, put, takeEvery } from 'redux-saga/effects';
import {
    FETCH_PRODUCTS_REQUEST,FETCH_PRODUCTS_BY_CATEGORY
} from "../../constants/constants.js";

import { fetchProductsFailure, fetchProductsSuccess,fetchProductsByCategoryFailure,fetchProductsByCategorySuccess } from "./ProductActions.js";



import axios from 'axios';
import { API_BASE_URL } from '@env';


function* fetchProductsSaga(action) {
    const { page, size, loadMore } = action.payload;

    try {
     
        const url = `${API_BASE_URL}/getproducts`;
        const response = yield call(axios.get, url, {
            params: {
                page:page,
                size: size
            }
        });
        yield put(fetchProductsSuccess(response.data.result, loadMore));
    } catch (error) {
        console.log(error);
        yield put(fetchProductsFailure(error));
    }
}



function* fetchProductsByCategorySaga(action) {
    const { categoryId } = action.payload;

    try {
     
        const url = `${API_BASE_URL}/getprobycate/${categoryId}`;
        console.log("url",url)
        const response = yield call(axios.get, url);
        yield put(fetchProductsByCategorySuccess(response.data.result));
    } catch (error) {
        console.log(error);
        yield put(fetchProductsByCategoryFailure(error));
    }
}



export function* watchFetchProducts() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}
export function* watchfetchProductsByCategorySaga() {
    yield takeEvery(FETCH_PRODUCTS_BY_CATEGORY, fetchProductsByCategorySaga);
}

