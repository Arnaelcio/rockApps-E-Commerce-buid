import {
  ADD_CART,
  DELETE_PRODUCT_OF_CART,
  UPDATE_PRODUCT_OF_CART,
} from "../actions/CartAction";

const INITIAL_STATE = {
  cart: [],
};

const deleteProduct = (state = INITIAL_STATE, action) => ({
  ...state,
  cart: state.cart.filter((product) => product.id !== action.id),
});
const upDateProduct = (state = INITIAL_STATE, action) => ({
  ...state,
  cart: state.cart.filter((product) => product.id !== action.id),
});

export function CartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CART:
      return { ...state, cart: [...state.cart, ...action.add_Cart] };
    case DELETE_PRODUCT_OF_CART:
      return deleteProduct(state, action);
    case UPDATE_PRODUCT_OF_CART:
      return upDateProduct(state, action);
    default:
      return state;
  }
}
