const initialState = {
    token: '',
    calculatedCalories: 0,
    products: [],
    eatan: []
}

export const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload.token,
            }
        case 'LOGOUT':
            return { ...state, token: '' }
        case 'SET_CALCULATED_CALORIES':
            return { ...state, calculatedCalories: action.payload.calories }
        case 'RESET_STORE':
            return { ...initialState }
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload.products }
        case 'SET_EATAN':
            return { ...state, eatan: action.payload.products, caloriesLeft: action.payload.caloriesLeft || 0, caloriesTaken: action.payload.caloriesTaken || 0 }
        default:
            return state
    }
}

export const tokenSelector = state => state.auth.token

export default authReducer