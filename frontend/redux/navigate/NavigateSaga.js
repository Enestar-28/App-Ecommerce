import { call, put, takeEvery } from "redux-saga/effects";
import { navigateToMainScreen } from "./NavigateActions.js";

function* navigateSaga(action) {
  
}

export function* watchNavigate() {
  yield takeEvery("NAVIGATE_TO_MAIN_SCREEN", navigateSaga);
}
