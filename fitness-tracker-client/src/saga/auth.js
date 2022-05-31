import { call, put, takeLatest, all, select, takeEvery } from 'redux-saga/effects'
import { setTokenAction, setCalculatedCaloriesAction, fetchEatanAction, setEatanAction, setProductsAction } from '../actions/auth'
import http from './../services/request'

export const loginAsync = data => {
    return http.post('/auth/login', data)
}
export const registerAsync = data => {
    return http.post('/users', data)
}
export const calculateCaloriesAsync = data => {
    return http.post('/calculators/calories', data)
}
export const fetchProductsAsync = () => {
    return http.get('/products/')
}
export const eatSomethingAsync = (data, token) => {
    return http.post('/calories/track', data, { headers: { Authorization: "Bearer " + token } })
}
export const getEatanAsync = (date, token) => {
    return http.get(`/calories?date=${date}`, { headers: { Authorization: "Bearer " + token } })
}

export function* loginWorker(action) {
    try {
        const { username, password, navigate } = action.payload

        const {
            data: { token },
        } = yield call(loginAsync, { username, password })

        yield put(setTokenAction({ token }))

        // eslint-disable-next-line no-undef
        localStorage.setItem('token', token)

        yield call(navigate('/'))
    } catch (e) {
        console.log(e)
    }
}

export function* loginWatcher() {
    yield takeLatest('LOGIN', loginWorker)
}

export function* logoutWorker() {
    yield put(setTokenAction({ token: null }))
    localStorage.removeItem('token')
}

export function* registerWorker(action) {
    try {
        const { password, email, username, height, weight, age, calories, navigate } = action.payload

        yield call(registerAsync, { password, email, username, height, weight, age, calories })

        yield call(navigate('/login'))
    } catch (e) {
        console.log(e)
    }
}

export function* registerWatcher() {
    yield takeLatest('REGISTER', registerWorker)
}

export function* calculateCaloriesWorker(action) {
    try {
        const { height, weight, age } = action.payload

        const { data: { calories } } = yield call(calculateCaloriesAsync, { height, weight, age })

        yield put(setCalculatedCaloriesAction({ calories }))
    } catch (e) {
        console.log(e)
    }
}

export function* calculateCaloriesWatcher() {
    yield takeLatest('CALCULATE_CALORIES', calculateCaloriesWorker)
}

export function* fetchProductsWorker() {
    try {
        const { data } = yield call(fetchProductsAsync)

        yield put(setProductsAction({ products: data }))
    } catch (e) {
        console.log(e)
    }
}

export function* fetchProductsWatcher() {
    yield takeLatest('FETCH_PRODUCTS', fetchProductsWorker)
}

export function* eatSomethingWorker(action) {
    try {
        const { grams, productId: products_id } = action.payload
        const token = yield select(state => state.auth.token)

        yield call(eatSomethingAsync, { grams, products_id }, token)

        yield put(fetchEatanAction())
    } catch (e) {
        console.log(e)
    }
}

export function* eatSomethingWatcher() {
    yield takeEvery('EAT_SOMETHING', eatSomethingWorker)
}

export function* fetchEatanWorker(action) {
    try {
        // const { grams, productId: products_id } = action.payload
        const token = yield select(state => state.auth.token)
        const today = new Date()
        const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
        const { data } = yield call(getEatanAsync, date, token)
        console.log('data', data)
        yield put(setEatanAction({ ...data, products: data.productsTaken }))
    } catch (e) {
        console.log(e)
    }
}

export function* fetchEatanWatcher() {
    yield takeEvery('FETCH_EATAN', fetchEatanWorker)
}

export function* logoutWatcher() {
    yield takeLatest('LOGOUT', logoutWorker)
}

export function* authSaga() {
    yield all([
        call(loginWatcher),
        call(logoutWatcher),
        call(registerWatcher),
        call(fetchProductsWatcher),
        call(eatSomethingWatcher),
        call(fetchEatanWatcher),
        call(calculateCaloriesWatcher)
    ])
}