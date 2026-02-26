import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="card homeCard">
        <div className="backRow">
          <Link className="link backLink" to="/login" aria-label="Back to Login">
            ←
          </Link>
        </div>
        <h1 className="title accentText">Welcome to the Game App</h1>
        <button
          className="button primaryButton"
          type="button"
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
