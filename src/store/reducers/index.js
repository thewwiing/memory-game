import {combineReducers} from 'redux';

import ResultsReducer from "./results-reducer";
import GameReducer    from "./game-reducer";

export default combineReducers({
    GameReducer,
    ResultsReducer
});
