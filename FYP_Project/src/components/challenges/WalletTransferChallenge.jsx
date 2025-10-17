import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';
import BrowserFrame from './BrowserFrame';
// 导入图标
import EthereumIcon from '../../assets/Ethereum.png';
import USDTIcon from '../../assets/USDT.png';
import ArbitrumIcon from '../../assets/ArbitrumOne.png';

/**
 * 钱包转账挑战组件 - 模仿 MetaMask 转账界面
 * 用于地址投毒挑战中的钱包转账模式
 */
const WalletTransferChallenge = ({ config }) => {
  const [addressInput, setAddressInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState(config.wallet?.defaultNetwork || 'ethereum');
  const [selectedAsset, setSelectedAsset] = useState(config.wallet?.defaultAsset || 'eth');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('chinese');
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showFullRecipientAddress, setShowFullRecipientAddress] = useState(false);
  const [showFullHistoryAddress, setShowFullHistoryAddress] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit || null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; // 每页显示5条交易记录
  
  const networkDropdownRef = useRef(null);
  const assetDropdownRef = useRef(null);

  // 地址格式化函数：显示首6位 + ... + 尾6位
  const formatAddress = (address, showFull = false) => {
    if (!address || address.length <= 14 || showFull) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target)) {
        setShowNetworkDropdown(false);
      }
      if (assetDropdownRef.current && !assetDropdownRef.current.contains(event.target)) {
        setShowAssetDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 倒计时功能
  useEffect(() => {
    if (config.timeLimit && timeRemaining > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimedOut(true);
            setIsCorrect(false);
            setErrorMessage(language === 'chinese' ? '時間已到！' : 'Time is up!');
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [config.timeLimit, timeRemaining, showResult, language]);

  // 格式化时间显示（分:秒）
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!config) {
    return (
      <div className="text-white text-center p-8">
        <h1 className="text-2xl">挑战配置未找到</h1>
      </div>
    );
  }

  const currentContent = config.content[language];

  const handleTransfer = () => {
    // 验证网络、资产、地址和金额
    const inputAddress = addressInput.trim().toLowerCase();
    const correctAddress = config.addresses.correct.toLowerCase();
    const inputAmount = amountInput.trim();
    const correctAmount = config.transfer.amount;
    
    let errors = [];
    
    // 检查网络
    if (config.transfer.requireNetworkSelection) {
      const networkCorrect = selectedNetwork === config.transfer.correctNetwork;
      if (!networkCorrect) {
        errors.push(language === 'chinese' ? '網絡選擇錯誤' : 'Wrong network');
      }
    }
    
    // 检查资产
    if (config.transfer.requireAssetSelection) {
      const assetCorrect = selectedAsset === config.transfer.correctAsset;
      if (!assetCorrect) {
        errors.push(language === 'chinese' ? '資產選擇錯誤' : 'Wrong asset');
      }
    }
    
    // 检查地址
    const addressCorrect = inputAddress === correctAddress;
    if (!addressCorrect) {
      errors.push(language === 'chinese' ? '地址輸入錯誤' : 'Wrong address');
    }
    
    // 检查金额
    const amountCorrect = inputAmount === correctAmount;
    if (!amountCorrect) {
      errors.push(language === 'chinese' ? '金額輸入錯誤' : 'Wrong amount');
    }
    
    const allCorrect = errors.length === 0;
    
    setIsCorrect(allCorrect);
    setErrorMessage(errors.join(', '));
    setShowResult(true);
    
    setTimeout(() => {
      console.log('轉帳驗證:', {
        network: selectedNetwork,
        asset: selectedAsset,
        address: addressInput,
        amount: amountInput,
        correct: allCorrect,
        errors
      });
    }, 1000);
  };

  // 图标映射
  const iconMap = {
    ethereum: EthereumIcon,
    arbitrum: ArbitrumIcon,
    usdt: USDTIcon,
  };

  // 通用文本
  const commonText = {
    chinese: {
      wallet: '錢包',
      balance: '餘額',
      sent: '發送',
      received: '接收',
      success: '成功',
      from: '從',
      to: '收款人',
      amount: '金額',
      amountLabel: '轉帳金額',
      amountPlaceholder: '請輸入轉帳金額',
      addressLabel: '收款地址',
      correct: '轉帳成功！',
      incorrect: '轉帳失敗！',
      correctExplanation: '恭喜！你成功完成了轉帳。所有參數都正確：網絡、資產、地址和金額。',
      incorrectExplanation: '轉帳失敗！請檢查：',
      continueButton: '繼續',
      retryButton: '重試',
      warning: '警告',
      selectNetwork: '選擇網絡',
      selectAsset: '選擇資產',
      yourInput: '你輸入的',
      shouldBe: '應該選擇',
      selected: '你選擇的',
      correctAddress: '正確地址',
      correctAmount: '正確金額',
      empty: '(空)',
      checkmark: '✓',
      crossmark: '✗',
      showFullAddress: '顯示完整地址',
      hideAddress: '隱藏地址',
      recipient: '收款人',
      benNetwork: 'Ben 使用的網路',
      layer2Solution: 'Layer 2 擴容解決方案',
      transferSettings: '轉帳設定',
      selectNetworkLabel: '選擇網路',
      mainnet: '主網',
      selectCurrency: '選擇幣種',
      availableBalance: '可用餘額',
      useAll: '使用全部',
      addressInputPlaceholder: '請輸入或貼上收款地址（0x...）',
      recentTransactions: '最近交易記錄',
      sendTo: '向',
      transfer: '轉帳',
      confirmTransfer: '確定轉帳',
    },
    english: {
      wallet: 'Wallet',
      balance: 'Balance',
      sent: 'Sent',
      received: 'Received',
      success: 'Success',
      from: 'From',
      to: 'To',
      amount: 'Amount',
      amountLabel: 'Transfer Amount',
      amountPlaceholder: 'Enter transfer amount',
      addressLabel: 'Recipient Address',
      copyFromHistory: 'Copy from History',
      correct: 'Transfer Successful!',
      incorrect: 'Transfer Failed!',
      correctExplanation: 'Congratulations! You successfully completed the transfer. All parameters are correct: network, asset, address, and amount.',
      incorrectExplanation: 'Transfer failed! Please check:',
      continueButton: 'Continue',
      retryButton: 'Retry',
      warning: 'Warning',
      warningText: 'Please verify network, asset, address, and amount carefully! Errors will result in permanent loss of assets.',
      selectNetwork: 'Select Network',
      selectAsset: 'Select Asset',
      correctAmount: 'Correct Amount',
      checkmark: '✓',
      crossmark: '✗',
      showFullAddress: 'Show Full Address',
      hideAddress: 'Hide Address',
      recipient: 'Recipient',
      benNetwork: "Ben's Network",
      layer2Solution: 'Layer 2 Scaling Solution',
      transferSettings: 'Transfer Settings',
      selectNetworkLabel: 'Select Network',
      mainnet: 'Mainnet',
      selectCurrency: 'Select Currency',
      availableBalance: 'Available Balance',
      useAll: 'Use All',
      addressInputPlaceholder: 'Enter or paste recipient address (0x...)',
      recentTransactions: 'Recent Transactions',
      sendTo: 'To',
      transfer: 'Transfer',
      confirmTransfer: 'Confirm Transfer',
    }
  };

  const common = commonText[language];

  // 分页逻辑
  const totalTransactions = config.wallet.transactions.length;
  const totalPages = Math.ceil(totalTransactions / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = config.wallet.transactions.slice(startIndex, endIndex);

  return (
    <ChallengeTemplate
      language={language}
      setLanguage={setLanguage}
      containerMaxWidth="95vw"
      containerMaxHeight="90vh"
    >
      <BrowserFrame url="metamask.io/transfer">
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '40px',
            color: '#1a1a1a',
            minHeight: '80vh',
          }}
        >
        {/* 标题 */}
        <h1 
          className="text-4xl font-bold mb-6 text-center"
          style={{ 
            color: '#1a1a1a',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {currentContent.title}
        </h1>

        {/* 任务说明 */}
        <div 
          className="mb-12 p-10"
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #ffffff',
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0284c7' }}>
                {currentContent.scenario}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#1e40af' }}>
                {currentContent.scenarioText}
              </p>
            </div>
            
            {/* 时间倒计时显示 */}
            {config.timeLimit && (
              <div 
                className="ml-8 p-6"
                style={{
                  backgroundColor: timeRemaining <= 30 ? '#fee2e2' : '#dbeafe',
                  border: `2px solid ${timeRemaining <= 30 ? '#ef4444' : '#3b82f6'}`,
                  borderRadius: '12px',
                  minWidth: '200px',
                  textAlign: 'center',
                }}
              >
                <div className="text-sm font-medium mb-2" style={{ color: timeRemaining <= 30 ? '#dc2626' : '#1e40af' }}>
                  {currentContent.timeRemaining || (language === 'chinese' ? '剩餘時間' : 'Time Remaining')}
                </div>
                <div 
                  className="text-4xl font-bold"
                  style={{ 
                    color: timeRemaining <= 30 ? '#dc2626' : '#1e40af',
                    fontFamily: 'monospace',
                  }}
                >
                  {formatTime(timeRemaining)}
                </div>
                {timeRemaining <= 30 && (
                  <div className="text-xs mt-2" style={{ color: '#dc2626' }}>
                    ⚠️ {language === 'chinese' ? '時間不多了！' : 'Hurry up!'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MetaMask 风格的转账界面 */}
        {!showResult && (
          <div className="grid grid-cols-2 gap-12 mb-12">
            {/* 左侧：收款人信息 */}
            <div 
              className="p-10"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {/* 标题 */}
              <h3 className="text-2xl font-bold mb-10 text-center" style={{ color: '#1a1a1a' }}>
                {common.recipient}
              </h3>

              {/* 收款人头像和信息 - 居中 */}
              <div className="flex flex-col items-center mb-10">
                {/* 带验证标记的圆形头像 */}
                <div className="relative mb-4">
                  <div 
                    style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      backgroundColor: '#5B7FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                    }}
                  >
                    {config?.recipient?.avatar}
                  </div>
                  {/* 绿色验证勾选标记 */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      border: '3px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* 名字 */}
                <div className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                  {config?.recipient?.username}
                </div>
                
                {/* 关系 */}
                <div className="text-base" style={{ color: '#64748b' }}>
                  {config?.recipient?.relationship?.[language]}
                </div>
              </div>
              
              {/* Ben 使用的网络 - 蓝色卡片 */}
              <div 
                className="mb-6 p-6"
                style={{ 
                  backgroundColor: '#E8EFFD',
                  borderRadius: '12px',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#5B7FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1" style={{ color: '#5B7FFF', fontWeight: '500' }}>
                      {common.benNetwork}
                    </div>
                    <div className="text-base font-bold mb-1" style={{ color: '#1a1a1a' }}>
                      Arbitrum One
                    </div>
                    <div className="text-xs" style={{ color: '#64748b' }}>
                      {common.layer2Solution}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 收款地址 - 绿色卡片（无法复制） */}
              <div 
                className="p-6"
                style={{ 
                  backgroundColor: '#E8F5E9',
                  borderRadius: '12px',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium" style={{ color: '#059669' }}>
                        {common.addressLabel}
                      </div>
                      <button
                        onClick={() => setShowFullRecipientAddress(!showFullRecipientAddress)}
                        className="p-2 transition-all hover:bg-green-200"
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title={showFullRecipientAddress ? common.hideAddress : common.showFullAddress}
                      >
                        {showFullRecipientAddress ? (
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#64748b" strokeWidth="2">
                            <path d="M3.98 8.223A10.477 10.477 0 001.934 10C3.226 13.338 6.244 15.5 10 15.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0110 5.5c3.756 0 6.774 2.162 8.066 5.5a10.523 10.523 0 01-1.238 2.28m-2.63 2.63A9.953 9.953 0 0110 16.5c-3.756 0-6.774-2.162-8.066-5.5a10.523 10.523 0 011.47-2.615M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3l14 14" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4080FF" strokeWidth="2">
                            <path d="M10 5.5c-3.756 0-6.774 2.162-8.066 5.5C3.226 14.338 6.244 16.5 10 16.5c3.756 0 6.774-2.162 8.066-5.5C16.774 7.662 13.756 5.5 10 5.5z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 13a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div 
                      className="font-mono text-sm font-medium"
                      style={{ 
                        color: '#1a1a1a',
                        wordBreak: 'break-all',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                      }}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {formatAddress(config?.recipient?.address, showFullRecipientAddress)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：交易记录和地址输入 */}
            <div 
              className="p-10"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {/* 标题 */}
              <div className="flex items-center gap-3 mb-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B7FFF" strokeWidth="2">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
                  {common.transferSettings}
                </h3>
              </div>

              {/* 网络选择器 */}
              {config.networks && (
                <div className="mb-6 relative" ref={networkDropdownRef}>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#1a1a1a' }}>
                    {common.selectNetworkLabel}
                  </label>
                  <div
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                    className="w-full px-5 py-4 text-sm cursor-pointer flex items-center justify-between transition-all"
                    style={{
                      backgroundColor: '#ffffff',
                      border: showNetworkDropdown ? '1.5px solid #4080FF' : '1px solid #E5E6EB',
                      borderRadius: '12px',
                      color: '#1D2129',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div style={{ 
                        width: '32px', 
                        height: '32px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F7F8FA'
                      }}>
                        <img 
                          src={iconMap[config.networks.find(n => n.id === selectedNetwork)?.icon]} 
                          alt="" 
                          className="w-6 h-6" 
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1D2129' }}>
                          {config.networks.find(n => n.id === selectedNetwork)?.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#86909C' }}>
                          {common.mainnet}
                        </div>
                      </div>
                    </div>
                    <svg 
                      className="w-4 h-4 transition-transform" 
                      fill="none" 
                      stroke="#86909C" 
                      viewBox="0 0 24 24"
                      style={{ transform: showNetworkDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {showNetworkDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute w-full mt-2 z-20"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E6EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden'
                      }}
                    >
                      {config.networks.map((network) => (
                        <div
                          key={network.id}
                          onClick={() => {
                            setSelectedNetwork(network.id);
                            setShowNetworkDropdown(false);
                          }}
                          className="px-5 py-4 cursor-pointer transition-colors flex items-center gap-3"
                          style={{
                            backgroundColor: selectedNetwork === network.id ? '#F7F8FA' : 'transparent',
                            borderLeft: selectedNetwork === network.id ? '3px solid #4080FF' : '3px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedNetwork !== network.id) {
                              e.currentTarget.style.backgroundColor = '#F7F8FA';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedNetwork !== network.id) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <div style={{ 
                            width: '28px', 
                            height: '28px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F7F8FA'
                          }}>
                            <img src={iconMap[network.icon]} alt="" className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1D2129' }}>
                              {network.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#86909C' }}>
                              {network.description[language]}
                            </div>
                          </div>
                          {selectedNetwork === network.id && (
                            <svg className="w-5 h-5" fill="#4080FF" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* 资产选择器 */}
              {config.assets && (
                <div className="mb-6 relative" ref={assetDropdownRef}>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#1a1a1a' }}>
                    {common.selectCurrency}
                  </label>
                  <div
                    onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                    className="w-full px-5 py-4 text-sm cursor-pointer flex items-center justify-between transition-all"
                    style={{
                      backgroundColor: '#ffffff',
                      border: showAssetDropdown ? '1.5px solid #4080FF' : '1px solid #E5E6EB',
                      borderRadius: '12px',
                      color: '#1D2129',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div style={{ 
                        width: '32px', 
                        height: '32px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F7F8FA'
                      }}>
                        <img 
                          src={iconMap[config.assets.find(a => a.id === selectedAsset)?.icon]} 
                          alt="" 
                          className="w-6 h-6" 
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1D2129' }}>
                          {config.assets.find(a => a.id === selectedAsset)?.symbol} ({config.assets.find(a => a.id === selectedAsset)?.name})
                        </div>
                      </div>
                    </div>
                    <svg 
                      className="w-4 h-4 transition-transform" 
                      fill="none" 
                      stroke="#86909C" 
                      viewBox="0 0 24 24"
                      style={{ transform: showAssetDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {showAssetDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute w-full mt-2 z-20"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E6EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden'
                      }}
                    >
                      {config.assets.map((asset) => (
                        <div
                          key={asset.id}
                          onClick={() => {
                            setSelectedAsset(asset.id);
                            setShowAssetDropdown(false);
                          }}
                          className="px-5 py-4 cursor-pointer transition-colors flex items-center justify-between"
                          style={{
                            backgroundColor: selectedAsset === asset.id ? '#F7F8FA' : 'transparent',
                            borderLeft: selectedAsset === asset.id ? '3px solid #4080FF' : '3px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedAsset !== asset.id) {
                              e.currentTarget.style.backgroundColor = '#F7F8FA';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedAsset !== asset.id) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div style={{ 
                              width: '28px', 
                              height: '28px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#F7F8FA'
                            }}>
                              <img src={iconMap[asset.icon]} alt="" className="w-5 h-5" />
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#1D2129' }}>
                                {asset.symbol} ({asset.name})
                              </div>
                              <div style={{ fontSize: '12px', color: '#86909C' }}>
                                {common.balance}: {asset.balance}
                              </div>
                            </div>
                          </div>
                          {selectedAsset === asset.id && (
                            <svg className="w-5 h-5" fill="#4080FF" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* 转账金额输入 */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3" style={{ color: '#1a1a1a' }}>
                  {common.amountLabel}
                </label>
                <div 
                  className="px-5 py-4"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #E5E6EB',
                    borderRadius: '12px',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      placeholder="0.4"
                      className="flex-1 text-2xl font-bold"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#1D2129',
                        outline: 'none',
                      }}
                    />
                    <span className="text-xl font-bold" style={{ color: '#86909C' }}>
                      {selectedAsset ? config.assets.find(a => a.id === selectedAsset)?.symbol : 'ETH'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm" style={{ color: '#4080FF' }}>
                    {common.availableBalance}：{config.assets.find(a => a.id === selectedAsset)?.balance || '0.4'} {config.assets.find(a => a.id === selectedAsset)?.symbol || 'ETH'}
                  </div>
                  <button
                    onClick={() => setAmountInput(config.transfer.amount)}
                    className="text-sm font-medium transition-colors"
                    style={{
                      color: '#4080FF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {common.useAll}
                  </button>
                </div>
              </div>

              {/* 收款地址输入 */}
              <div className="mb-8">
                <label className="block text-sm font-bold mb-3" style={{ color: '#1a1a1a' }}>
                  {common.addressLabel}
                </label>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder={common.addressInputPlaceholder}
                  className="w-full px-5 py-4 font-mono text-sm"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #E5E6EB',
                    borderRadius: '12px',
                    color: '#1D2129',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1.5px solid #4080FF';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid #E5E6EB';
                  }}
                />
              </div>

              {/* 分隔线 */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* 交易记录 */}
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
                  {common.recentTransactions}
                </h4>
                {totalPages > 1 && (
                  <div className="text-sm" style={{ color: '#64748b' }}>
                    {language === 'chinese' ? `第 ${currentPage} 頁 / 共 ${totalPages} 頁` : `Page ${currentPage} / ${totalPages}`}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                {currentTransactions.map((tx, index) => (
                  <div 
                    key={index}
                    className="p-5"
                    style={{
                      backgroundColor: '#F8F9FA',
                      borderRadius: '12px',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: tx.type === 'received' ? '#FEF3C7' : '#E8F5E9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {tx.type === 'received' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                            <path d="M17 7L7 17M7 17H17M7 17V7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-semibold" style={{ color: '#1a1a1a' }}>
                            {tx.type === 'received' ? common.received : common.sent}
                          </span>
                          <span className="text-xs px-2 py-1" style={{ backgroundColor: '#dcfce7', color: '#059669', borderRadius: '6px', fontWeight: '500' }}>
                            {common.success}
                          </span>
                        </div>
                        <div className="text-sm" style={{ color: '#64748b' }}>
                          {tx.type === 'received' 
                            ? `${common.from || (language === 'chinese' ? '從' : 'From')} ${tx.fromName || tx.toName}`
                            : `${common.sendTo} ${tx.toName} ${common.transfer}`
                          }
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: tx.type === 'received' ? '#059669' : '#dc2626' }}>
                          {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.currency}
                        </div>
                        <div className="text-xs" style={{ color: '#94a3b8' }}>
                          {tx.timeAgo[language]}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium" style={{ color: '#64748b' }}>
                          {tx.type === 'received' 
                            ? (language === 'chinese' ? '發送方地址' : 'From Address')
                            : common.addressLabel
                          }
                        </div>
                        <button
                          onClick={() => setShowFullHistoryAddress({
                            ...showFullHistoryAddress,
                            [index]: !showFullHistoryAddress[index]
                          })}
                          className="p-1 transition-all hover:bg-gray-200"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title={showFullHistoryAddress[index] ? common.hideAddress : common.showFullAddress}
                        >
                          {showFullHistoryAddress[index] ? (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#64748b" strokeWidth="2">
                              <path d="M3.98 8.223A10.477 10.477 0 001.934 10C3.226 13.338 6.244 15.5 10 15.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0110 5.5c3.756 0 6.774 2.162 8.066 5.5a10.523 10.523 0 01-1.238 2.28m-2.63 2.63A9.953 9.953 0 0110 16.5c-3.756 0-6.774-2.162-8.066-5.5a10.523 10.523 0 011.47-2.615M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 3l14 14" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4080FF" strokeWidth="2">
                              <path d="M10 5.5c-3.756 0-6.774 2.162-8.066 5.5C3.226 14.338 6.244 16.5 10 16.5c3.756 0 6.774-2.162 8.066-5.5C16.774 7.662 13.756 5.5 10 5.5z" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 13a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="font-mono text-sm font-medium" style={{ color: '#1a1a1a', wordBreak: 'break-all' }}>
                        {formatAddress(tx.type === 'received' ? (tx.from || tx.to) : tx.to, showFullHistoryAddress[index])}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 分页按钮 */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mb-10">
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage > 1 ? 1.02 : 1 }}
                    whileTap={{ scale: currentPage > 1 ? 0.98 : 1 }}
                    className="px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2"
                    style={{
                      backgroundColor: currentPage === 1 ? '#E5E7EB' : '#ffffff',
                      border: '1px solid #E5E6EB',
                      borderRadius: '8px',
                      color: currentPage === 1 ? '#9CA3AF' : '#1D2129',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {language === 'chinese' ? '上一頁' : 'Previous'}
                  </motion.button>

                  <div className="text-sm font-medium" style={{ color: '#64748b' }}>
                    {language === 'chinese' 
                      ? `顯示 ${startIndex + 1}-${Math.min(endIndex, totalTransactions)} / 共 ${totalTransactions} 條記錄`
                      : `Showing ${startIndex + 1}-${Math.min(endIndex, totalTransactions)} of ${totalTransactions} records`
                    }
                  </div>

                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    whileHover={{ scale: currentPage < totalPages ? 1.02 : 1 }}
                    whileTap={{ scale: currentPage < totalPages ? 0.98 : 1 }}
                    className="px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2"
                    style={{
                      backgroundColor: currentPage === totalPages ? '#E5E7EB' : '#ffffff',
                      border: '1px solid #E5E6EB',
                      borderRadius: '8px',
                      color: currentPage === totalPages ? '#9CA3AF' : '#1D2129',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    {language === 'chinese' ? '下一頁' : 'Next'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              )}

              {/* 确认转账按钮 */}
              <motion.button
                onClick={handleTransfer}
                disabled={!addressInput.trim() || !amountInput.trim()}
                whileHover={{ scale: (addressInput.trim() && amountInput.trim()) ? 1.01 : 1 }}
                whileTap={{ scale: (addressInput.trim() && amountInput.trim()) ? 0.99 : 1 }}
                className="w-full py-4 text-base font-bold text-white flex items-center justify-center gap-2"
                style={{
                  backgroundColor: (addressInput.trim() && amountInput.trim()) ? '#C9CDD4' : '#C9CDD4',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: (addressInput.trim() && amountInput.trim()) ? 'pointer' : 'not-allowed',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (addressInput.trim() && amountInput.trim()) {
                    e.currentTarget.style.backgroundColor = '#5B7FFF';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = (addressInput.trim() && amountInput.trim()) ? '#C9CDD4' : '#C9CDD4';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {common.confirmTransfer}
              </motion.button>
            </div>
          </div>
        )}

        {/* 结果显示 */}
        {showResult && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div 
              className="p-14 mb-12"
              style={{
                backgroundColor: isCorrect ? '#10b981' : '#ef4444',
                border: 'none',
                boxShadow: 'none'
              }}
            >
              <div className="text-7xl mb-8">
                {isCorrect ? common.checkmark : common.crossmark}
              </div>
              <p 
                className="text-4xl font-bold text-white mb-8"
                style={{ 
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {isCorrect ? common.correct : common.incorrect}
              </p>
              <p 
                className="text-xl"
                style={{ 
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  lineHeight: '1.6',
                  color: '#ffffff'
                }}
              >
                {isCorrect 
                  ? common.correctExplanation 
                  : isTimedOut 
                    ? (language === 'chinese' 
                      ? '時間已到！你未能在限定時間內完成轉帳。請在下次挑戰中更快地完成操作。' 
                      : 'Time is up! You did not complete the transfer within the time limit. Please try to complete faster next time.')
                    : common.incorrectExplanation}
              </p>
            </div>

            {/* 错误详情 */}
            {!isCorrect && !isTimedOut && (
              <div 
                className="p-12 mb-12 text-left"
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #ffffff',
                }}
              >
                <h4 className="text-lg font-bold mb-8" style={{ color: '#ef4444' }}>
                  {common.incorrectExplanation}
                </h4>
                
                <div className="space-y-6">
                  {/* 网络检查 */}
                  {config.transfer.requireNetworkSelection && (
                    <div className="p-10" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                          {currentContent.networkLabel}
                        </span>
                        {selectedNetwork === config.transfer.correctNetwork ? (
                          <span style={{ color: '#10b981' }}>{common.checkmark}</span>
                        ) : (
                          <span style={{ color: '#ef4444' }}>{common.crossmark}</span>
                        )}
                      </div>
                      <div className="text-sm" style={{ color: '#64748b' }}>
                        {common.selected}: {config.networks.find(n => n.id === selectedNetwork)?.name}
                      </div>
                      {selectedNetwork !== config.transfer.correctNetwork && (
                        <div className="text-sm mt-2" style={{ color: '#059669' }}>
                          {common.shouldBe}: {config.networks.find(n => n.id === config.transfer.correctNetwork)?.name}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 资产检查 */}
                  {config.transfer.requireAssetSelection && (
                    <div className="p-10" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                          {currentContent.assetLabel}
                        </span>
                        {selectedAsset === config.transfer.correctAsset ? (
                          <span style={{ color: '#10b981' }}>{common.checkmark}</span>
                        ) : (
                          <span style={{ color: '#ef4444' }}>{common.crossmark}</span>
                        )}
                      </div>
                      <div className="text-sm" style={{ color: '#64748b' }}>
                        {common.selected}: {config.assets.find(a => a.id === selectedAsset)?.symbol}
                      </div>
                      {selectedAsset !== config.transfer.correctAsset && (
                        <div className="text-sm mt-2" style={{ color: '#059669' }}>
                          {common.shouldBe}: {config.assets.find(a => a.id === config.transfer.correctAsset)?.symbol}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 地址检查 */}
                  <div className="p-10" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                        {common.addressLabel}
                      </span>
                      {addressInput.trim().toLowerCase() === config.addresses.correct.toLowerCase() ? (
                        <span style={{ color: '#10b981' }}>{common.checkmark}</span>
                      ) : (
                        <span style={{ color: '#ef4444' }}>{common.crossmark}</span>
                      )}
                    </div>
                    <div className="text-xs mb-3" style={{ color: '#64748b' }}>
                      {common.yourInput}:
                    </div>
                    <div className="font-mono text-sm break-all p-6 mb-4" style={{ 
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      border: '1px solid #fca5a5'
                    }}>
                      {addressInput || common.empty}
                    </div>
                    {addressInput.trim().toLowerCase() !== config.addresses.correct.toLowerCase() && (
                      <>
                        <div className="text-xs mb-3" style={{ color: '#64748b' }}>
                          {common.correctAddress}:
                        </div>
                        <div className="font-mono text-sm break-all p-6" style={{ 
                          backgroundColor: '#f0fdf4',
                          color: '#059669',
                          border: '1px solid #86efac'
                        }}>
                          {config.addresses.correct}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 按钮 */}
            <div className="flex gap-10 justify-center">
              {!isCorrect && (
                <motion.button
                  onClick={() => {
                    setShowResult(false);
                    setAddressInput('');
                    setAmountInput('');
                    setSelectedNetwork(config?.wallet?.defaultNetwork || 'ethereum');
                    setSelectedAsset(config?.wallet?.defaultAsset || 'eth');
                    setErrorMessage('');
                    setIsTimedOut(false);
                    setTimeRemaining(config?.timeLimit || null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-8 text-xl font-bold text-white"
                  style={{
                    backgroundColor: '#f59e0b',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                >
                  {common.retryButton}
                </motion.button>
              )}
              
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-8 text-xl font-bold text-white"
                style={{
                  backgroundColor: '#10b981',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                {common.continueButton}
              </motion.button>
            </div>
          </motion.div>
        )}
        </div>
      </BrowserFrame>
    </ChallengeTemplate>
  );
};

export default WalletTransferChallenge;

