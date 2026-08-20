import React, { useState } from 'react'
import { Volume2, Wifi, Battery, Power, LogOut, Lock, Settings, User } from 'lucide-react'

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

  const handlePowerClick = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleLogout = () => {
    window.location.reload()
  }

  const handleLock = () => {
    if (window.confirm('Lock the screen?')) {
      window.location.reload()
    }
  }

  const handleSettings = () => {
    alert('Settings will be implemented soon!')
  }

  const handlePowerOff = () => {
    if (window.confirm('Power off the system?')) {
      window.location.reload()
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest('[data-topbar-menu]')) {
        setShowMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showMenu])

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
      zIndex: 9999,
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
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Volume2 size={16} />
        </span>
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Wifi size={16} />
        </span>
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Battery size={16} />
        </span>
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
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Power size={16} />
          </span>
          
          {showMenu && (
            <div data-topbar-menu="true" onClick={(e) => e.stopPropagation()} style={{
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
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <User size={14} /> {user.username}
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
                <LogOut size={16} /> Log Out
              </div>
              <div 
                onClick={handleLock}
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
                <Lock size={16} /> Lock
              </div>
              <div 
                onClick={handleSettings}
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
                <Settings size={16} /> Settings
              </div>
              <div 
                onClick={handlePowerOff}
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
                <Power size={16} /> Power Off / Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
