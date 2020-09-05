import { createStore, compose } from "redux";
import reducer from "./reducer";
import { AppState } from "./app-state";


declare global {

    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose,
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, new AppState(), composeEnhancers());
