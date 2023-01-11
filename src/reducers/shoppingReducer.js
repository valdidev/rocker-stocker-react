import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
    cart: [],
    total: 0
};

export const shoppingReducer = (state, action) => {
    switch (action.type) {
        case TYPES.ADD_ONE_TO_CART: {
            let newItem = { articleId: action.payload }

            console.log({
                ...state,
                cart: [...state.cart, newItem]
            })

            return {
                ...state,
                cart: [...state.cart, newItem]
            }
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