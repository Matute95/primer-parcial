export const initialState = {
    basket: [],
    user: null,
    data: [],
    items: [],
  };
  
  export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    ADD_ITEMS: "ADD_ITEMS",
  };
  
  export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.precio + amount, 0);
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_BASKET:
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      case actionTypes.REMOVE_ITEM:
        const index = state.basket.findIndex(
          (basketItem) => basketItem.direccion === action.direccion
        );
  
        let newBasket = [...state.basket];
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.log("No se puede eliminar");
        }
        return {
          ...state,
          basket: newBasket,
        };
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case actionTypes.SET_DATA:
        console.log(action);
        return {
          ...state,
          data: action.data,
        };
      case actionTypes.EMPTY_BASKET:
        return {
          ...state,
          basket: action.basket,
        };
      case actionTypes.ADD_ITEMS:
        return {
          ...state,
          items: action.items,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  