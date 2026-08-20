import React, { useState } from 'react'


const LoginScreen = ({ onLogin, isLocked, user }) => {
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setTimeout(() => {
      onLogin({ username })
    }, 1500)
  }

  const handleGuestSession = () => {
    onLogin({ username: 'Guest' })
  }

  const handlePowerOff = () => {
    if (window.confirm('Power off the system?')) {
      window.location.reload()
    }
  }

  return (
    <div className="login-screen">
      <div className="login-background"></div>
      <div className="login-container">
        <div className="login-avatar">
          <span>👤</span>
        </div>
        <h2 className="login-username-display">{isLocked && user ? user.username : username}</h2>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="password-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <span className="loading-spinner"></span>
            ) : (
              'Unlock'
            )}
          </button>
        </form>
        
        {!isLocked && (
          <div className="login-options">
            <button className="option-btn">Not listed?</button>
            <button className="option-btn" onClick={handleGuestSession}>Guest Session</button>
          </div>
        )}
      </div>
      
      <div className="login-footer">
        <div className="system-controls">
          <button className="control-btn">♿</button>
          <button className="control-btn">📧</button>
          <button className="control-btn" onClick={handlePowerOff}>⏻</button>
        </div>
        <div className="ubuntu-logo-login">
          <span>🔵</span> Ubuntu
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
