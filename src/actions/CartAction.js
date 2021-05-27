export const ADD_CART = "ADD_CART";
export const INCREASE_CART = "INCREASE_CART";
export const DELETE_PRODUCT_OF_CART = "DELETE_PRODUCT_OF_CART";
export const UPDATE_PRODUCT_OF_CART = "UPDATE_PRODUCT_OF_CART";

export const addCart = (add_Cart) => ({ type: ADD_CART, add_Cart });
export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT_OF_CART,
    id,
  });
  export const upDateProduct = (id) => ({
    type: UPDATE_PRODUCT_OF_CART,
    id,
  });
