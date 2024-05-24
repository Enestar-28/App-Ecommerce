import {
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_BY_CATEGORY,FETCH_PRODUCTS_BY_CATEGORY_SUCCESS, FETCH_PRODUCTS_BY_CATEGORY_FAILURE

} from "../../constants/constants.js";




const initialState = {
    products: [],
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            if (action.loadMore) {
                return {
                    ...state,
                    products: [...state.products, ...action.products],
                };
            } else {
                return {
                    ...state,
                    products: action.products,
                };
            }

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case FETCH_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                products: action.products,
            };
        case FETCH_PRODUCTS_BY_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default productReducer;