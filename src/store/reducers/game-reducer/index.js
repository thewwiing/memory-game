import {generateCards} from "../../../shared/helpers";

const initialState = {
    cards: generateCards()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_APP': {
            return {
                ...state,
                // cards: [...cards, ...cards]
            }
        }
        default:
            return state;
    }
};
