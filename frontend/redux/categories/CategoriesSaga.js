import { call, put, takeEvery } from 'redux-saga/effects';
import {
    FETCH_CATEGORIES_REQUEST
} from "../../constants/constants.js";

import {  fetchCategoriesFailure, fetchCategoriesSuccess } from "./CategoriesActions.js";

import axios from 'axios';
import { API_BASE_URL } from '@env';


function* fetchCategoriesSaga() {
    try {
        const url = `${API_BASE_URL}/getcategoris`;
    
        const response = yield call(axios.get, url);
        yield put(fetchCategoriesSuccess(response.data.result));
    } catch (error) {
        yield put(fetchCategoriesFailure(error));
    }
}

export function* watchFetchCategories() {
    yield takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}
