import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
    cart: [],
    total: 0
};

export const shoppingReducer = (state, action) => {
    switch (action.type) {
        case TYPES.ADD_ONE_TO_CART: {
            let newItem = { articleId: action.payload, quantity: 1 }

            let itemInCart = state.cart.find(item => item.articleId === newItem.articleId)

            return itemInCart
                ? {
                    ...state,
                    cart: state.cart.map(item => item.articleId === newItem.articleId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    )
                }
                : {
                    ...state,
                    cart: [...state.cart, newItem]
                }
        }

        case TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDecrease = state.cart.find(item => item.articleId === action.payload)

            return itemToDecrease.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map(item => item.articleId === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                }
                : {
                    ...state,
                    cart: state.cart.filter(item => item.article !== action.payload)
                }
        }

        case TYPES.REMOVE_ALL_FROM_CART: {

        }

        case TYPES.CLEAR_CART: {

        }

        default: return state;
    };
};