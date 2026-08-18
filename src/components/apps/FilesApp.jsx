import React, { useState } from 'react'
import { Home, FileText, Download, Music, Image, Video, FolderOpen, FileType } from 'lucide-react'

const FilesApp = () => {
  const [currentPath, setCurrentPath] = useState('home')
  
  const fileSystem = {
    home: {
      type: 'dir',
      children: {
        Documents: { type: 'dir', children: { 'report.txt': { type: 'file', size: '2.4 KB' }, 'notes.md': { type: 'file', size: '1.1 KB' } } },
        Downloads: { type: 'dir', children: { 'installer.deb': { type: 'file', size: '45.2 MB' }, 'archive.zip': { type: 'file', size: '12.8 MB' } } },
        Music: { type: 'dir', children: { 'song.mp3': { type: 'file', size: '4.5 MB' } } },
        Pictures: { type: 'dir', children: { 'photo.png': { type: 'file', size: '2.1 MB' }, 'screenshot.jpg': { type: 'file', size: '890 KB' } } },
        Videos: { type: 'dir', children: {} },
        'todo.txt': { type: 'file', size: '128 B' }
      }
    }
  }

  const getCurrentDir = () => {
    const parts = currentPath.split('/')
    let current = fileSystem.home
    for (let i = 1; i < parts.length; i++) {
      if (current.children && current.children[parts[i]]) {
        current = current.children[parts[i]]
      }
    }
    return current
  }

  const navigateTo = (folder) => {
    if (folder === '..') {
      const parts = currentPath.split('/')
      if (parts.length > 1) {
        parts.pop()
        setCurrentPath(parts.join('/'))
      }
    } else {
      setCurrentPath(currentPath ? `${currentPath}/${folder}` : folder)
    }
  }

  const currentDir = getCurrentDir()
  const items = currentDir.children || {}

  const sidebarItems = [
    { icon: <Home size={16} />, name: 'Home', path: 'home' },
    { icon: <FileText size={16} />, name: 'Documents', path: 'home/Documents' },
    { icon: <Download size={16} />, name: 'Downloads', path: 'home/Downloads' },
    { icon: <Music size={16} />, name: 'Music', path: 'home/Music' },
    { icon: <Image size={16} />, name: 'Pictures', path: 'home/Pictures' },
    { icon: <Video size={16} />, name: 'Videos', path: 'home/Videos' }
  ]

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{
        width: '180px',
        background: '#f0f0f0',
        borderRight: '1px solid #ddd',
        padding: '12px 0',
        overflowY: 'auto'
      }}>
        {sidebarItems.map((item) => (
          <div
            key={item.path}
            onClick={() => setCurrentPath(item.path)}
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              background: currentPath === item.path ? '#E95420' : 'transparent',
              color: currentPath === item.path ? 'white' : '#333'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            <span style={{ fontSize: '13px' }}>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navigation Bar */}
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button 
            onClick={() => navigateTo('..')}
            disabled={currentPath === 'home'}
            style={{
              padding: '4px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: currentPath === 'home' ? '#f5f5f5' : 'white',
              cursor: currentPath === 'home' ? 'not-allowed' : 'pointer',
              opacity: currentPath === 'home' ? 0.5 : 1
            }}
          >
            ← Back
          </button>
          <div style={{
            flex: 1,
            padding: '6px 12px',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '13px'
          }}>
            /{currentPath.replace(/\//g, '/')}
          </div>
        </div>

        {/* Files Grid */}
        <div style={{
          flex: 1,
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
          overflowY: 'auto'
        }}>
          {Object.entries(items).map(([name, item]) => (
            <div
              key={name}
              onDoubleClick={() => item.type === 'dir' && navigateTo(name)}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: '48px', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                {item.type === 'dir' ? <FolderOpen size={48} /> : <FileType size={48} />}
              </div>
              <div style={{ 
                fontSize: '12px', 
                wordBreak: 'break-word',
                lineHeight: '1.3'
              }}>
                {name}
              </div>
              {item.type === 'file' && (
                <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>
                  {item.size}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div style={{
          padding: '4px 16px',
          borderTop: '1px solid #ddd',
          fontSize: '12px',
          color: '#666',
          background: '#f5f5f5'
        }}>
          {Object.keys(items).length} item{Object.keys(items).length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default FilesApp
