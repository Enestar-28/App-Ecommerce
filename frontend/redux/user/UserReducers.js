import * as types from '../../constants/constants.js';

// Reducer
const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USER_REQUEST:
            return { ...state, loading: true };
        case types.FETCH_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case types.FETCH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.FETCH_USER_REQUEST_ADD_ADDRESS:
            return { ...state, loading: false, error: action.payload };
        case types.FETCH_USER_ADD_ADDRESS_SUCCESS:
            return { ...state, loading: false, error: action.payload };
        case types.FETCH_USER_ADD_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case types.FETCH_USER_REQUEST_DELETE_ADDRESS:
            return { ...state, loading: true }; // Bạn có thể đặt loading thành true để cho biết đang trong quá trình xóa địa chỉ
        case types.FETCH_USER_DELETE_ADDRESS_SUCCESS:
            return { ...state, loading: false, error: null }; // Đánh dấu là không có lỗi và đã hoàn thành xóa
        case types.FETCH_USER_DELETE_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload }; // Xử lý khi có lỗi xảy ra trong quá trình xóa

        default:
            return state;
    }
};


export default userReducer;