import React, { useState } from 'react'

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

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
        <span style={{ fontWeight: 700 }}>Activities</span>
        <span style={{ fontWeight: 700 }}>Ubuntu</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>🔊</span>
        <span>📶</span>
        <span>🔋</span>
        <div style={{ textAlign: 'center', minWidth: '100px' }}>
          <div>{formatTime(currentTime)}</div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>{formatDate(currentTime)}</div>
        </div>
        <span>⏻</span>
      </div>
    </div>
  )
}

export default TopBar
