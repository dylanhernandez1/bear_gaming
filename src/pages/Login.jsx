import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Login</h1>

        <label className="label" htmlFor="login-username">
          Username
        </label>
        <input
          className="input"
          id="login-username"
          type="text"
          placeholder="Enter username"
        />

        <label className="label" htmlFor="login-password">
          Password
        </label>
        <input
          className="input"
          id="login-password"
          type="password"
          placeholder="Enter password"
        />

        <label className="checkboxRow" htmlFor="remember-me">
          <input id="remember-me" type="checkbox" />
          <span>Remember Me</span>
        </label>

        <div className="linkGroup">
          <Link className="link" to="/signup">
            Sign Up
          </Link>
          <Link className="link" to="/home">
            Continue as Guest
          </Link>
          <Link className="link" to="/forgot-password">
            Forgot Password
          </Link>
        </div>

        <button
          className="button primaryButton"
          type="button"
          onClick={() => navigate('/home')}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
