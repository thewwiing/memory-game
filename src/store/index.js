import {
    applyMiddleware,
    createStore,
    compose
} from 'redux';

import rootReducer from './reducers';
import {logger}    from "redux-logger";

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(logger)
    )
);
