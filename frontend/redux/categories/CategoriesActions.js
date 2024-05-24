import {
    FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE
} from "../../constants/constants.js";




export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST
});
export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS, 
    categories: categories
});
export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE, error
});
