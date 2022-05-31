import './App.css';
import React from 'react'
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { CaloriesPage } from './CaloriesPage';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setTokenAction, logoutAction } from './actions/auth'

const LoggedInMenus = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      {isLoggedIn && <li className="login">
        <Link to="/track_calories">Calories</Link>
      </li>}
      {isLoggedIn && <li id="logout_link" className="logout"><a href="#" onClick={() => {
        dispatch(logoutAction({ navigate }))
      }}>Logout</a></li>}
    </>
  )
}

function App() {
  const dispatch = useDispatch()
  const stateToken = useSelector(state => state.auth.token)
  const isLoggedIn = Boolean(stateToken)

  React.useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(setTokenAction({ token }))
  }, [])

  return (
    <BrowserRouter>

      <nav>
        <ul>
          <li className="home"><Link to="/">Home</Link></li>
          {!isLoggedIn && <li id="login_link" className="login">
            <Link to="/login">Login</Link>
          </li>}
          <LoggedInMenus isLoggedIn={isLoggedIn} />
          {!isLoggedIn && <li id="register_link" className="register">
            <Link to="/register">Register</Link>
          </li>}
        </ul>
      </nav>

      <Routes>
        <Route path="/" exact element={<div>Welcome to home page</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/track_calories" element={<CaloriesPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
