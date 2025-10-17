import React from 'react';

/**
 * Safari 浏览器外框组件
 * 模拟浏览器界面，包含地址栏和关闭按钮
 */
const BrowserFrame = ({ 
  children, 
  url = 'http://example.com',
  urlColor = '#ffffff',
  showControls = true,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        border: '8px solid #000000',
        borderRadius: '16px',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Safari 浏览器标题栏 */}
      {showControls && (
        <div 
          className="flex items-center justify-between p-4 border-b-4 border-black"
          style={{ backgroundColor: '#2d2d2d' }}
        >
          <div className="flex items-center gap-3">
            {/* 关闭、最小化、最大化按钮 */}
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
            </div>
            {/* 地址栏 */}
            <div 
              className="mx-4 px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: '#1a1a1a',
                border: '3px solid #000000',
                color: urlColor,
                width: '400px',
                minWidth: '400px'
              }}
            >
              <span className="text-sm font-mono">{url}</span>
            </div>
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div className="p-4" style={{ backgroundColor: '#f5f5f5' }}>
        {children}
      </div>
    </div>
  );
};

export default BrowserFrame;

