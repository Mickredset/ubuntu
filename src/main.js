// Ubuntu Desktop Emulator

let windowZIndex = 100;
let windowIdCounter = 0;

// File system simulation
const fileSystem = {
  'Home': ['Documents', 'Downloads', 'Pictures', 'Music', 'Videos'],
  'Documents': ['work.txt', 'personal.txt', 'notes.md'],
  'Downloads': ['ubuntu-iso.deb', 'package.zip'],
  'Pictures': ['screenshot1.png', 'photo.jpg'],
  'Music': ['song.mp3', 'playlist.m3u'],
  'Videos': ['video.mp4']
};

// Terminal history
const terminalHistory = {};

// Clock
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  document.getElementById('clock').textContent = `${timeStr} • ${dateStr}`;
}

setInterval(updateClock, 1000);
updateClock();

// Create window
function createWindow(appType, title) {
  const windowId = `window-${windowIdCounter++}`;
  const windowsContainer = document.getElementById('windows-container');
  
  const windowEl = document.createElement('div');
  windowEl.className = 'window active';
  windowEl.id = windowId;
  windowEl.style.zIndex = ++windowZIndex;
  windowEl.style.left = `${100 + (windowIdCounter % 5) * 30}px`;
  windowEl.style.top = `${50 + (windowIdCounter % 5) * 30}px`;
  
  windowEl.innerHTML = `
    <div class="window-header">
      <span class="window-title">${title}</span>
      <div class="window-controls">
        <span class="window-control control-minimize" data-action="minimize">−</span>
        <span class="window-control control-maximize" data-action="maximize">□</span>
        <span class="window-control control-close" data-action="close">×</span>
      </div>
    </div>
    <div class="window-content"></div>
  `;
  
  windowsContainer.appendChild(windowEl);
  
  // Setup window content based on app type
  const contentEl = windowEl.querySelector('.window-content');
  setupAppContent(contentEl, appType, windowId);
  
  // Window controls
  const headerEl = windowEl.querySelector('.window-header');
  const controls = windowEl.querySelectorAll('.window-control');
  
  // Make window draggable
  makeDraggable(windowEl, headerEl);
  
  // Bring to front on click
  windowEl.addEventListener('mousedown', () => {
    windowEl.style.zIndex = ++windowZIndex;
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    windowEl.classList.add('active');
  });
  
  // Control buttons
  controls.forEach(control => {
    control.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = control.dataset.action;
      handleWindowAction(windowEl, action);
    });
  });
  
  return windowEl;
}

// Setup app content
function setupAppContent(container, appType, windowId) {
  switch(appType) {
    case 'terminal':
      setupTerminal(container, windowId);
      break;
    case 'files':
      setupFiles(container);
      break;
    case 'browser':
      setupBrowser(container);
      break;
    case 'settings':
      setupSettings(container);
      break;
  }
}

// Terminal App
function setupTerminal(container, windowId) {
  if (!terminalHistory[windowId]) {
    terminalHistory[windowId] = [];
  }
  
  container.innerHTML = `
    <div class="terminal-content" id="terminal-${windowId}">
      <div class="terminal-output">Welcome to Ubuntu Emulator</div>
      <div class="terminal-output">Type 'help' for available commands.</div>
      <br>
      <div class="terminal-input-line">
        <span class="terminal-prompt">user@ubuntu:~$</span>
        <input type="text" class="terminal-input" autofocus>
      </div>
    </div>
  `;
  
  const input = container.querySelector('.terminal-input');
  const output = container.querySelector('.terminal-content');
  const prompt = container.querySelector('.terminal-prompt');
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      terminalHistory[windowId].push(command);
      
      // Add command line to output
      const commandLine = document.createElement('div');
      commandLine.innerHTML = `<span class="terminal-prompt">user@ubuntu:~$</span> ${command}`;
      output.insertBefore(commandLine, input.parentElement);
      
      // Process command
      const response = processCommand(command);
      if (response) {
        const responseEl = document.createElement('div');
        responseEl.className = 'terminal-output';
        responseEl.textContent = response;
        output.insertBefore(responseEl, input.parentElement);
      }
      
      input.value = '';
      output.scrollTop = output.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevCommand = terminalHistory[windowId][terminalHistory[windowId].length - 2];
      if (prevCommand !== undefined) {
        input.value = prevCommand;
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextCommand = terminalHistory[windowId][terminalHistory[windowId].length];
      if (nextCommand !== undefined) {
        input.value = nextCommand;
      } else {
        input.value = '';
      }
    }
  });
  
  input.focus();
}

function processCommand(cmd) {
  const parts = cmd.split(' ');
  const command = parts[0].toLowerCase();
  
  switch(command) {
    case 'help':
      return 'Available commands: help, clear, ls, pwd, whoami, date, echo, uname, neofetch';
    case 'clear':
      const terminal = document.querySelector('.terminal-content');
      const outputs = terminal.querySelectorAll('.terminal-output, .terminal-prompt');
      outputs.forEach(el => {
        if (el.parentElement.classList.contains('terminal-input-line')) return;
        el.remove();
      });
      return '';
    case 'pwd':
      return '/home/user';
    case 'whoami':
      return 'user';
    case 'date':
      return new Date().toString();
    case 'echo':
      return parts.slice(1).join(' ');
    case 'uname':
      if (parts[1] === '-a') {
        return 'Linux ubuntu 5.15.0-generic x86_64 GNU/Linux';
      }
      return 'Linux';
    case 'ls':
      return 'Documents  Downloads  Music  Pictures  Videos  Desktop';
    case 'neofetch':
      return `
       ▄▄▄▄▄▄▄▄▄▄▄
       ▐░░░░░░░░░░▌
       ▐░▀▀▄▀▀▀▄▀░▌     user@ubuntu
       ▐░░░▀▄▀▄▀░░▌     ───────────
       ▐░░░░░░░░░░▌     OS: Ubuntu Emulator 24.04 LTS
       ▐░▄▄▄▄▄▄▄░▌     Host: Browser
       ▐░░░░░░░░░░▌     Kernel: 5.15.0-generic
       ▐░▀▀▀▀▀▀▀░▌     Uptime: Just now
       ▐░░░░░░░░░░▌     Shell: bash 5.2
       ▀▀▀▀▀▀▀▀▀▀▀     DE: Ubuntu Desktop
                         Theme: Yaru [GTK3]
                         CPU: Virtual
                         Memory: ∞ / ∞
      `;
    case '':
      return '';
    default:
      return `Command not found: ${command}. Type 'help' for available commands.`;
  }
}

// Files App
function setupFiles(container) {
  container.innerHTML = `
    <div style="display: flex; height: 100%;">
      <div class="files-sidebar">
        <div class="file-item" style="margin-bottom: 5px;">
          <div class="file-icon" style="background: #E95420;"></div>
          <span class="file-name">Home</span>
        </div>
        <div class="file-item" style="margin-bottom: 5px;">
          <div class="file-icon" style="background: #772953;"></div>
          <span class="file-name">Documents</span>
        </div>
        <div class="file-item" style="margin-bottom: 5px;">
          <div class="file-icon" style="background: #2E95D3;"></div>
          <span class="file-name">Downloads</span>
        </div>
        <div class="file-item">
          <div class="file-icon" style="background: #5FB84C;"></div>
          <span class="file-name">Pictures</span>
        </div>
      </div>
      <div class="files-main">
        <div class="file-item">
          <div class="file-icon"></div>
          <span class="file-name">Documents</span>
        </div>
        <div class="file-item">
          <div class="file-icon"></div>
          <span class="file-name">Downloads</span>
        </div>
        <div class="file-item">
          <div class="file-icon"></div>
          <span class="file-name">Pictures</span>
        </div>
        <div class="file-item">
          <div class="file-icon"></div>
          <span class="file-name">Music</span>
        </div>
        <div class="file-item">
          <div class="file-icon"></div>
          <span class="file-name">Videos</span>
        </div>
        <div class="file-item">
          <div class="file-icon" style="background: #aaa;"></div>
          <span class="file-name">readme.txt</span>
        </div>
      </div>
    </div>
  `;
}

// Browser App
function setupBrowser(container) {
  container.innerHTML = `
    <div class="browser-content">
      <div class="browser-toolbar">
        <button class="browser-nav-btn">←</button>
        <button class="browser-nav-btn">→</button>
        <button class="browser-nav-btn">⟳</button>
        <input type="text" class="browser-url" value="https://ubuntu.com" placeholder="Enter URL...">
      </div>
      <iframe class="browser-frame" src="about:blank"></iframe>
    </div>
  `;
  
  const urlInput = container.querySelector('.browser-url');
  const iframe = container.querySelector('.browser-frame');
  
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      let url = urlInput.value;
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      // Note: Many sites block iframe embedding, so we show a message
      iframe.srcdoc = `
        <div style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h2>🌐 Browser Simulation</h2>
          <p>Requested URL: ${url}</p>
          <p style="color: #666; margin-top: 20px;">
            Note: Many websites block embedding in iframes for security reasons.<br>
            This is a simulated browser experience.
          </p>
          <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <h3>Welcome to Ubuntu!</h3>
            <p>Ubuntu is an open-source operating system.</p>
          </div>
        </div>
      `;
    }
  });
}

// Settings App
function setupSettings(container) {
  container.innerHTML = `
    <div class="settings-content">
      <h2>Settings</h2>
      <p>Customize your Ubuntu experience</p>
      <div class="settings-grid">
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #2E95D3, #1E7BC2);"></div>
          <span class="setting-name">Wi-Fi</span>
        </div>
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #5FB84C, #4A9B3D);"></div>
          <span class="setting-name">Bluetooth</span>
        </div>
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #E95420, #C74015);"></div>
          <span class="setting-name">Appearance</span>
        </div>
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #EAB535, #D4A025);"></div>
          <span class="setting-name">Notifications</span>
        </div>
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #9B59B6, #8E44AD);"></div>
          <span class="setting-name">Privacy</span>
        </div>
        <div class="setting-item">
          <div class="setting-icon" style="background: linear-gradient(135deg, #34495E, #2C3E50);"></div>
          <span class="setting-name">About</span>
        </div>
      </div>
    </div>
  `;
}

// Window actions
function handleWindowAction(windowEl, action) {
  switch(action) {
    case 'close':
      windowEl.remove();
      break;
    case 'minimize':
      windowEl.style.display = 'none';
      // Could add taskbar functionality here
      break;
    case 'maximize':
      if (windowEl.dataset.maximized === 'true') {
        windowEl.style.top = windowEl.dataset.prevTop;
        windowEl.style.left = windowEl.dataset.prevLeft;
        windowEl.style.width = windowEl.dataset.prevWidth;
        windowEl.style.height = windowEl.dataset.prevHeight;
        windowEl.dataset.maximized = 'false';
      } else {
        windowEl.dataset.prevTop = windowEl.style.top;
        windowEl.dataset.prevLeft = windowEl.style.left;
        windowEl.dataset.prevWidth = windowEl.style.width;
        windowEl.dataset.prevHeight = windowEl.style.height;
        windowEl.style.top = '28px';
        windowEl.style.left = '60px';
        windowEl.style.width = 'calc(100vw - 60px)';
        windowEl.style.height = 'calc(100vh - 28px)';
        windowEl.dataset.maximized = 'true';
      }
      break;
  }
}

// Make window draggable
function makeDraggable(windowEl, headerEl) {
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  
  headerEl.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('window-control')) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = windowEl.offsetLeft;
    initialTop = windowEl.offsetTop;
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  
  function onMouseMove(e) {
    if (!isDragging) return;
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    windowEl.style.left = `${initialLeft + dx}px`;
    windowEl.style.top = `${initialTop + dy}px`;
  }
  
  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

// Open app from icon or dock
function openApp(appType) {
  const titles = {
    terminal: 'Terminal',
    files: 'Files',
    browser: 'Web Browser',
    settings: 'Settings'
  };
  
  createWindow(appType, titles[appType]);
}

// Event listeners for desktop icons and dock
document.querySelectorAll('[data-app]').forEach(el => {
  el.addEventListener('dblclick', (e) => {
    if (el.classList.contains('icon')) {
      const appType = el.dataset.app;
      openApp(appType);
    }
  });
  
  el.addEventListener('click', (e) => {
    if (el.classList.contains('dock-item')) {
      const appType = el.dataset.app;
      openApp(appType);
    }
  });
});

// Welcome message
console.log('Ubuntu Emulator loaded successfully!');
