export const loginAction = ({ username, password, navigate }) => ({
    type: 'LOGIN',
    payload: { username, password, navigate },
})

export const logoutAction = ({ navigate }) => ({
    type: 'LOGOUT',
    payload: { navigate },
})

export const setTokenAction = ({ token }) => ({
    type: 'SET_TOKEN',
    payload: { token },
})

export const registerAction = ({ password, email, username, height, weight, age, calories, navigate }) => ({
    type: 'REGISTER',
    payload: { password, email, username, height, weight, age, calories, navigate }
})

export const calculateCaloriesAction = ({ height, weight, age }) => ({
    type: 'CALCULATE_CALORIES',
    payload: { height, weight, age }
})

export const setCalculatedCaloriesAction = ({ calories }) => ({
    type: 'SET_CALCULATED_CALORIES',
    payload: { calories }
})

export const fetchProductsAction = () => ({
    type: 'FETCH_PRODUCTS',
    payload: {}
})

export const setProductsAction = ({ products }) => ({
    type: 'SET_PRODUCTS',
    payload: { products }
})

export const fetchEatanAction = () => ({
    type: 'FETCH_EATAN',
    payload: {}
})

export const setEatanAction = ({ products, caloriesLeft, caloriesTaken }) => ({
    type: 'SET_EATAN',
    payload: { products, caloriesLeft, caloriesTaken }
})

export const eatSomethingAction = ({ grams, productId }) => ({
    type: 'EAT_SOMETHING',
    payload: { grams, productId }
})