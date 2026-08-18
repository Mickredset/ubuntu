import React, { useState } from 'react'

const Dock = ({ apps, windows, onAppClick }) => {
  const [hoveredApp, setHoveredApp] = useState(null)

  const dockApps = ['terminal', 'files', 'browser', 'settings']

  return (
    <div style={{
      position: 'fixed',
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '8px 12px',
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      zIndex: 9998,
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {dockApps.map((appId) => {
        const app = apps[appId]
        const isOpen = windows.some(w => w.appId === appId)
        const isRunning = windows.some(w => w.appId === appId && !w.minimized)
        
        return (
          <div
            key={appId}
            onClick={() => onAppClick(appId)}
            onMouseEnter={() => setHoveredApp(appId)}
            onMouseLeave={() => setHoveredApp(null)}
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: hoveredApp === appId ? 'rgba(255,255,255,0.2)' : 'transparent',
              transition: 'all 0.2s',
              transform: hoveredApp === appId ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {app.icon}
            </div>
            {isOpen && (
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isRunning ? '#E95420' : 'white'
              }} />
            )}
            {hoveredApp === appId && (
              <div style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}>
                {app.name}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Dock
