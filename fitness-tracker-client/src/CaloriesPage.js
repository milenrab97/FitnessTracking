import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAction, setProductsAction, eatSomethingAction, fetchEatanAction, setEatanAction } from './actions/auth'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

export const CaloriesPage = () => {
    const dispatch = useDispatch()
    // const [password, setPassword] = useState('')
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    // const [height, setHeight] = useState()
    // const [weight, setWeight] = useState()
    const [productId, setProductId] = useState()
    const [grams, setGrams] = useState()
    // const navigate = useNavigate()

    const products = useSelector(state => state.auth.products)
    const eatan = useSelector(state => state.auth.eatan)
    const caloriesLeft = useSelector(state => state.auth.caloriesLeft)
    const caloriesTaken = useSelector(state => state.auth.caloriesTaken)
    console.log(caloriesLeft, caloriesTaken)

    React.useEffect(() => {
        dispatch(fetchProductsAction())
        dispatch(fetchEatanAction())

        return () => {
            dispatch(setProductsAction({ products: [] }))
            dispatch(setEatanAction({ products: [] }))
        }
    }, [])

    // trqbva da se izprati JWT tokena
    const onAddClick = (e) => {
        e.preventDefault()

        dispatch(eatSomethingAction({ grams, productId }))
    }

    const selectableOptions = products.map(p => ({ value: p, label: p.name }))

    return (
        <>
            <div id="container">
                <div>Calories taken: </div><div style={{ marginRight: 24 }}>{parseInt(caloriesTaken)}</div>
                <div>Calories left: </div><div>{parseInt(caloriesLeft)}</div>
            </div>
            <div id="container">
                <div className="register-container">
                    <div className="register-header">
                        <h4>I ate...</h4>
                    </div>

                    <div className="form-register">
                        <form id="reg-form">
                            <div>
                                <Select onChange={(param) => setProductId(param.value.id)} options={selectableOptions} />
                            </div><br />
                            <input
                                value={grams}
                                onChange={e => setGrams(Number(e.target.value))}
                                id="grams-box"
                                type="number"
                                name="grams"
                                placeholder="grams"
                            /><br />
                            <div id="errorMsg"></div>
                            <button id="register-btn" className="btn-register" onClick={onAddClick}>Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <table style={{ width: 550, margin: '0 auto' }}>
                    <tr>
                        <th>Product</th>
                        <th>Calories</th>
                    </tr>
                    {eatan.map((product) => (<tr key={product.id}>
                        <td>{product.productName}</td>
                        <td>{parseInt(product.carbs * 4 + product.proteins * 4 + product.fats * 9 * (product.grams / 100))}</td>
                    </tr>))}
                </table>
            </div>
        </>
    )
}