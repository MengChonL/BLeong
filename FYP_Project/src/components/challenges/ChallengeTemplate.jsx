import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Folder from '../Folder';
import item1 from '../../assets/item1.png';
import item2 from '../../assets/item2.jpg';
import item3 from '../../assets/item3.png';
import item4 from '../../assets/item4.png';
import item5 from '../../assets/item5.png';
import item6 from '../../assets/item6.png';

/**
 * 挑战页面基础模板
 * 提供统一的布局、语言切换、返回按钮等功能
 */
const ChallengeTemplate = ({ 
  children,
  language,
  setLanguage,
  title,
  backPath = '/game',
  showLanguageSwitch = true,
  containerMaxWidth = '75vw',
  containerMaxHeight = '75vh',
}) => {
  const navigate = useNavigate();
  const [showBackpack, setShowBackpack] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  // 道具數據
  const items = [
    { 
      name: '防護盾牌', 
      nameEn: 'Protection Shield',
      description: '可以阻擋一次惡意交易', 
      descriptionEn: 'Can block one malicious transaction',
      rarity: '稀有', 
      rarityEn: 'Rare',
      type: '防禦道具', 
      typeEn: 'Defensive Item',
      image: item1 
    },
    { 
      name: '智慧之眼', 
      nameEn: 'Eye of Wisdom',
      description: '可以識別釣魚網站', 
      descriptionEn: 'Can identify phishing websites',
      rarity: '史詩', 
      rarityEn: 'Epic',
      type: '輔助道具', 
      typeEn: 'Support Item',
      image: item2 
    },
    { 
      name: '時光沙漏', 
      nameEn: 'Hourglass of Time',
      description: '可以回溯一次錯誤操作', 
      descriptionEn: 'Can revert one wrong action',
      rarity: '傳說', 
      rarityEn: 'Legendary',
      type: '特殊道具', 
      typeEn: 'Special Item',
      image: item3 
    },
    { 
      name: '加密寶石', 
      nameEn: 'Encryption Gem',
      description: '提升錢包安全等級', 
      descriptionEn: 'Enhances wallet security',
      rarity: '稀有', 
      rarityEn: 'Rare',
      type: '強化道具', 
      typeEn: 'Enhancement Item',
      image: item4 
    },
    { 
      name: '驗證令牌', 
      nameEn: 'Verification Token',
      description: '自動驗證交易合法性', 
      descriptionEn: 'Auto-verifies transaction legitimacy',
      rarity: '史詩', 
      rarityEn: 'Epic',
      type: '輔助道具', 
      typeEn: 'Support Item',
      image: item5 
    },
    { 
      name: '緊急傳送門', 
      nameEn: 'Emergency Portal',
      description: '危險時刻快速退出', 
      descriptionEn: 'Quick escape in danger',
      rarity: '傳說', 
      rarityEn: 'Legendary',
      type: '逃脫道具', 
      typeEn: 'Escape Item',
      image: item6 
    }
  ];

  const content = {
    chinese: {
      backToGame: '返回遊戲',
      backpack: '背包',
      backpackTitle: '道具背包',
      selectedItem: '選中道具',
      itemDescription: '道具描述',
      rarity: '稀有度',
      type: '類型',
      items: '道具',
      emptySlots: '空格'
    },
    english: {
      backToGame: 'Back to Game',
      backpack: 'Backpack',
      backpackTitle: 'Item Backpack',
      selectedItem: 'Selected Item',
      itemDescription: 'Item Description',
      rarity: 'Rarity',
      type: 'Type',
      items: 'Items',
      emptySlots: 'Empty Slots'
    }
  };

  const currentContent = content[language] || content.chinese;

  return (
    <div 
      className="w-full h-screen overflow-hidden relative flex flex-col"
      style={{ 
        background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      {/* 语言切换 - 左上角 */}
      {showLanguageSwitch && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('chinese')}
              className="pixel-button"
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                backgroundColor: language === 'chinese' ? '#22d3ee' : 'transparent',
                color: language === 'chinese' ? '#ffffff' : '#9ca3af',
                border: '2px solid #000',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 0px #000',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'unset'
              }}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage('english')}
              className="pixel-button"
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                backgroundColor: language === 'english' ? '#22d3ee' : 'transparent',
                color: language === 'english' ? '#ffffff' : '#9ca3af',
                border: '2px solid #000',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 0px #000',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'unset'
              }}
            >
              English
            </button>
          </div>
        </div>
      )}

      {/* 返回按钮 - 右上角 */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => navigate(backPath)}
          className="pixel-button"
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            backgroundColor: '#374151',
            color: '#ffffff',
            border: '2px solid #000',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '2px 2px 0px #000',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'unset'
          }}
        >
          {currentContent.backToGame}
        </button>
      </div>

      {/* 背包按鈕 - 右下角 */}
      <div className="absolute bottom-4 right-4 z-10">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowBackpack(!showBackpack)}
          style={{
            fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#ffffff',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#22d3ee';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Folder size={2} color="#22d3ee" />
          <span>{currentContent.backpack}</span>
        </div>
      </div>

      {/* 背包界面 - 居中顯示 */}
      {showBackpack && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-5"
            onClick={() => setShowBackpack(false)}
          />
          
          {/* 背包內容 */}
          <div className="relative p-8 text-white" style={{
            width: '800px',
            backgroundColor: '#1f2937',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px #000000',
            borderRadius: '20px'
          }}>
            {/* 關閉按鈕 */}
            <button
              onClick={() => setShowBackpack(false)}
              className="absolute top-6 right-6 text-white cursor-pointer hover:text-gray-300 transition-colors"
              style={{
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                fontSize: '24px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0'
              }}
            >
              ×
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center" style={{ 
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace', 
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              {currentContent.backpackTitle}
            </h3>
            
            {/* 上方區域 - 左側放大物件，右側描述 */}
            <div className="flex gap-6 mb-6">
              {/* 左側 - 放大物件 */}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-cyan-400 mb-3" style={{
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  textTransform: 'uppercase'
                }}>
                  {currentContent.selectedItem}
                </h4>
                <div className="w-32 h-32 flex items-center justify-center mx-auto" style={{
                  border: '3px solid #000000',
                  backgroundColor: '#374151',
                  borderRadius: '12px',
                  boxShadow: '4px 4px 0px #000000',
                  overflow: 'hidden'
                }}>
                  <img
                    src={items[selectedItem]?.image}
                    alt={items[selectedItem]?.name}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              </div>
              
              {/* 右側 - 道具描述 */}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-cyan-400 mb-3" style={{
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  textTransform: 'uppercase'
                }}>
                  {currentContent.itemDescription}
                </h4>
                <div className="p-4 border-2 border-gray-600 bg-gray-800" style={{
                  border: '2px solid #4b5563',
                  backgroundColor: '#374151',
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  borderRadius: '8px'
                }}>
                  <h5 className="text-lg font-bold text-white mb-2">
                    {language === 'chinese' ? items[selectedItem]?.name : items[selectedItem]?.nameEn}
                  </h5>
                  <p className="text-sm text-gray-300 mb-2">
                    {language === 'chinese' ? items[selectedItem]?.description : items[selectedItem]?.descriptionEn}
                  </p>
                  <p className="text-xs text-gray-400">
                    {currentContent.rarity}: {language === 'chinese' ? items[selectedItem]?.rarity : items[selectedItem]?.rarityEn}
                  </p>
                  <p className="text-xs text-gray-400">
                    {currentContent.type}: {language === 'chinese' ? items[selectedItem]?.type : items[selectedItem]?.typeEn}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 背包格子 - 5x2 網格 */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItem(index)}
                  className="w-20 h-20 bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all duration-200 rounded-lg"
                  style={{
                    border: selectedItem === index ? '3px solid #ffffff' : '3px solid #000000',
                    backgroundColor: '#374151',
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    fontSize: '24px',
                    color: '#9ca3af',
                    boxShadow: selectedItem === index ? '0 0 10px #ffffff, 4px 4px 0px #000000' : '4px 4px 0px #000000',
                    transform: selectedItem === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {index < 6 ? (
                    <img
                      src={items[index]?.image}
                      alt={items[index]?.name}
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ) : (
                    <span className="text-gray-500">{language === 'chinese' ? '空' : 'Empty'}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* 背包描述 */}
            <div className="text-lg text-gray-300 text-center" style={{ 
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
              lineHeight: '1.4'
            }}>
              <p>{currentContent.items}: 6/10</p>
              <p>{currentContent.emptySlots}: 4</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 主要内容区域 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full overflow-y-auto"
          style={{
            maxWidth: containerMaxWidth,
            maxHeight: containerMaxHeight,
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengeTemplate;

