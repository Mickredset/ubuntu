import React, { useState, useRef } from 'react'

const Window = ({ 
  id, title, icon, x, y, width, height, 
  minimized, maximized, isActive, children,
  onClose, onMinimize, onMaximize, onFocus,
  onPositionChange, onSizeChange 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  if (minimized) return null

  const handleMouseDown = (e) => {
    onFocus()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    })
  }

  const handleResizeMouseDown = (e) => {
    e.stopPropagation()
    setIsResizing(true)
    onFocus()
  }

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !maximized) {
        onPositionChange(
          e.clientX - dragOffset.x,
          e.clientY - dragOffset.y
        )
      }
      if (isResizing && !maximized) {
        const newWidth = Math.max(400, e.clientX - x)
        const newHeight = Math.max(300, e.clientY - y)
        onSizeChange(newWidth, newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, maximized, x, y, onPositionChange, onSizeChange])

  const windowStyle = maximized ? {
    top: '28px',
    left: 0,
    right: 0,
    bottom: '60px',
    width: 'auto',
    height: 'auto'
  } : {
    top: y,
    left: x,
    width,
    height
  }

  return (
    <div
      ref={windowRef}
      onClick={onFocus}
      style={{
        position: 'fixed',
        ...windowStyle,
        background: '#f5f5f5',
        borderRadius: maximized ? 0 : '8px',
        boxShadow: isActive 
          ? '0 10px 40px rgba(0,0,0,0.4)' 
          : '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: isActive ? 1000 : 900,
        border: isActive ? '1px solid #E95420' : '1px solid rgba(0,0,0,0.1)'
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        style={{
          height: '36px',
          background: isActive ? '#E95420' : '#cfcfcf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          cursor: 'move',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
          <span>{icon}</span>
          <span style={{ fontWeight: 500, fontSize: '13px' }}>{title}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            −
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize() }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            □
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: 'none',
              background: '#ff5f57',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        background: 'white'
      }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!maximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            cursor: 'se-resize',
            background: 'linear-gradient(135deg, transparent 50%, #E95420 50%)'
          }}
        />
      )}
    </div>
  )
}

export default Window
