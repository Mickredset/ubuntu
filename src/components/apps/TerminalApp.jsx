import React, { useState, useRef, useEffect } from 'react'

const TerminalApp = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)' },
    { type: 'output', text: '' },
    { type: 'output', text: ' * Documentation:  https://help.ubuntu.com' },
    { type: 'output', text: ' * Management:     https://landscape.canonical.com' },
    { type: 'output', text: ' * Support:        https://ubuntu.com/advantage' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Last login: ' + new Date().toUTCString() + ' from pts/0' },
    { type: 'output', text: '' }
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  const fileSystem = {
    '~': { type: 'dir', children: ['Documents', 'Downloads', 'Music', 'Pictures', 'Videos'] },
    '~/Documents': { type: 'dir', children: ['report.txt', 'notes.md'] },
    '~/Downloads': { type: 'dir', children: ['installer.deb'] },
    '~/Music': { type: 'dir', children: [] },
    '~/Pictures': { type: 'dir', children: ['photo.png'] },
    '~/Videos': { type: 'dir', children: [] }
  }

  let currentDir = '~'

  const commands = {
    help: () => 'Available commands: help, clear, ls, cd, pwd, echo, whoami, date, uname, cat, mkdir, touch, rm',
    clear: () => { setHistory([]); return null },
    ls: () => {
      const dir = fileSystem[currentDir]
      if (dir && dir.children) {
        return dir.children.join('  ')
      }
      return ''
    },
    pwd: () => currentDir.replace('~', '/home/user'),
    whoami: () => 'user',
    date: () => new Date().toString(),
    uname: () => 'Linux ubuntu 6.8.0-31-generic x86_64',
    echo: (args) => args.join(' '),
    cd: (args) => {
      if (!args[0] || args[0] === '~') {
        currentDir = '~'
        return null
      }
      if (args[0] === '..') {
        if (currentDir !== '~') {
          currentDir = '~'
        }
        return null
      }
      const newPath = currentDir === '~' ? `~/${args[0]}` : `${currentDir}/${args[0]}`
      if (fileSystem[newPath]) {
        currentDir = newPath
        return null
      }
      return `cd: no such file or directory: ${args[0]}`
    },
    cat: (args) => {
      if (!args[0]) return 'cat: missing operand'
      const dir = fileSystem[currentDir]
      if (dir && dir.children && dir.children.includes(args[0])) {
        return `Contents of ${args[0]}...`
      }
      return `cat: ${args[0]}: No such file or directory`
    },
    mkdir: (args) => {
      if (!args[0]) return 'mkdir: missing operand'
      return null
    },
    touch: (args) => {
      if (!args[0]) return 'touch: missing operand'
      return null
    },
    rm: (args) => {
      if (!args[0]) return 'rm: missing operand'
      return null
    }
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const parts = trimmedCmd.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    const newHistory = [...history, { type: 'input', text: `${currentDir}$ ${trimmedCmd}` }]

    if (commands[command]) {
      const result = commands[command](args)
      if (result !== null) {
        newHistory.push({ type: 'output', text: result })
      }
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${command}` })
    }

    setHistory(newHistory)
    setInput('')
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    }
  }

  return (
    <div 
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
      style={{
        height: '100%',
        background: '#1a1b26',
        color: '#a9b1d6',
        padding: '12px',
        fontFamily: "'Ubuntu Mono', 'Courier New', monospace",
        fontSize: '14px',
        overflowY: 'auto',
        cursor: 'text'
      }}
    >
      {history.map((line, i) => (
        <div 
          key={i} 
          style={{ 
            color: line.type === 'error' ? '#f7768e' : line.type === 'input' ? '#7aa2f7' : '#a9b1d6',
            marginBottom: '4px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {line.text}
        </div>
      ))}
      <div style={{ display: 'flex' }}>
        <span style={{ color: '#7aa2f7', marginRight: '8px' }}>{currentDir}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#a9b1d6',
            fontFamily: 'inherit',
            fontSize: 'inherit'
          }}
          autoFocus
        />
      </div>
    </div>
  )
}

export default TerminalApp
