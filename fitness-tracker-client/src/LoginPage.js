import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from './actions/auth'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const onLoginClick = (e) => {
        e.preventDefault()

        dispatch(loginAction({ username, password, navigate }))
    }

    return (<div id="container">
        <div className="register-container">
            <div className="register-header">
                <h4>LOGIN</h4>
            </div>

            <div className="form-register">
                <form id="reg-form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        id="username-box"
                        type="text"
                        name="username"
                        placeholder="username"
                    /><br />
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="password-box"
                        type="password"
                        name="password"
                        placeholder="password"
                    /><br />
                    <div id="errorMsg"></div>
                    <button id="login-btn" className="btn-register" onClick={onLoginClick}>Login</button>
                </form>
            </div>
        </div>
    </div>)
}