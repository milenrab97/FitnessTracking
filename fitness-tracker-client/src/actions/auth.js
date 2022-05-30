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