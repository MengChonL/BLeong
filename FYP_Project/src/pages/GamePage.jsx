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
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(null); // 選中的挑戰索引

  // 道具數據
  const items = [
    {
      id: 1,
      name: '地址複製/對比簿',
      nameEn: 'Address Copy/Comparison Book',
      description: '顯示目標地址與已知官方地址的逐字符讓用戶對比。遇到疑似地址投毒（如收款地址被篡改）時使用。',
      descriptionEn: 'Displays target addresses character by character for comparison with known official addresses. Use when encountering suspected address poisoning (such as tampered recipient addresses).',
      rarity: '普通',
      rarityEn: 'Common',
      type: '防護道具',
      typeEn: 'Protection Tool',
      image: item1
    },
    {
      id: 2,
      name: '槓桿',
      nameEn: 'Leverage',
      description: '若本題答對，獎勵 ×2；若答錯，懲罰 ×2（無視慌亂狀態）。對自己判斷極有信心時用於快速積累 Balance。',
      descriptionEn: 'If answered correctly, reward ×2; if answered incorrectly, penalty ×2 (ignores panic status). Use when extremely confident in your judgment for quick Balance accumulation.',
      rarity: '稀有',
      rarityEn: 'Rare',
      type: '風險工具',
      typeEn: 'Risk Tool',
      image: item2
    },
    {
      id: 3,
      name: 'Domain 識別本',
      nameEn: 'Domain Identification Book',
      description: '一系列正規domain供玩家參考。面對釣魚網站界面時識別真假平台。',
      descriptionEn: 'A series of legitimate domains for player reference. Identify real vs fake platforms when facing phishing website interfaces.',
      rarity: '稀有',
      rarityEn: 'Rare',
      type: '識別工具',
      typeEn: 'Identification Tool',
      image: item3
    },
    {
      id: 4,
      name: '用戶命名本',
      nameEn: 'User Naming Book',
      description: '展示官方用戶的命名方法。判斷對方是否為真實項目方或偽裝帳號。',
      descriptionEn: 'Shows official user naming methods. Determine if the other party is a real project team or a disguised account.',
      rarity: '史詩',
      rarityEn: 'Epic',
      type: '驗證工具',
      typeEn: 'Verification Tool',
      image: item4
    },
    {
      id: 5,
      name: '語氣分析器',
      nameEn: 'Tone Analyzer',
      description: '掃描頁面或消息文本，識別誘導性話術（如「緊急領取」「最後機會」等）。遇到可疑空投、客服私信或社群公告時輔助判斷。',
      descriptionEn: 'Scans page or message text to identify manipulative language (such as "urgent claim", "last chance", etc.). Assist in judgment when encountering suspicious airdrops, customer service messages, or community announcements.',
      rarity: '史詩',
      rarityEn: 'Epic',
      type: '分析工具',
      typeEn: 'Analysis Tool',
      image: item5
    },
    {
      id: 6,
      name: '官方公告簿',
      nameEn: 'Official Announcement Book',
      description: '展示一些正規官方公告供玩家參考（如X/官網/discord）。驗證「合約升級」「緊急授權」等高風險操作的真實性。',
      descriptionEn: 'Shows legitimate official announcements for player reference (such as X/official website/discord). Verify the authenticity of high-risk operations like "contract upgrades" and "emergency authorizations".',
      rarity: '傳說',
      rarityEn: 'Legendary',
      type: '參考工具',
      typeEn: 'Reference Tool',
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

  // 挑戰數據 - 每個Level只有4個挑戰
  const challenges = {
    1: [
      { id: 1, title: '餌光誘許', description: '一紙虛贈，換得全權之許。', completed: false },
      { id: 2, title: '獨徑無歧', description: '唯一之跡，無擾無疑', completed: false },
      { id: 3, title: '密語成局', description: '私言若棋，落子無回', completed: false },
      { id: 4, title: '眾跡分明', description: '多跡並行，各不相蒙', completed: false }
    ],
    2: [
      { id: 1, title: '高級地址投毒識別', description: '識別相似的DeFi協議地址', completed: false },
      { id: 2, title: '末影惑流', description: '近似之跡，悄然分流', completed: false },
      { id: 3, title: '智能合約', description: '檢查合約代碼', completed: false },
      { id: 4, title: '薦所直連', description: '依網紅直薦，啟用專屬交易通道。', completed: false }
    ],
    3: [
      { id: 1, title: 'NFT 驗證', description: '驗證 NFT 真實性', completed: false },
      { id: 2, title: '雙影疊跡', description: '兩道近似之影，混跡於眾流之中', completed: false },
      { id: 3, title: '價格分析', description: '分析價格合理性', completed: false },
      { id: 4, title: '創作者驗證', description: '驗證創作者身份', completed: false }
    ],
    4: [
      { id: 1, title: 'DeFi 協議', description: '了解 DeFi 協議', completed: false },
      { id: 2, title: '形淆眾流', description: '形似者眾，真跡隱於其間', completed: false },
      { id: 3, title: '收益計算', description: '計算收益風險', completed: false },
      { id: 4, title: '協議審計', description: '檢查協議審計', completed: false }
    ],
    5: [
      { id: 1, title: '代幣分析', description: '分析代幣基本面', completed: false },
      { id: 2, title: '微跡藏真', description: '真跡如塵，混於眾響之中', completed: false },
      { id: 3, title: '市場情緒', description: '分析市場情緒', completed: false },
      { id: 4, title: '風險評估', description: '評估投資風險', completed: false }
    ],
    6: [
      { id: 1, title: '高級安全', description: '實施高級安全措施', completed: false },
      { id: 2, title: '時限爭鋒', description: '真偽僅隔毫釐，而時光不待細察', completed: false },
      { id: 3, title: '硬體錢包', description: '使用硬體錢包', completed: false },
      { id: 4, title: '安全審計', description: '進行安全審計', completed: false }
    ]
  };

  // 英文挑戰數據
  const challengesEn = {
    1: [
      { id: 1, title: 'Baited Consent', description: 'A phantom gift—in exchange for full consent.', completed: false },
      { id: 2, title: 'Single Path', description: 'One trace, no interference, no doubt', completed: false },
      { id: 3, title: 'Whispered Moves', description: 'Words like pawns, once moved, cannot be taken back', completed: false },
      { id: 4, title: 'Multiple Traces', description: 'Multiple traces, each distinct and clear', completed: false }
    ],
    2: [
      { id: 1, title: 'Advanced Address Poisoning', description: 'Identify similar DeFi protocol addresses', completed: false },
      { id: 2, title: 'Shadow Flow', description: 'Similar traces, quietly diverging', completed: false },
      { id: 3, title: 'Smart Contract', description: 'Check contract code', completed: false },
      { id: 4, title: 'Featured Access', description: 'Activate your exclusive trading access through a creator\'s referral.', completed: false }
    ],
    3: [
      { id: 1, title: 'NFT Verification', description: 'Verify NFT authenticity', completed: false },
      { id: 2, title: 'Dual Shadows', description: 'Two similar shadows, mixed among the crowd', completed: false },
      { id: 3, title: 'Price Analysis', description: 'Analyze price rationality', completed: false },
      { id: 4, title: 'Creator Verification', description: 'Verify creator identity', completed: false }
    ],
    4: [
      { id: 1, title: 'DeFi Protocol', description: 'Understand DeFi protocols', completed: false },
      { id: 2, title: 'Shape Confusion', description: 'Many similar shapes, true traces hidden among them', completed: false },
      { id: 3, title: 'Yield Calculation', description: 'Calculate yield risks', completed: false },
      { id: 4, title: 'Protocol Audit', description: 'Check protocol audits', completed: false }
    ],
    5: [
      { id: 1, title: 'Token Analysis', description: 'Analyze token fundamentals', completed: false },
      { id: 2, title: 'Micro Traces', description: 'True traces like dust, mixed among the noise', completed: false },
      { id: 3, title: 'Market Sentiment', description: 'Analyze market sentiment', completed: false },
      { id: 4, title: 'Risk Assessment', description: 'Assess investment risks', completed: false }
    ],
    6: [
      { id: 1, title: 'Advanced Security', description: 'Implement advanced security measures', completed: false },
      { id: 2, title: 'Time Limit', description: 'Truth and falsehood separated by a hair, time waits for no careful examination', completed: false },
      { id: 3, title: 'Hardware Wallet', description: 'Use hardware wallet', completed: false },
      { id: 4, title: 'Security Audit', description: 'Conduct security audit', completed: false }
    ]
  };

  const handleStartGame = () => {
    if (selectedLevel) {
      console.log('開始遊戲:', { selectedLevel });
      setShowChallenge(true);
    }
  };

  const handleStartChallenge = () => {
    // 使用新的动态路由系统
    if (selectedLevel === 1) {
      if (selectedChallengeIndex === 0) {
        // Level 1-1: 识别授权陷阱（Solana空投诈骗）
        navigate('/challenge/phishing/level1-1');
      } else if (selectedChallengeIndex === 1) {
        // Level 1-2: 安全转账操作（地址投毒基础）
        navigate('/challenge/addressPoisoning/level1-2');
      } else if (selectedChallengeIndex === 2) {
        // Level 1-3: 聊天软件NFT诈骗
        navigate('/challenge/chatNFT/level1-3');
      } else if (selectedChallengeIndex === 3) {
        // Level 1-4: 多条转账记录挑战
        navigate('/challenge/addressPoisoning/level1-4');
      }
    } else if (selectedLevel === 2) {
      if (selectedChallengeIndex === 0) {
        // Level 2-1: 高级地址投毒识别
        navigate('/challenge/addressPoisoning/level2-1');
      } else if (selectedChallengeIndex === 1) {
        // Level 2-2: 末影惑流（相似地址投毒）
        navigate('/challenge/addressPoisoning/level2-2');
      } else if (selectedChallengeIndex === 3) {
        // Level 2-4: Google 搜尋識別（釣魚 vs 官方）
        navigate('/challenge/phishing/level2-4');
      }
    } else if (selectedLevel === 3) {
      if (selectedChallengeIndex === 1) {
        // Level 3-2: 双影叠迹（多条投毒地址 + 翻页）
        navigate('/challenge/addressPoisoning/level3-2');
      }
    } else if (selectedLevel === 4) {
      if (selectedChallengeIndex === 1) {
        // Level 4-2: 形淆众流（多个投毒地址混淆）
        navigate('/challenge/addressPoisoning/level4-2');
      }
    } else if (selectedLevel === 5) {
      if (selectedChallengeIndex === 1) {
        // Level 5-2: 微跡藏真（小额投毒地址混淆）
        navigate('/challenge/addressPoisoning/level5-2');
      }
    } else if (selectedLevel === 6) {
      if (selectedChallengeIndex === 1) {
        // Level 6-2: 時限爭鋒（90秒限时NFT交易挑战）
        navigate('/challenge/addressPoisoning/level6-2');
      }
    }
    // 继续添加其他关卡的挑战路由
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
      backpack: '背包',
      backpackTitle: '背包',
      selectedItem: '選中物品',
      itemDescription: '道具描述',
      rarity: '稀有度',
      type: '類型',
      items: '物品',
      emptySlots: '空位',
      challengeTitle: '挑戰',
      levelDescription: '關卡描述',
      progress: '完成進度',
      startAdventureButton: '開始冒險'
    },
    english: {
      title: 'WEB3 PHISHING GAME',
      subtitle: 'Choose Your Adventure',
      selectLevel: 'Select Level',
      startAdventure: 'Start Adventure',
      backHome: 'Back Home',
      backpack: 'Backpack',
      backpackTitle: 'Backpack',
      selectedItem: 'Selected Item',
      itemDescription: 'Item Description',
      rarity: 'Rarity',
      type: 'Type',
      items: 'Items',
      emptySlots: 'Empty Slots',
      challengeTitle: 'Challenges',
      levelDescription: 'Level Description',
      progress: 'Progress',
      startAdventureButton: 'Start Adventure'
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
              <p>{currentContent.items}: 3/10</p>
              <p>{currentContent.emptySlots}: 7</p>
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
            width: '95vw',
            maxWidth: '1800px',
            minHeight: '90vh',
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
              {levels[selectedLevel - 1]?.name} - {currentContent.challengeTitle}
            </h3>

            {/* 挑戰列表 - 圓形設計 */}
            <div className="grid grid-cols-4 gap-20 mb-40">
              {(language === 'chinese' ? challenges[selectedLevel] : challengesEn[selectedLevel])?.map((challenge, index) => (
                <div
                  key={challenge.id}
                  onClick={() => {
                    setSelectedChallenge(selectedChallenge === index ? null : index);
                    setSelectedChallengeIndex(selectedChallenge === index ? null : index);
                  }}
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
                  <p className="text-xl text-gray-300 text-center leading-relaxed mb-8" style={{
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
                {currentContent.levelDescription}
              </h4>
              <p className="text-2xl text-gray-300 leading-relaxed mb-8" style={{
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                lineHeight: '2.2',
                paddingTop: '12px',
                paddingBottom: '16px'
              }}>
                {language === 'chinese' 
                  ? '初階四問，皆關生死；看似尋常，實為根基。'
                  : 'Four simple trials, yet each decides your fate. What seems mundane is the root of all defense.'
                }
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
                {currentContent.progress}: 0/4
              </p>
            </div>

            {/* 開始挑戰按鈕和背包按鈕 */}
            <div className="text-center mt-8">
              {selectedChallengeIndex === null && (
                <p className="text-gray-400 mb-4" style={{
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  fontSize: '14px'
                }}>
                  {language === 'chinese' ? '請先選擇一個挑戰' : 'Please select a challenge first'}
                </p>
              )}
              <motion.button
                onClick={handleStartChallenge}
                disabled={selectedChallengeIndex === null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  ...pixelButtonStyle,
                  backgroundColor: selectedChallengeIndex !== null ? '#22d3ee' : '#6b7280',
                  color: '#ffffff',
                  padding: '16px 32px',
                  fontSize: '20px',
                  cursor: selectedChallengeIndex !== null ? 'pointer' : 'not-allowed',
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  boxShadow: selectedChallengeIndex !== null ? '0 0 20px rgba(34, 211, 238, 0.3)' : 'none'
                }}
              >
                {currentContent.startAdventureButton}
              </motion.button>
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
            className="w-full max-w-6xl"
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