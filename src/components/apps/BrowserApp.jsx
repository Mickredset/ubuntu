import React, { useState } from 'react'

const BrowserApp = () => {
  const [url, setUrl] = useState('https://ubuntu.com')
  const [inputValue, setInputValue] = useState('https://ubuntu.com')
  const [history, setHistory] = useState(['https://ubuntu.com'])
  const [historyIndex, setHistoryIndex] = useState(0)

  const pages = {
    'https://ubuntu.com': {
      title: 'Ubuntu',
      content: (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#E95420', marginBottom: '20px' }}>Ubuntu</h1>
          <p style={{ fontSize: '18px', color: '#666' }}>The #1 platform for AI development</p>
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>🖥️ Desktop</h3>
              <p>Secure and open source</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>☁️ Server</h3>
              <p>Cloud infrastructure</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>🤖 IoT</h3>
              <p>From edge to gateway</p>
            </div>
          </div>
        </div>
      )
    },
    'https://google.com': {
      title: 'Google',
      content: (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '72px', marginBottom: '30px' }}>
            <span style={{ color: '#4285f4' }}>G</span>
            <span style={{ color: '#ea4335' }}>o</span>
            <span style={{ color: '#fbbc05' }}>o</span>
            <span style={{ color: '#4285f4' }}>g</span>
            <span style={{ color: '#34a853' }}>l</span>
            <span style={{ color: '#ea4335' }}>e</span>
          </h1>
          <input 
            type="text" 
            placeholder="Search Google or type a URL"
            style={{ 
              width: '500px', 
              padding: '12px 20px', 
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '24px',
              outline: 'none'
            }}
          />
        </div>
      )
    },
    'https://github.com': {
      title: 'GitHub',
      content: (
        <div style={{ padding: '40px' }}>
          <h1 style={{ marginBottom: '20px' }}>🐙 GitHub</h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>Let's build from here</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '10px 20px', background: '#2da44e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Sign up</button>
            <button style={{ padding: '10px 20px', background: '#f6f8fa', color: '#333', border: '1px solid #d0d7de', borderRadius: '6px', cursor: 'pointer' }}>Sign in</button>
          </div>
        </div>
      )
    }
  }

  const navigateTo = (newUrl) => {
    let targetUrl = newUrl
    if (!newUrl.startsWith('http')) {
      targetUrl = `https://${newUrl}`
    }
    
    setUrl(targetUrl)
    setInputValue(targetUrl)
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(targetUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setUrl(history[newIndex])
      setInputValue(history[newIndex])
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setUrl(history[newIndex])
      setInputValue(history[newIndex])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigateTo(inputValue)
    }
  }

  const currentPage = pages[url] || {
    title: 'Unknown',
    content: (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <h2>Page not found in demo</h2>
        <p>Try: ubuntu.com, google.com, or github.com</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{
        padding: '8px 12px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <button 
          onClick={goBack}
          disabled={historyIndex <= 0}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: historyIndex <= 0 ? '#e0e0e0' : 'white',
            cursor: historyIndex <= 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          ←
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: historyIndex >= history.length - 1 ? '#e0e0e0' : 'white',
            cursor: historyIndex >= history.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          →
        </button>
        <button 
          onClick={() => navigateTo(url)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        background: 'white'
      }}>
        {currentPage.content}
      </div>
    </div>
  )
}

export default BrowserApp
