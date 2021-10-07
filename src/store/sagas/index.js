import { all, fork } from "redux-saga/effects";
import auth from "./auth";
import messenger from "./messenger";
import chat from "./chat";
import home from './home'
import admin from './admin'

export default function* root() {
    const sagas = [
        auth,
        messenger,
        chat,
        home,
        admin
    ];
    yield all(sagas.map(fork));
}
