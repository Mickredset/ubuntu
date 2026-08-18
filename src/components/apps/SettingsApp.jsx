import React, { useState } from 'react'

const SettingsApp = () => {
  const [activeTab, setActiveTab] = useState('appearance')
  const [brightness, setBrightness] = useState(80)
  const [nightLight, setNightLight] = useState(false)
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'network', name: 'Network', icon: '📶' },
    { id: 'sound', name: 'Sound', icon: '🔊' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'about', name: 'About', icon: 'ℹ️' }
  ]

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{
        width: '200px',
        background: '#f5f5f5',
        borderRight: '1px solid #ddd',
        padding: '16px 0'
      }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              background: activeTab === tab.id ? '#E95420' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#333',
              borderRadius: '8px',
              margin: '4px 8px',
              transition: 'all 0.2s'
            }}
          >
            <span>{tab.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{tab.name}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {activeTab === 'appearance' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>Appearance</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                style={{ width: '100%', height: '8px', accentColor: '#E95420' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 500 }}>Night Light</span>
                <button
                  onClick={() => setNightLight(!nightLight)}
                  style={{
                    width: '50px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: nightLight ? '#E95420' : '#ccc',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: nightLight ? '26px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            </div>

            <div>
              <p style={{ fontWeight: 500, marginBottom: '12px' }}>Theme</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: '#f5f5f5',
                  border: '2px solid #E95420',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  Light
                </div>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: '#333',
                  border: '2px solid transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  Dark
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>Network</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontWeight: 500 }}>Wi-Fi</span>
                  <p style={{ fontSize: '12px', color: '#666' }}>Connected to "Home Network"</p>
                </div>
                <button
                  onClick={() => setWifi(!wifi)}
                  style={{
                    width: '50px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: wifi ? '#E95420' : '#ccc',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: wifi ? '26px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 500 }}>Bluetooth</span>
                  <p style={{ fontSize: '12px', color: '#666' }}>Visible as "Ubuntu"</p>
                </div>
                <button
                  onClick={() => setBluetooth(!bluetooth)}
                  style={{
                    width: '50px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: bluetooth ? '#E95420' : '#ccc',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: bluetooth ? '26px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sound' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>Sound</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Output Volume: 75%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={75}
                style={{ width: '100%', height: '8px', accentColor: '#E95420' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>
                Input Volume: 50%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={50}
                style={{ width: '100%', height: '8px', accentColor: '#E95420' }}
              />
            </div>

            <div>
              <p style={{ fontWeight: 500, marginBottom: '12px' }}>Output Device</p>
              <select style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}>
                <option>Built-in Audio Analog Stereo</option>
                <option>USB Audio Device</option>
                <option>HDMI / DisplayPort</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>Notifications</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>Enable Notifications</span>
                <button
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    width: '50px',
                    height: '26px',
                    borderRadius: '13px',
                    border: 'none',
                    background: notifications ? '#E95420' : '#ccc',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: notifications ? '26px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <p style={{ fontWeight: 500, marginBottom: '12px' }}>Do Not Disturb</p>
              <p style={{ fontSize: '13px', color: '#666' }}>Silence all notifications and calls</p>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>About</h2>
            
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                background: 'linear-gradient(135deg, #E95420 0%, #C7461F 100%)',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: 'white'
              }}>
                🐧
              </div>
              <h3>Ubuntu 24.04 LTS</h3>
              <p style={{ color: '#666' }}>Noble Numbat</p>
            </div>

            <div style={{
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>OS Name</span>
                <span>Ubuntu</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>Version</span>
                <span>24.04 LTS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>Kernel</span>
                <span>Linux 6.8.0-31-generic</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <span>Memory</span>
                <span>16 GB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>Disk Space</span>
                <span>512 GB SSD</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsApp
