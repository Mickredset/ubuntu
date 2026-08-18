import React, { useState } from 'react'
import { Home, Trash2 } from 'lucide-react'

const Desktop = ({ onOpenApp }) => {
  const desktopIcons = [
    { id: 'home', name: 'Home', icon: <Home size={40} /> },
    { id: 'trash', name: 'Trash', icon: <Trash2 size={40} /> }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: '28px',
      left: 0,
      right: 0,
      bottom: '60px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'flex-start'
    }}>
      {desktopIcons.map((item) => (
        <div
          key={item.id}
          onDoubleClick={() => onOpenApp(item.id === 'home' ? 'files' : 'settings')}
          style={{
            width: '80px',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ fontSize: '40px', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>
            {item.icon}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500 }}>{item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Desktop
