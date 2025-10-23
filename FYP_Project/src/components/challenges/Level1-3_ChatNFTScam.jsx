import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';
import BrowserFrame from './BrowserFrame';
import { getChallengeConfig } from '../../config/challenges-config';
import icon1 from '../../assets/icon1.png';
import icon2 from '../../assets/icon2.png';
import MetaMaskIcon from '../../assets/MetaMask_Fox.png';
import EthereumIcon from '../../assets/Ethereum.png';
import OpenSeaIcon from '../../assets/OpenSea.png';
import level1Reward from '../../assets/level1_reward.png';

/**
 * 聊天软件NFT诈骗挑战组件 - Level 1-3
 * 识别聊天软件中的NFT诈骗链接
 */
const ChatNFTScam = () => {
  const [language, setLanguage] = useState('chinese');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showNFTWebsite, setShowNFTWebsite] = useState(false);
  const [config, setConfig] = useState(null);

  // 获取配置
  useEffect(() => {
    const challengeConfig = getChallengeConfig('level1-3');
    setConfig(challengeConfig);
  }, []);

  const currentContent = config?.content?.[language] || {};
  const signals = config?.signals?.[language] || [];
  const education = config?.education?.[language] || {};

  // 模拟聊天消息
  const messages = [
    {
      id: 1,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:30',
      content: currentContent?.friendMessage1 || '嗨！最近怎麼樣？',
      isLink: false
    },
    {
      id: 2,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:31',
      content: currentContent?.friendMessage2 || '我發個有趣的影片給你看看',
      isLink: false,
      isVideo: true,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 4,
      sender: 'user',
      name: '你',
      avatar: icon1,
      time: '14:33',
      content: currentContent?.friendMessage4 || '哈哈，這個真的很好笑',
      isLink: false
    },
    {
      id: 5,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:34',
      content: currentContent?.friendMessage5 || '對了，最近有沒有留意NFT交易？',
      isLink: false
    },
    {
      id: 6,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:35',
      content: currentContent?.friendMessage6 || '我在網上看到一個Discord和X上都在討論的NFT項目',
      isLink: false
    },
    {
      id: 7,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:36',
      content: currentContent?.friendMessage7 || '看起來很有潛力，你有興趣嗎？',
      isLink: false
    },
    {
      id: 8,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:37',
      content: currentContent?.friendMessage8 || '我發個影片給你看看',
      isLink: false,
      isVideo: true,
      videoUrl: 'https://www.youtube.com/watch?v=pFRXGxwat_U'
    },
    {
      id: 9,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:38',
      content: currentContent?.friendMessage9 || '這個項目真的很火，很多人都在買',
      isLink: false
    },
    {
      id: 10,
      sender: 'friend',
      name: '殺人鯨',
      avatar: icon2,
      time: '14:39',
      content: currentContent?.friendMessage10 || '我發給你看看',
      isLink: true,
      linkText: currentContent?.nftLink || 'https://openSea.ioo/?id=123',
      linkUrl: 'http://www.openSea.ioo'
    }
  ];

  // 自动显示消息
  useEffect(() => {
    if (currentMessage < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessage(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessage, messages.length]);


  const handleLinkClick = () => {
    setShowLink(true);
    setShowNFTWebsite(true);
  };

  const handleStakeETH = () => {
    setShowContract(true);
  };

  const renderNFTWebsite = () => (
    <div className="min-h-screen bg-white">
      {/* 网站头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={OpenSeaIcon} alt="OpenSea" className="w-50 h-30" />
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* NFT 项目介绍 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'chinese' ? '獨家 NFT 項目' : 'Exclusive NFT Project'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'chinese' ? '限量發行，機會難得！' : 'Limited edition, rare opportunity!'}
          </p>
        </div>

        {/* NFT 展示卡片 */}
        <div className="flex justify-center gap-8 mb-12">
          {/* NFT #1 - icon1 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 w-80">
            <div className="aspect-square rounded-xl mb-4 overflow-hidden">
              <img src={icon1} alt="NFT #1" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'chinese' ? 'NFT #1' : 'NFT #1'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'chinese' ? '稀有度: 傳說' : 'Rarity: Legendary'}
            </p>
            <div className="text-2xl font-bold text-yellow-500">
              {language === 'chinese' ? '1.2 ETH' : '1.2 ETH'}
            </div>
          </div>

          {/* NFT #2 - icon2 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 w-80">
            <div className="aspect-square rounded-xl mb-4 overflow-hidden">
              <img src={icon2} alt="NFT #2" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'chinese' ? 'NFT #2' : 'NFT #2'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'chinese' ? '稀有度: 史詩' : 'Rarity: Epic'}
            </p>
            <div className="text-2xl font-bold text-yellow-500">
              {language === 'chinese' ? '0.8 ETH' : '0.8 ETH'}
            </div>
          </div>

          {/* NFT #3 - level1_reward */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 w-80">
            <div className="aspect-square rounded-xl mb-4 overflow-hidden">
              <img src={level1Reward} alt="NFT #3" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'chinese' ? 'NFT #3' : 'NFT #3'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'chinese' ? '稀有度: 稀有' : 'Rarity: Rare'}
            </p>
            <div className="text-2xl font-bold text-yellow-500">
              {language === 'chinese' ? '0.3 ETH' : '0.3 ETH'}
            </div>
          </div>
        </div>

        {/* 抵押 ETH 按钮 */}
        <div className="text-center" style={{ marginTop: '80px', marginLeft: '100px' }}>
          <button
            onClick={handleStakeETH}
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ff4757)',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)'
            }}
          >
            {language === 'chinese' ? '立刻抵押 ETH' : 'Stake ETH Now'}
          </button>
          <p className="text-gray-600 mt-4 text-lg">
            {language === 'chinese' ? '抵押 ETH 獲得獨家 NFT 訪問權限' : 'Stake ETH to get exclusive NFT access'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContractInterface = () => (
    <div className="max-w-md mx-auto" style={{ 
      backgroundColor: '#1a1a1a', 
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      overflow: 'hidden'
    }}>
      {/* MetaMask 标题 */}
      <div className="flex items-center gap-3 p-4" style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2d2d2d',
          borderRadius: '8px'
        }}>
          <img src={MetaMaskIcon} alt="MetaMask" className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold" style={{ color: '#ffffff' }}>
          MetaMask
        </h3>
      </div>

      {/* 网络和钱包信息 */}
      <div className="p-4" style={{ 
        backgroundColor: '#2d2d2d', 
        margin: '8px',
        borderRadius: '8px'
      }}>
        <div className="flex items-center gap-3 mb-3">
          <img src={EthereumIcon} alt="Ethereum" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
        <div>
          <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>
            {language === 'chinese' ? '網絡' : 'Network'}
          </div>
          <div className="text-sm font-bold" style={{ color: '#ffffff' }}>
            Ethereum Mainnet
          </div>
        </div>
      </div>
      <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>
        {language === 'chinese' ? '錢包' : 'Wallet'}
      </div>
      <div className="font-mono text-xs" style={{ color: '#ffffff' }}>
        0x9F2A...3E1B
      </div>
      </div>

      {/* 交易确认 */}
      <div className="p-4">
        <h4 className="text-lg font-bold mb-4" style={{ color: '#ffffff' }}>
          {language === 'chinese' ? '【交易確認】' : '【Transaction Confirmation】'}
        </h4>

        {/* 合约调用 */}
        <div className="mb-4 p-4" style={{ 
          backgroundColor: '#000000', 
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.15)'
        }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#fbbf24' }}>
            ⚠️ {language === 'chinese' ? '合約調用' : 'Contract Call'}
          </div>
          <div className="font-mono text-xs mb-2" style={{ color: '#ffffff' }}>
            setApprovalForAll
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs" style={{ color: '#ffffff' }}>
                {language === 'chinese' ? '合約: ' : 'Contract: '}
              </span>
              <span className="text-xs font-bold" style={{ color: '#fbbf24' }}>
                {language === 'chinese' ? '[未驗證合約]' : '[Unverified Contract]'}
              </span>
            </div>
            <div>
              <span className="text-xs" style={{ color: '#ffffff' }}>
                {language === 'chinese' ? '地址: ' : 'Address: '}
              </span>
              <span className="text-xs font-bold" style={{ color: '#ffffff' }}>0x7a3B8F5e9D123456789AbCdEf0123456789AbCd</span>
            </div>
            <div>
              <span className="text-xs" style={{ color: '#ffffff' }}>operator: </span>
              <span className="text-xs font-bold" style={{ color: '#ffffff' }}>0x7a3B...AbCd</span>
            </div>
            <div>
              <span className="text-xs" style={{ color: '#ffffff' }}>approved: </span>
              <span className="text-xs font-bold" style={{ color: '#ffffff' }}>true</span>
            </div>
          </div>
        </div>

        {/* Gas Fee */}
        <div className="mb-4 p-4" style={{ 
          backgroundColor: '#2d2d2d', 
          borderRadius: '8px'
        }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#ffffff' }}>
            {language === 'chinese' ? '【Gas 費用】' : '【Gas Fees】'}
          </div>
          <div className="space-y-2 text-xs">
            <div style={{ color: '#e5e7eb' }}>
              {language === 'chinese' ? 'Gas 價格: ' : 'Gas Price: '}
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>20 Gwei</span>
            </div>
            <div style={{ color: '#e5e7eb' }}>
              {language === 'chinese' ? 'Gas 限制: ' : 'Gas Limit: '}
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>46000</span>
            </div>
            <div style={{ color: '#e5e7eb' }}>
              {language === 'chinese' ? '預估費用: ' : 'Estimated Fee: '}
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>0.00092 ETH</span>
            </div>
          </div>
        </div>

        {/* 按钮 - 装饰性 */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 text-white font-bold text-sm"
            style={{
              backgroundColor: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              cursor: 'not-allowed'
            }}
            disabled
          >
            {language === 'chinese' ? '拒絕' : 'Reject'}
          </button>
          <button
            className="flex-1 py-3 text-white font-bold text-sm"
            style={{
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              cursor: 'not-allowed'
            }}
            disabled
          >
            {language === 'chinese' ? '確認' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatInterface = () => (
    <div 
      className="flex flex-col h-full"
      style={{
        backgroundColor: '#f8fafc',
        minHeight: '80vh'
      }}
    >
      {/* 聊天头部 */}
      <div 
        className="border-b border-gray-200 p-6 flex items-center"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex items-center space-x-4">
          <div 
            className="rounded-full flex items-center justify-center overflow-hidden"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3b82f6'
            }}
          >
            <img 
              src={icon2} 
              alt="殺人鯨" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">殺人鯨</h3>
            <p className="text-sm text-gray-500">
              {language === 'chinese' ? '在線' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* 聊天消息区域 */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{
          backgroundColor: '#f8fafc'
        }}
      >
        {messages.slice(0, currentMessage + 1).map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'friend' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex max-w-md lg:max-w-lg ${message.sender === 'friend' ? 'flex-row' : 'flex-row-reverse'}`}>
              {message.sender === 'friend' && (
                <div 
                  className="rounded-full flex items-center justify-center mr-2 flex-shrink-0 overflow-hidden"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3b82f6'
                  }}
                >
                  <img 
                    src={message.avatar} 
                    alt="殺人鯨" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
              )}
              {message.sender === 'user' && (
                <div 
                  className="rounded-full flex items-center justify-center ml-2 flex-shrink-0 overflow-hidden"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#10b981'
                  }}
                >
                  <img 
                    src={message.avatar} 
                    alt="你" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
              )}
              <div 
                className="px-6 py-4"
                style={{
                  backgroundColor: message.sender === 'friend' ? '#f5f5f5' : '#10b981',
                  color: message.sender === 'friend' ? '#1f2937' : '#ffffff',
                  border: 'none',
                  boxShadow: 'none',
                  maxWidth: '320px',
                  borderRadius: '8px',
                  textAlign: 'left'
                }}
              >
                <p className="text-base">{message.content}</p>
                {message.isVideo && message.videoUrl && (
                  <div className="mt-3">
                    <a 
                      href={message.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700 text-sm"
                    >
                      {message.videoUrl}
                    </a>
                  </div>
                )}
                {message.isLink && message.linkText && (
                  <div className="mt-3">
                    <button
                      onClick={handleLinkClick}
                      className="underline hover:no-underline text-base font-medium"
                      style={{
                        color: '#3b82f6'
                      }}
                    >
                      {message.linkText}
                    </button>
                  </div>
                )}
                <p className="text-xs mt-2 opacity-70">{message.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 输入区域 */}
      <div 
        className="border-t border-gray-200 p-6"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder={language === 'chinese' ? '輸入消息...' : 'Type a message...'}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            disabled
            style={{
              backgroundColor: '#f8fafc'
            }}
          />
          <button
            className="flex items-center justify-center text-white text-xl"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              border: 'none',
              cursor: 'not-allowed'
            }}
            disabled
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );



  // 如果沒有配置，顯示錯誤信息
  if (!config) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">配置未找到</h1>
          <p className="text-xl mb-4">無法加載挑戰配置</p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <ChallengeTemplate
      language={language}
      setLanguage={setLanguage}
      containerMaxWidth="95vw"
      containerMaxHeight="90vh"
    >
      <BrowserFrame url={showNFTWebsite ? "http://www.openSea.ioo/?id=123" : "https://www.ChatFriend.com"} urlColor="#3b82f6">
        <div
          style={{
            backgroundColor: '#ffffff',
            minHeight: '80vh',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          <div className="h-full flex flex-col">
        {showContract ? (
          <div className="h-full flex justify-center p-4" style={{ paddingTop: '120px' }}>
            {renderContractInterface()}
          </div>
        ) : showNFTWebsite ? (
          renderNFTWebsite()
        ) : (
          renderChatInterface()
        )}
          </div>
        </div>
      </BrowserFrame>
    </ChallengeTemplate>
  );
};

export default ChatNFTScam;
