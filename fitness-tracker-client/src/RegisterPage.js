import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction, calculateCaloriesAction, setCalculatedCaloriesAction } from './actions/auth'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [age, setAge] = useState()
    const [calories, setCalories] = useState()
    const navigate = useNavigate()

    const calculatedCalories = useSelector(state => state.auth.calculatedCalories)

    React.useEffect(() => {
        if (calculatedCalories) {
            setCalories(calculatedCalories)
        }

        return () => {
            dispatch(setCalculatedCaloriesAction({ calories: 0 }))
        }
    }, [calculatedCalories])

    const onRegisterClick = (e) => {
        e.preventDefault()

        dispatch(registerAction({ password, email, username, height, weight, age, calories, navigate }))
    }

    const onCalculateClick = (e) => {
        e.preventDefault()

        dispatch(calculateCaloriesAction({ height, weight, age }))
    }

    return (
        <div id="container">
            <div className="register-container">
                <div className="register-header">
                    <h4>REGISTER</h4>
                </div>

                <div className="form-register">
                    <form id="reg-form">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email-box"
                            type="text"
                            name="email"
                            placeholder="email"
                        /><br />
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
                        <input
                            value={height}
                            onChange={e => setHeight(Number(e.target.value))}
                            id="height-box"
                            type="number"
                            name="height"
                            placeholder="height"
                        /><br />
                        <input
                            value={weight}
                            onChange={e => setWeight(Number(e.target.value))}
                            id="weight-box"
                            type="number"
                            name="weight"
                            placeholder="weight"
                        /><br />
                        <input
                            value={age}
                            onChange={e => setAge(Number(e.target.value))}
                            id="age-box"
                            type="number"
                            name="age"
                            placeholder="age"
                        /><br />
                        <input
                            value={calories}
                            onChange={e => setCalories(Number(e.target.value))}
                            id="calories-box"
                            type="number"
                            name="calories"
                            placeholder="calories"
                        /><br />
                        <button id="calculate-calories" className='btn-calc' onClick={onCalculateClick}>Calculate calories</button>
                        <div id="errorMsg"></div>
                        <button id="register-btn" className="btn-register" onClick={onRegisterClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>)
}