import React, { useState } from 'react'

const TopBar = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showMenu, setShowMenu] = useState(false)
  
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handlePowerClick = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = () => {
    window.location.reload()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '28px',
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      zIndex: 1000,
      color: 'white',
      fontSize: '13px',
      fontWeight: 500
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span 
          style={{ 
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Activities
        </span>
        <span 
          style={{ 
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Ubuntu
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        <span style={{ cursor: 'pointer' }}>🔊</span>
        <span style={{ cursor: 'pointer' }}>📶</span>
        <span style={{ cursor: 'pointer' }}>🔋</span>
        <div style={{ textAlign: 'center', minWidth: '100px', cursor: 'default' }}>
          <div>{formatTime(currentTime)}</div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>{formatDate(currentTime)}</div>
        </div>
        <div style={{ position: 'relative' }}>
          <span 
            onClick={handlePowerClick}
            style={{ 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            ⏻
          </span>
          
          {showMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '4px',
              background: 'rgba(30, 30, 30, 0.95)',
              borderRadius: '8px',
              padding: '8px 0',
              minWidth: '200px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              {user && (
                <div style={{
                  padding: '8px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '12px',
                  opacity: 0.8
                }}>
                  👤 {user.username}
                </div>
              )}
              <div 
                onClick={handleLogout}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 84, 32, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                🚪 Log Out
              </div>
              <div 
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 84, 32, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                🔒 Lock
              </div>
              <div 
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 84, 32, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ⚙️ Settings
              </div>
              <div 
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 84, 32, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ⏻ Power Off / Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
