import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Folder, 
  File, 
  Apple, 
  Wifi, 
  Battery, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize, 
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  Plus
} from "lucide-react";
import { motion, useDragControls } from "framer-motion";

const MacOsPage = () => {
  const [windows, setWindows] = useState([
    { id: 1, title: "Finder", x: 120, y: 140, width: 900, height: 600, zIndex: 5, minimized: false, content: "finder" }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const spotlightRef = useRef(null);
  const controls = useDragControls();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const apps = [
    { name: "Finder", icon: "📁", type: "finder" },
    { name: "Safari", icon: "🌍", type: "safari" },
    { name: "Mail", icon: "✉️", type: "other" },
    { name: "Photos", icon: "🖼️", type: "other" },
    { name: "Messages", icon: "💬", type: "other" },
    { name: "Calendar", icon: "📅", type: "other" },
    { name: "Notes", icon: "📝", type: "other" },
    { name: "Terminal", icon: ">_", type: "other" }
  ];

  const files = [
    { name: "Documents", type: "folder", iconComponent: Folder, color: "var(--blue-500)" },
    { name: "Downloads", type: "folder", iconComponent: Folder, color: "var(--green-500)" },
    { name: "Photos", type: "folder", iconComponent: Folder, color: "var(--purple-500)" },
    { name: "Resume.pdf", type: "file", iconComponent: File, color: "var(--red-500)" },
    { name: "Project.psd", type: "file", iconComponent: File, color: "var(--pink-500)" },
    { name: "Budget.xlsx", type: "file", iconComponent: File, color: "var(--green-600)" }
  ];

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bringToFront = (id) => {
    setWindows(prev => prev.map(win => ({
      ...win,
      zIndex: win.id === id ? Math.max(...prev.map(w => w.zIndex)) + 1 : win.zIndex
    })));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(win => 
      win.id === id ? { ...win, minimized: true } : win
    ));
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const openApp = (app) => {
    const existingWindow = windows.find(w => w.title === app.name);
    if (existingWindow) {
      if (existingWindow.minimized) {
        setWindows(prev => prev.map(win => win.id === existingWindow.id ? { ...win, minimized: false } : win));
      }
      bringToFront(existingWindow.id);
    } else {
      let content = "default";
      let width = 600;
      let height = 400;
      if (app.type === "safari") {
        content = "safari";
        width = 900;
        height = 600;
      } else if (app.type === "finder") {
        content = "finder";
        width = 600;
        height = 400;
      }
      setWindows(prev => [
        ...prev,
        {
          id: Date.now(),
          title: app.name,
          x: 100 + prev.length * 40,
          y: 100 + prev.length * 20,
          width,
          height,
          zIndex: Math.max(...prev.map(w => w.zIndex), 0) + 1,
          minimized: false,
          content
        }
      ]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (spotlightRef.current && !spotlightRef.current.contains(event.target)) {
        setShowSpotlight(false);
      }
    };

    if (showSpotlight) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSpotlight]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey && e.key === ' ') {
        e.preventDefault();
        setShowSpotlight(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const MotionDiv = motion.div;

  return (
    <div className="main-container">
      {/* 菜单栏 */}
      <div className="menu-bar">
        <div className="menu-left">
          <Apple className="menu-icon" />
          <span className="menu-item-text">Finder</span>
          <span className="menu-item-text">File</span>
          <span className="menu-item-text">Edit</span>
          <span className="menu-item-text">View</span>
        </div>
        
        <div className="menu-center">
          <div className="spotlight-input-container">
            <Search className="spotlight-search-icon" />
            <input
              type="text"
              placeholder="Search with Spotlight (⌘ + Space)"
              className="spotlight-input"
              onFocus={() => setShowSpotlight(true)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="menu-right">
          <Wifi className="menu-icon" />
          <Battery className="menu-icon" />
          <span>{formattedTime}</span>
          <Moon className="menu-icon menu-icon-hover" />
        </div>
      </div>

      {/* Spotlight 启动器 */}
      {showSpotlight && (
        <div 
          ref={spotlightRef}
          className="spotlight-overlay"
        >
          <div className="spotlight-header">
            <input
              type="text"
              placeholder="Search apps, files, and more..."
              className="spotlight-search-input"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="spotlight-results">
            {filteredApps.map((app, index) => (
              <div 
                key={`app-${index}`} 
                className="spotlight-item"
                onClick={() => openApp(app)}
              >
                <span className="spotlight-app-icon">{app.icon}</span>
                <span className="spotlight-app-name">{app.name}</span>
              </div>
            ))}
            {filteredFiles.map((file, index) => {
              const IconComponent = file.iconComponent;
              return (
                <div key={`file-${index}`} className="spotlight-item">
                  <IconComponent className="spotlight-file-icon" style={{ color: file.color }} />
                  <span className="spotlight-file-name">{file.name}</span>
                </div>
              );
            })}
            {searchTerm && filteredApps.length === 0 && filteredFiles.length === 0 && (
              <div className="no-results-message">
                No results found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* 窗口 */}
      {windows.map((window) => {
        return (
          <MotionDiv
            key={window.id}
            className={`window-container ${window.minimized ? 'minimized' : ''}`}
            style={{
              x: window.x,
              y: window.y,
              width: window.width,
              height: window.height,
              zIndex: window.zIndex
            }}
            drag
            dragControls={controls}
            dragMomentum={false}
            onPointerDown={() => bringToFront(window.id)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* 窗口标题栏 */}
            <div 
              className="window-title-bar"
              onPointerDown={(e) => controls.start(e)}
            >
              <div className="window-traffic-lights">
                <div className="window-close" onClick={() => closeWindow(window.id)} />
                <div className="window-minimize" onClick={() => minimizeWindow(window.id)} />
                <div className="window-maximize" />
              </div>
              <span className="window-title">{window.title}</span>
              <div className="window-controls">
                <Minimize className="window-control-icon" onClick={() => minimizeWindow(window.id)} />
                <Maximize2 className="window-control-icon" />
                <X className="window-control-icon" onClick={() => closeWindow(window.id)} />
              </div>
            </div>

            {/* 窗口內容 */}
            {window.content === "finder" && (
              <div className="window-content finder-content">
                <div className="finder-nav-bar">
                  <div className="finder-nav-item finder-nav-item-active">Favorites</div>
                  <div className="finder-nav-item">iCloud Drive</div>
                  <div className="finder-nav-item">AirDrop</div>
                </div>
                <div className="finder-grid-view">
                  {files.map((file, index) => {
                    const IconComponent = file.iconComponent;
                    return (
                      <div key={index} className="finder-file-item">
                        <div className="finder-file-icon">
                          <IconComponent style={{ color: file.color }} />
                        </div>
                        <span className="finder-file-name">{file.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {window.content === "safari" && (
              <div className="window-content safari-content">
                <div className="safari-address-bar">
                  <ChevronLeft className="safari-nav-icon safari-nav-icon-disabled" />
                  <ChevronRight className="safari-nav-icon safari-nav-icon-disabled" />
                  <RefreshCcw className="safari-nav-icon" />
                  <div className="safari-url-container">
                    <Search className="safari-search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search or enter website name" 
                      className="safari-url-input"
                    />
                  </div>
                  <Plus className="safari-nav-icon" />
                </div>
                <div className="safari-welcome-screen">
                  <div className="safari-welcome-content">
                    <div className="safari-icon">🌍</div>
                    <h2 className="safari-title">歡迎使用 Safari</h2>
                    <p className="safari-subtitle">在上方網址列輸入網站名稱開始瀏覽</p>
                  </div>
                </div>
              </div>
            )}

            {window.content === "other" && (
              <div className="window-content other-content">
                <div className="other-message">
                  <p>這是 {window.title} 應用程式</p>
                  <p>此為預設介面。</p>
                </div>
              </div>
            )}
          </MotionDiv>
        );
      })}

      {/* Dock */}
      <div className="dock-container">
        <div className="dock-apps">
          {apps.map((app, index) => (
            <div 
              key={index}
              className="dock-app-item"
              onClick={() => openApp(app)}
            >
              <motion.div
                className="dock-icon-wrapper"
                whileHover={{ y: -10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="dock-icon">{app.icon}</span>
              </motion.div>
              <div className="dock-app-tooltip">
                {app.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 桌面圖標 */}
      <div className="desktop-icons">
        {files.slice(0, 3).map((file, index) => {
          const IconComponent = file.iconComponent;
          return (
            <div key={index} className="desktop-icon-item">
              <div className="desktop-icon-wrapper">
                <IconComponent className="desktop-icon" style={{ color: file.color }} />
              </div>
              <span className="desktop-icon-name">
                {file.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacOsPage;