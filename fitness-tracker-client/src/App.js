import './App.css';
import React from 'react'
import { LoginPage } from './LoginPage';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setTokenAction, logoutAction } from './actions/auth'

const Logout = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (<>{isLoggedIn && <li id="logout_link" className="logout"><a href="#" onClick={() => {
    dispatch(logoutAction({ navigate }))
  }}>Logout</a></li>}</>)
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
          <Logout isLoggedIn={isLoggedIn} />
          {!isLoggedIn && <li id="register_link" className="register">
            <a href="/register.html">Register</a>
          </li>}
        </ul>
      </nav>

      <Routes>
        <Route path="/" exact element={<div>Welcome to home page</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
