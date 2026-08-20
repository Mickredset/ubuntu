import React, { useState } from 'react'
import { Terminal, Folder, Globe, Settings as SettingsIcon } from 'lucide-react'
import TopBar from './components/TopBar'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import Window from './components/Window'
import LoginScreen from './components/LoginScreen'
import TerminalApp from './components/apps/TerminalApp'
import FilesApp from './components/apps/FilesApp'
import BrowserApp from './components/apps/BrowserApp'
import SettingsApp from './components/apps/SettingsApp'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [windows, setWindows] = useState([])
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [windowIdCounter, setWindowIdCounter] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const apps = {
    terminal: { id: 'terminal', name: 'Terminal', icon: <Terminal size={28} />, component: TerminalApp },
    files: { id: 'files', name: 'Files', icon: <Folder size={28} />, component: FilesApp },
    browser: { id: 'browser', name: 'Firefox', icon: <Globe size={28} />, component: BrowserApp },
    settings: { id: 'settings', name: 'Settings', icon: <SettingsIcon size={28} />, component: SettingsApp }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setWindows([])
    setIsLocked(false)
  }

  const handleLock = () => {
    setIsLocked(true)
  }

  const handleUnlock = (userData) => {
    if (userData) {
      setUser(userData)
    }
    setIsLocked(false)
  }

  const handlePowerOff = () => {
    if (window.confirm('Power off the system?')) {
      setUser(null)
      setIsLoggedIn(false)
      setWindows([])
      setIsLocked(false)
    }
  }

  const handleSettings = () => {
    openApp('settings')
  }

  if (!isLoggedIn || isLocked) {
    return <LoginScreen onLogin={isLocked ? handleUnlock : handleLogin} isLocked={isLocked} user={user} />
  }

  const openApp = (appId) => {
    const app = apps[appId]
    if (!app) return

    const newWindow = {
      id: windowIdCounter,
      appId: appId,
      title: app.name,
      icon: app.icon,
      component: app.component,
      x: 100 + (windows.length * 30),
      y: 50 + (windows.length * 30),
      width: 800,
      height: 500,
      minimized: false,
      maximized: false
    }

    setWindows([...windows, newWindow])
    setActiveWindowId(windowIdCounter)
    setWindowIdCounter(windowIdCounter + 1)
  }

  const closeWindow = (windowId) => {
    setWindows(windows.filter(w => w.id !== windowId))
    if (activeWindowId === windowId) {
      setActiveWindowId(null)
    }
  }

  const minimizeWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, minimized: true } : w
    ))
  }

  const maximizeWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, maximized: !w.maximized } : w
    ))
  }

  const focusWindow = (windowId) => {
    setActiveWindowId(windowId)
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, minimized: false } : w
    ))
  }

  const updateWindowPosition = (windowId, x, y) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, x, y } : w
    ))
  }

  const updateWindowSize = (windowId, width, height) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, width, height } : w
    ))
  }

  const restoreFromDock = (appId) => {
    const appWindow = windows.find(w => w.appId === appId && w.minimized)
    if (appWindow) {
      focusWindow(appWindow.id)
    } else {
      openApp(appId)
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <TopBar 
        user={user} 
        onLogout={handleLogout}
        onLock={handleLock}
        onSettings={handleSettings}
        onPowerOff={handlePowerOff}
      />
      
      <Desktop onOpenApp={openApp} />
      
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          x={win.x}
          y={win.y}
          width={win.width}
          height={win.height}
          minimized={win.minimized}
          maximized={win.maximized}
          isActive={activeWindowId === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)}
          onSizeChange={(width, height) => updateWindowSize(win.id, width, height)}
        >
          <win.component />
        </Window>
      ))}
      
      <Dock 
        apps={apps} 
        windows={windows}
        onAppClick={restoreFromDock} 
      />
    </div>
  )
}

export default App
