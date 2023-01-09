import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
    cart: [],
    testeo: 'esto llega'
};

export const shoppingReducer = (state, action) => {
    switch (action.type) {
        case TYPES.ADD_ONE_TO_CART: {

        }

        case TYPES.REMOVE_ONE_FROM_CART: {

        }

        case TYPES.REMOVE_ALL_FROM_CART: {

        }

        case TYPES.CLEAR_CART: {

        }

        default: return state;
    };
};