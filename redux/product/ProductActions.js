import {
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE,FETCH_PRODUCTS_BY_CATEGORY,FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,FETCH_PRODUCTS_BY_CATEGORY_FAILURE
} from "../../constants/constants.js";



// Action creators
export const fetchProductsRequest = ({ page, size, loadMore = false }) => ({
    type: FETCH_PRODUCTS_REQUEST,
    payload: { page, size, loadMore },
});
export const fetchProductsSuccess = (products, loadMore) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products,
    loadMore,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE, error,
});

export const fetchProductsByCategory = ({categoryId}) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY, payload : {categoryId},
});

export const fetchProductsByCategorySuccess = (products) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,  products
});
export const fetchProductsByCategoryFailure = (error) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_FAILURE, error,
});

