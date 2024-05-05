
import {
    ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY,DECREMENT_QUANTITY,CLEAN_CART
  } from "../../constants/constants.js";
  


import { takeLatest, put } from "redux-saga/effects";

function* addToCartSaga(action) {
  // Put your saga logic here
}

function* removeFromCartSaga(action) {
  // Put your saga logic here
}

function* incrementQuantitySaga(action) {
  // Put your saga logic here
}

function* decrementQuantitySaga(action) {
  // Put your saga logic here
}

function* cleanCartSaga(action) {
  // Put your saga logic here
}

export function* watchCartActions() {
  yield takeLatest(ADD_TO_CART, addToCartSaga);
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga);
  yield takeLatest(INCREMENT_QUANTITY, incrementQuantitySaga);
  yield takeLatest(DECREMENT_QUANTITY, decrementQuantitySaga);
  yield takeLatest(CLEAN_CART, cleanCartSaga);
}
