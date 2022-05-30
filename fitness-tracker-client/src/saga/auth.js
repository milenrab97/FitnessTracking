import { call, put, takeLatest, all } from 'redux-saga/effects'
import { setTokenAction } from '../actions/auth'
import http from './../services/request'

export const loginAsync = user => {
    return http.post('/auth/login', user)
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

export function* logoutWatcher() {
    yield takeLatest('LOGOUT', logoutWorker)
}

export function* authSaga() {
    yield all([call(loginWatcher), call(logoutWatcher)])
}