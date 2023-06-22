export const initialState = {
    basket: [],
    user: null,
    data: [],
    items: []
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    ADD_ITENS: "ADD_ITEMS"
}

export const getBasketTotal = (basket) => {
    basket?.reduce((amount, item) => item.precio + amount, 0)
}

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TO_BASKET":
        return {
            ...state,
            basket: [...state.basket, action.item]
        }
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem=>basketItem.direccion === action.direccion))
            
            let newBasket = [...state.basket]
            if (index>=0){
                newBasket.splice(index,1)
            }else{
                console.log("No se puede eliminar")
            }
        return {
            ...state, basket: newBasket
        }
        case "SET_USER":
            return{
                ...state, user: action.user
            }
        case "SET_DATA":
            console.log(action)
            return{
                ...state, data: action
            }
        case "EMPTY_BASKET":
            return{
                ...state, basket: action.basket
            }
        case "ADD_ITEMS":
            return{
            ...state, items: action.items
        }
    }
}

export default reducer