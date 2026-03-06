import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="backRow">
          <Link className="link backLink" to="/login" aria-label="Back to Login">
            ←
          </Link>
        </div>
        <h1 className="title">Forgot Password</h1>

        <p className="helperText">Enter Email Address</p>

        <label className="label" htmlFor="forgot-email">
          Email
        </label>
        <input
          className="input"
          id="forgot-email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button className="button primaryButton" type="button" onClick={handleSubmit}>
          Submit
        </button>

        {submitted && (
          <div className="successMessage">
            <p>Reset link sent successfully.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
