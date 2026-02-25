import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="card">
        <div className="backRow">
          <Link className="link backLink" to="/login" aria-label="Back to Login">
            ←
          </Link>
        </div>
        <h1 className="title">Create Account</h1>

        <label className="label" htmlFor="signup-username">
          Username
        </label>
        <input
          className="input"
          id="signup-username"
          type="text"
          placeholder="Enter username"
        />

        <label className="label" htmlFor="signup-email">
          Email
        </label>
        <input
          className="input"
          id="signup-email"
          type="email"
          placeholder="Enter email"
        />

        <label className="label" htmlFor="signup-password">
          Password
        </label>
        <input
          className="input"
          id="signup-password"
          type="password"
          placeholder="Enter password"
        />

        <label className="label" htmlFor="signup-confirm-password">
          Confirm Password
        </label>
        <input
          className="input"
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm password"
        />

        <button
          className="button primaryButton"
          type="button"
          onClick={() => navigate('/home')}
        >
          Sign Up
        </button>

      </div>
    </div>
  )
}

export default Signup
