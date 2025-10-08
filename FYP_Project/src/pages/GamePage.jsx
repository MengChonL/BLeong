import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GooeyNav from '../components/GooeyNav';
import FixedBackground from '../components/FixedBackground';
import Folder from '../components/Folder';

// 導入道具圖片
import item1 from '../assets/item1.png';
import item2 from '../assets/item2.jpg';
import item3 from '../assets/item3.png';
import item4 from '../assets/item4.png';
import item5 from '../assets/item5.png';
import item6 from '../assets/item6.png';

const GamePage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [language, setLanguage] = useState('chinese');
  const [showBackpack, setShowBackpack] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0); // 選中的道具索引
  const [selectedChallenge, setSelectedChallenge] = useState(null); // 選中的挑戰索引

  // 道具數據
  const items = [
    {
      id: 1,
      name: '地址複製/對比簿',
      description: '顯示目標地址與已知官方地址的逐字符讓用戶對比。遇到疑似地址投毒（如收款地址被篡改）時使用。',
      rarity: '普通',
      type: '防護道具',
      image: item1
    },
    {
      id: 2,
      name: '槓桿',
      description: '若本題答對，獎勵 ×2；若答錯，懲罰 ×2（無視慌亂狀態）。對自己判斷極有信心時用於快速積累 Balance。',
      rarity: '稀有',
      type: '風險工具',
      image: item2
    },
    {
      id: 3,
      name: 'Domain 識別本',
      description: '一系列正規domain供玩家參考。面對釣魚網站界面時識別真假平台。',
      rarity: '稀有',
      type: '識別工具',
      image: item3
    },
    {
      id: 4,
      name: '用戶命名本',
      description: '展示官方用戶的命名方法。判斷對方是否為真實項目方或偽裝帳號。',
      rarity: '史詩',
      type: '驗證工具',
      image: item4
    },
    {
      id: 5,
      name: '語氣分析器',
      description: '掃描頁面或消息文本，識別誘導性話術（如「緊急領取」「最後機會」等）。遇到可疑空投、客服私信或社群公告時輔助判斷。',
      rarity: '史詩',
      type: '分析工具',
      image: item5
    },
    {
      id: 6,
      name: '官方公告簿',
      description: '展示一些正規官方公告供玩家參考（如X/官網/discord）。驗證「合約升級」「緊急授權」等高風險操作的真實性。',
      rarity: '傳說',
      type: '參考工具',
      image: item6
    }
  ];

  const levels = [
    { id: 1, name: 'Level 1', color: '#10b981' },
    { id: 2, name: 'Level 2', color: '#f59e0b' },
    { id: 3, name: 'Level 3', color: '#ef4444' },
    { id: 4, name: 'Level 4', color: '#8b5cf6' },
    { id: 5, name: 'Level 5', color: '#ec4899' },
    { id: 6, name: 'Level 6', color: '#06b6d4' }
  ];

  // 挑戰數據
  const challenges = {
    1: [
      { id: 1, title: '識別釣魚郵件', description: '識別可疑的釣魚郵件', completed: false },
      { id: 2, title: '檢查發件人', description: '驗證發件人身份', completed: false },
      { id: 3, title: '避免點擊連結', description: '不要點擊可疑連結', completed: false },
      { id: 4, title: '驗證網站', description: '檢查網站安全性', completed: false },
      { id: 5, title: '報告釣魚', description: '報告釣魚攻擊', completed: false }
    ],
    2: [
      { id: 1, title: '錢包安全', description: '保護錢包私鑰', completed: false },
      { id: 2, title: '交易驗證', description: '驗證交易詳情', completed: false },
      { id: 3, title: '智能合約', description: '檢查合約代碼', completed: false },
      { id: 4, title: '網路安全', description: '使用安全網路', completed: false },
      { id: 5, title: '備份恢復', description: '備份重要數據', completed: false }
    ],
    3: [
      { id: 1, title: 'NFT 驗證', description: '驗證 NFT 真實性', completed: false },
      { id: 2, title: '市場檢查', description: '檢查交易市場', completed: false },
      { id: 3, title: '價格分析', description: '分析價格合理性', completed: false },
      { id: 4, title: '創作者驗證', description: '驗證創作者身份', completed: false },
      { id: 5, title: '合約審查', description: '審查智能合約', completed: false }
    ],
    4: [
      { id: 1, title: 'DeFi 協議', description: '了解 DeFi 協議', completed: false },
      { id: 2, title: '流動性挖礦', description: '安全參與挖礦', completed: false },
      { id: 3, title: '收益計算', description: '計算收益風險', completed: false },
      { id: 4, title: '協議審計', description: '檢查協議審計', completed: false },
      { id: 5, title: '風險管理', description: '管理投資風險', completed: false }
    ],
    5: [
      { id: 1, title: '代幣分析', description: '分析代幣基本面', completed: false },
      { id: 2, title: '技術分析', description: '進行技術分析', completed: false },
      { id: 3, title: '市場情緒', description: '分析市場情緒', completed: false },
      { id: 4, title: '風險評估', description: '評估投資風險', completed: false },
      { id: 5, title: '投資策略', description: '制定投資策略', completed: false }
    ],
    6: [
      { id: 1, title: '高級安全', description: '實施高級安全措施', completed: false },
      { id: 2, title: '多簽錢包', description: '使用多簽錢包', completed: false },
      { id: 3, title: '硬體錢包', description: '使用硬體錢包', completed: false },
      { id: 4, title: '安全審計', description: '進行安全審計', completed: false },
      { id: 5, title: '應急計劃', description: '制定應急計劃', completed: false }
    ]
  };

  const handleStartGame = () => {
    if (selectedLevel) {
      console.log('開始遊戲:', { selectedLevel });
      setShowChallenge(true);
    }
  };

  // 處理關卡選擇
  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const pixelButtonStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '3px solid #000',
    boxShadow: '4px 4px 0px #000',
    transition: 'all 0.1s ease',
    cursor: 'pointer',
    imageRendering: 'pixelated'
  };

  const pixelCardStyle = {
    border: '3px solid #000',
    boxShadow: '6px 6px 0px #000',
    backgroundColor: '#1f2937',
    imageRendering: 'pixelated'
  };

  const content = {
    chinese: {
      title: 'WEB3釣魚遊戲',
      subtitle: '選擇你的冒險',
      selectLevel: '選擇關卡',
      startAdventure: '開始冒險',
      backHome: '返回主頁',
      backpack: '背包'
    },
    english: {
      title: 'WEB3 PHISHING GAME',
      subtitle: 'Choose Your Adventure',
      selectLevel: 'Select Level',
      startAdventure: 'Start Adventure',
      backHome: 'Back Home',
      backpack: 'Backpack'
    }
  };

  const currentContent = content[language];

  return (
    <div 
      className="w-full h-screen overflow-hidden relative flex flex-col pixel-font"
      style={{ 
        background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
        imageRendering: 'pixelated',
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      {/* 固定背景效果 */}
      <FixedBackground />

      {/* 語言切換 - 左上角 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('chinese')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              backgroundColor: language === 'chinese' ? '#22d3ee' : 'transparent',
              color: language === 'chinese' ? '#ffffff' : '#9ca3af',
              border: '2px solid #000',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              if (language !== 'chinese') {
                e.target.style.backgroundColor = '#374151';
                e.target.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== 'chinese') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#9ca3af';
              }
            }}
          >
            中文
          </button>
          <button
            onClick={() => setLanguage('english')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              backgroundColor: language === 'english' ? '#22d3ee' : 'transparent',
              color: language === 'english' ? '#ffffff' : '#9ca3af',
              border: '2px solid #000',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              if (language !== 'english') {
                e.target.style.backgroundColor = '#374151';
                e.target.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== 'english') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#9ca3af';
              }
            }}
          >
            English
          </button>
        </div>
      </div>

      {/* 背包按鈕 - 右上角 */}
      <div className="absolute top-4 right-4 z-10">
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
            e.target.style.color = '#22d3ee';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#ffffff';
            e.target.style.transform = 'scale(1)';
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
          {/* 背景遮罩 - 極低透明度以保持粒子背景可見 */}
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
                  選中物品
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
                  道具描述
                </h4>
                <div className="p-4 border-2 border-gray-600 bg-gray-800" style={{
                  border: '2px solid #4b5563',
                  backgroundColor: '#374151',
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  borderRadius: '8px'
                }}>
                  <h5 className="text-lg font-bold text-white mb-2">{items[selectedItem]?.name}</h5>
                  <p className="text-sm text-gray-300 mb-2">{items[selectedItem]?.description}</p>
                  <p className="text-xs text-gray-400">稀有度: {items[selectedItem]?.rarity}</p>
                  <p className="text-xs text-gray-400">類型: {items[selectedItem]?.type}</p>
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
                    <span className="text-gray-500">空</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* 背包描述 */}
            <div className="text-lg text-gray-300 text-center" style={{ 
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
              lineHeight: '1.4'
            }}>
              <p>物品: 3/10</p>
              <p>空位: 7</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 挑戰界面 */}
      {showChallenge && selectedLevel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* 背景遮罩 - 極低透明度以保持粒子背景可見 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-5"
            onClick={() => setShowChallenge(false)}
          />
          
          {/* 挑戰內容 */}
          <div className="relative p-20 text-white" style={{
            width: '1600px',
            minHeight: '800px',
            backgroundColor: '#1f2937',
            border: '6px solid #000000',
            boxShadow: '12px 12px 0px #000000',
            borderRadius: '24px'
          }}>
            {/* 關閉按鈕 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowChallenge(false);
              }}
              className="absolute top-8 right-8 text-white cursor-pointer hover:text-gray-300 transition-colors z-10"
              style={{
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                fontSize: '32px',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0'
              }}
            >
              ×
            </button>
            
            <h3 className="text-5xl font-bold mb-20 text-cyan-400 text-center" style={{ 
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace', 
              textTransform: 'uppercase',
              letterSpacing: '4px'
            }}>
              {levels[selectedLevel - 1]?.name} - 挑戰
            </h3>

            {/* 挑戰列表 - 圓形設計 */}
            <div className="grid grid-cols-5 gap-20 mb-40">
              {challenges[selectedLevel]?.map((challenge, index) => (
                <div
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(selectedChallenge === index ? null : index)}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-200"
                >
                  {/* 圓形挑戰按鈕 - 超大尺寸 */}
                  <div
                    className="w-60 h-60 rounded-full bg-gray-800 flex flex-col items-center justify-center mb-16"
                    style={{
                      border: selectedChallenge === index ? '6px solid #ffffff' : '6px solid #000000',
                      backgroundColor: '#374151',
                      fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                      boxShadow: selectedChallenge === index ? '0 0 30px #ffffff, 12px 12px 0px #000000' : '12px 12px 0px #000000',
                      transform: selectedChallenge === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    <span className="text-6xl font-bold text-cyan-400 mb-4">
                      {index + 1}
                    </span>
                    <span className="text-2xl text-gray-400">
                      {challenge.completed ? '✓' : '○'}
                    </span>
                  </div>

                  {/* 挑戰標題 */}
                  <h4 className="text-2xl font-bold text-white text-center mb-8" style={{
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    lineHeight: '1.8',
                    paddingTop: '8px'
                  }}>
                    {challenge.title}
                  </h4>

                  {/* 挑戰描述 */}
                  <p className="text-xl text-gray-300 text-center leading-relaxed mb-12" style={{
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    lineHeight: '2.0',
                    paddingTop: '12px',
                    paddingBottom: '16px'
                  }}>
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 挑戰描述區域 */}
            <div className="mt-20 p-16 bg-gray-800 rounded-lg" style={{
              border: '6px solid #000000',
              backgroundColor: '#374151',
              borderRadius: '20px',
              boxShadow: '10px 10px 0px #000000'
            }}>
              <h4 className="text-3xl font-bold text-cyan-400 mb-12" style={{
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                lineHeight: '1.6',
                paddingTop: '8px'
              }}>
                關卡描述
              </h4>
              <p className="text-2xl text-gray-300 leading-relaxed mb-8" style={{
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                lineHeight: '2.2',
                paddingTop: '12px',
                paddingBottom: '16px'
              }}>
                在這個關卡中，你將學習如何識別和防範Web3釣魚攻擊。完成所有挑戰來獲得安全知識點，提升你的防詐能力！
              </p>
            </div>

            {/* 挑戰統計 */}
            <div className="text-center mt-20 mb-12" style={{
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace'
            }}>
              <p className="text-3xl text-gray-300 font-bold" style={{
                lineHeight: '1.8',
                paddingTop: '16px',
                paddingBottom: '20px'
              }}>
                完成進度: 0/5
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 標題 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center pt-8 pb-4 flex-shrink-0"
      >
        <h1 
          className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2 pixel-title"
          style={{
            textShadow: '4px 4px 0px #000, 8px 8px 0px #0f172a',
            fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}
        >
          {currentContent.title}
        </h1>
        <p 
          className="text-lg md:text-xl text-gray-300 pixel-text"
          style={{ 
            fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
            letterSpacing: '1px'
          }}
        >
          {currentContent.subtitle}
        </p>
      </motion.div>

      {/* 主要內容區域 */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* 關卡選擇區域 */}
        <div className="flex-1 flex items-center justify-center px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl"
          >
            <div 
              className="p-6 rounded-lg"
              style={pixelCardStyle}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold text-white mb-6 text-center pixel-title"
                style={{ 
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                {currentContent.selectLevel}
              </h2>
              <div className="w-full">
                <GooeyNav
                  items={levels.map(level => ({
                    label: level.name,
                    href: '#'
                  }))}
                  particleCount={8}
                  particleDistances={[60, 8]}
                  particleR={60}
                  initialActiveIndex={selectedLevel ? selectedLevel - 1 : -1}
                  animationTime={400}
                  timeVariance={200}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                  onItemClick={(index) => handleLevelSelect(index + 1)}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部按鈕區域 - 確保始終可見 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center pb-6 pt-4 flex-shrink-0"
        >
          {/* 開始遊戲按鈕 */}
          <motion.button
            onClick={handleStartGame}
            disabled={!selectedLevel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...pixelButtonStyle,
              backgroundColor: selectedLevel ? '#10b981' : '#6b7280',
              color: '#ffffff',
              padding: '14px 28px',
              fontSize: '16px',
              cursor: selectedLevel ? 'pointer' : 'not-allowed',
              fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            {currentContent.startAdventure}
          </motion.button>
        </motion.div>
      </div>

      {/* 像素風格 CSS */}
      <style jsx>{`
        @keyframes pixel-twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
};

export default GamePage;