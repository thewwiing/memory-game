import {getResults} from "../../../shared/helpers";

const initialState = {
    results: getResults()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RESULT': {
            const results = [...state.results, action.payload];
            localStorage.setItem('results', JSON.stringify(results));
            return {
                ...state,
                results
            }
        }
        default:
            return state;
    }
};
