import React, { useState } from 'react'


const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    // Имитация процесса входа
    setTimeout(() => {
      onLogin({ username })
    }, 1500)
  }

  return (
    <div className="login-screen">
      <div className="login-background"></div>
      <div className="login-container">
        <div className="login-avatar">
          <span>👤</span>
        </div>
        <h2 className="login-username-display">{username}</h2>
        
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
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="login-options">
          <button className="option-btn">Not listed?</button>
          <button className="option-btn">Guest Session</button>
        </div>
      </div>
      
      <div className="login-footer">
        <div className="system-controls">
          <button className="control-btn">♿</button>
          <button className="control-btn">📧</button>
          <button className="control-btn">⏻</button>
        </div>
        <div className="ubuntu-logo-login">
          <span>🔵</span> Ubuntu
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
