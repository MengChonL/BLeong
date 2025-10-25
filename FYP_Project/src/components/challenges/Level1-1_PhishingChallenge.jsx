import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';
import BrowserFrame from './BrowserFrame';
import ChallengeResultScreen from './ChallengeResultScreen';
// 导入图标
import SolanaIcon from '../../assets/Solana.png';
import BNBIcon from '../../assets/BNB.png';
import MetaMaskIcon from '../../assets/MetaMask_Fox.png';

/**
 * 通用钓鱼邮件挑战组件 - Level 1-1
 * 包含钓鱼邮件识别和授权陷阱两个阶段
 */
const PhishingChallenge = ({ config }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('chinese');
  const [view, setView] = useState('email'); // 'email' | 'approvalTrap'
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showMetaMask, setShowMetaMask] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config?.transaction?.timeLimit * 3600 || 7200);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!config) {
    return (
      <div className="text-white text-center p-8">
        <h1 className="text-2xl">挑战配置未找到</h1>
      </div>
    );
  }

  // 倒计时逻辑
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间显示
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === config.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleClaimClick = () => {
    setShowMetaMask(true);
  };

  // 空投邮件数据
  const airdropEmail = {
    sender: language === 'chinese' ? 'Arbitrum 官方團隊' : 'Arbitrum Official Team',
    senderEmail: 'noreply@arbitrum-airdrop.com',
    subject: language === 'chinese' ? '🎉 恭喜！您已獲得 Arbitrum 空投資格' : '🎉 Congratulations! You are eligible for Arbitrum Airdrop',
    preview: language === 'chinese' ? '您曾在 Arbitrum One 上進行過交易，符合空投條件...' : 'You have transacted on Arbitrum One and are eligible for airdrop...',
    time: language === 'chinese' ? '2 小時前' : '2 hours ago',
    content: language === 'chinese' 
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2E7D32; margin-bottom: 20px;">🎉 恭喜您獲得 Arbitrum 空投！</h2>
          <p>親愛的用戶，</p>
          <p>我們很高興地通知您，由於您在 Arbitrum One 網絡上的交易活動，您已符合我們的空投條件！</p>
          <p><strong>立即領取您的空投：</strong></p>
          <p><a href="#" onclick="window.handleAirdropLinkClick && window.handleAirdropLinkClick(); return false;" 
               style="color: #1a73e8; text-decoration: underline;">https://arbitrum-airdrop.com/claim</a></p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            <strong>注意：</strong>此郵件由 Arbitrum 官方團隊發送。請勿回覆此郵件。
          </p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2E7D32; margin-bottom: 20px;">🎉 Congratulations on your Arbitrum Airdrop!</h2>
          <p>Dear User,</p>
          <p>We are pleased to inform you that due to your transaction activity on the Arbitrum One network, you are eligible for our airdrop!</p>
          <p><strong>Claim your airdrop now:</strong></p>
          <p><a href="#" onclick="window.handleAirdropLinkClick && window.handleAirdropLinkClick(); return false;" 
               style="color: #1a73e8; text-decoration: underline;">https://arbitrum-airdrop.com/claim</a></p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            <strong>Note:</strong> This email is sent by the Arbitrum official team. Please do not reply to this email.
          </p>
        </div>
      `
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleAirdropLinkClick = () => {
    // 切换到授权陷阱视图
    setView('approvalTrap');
  };

  // 將函數暴露到全局，供 HTML onclick 調用
  useEffect(() => {
    window.handleAirdropLinkClick = handleAirdropLinkClick;
    return () => {
      delete window.handleAirdropLinkClick;
    };
  }, []);

  const currentContent = config.content[language];

  // 通用文本
  const commonText = {
    chinese: {
      yes: '是',
      no: '不是',
      correct: '✓ 正确！这确实是诈骗邮件',
      incorrect: '✗ 错误！这确实是诈骗邮件',
      explanation: '识别要点',
      continueButton: '继续',
      retryButton: '重试',
    },
    english: {
      yes: 'Yes',
      no: 'No',
      correct: '✓ Correct! This is indeed a scam email',
      incorrect: '✗ Wrong! This is indeed a scam email',
      explanation: 'Key Points',
      continueButton: 'Continue',
      retryButton: 'Retry',
    }
  };

  const common = commonText[language];

  // 邮件界面样式
  const emailStyles = `
    .email-interface {
      display: flex;
      height: 100vh;
      background: #f5f5f5;
      font-family: Arial, sans-serif;
    }

    .email-sidebar {
      width: 200px;
      background: #fff;
      border-right: 1px solid #ddd;
      padding: 20px;
    }

    .compose-btn {
      width: 100%;
      padding: 12px;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .email-list {
      flex: 1;
      background: #fff;
      overflow-y: auto;
    }

    .email-item {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .email-item:hover {
      background: #f8f9fa;
    }

    .email-item.phishing {
      border-left: 4px solid #ea4335;
    }

    .email-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }

    .email-sender {
      display: flex;
      flex-direction: column;
    }

    .sender-name {
      font-weight: bold;
      color: #333;
    }

    .sender-email {
      font-size: 12px;
      color: #666;
    }

    .email-time {
      font-size: 12px;
      color: #666;
    }

    .email-subject {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .email-preview {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
    }

    .phishing-warning {
      color: #ea4335;
      font-size: 12px;
      font-weight: bold;
      margin-top: 5px;
    }

    .email-content {
      flex: 1;
      background: #fff;
      padding: 20px;
      overflow-y: auto;
    }

    .email-content-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .email-content-sender {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    .email-content-time {
      font-size: 12px;
      color: #666;
    }

    .email-content-subject {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }

    .email-content-body {
      line-height: 1.6;
      color: #333;
    }
  `;

  const dangerSignals = config.signals?.[language] || [];
  const education = config.education?.[language];

  // 邮件视图
  if (view === 'email') {
    return (
      <ChallengeTemplate
        language={language}
        setLanguage={setLanguage}
        title={language === 'chinese' ? 'Level 1-1: 釣魚郵件識別' : 'Level 1-1: Phishing Email Recognition'}
        showLanguageSwitch={true}
        containerMaxWidth="80vw"
        containerMaxHeight="80vh"
      >
        <BrowserFrame url="https://mail.google.com" urlColor="#22d3ee">
          <div className="email-interface">
            <style>{emailStyles}</style>
            
            {/* 邮件列表 - 只显示一条空投邮件 */}
            <div className="email-list">
              <div 
                className="email-item phishing"
                onClick={() => handleEmailClick(airdropEmail)}
              >
                <div className="email-header">
                  <div className="email-sender">
                    <span className="sender-name">{airdropEmail.sender}</span>
                    <span className="sender-email">{airdropEmail.senderEmail}</span>
                  </div>
                  <div className="email-time">{airdropEmail.time}</div>
                </div>
                <div className="email-subject">{airdropEmail.subject}</div>
                <div className="email-preview">{airdropEmail.preview}</div>
                <div className="phishing-warning">
                  ⚠️ {language === 'chinese' ? '可疑郵件' : 'Suspicious Email'}
                </div>
              </div>
            </div>

            {/* 邮件内容 - 空投邮件详情 */}
            {selectedEmail && (
              <div className="email-content">
                <div className="email-content-header">
                  <div className="email-content-sender">
                    <span className="sender-name">{selectedEmail.sender}</span>
                    <span className="sender-email">{selectedEmail.senderEmail}</span>
                  </div>
                  <div className="email-content-time">{selectedEmail.time}</div>
                </div>
                <div className="email-content-subject">{selectedEmail.subject}</div>
                <div className="email-content-body">
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }}></div>
                </div>
              </div>
            )}
          </div>
        </BrowserFrame>
      </ChallengeTemplate>
    );
  }

  // 授权陷阱视图
  return (
    <ChallengeTemplate
      language={language}
      setLanguage={setLanguage}
      containerMaxWidth="95vw"
      containerMaxHeight="90vh"
    >
      <BrowserFrame url="http://solaraairdrop.io">
        <div
          style={{
            backgroundColor: showResult ? 'transparent' : '#ffffff',
            padding: showResult ? '0' : '40px',
            color: '#1a1a1a',
            minHeight: '80vh',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {/* 标题 */}
          {!showResult && (
            <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#1a1a1a' }}>
              {currentContent.title}
            </h1>
          )}

          {!showResult ? (
            <div className="grid grid-cols-2 gap-16 mb-64">
                {/* 左侧：空投通知 - iOS 毛玻璃外框 */}
                <div className="p-8" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}>
                  <div className="space-y-12">
                    {/* 恭喜通知 */}
                    <div className="text-center p-12" style={{ 
                      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      borderRadius: '16px',
                      boxShadow: '0 6px 20px rgba(5, 150, 105, 0.25)'
                    }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#059669' }}>
                      🎉 {currentContent.airdropTitle}
                    </h2>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <img src={SolanaIcon} alt="Solana" className="w-16 h-16" />
                      <p className="text-2xl font-bold" style={{ color: '#047857' }}>
                        {currentContent.airdropText}
                      </p>
                    </div>
                  </div>

                  {/* 网络信息 */}
                  <div className="p-8" style={{ 
                    background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 6px 20px rgba(154, 52, 18, 0.2)'
                  }}>
                    <div className="flex items-center gap-6">
                      <img src={BNBIcon} alt="BNB" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                      <div>
                        <div className="text-sm mb-2" style={{ color: '#9a3412' }}>網絡</div>
                        <div className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
                          {config.transaction?.network || 'BNB Smart Chain'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 发送者钱包地址 */}
                  <div className="p-8" style={{ 
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 6px 20px rgba(30, 64, 175, 0.2)'
                  }}>
                    <div className="text-sm mb-3" style={{ color: '#1e40af' }}>發送者錢包地址</div>
                    <div className="font-mono text-xl font-bold" style={{ color: '#1e3a8a' }}>
                      {config.transaction?.senderShort || '0x1234...5678'}
                    </div>
                  </div>

                  {/* 领取按钮 */}
                  <motion.button
                    onClick={handleClaimClick}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 text-2xl font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {currentContent.claimButton}
                  </motion.button>

                  {/* 倒计时 */}
                  <div className="text-center p-10" style={{ 
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 6px 20px rgba(220, 38, 38, 0.25)'
                  }}>
                    <div className="text-sm mb-4" style={{ color: '#991b1b' }}>
                      ⏰ {currentContent.deadline}
                    </div>
                    <div className="text-5xl font-bold font-mono" style={{ color: '#dc2626' }}>
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  </div>
                </div>

                {/* 右侧：MetaMask 交易确认 */}
                {showMetaMask && (
                  <div className="p-10 mt-16" style={{ 
                    backgroundColor: '#1a1a1a', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}>
                  {/* MetaMask 标题 */}
                  <div className="flex items-center gap-4 mb-8 pb-6" style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#2d2d2d',
                      borderRadius: '12px'
                    }}>
                      <img src={MetaMaskIcon} alt="MetaMask" className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                      MetaMask
                    </h3>
                  </div>

                  {/* 网络和钱包信息 */}
                  <div className="mb-8 p-6" style={{ 
                    backgroundColor: '#2d2d2d', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}>
                    <div className="flex items-center gap-5 mb-5">
                      <img src={BNBIcon} alt="BNB" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                      <div>
                        <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>網絡</div>
                        <div className="text-base font-bold" style={{ color: '#ffffff' }}>
                          {config.transaction?.network || 'BNB Smart Chain'}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>錢包</div>
                    <div className="font-mono text-sm" style={{ color: '#ffffff' }}>
                      {config.transaction?.walletAddressShort || '0xB890...aB1F'}
                    </div>
                  </div>

                  {/* 交易确认 */}
                  <h4 className="text-xl font-bold mb-6" style={{ color: '#ffffff' }}>
                    【{currentContent.transactionConfirm}】
                  </h4>

                  {/* 交易详情 */}
                  <div className="space-y-4 mb-8">
                    <div className="p-5" style={{ 
                      backgroundColor: '#2d2d2d', 
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>{currentContent.sender}</div>
                      <div className="font-mono text-base font-bold" style={{ color: '#ffffff' }}>
                        {config.transaction?.senderShort || '0x1234...5678'}
                      </div>
                    </div>

                    <div className="p-5" style={{ 
                      backgroundColor: '#2d2d2d', 
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>{currentContent.receiver}</div>
                      <div className="font-mono text-base font-bold" style={{ color: '#ffffff' }}>
                        {config.transaction?.receiverShort || '0x9ABC...DEF0'}
                      </div>
                    </div>

                    <div className="p-5" style={{ 
                      backgroundColor: '#2d2d2d', 
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>{currentContent.amount}</div>
                      <div className="font-mono text-base font-bold" style={{ color: '#ffffff' }}>
                        {config.transaction?.amount || '1000 SOLR'}
                      </div>
                    </div>
                  </div>

                  {/* 合约调用 */}
                  <div className="mb-8 p-6" style={{ 
                    backgroundColor: '#000000', 
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)'
                  }}>
                    <div className="text-base font-bold mb-4" style={{ color: '#ef4444' }}>
                      ⚠️ {currentContent.contractCall}
                    </div>
                    <div className="font-mono text-sm mb-3" style={{ color: '#ffffff' }}>
                      {currentContent.approveFunction}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#9ca3af' }}>{currentContent.token}: </span>
                        <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{config.transaction?.token || 'SOLR'}</span>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#9ca3af' }}>{currentContent.approvalAmount}: </span>
                        <span className="text-sm font-bold" style={{ color: '#ef4444' }}>
                          {config.transaction?.approvalAmount || 'Unlimited (2^256-1)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gas Fee */}
                  <div className="mb-10 p-6" style={{ 
                    backgroundColor: '#2d2d2d', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}>
                    <div className="text-base font-bold mb-4" style={{ color: '#ffffff' }}>
                      【{currentContent.gasFee}】
                    </div>
                    <div className="space-y-3 text-sm">
                      <div style={{ color: '#e5e7eb' }}>
                        {currentContent.gasPrice}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction?.gasPrice || '5 Gwei'}</span>
                      </div>
                      <div style={{ color: '#e5e7eb' }}>
                        {currentContent.gasLimit}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction?.gasLimit || '21000'}</span>
                      </div>
                      <div style={{ color: '#e5e7eb' }}>
                        {currentContent.estimatedFee}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction?.estimatedFee || '0.000105 BNB'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 按钮 - 装饰性 */}
                  <div className="flex gap-5">
                    <button
                      className="flex-1 py-4 text-white font-bold text-lg"
                      style={{
                        backgroundColor: '#6b7280',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {currentContent.cancel}
                    </button>
                    <button
                      className="flex-1 py-4 text-white font-bold text-lg"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {currentContent.confirm}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* 问题和选项 - 居中设计 */}
          {showMetaMask && !showResult && (
            <div className="flex justify-center items-center mt-8">
              <div className="text-center p-20" style={{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '40px',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 -6px 0 rgba(0, 0, 0, 0.1)',
                border: '6px solid #fbbf24',
                width: '100%',
                maxWidth: '800px'
              }}>
                <h3 className="text-5xl mb-20" style={{ 
                  color: '#1a1a1a',
                  textShadow: '4px 4px 0px #fbbf24, -2px -2px 0px #fef3c7',
                  fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}>
                  {currentContent.question}
                </h3>
                <div className="flex gap-20 justify-center">
                  <motion.button
                    onClick={() => handleAnswer('yes')}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: -5,
                      boxShadow: '0 20px 50px rgba(220, 38, 38, 0.6)' 
                    }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    className="px-24 py-8 text-3xl text-white"
                    style={{
                      background: selectedAnswer === 'yes' 
                        ? 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)' 
                        : 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                      border: selectedAnswer === 'yes' ? '6px solid #dc2626' : '6px solid #10b981',
                      borderRadius: '32px',
                      cursor: 'pointer',
                      boxShadow: selectedAnswer === 'yes' 
                        ? '0 15px 40px rgba(220, 38, 38, 0.5), inset 0 -6px 0 rgba(0, 0, 0, 0.2)' 
                        : '0 15px 40px rgba(16, 185, 129, 0.5), inset 0 -6px 0 rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      WebkitFontSmoothing: 'none',
                      MozOsxFontSmoothing: 'unset'
                    }}
                  >
                    {currentContent.incorrectAnswer}
                  </motion.button>
                  <motion.button
                    onClick={() => handleAnswer('no')}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: '0 20px 50px rgba(16, 185, 129, 0.6)' 
                    }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    className="px-24 py-8 text-3xl text-white"
                    style={{
                      background: selectedAnswer === 'no' 
                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' 
                        : 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                      border: selectedAnswer === 'no' ? '6px solid #10b981' : '6px solid #dc2626',
                      borderRadius: '32px',
                      cursor: 'pointer',
                      boxShadow: selectedAnswer === 'no' 
                        ? '0 15px 40px rgba(16, 185, 129, 0.5), inset 0 -6px 0 rgba(0, 0, 0, 0.2)' 
                        : '0 15px 40px rgba(220, 38, 38, 0.5), inset 0 -6px 0 rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      WebkitFontSmoothing: 'none',
                      MozOsxFontSmoothing: 'unset'
                    }}
                  >
                    {currentContent.correctAnswer}
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* 结果显示 */}
          {showResult && (
            <ChallengeResultScreen
              isSuccess={isCorrect}
              title={language === 'chinese' ? '授權陷阱識別' : 'Authorization Trap Detection'}
              description={isCorrect 
                ? (language === 'chinese' ? '你成功識別了授權陷阱！永遠不要授權無限額度給未知合約。' : 'You successfully identified the authorization trap! Never approve unlimited amounts to unknown contracts.')
                : (language === 'chinese' ? '這是一個授權陷阱！無限授權會讓攻擊者轉走你所有的代幣。' : 'This is an authorization trap! Unlimited approval allows attackers to steal all your tokens.')
              }
              successMessage={language === 'chinese' ? '恭喜！答對了！' : 'Congratulations! Correct!'}
              failureMessage={language === 'chinese' ? '答錯了！' : 'Wrong Answer!'}
              successExplanation={language === 'chinese' 
                ? '你成功識別了授權陷阱！永遠不要授權無限額度給未知合約。' 
                : 'You successfully identified the authorization trap! Never approve unlimited amounts to unknown contracts.'
              }
              failureExplanation={language === 'chinese' ? '請檢查以下危險信號：' : 'Check the following danger signals:'}
              successSubtitle={language === 'chinese' ? '恭喜完成任務' : 'Congratulations on completing the task'}
              retryButtonText={language === 'chinese' ? '重試' : 'Retry'}
              checkItems={isCorrect ? [
                // 成功时显示正确的判断
                {
                  label: language === 'chinese' ? '合約授權判斷' : 'Contract Approval Decision',
                  value: language === 'chinese' ? '正確拒絕' : 'Correctly Rejected',
                  isCorrect: true,
                  showValue: true
                },
                {
                  label: language === 'chinese' ? '無限授權識別' : 'Unlimited Approval Recognition',
                  value: language === 'chinese' ? '成功識別風險' : 'Risk Identified',
                  isCorrect: true,
                  showValue: true
                },
                {
                  label: language === 'chinese' ? '安全意識' : 'Security Awareness',
                  value: language === 'chinese' ? '保護資產安全' : 'Assets Protected',
                  isCorrect: true,
                  showValue: true
                },
                ...(education ? [{
                  label: language === 'chinese' ? '安全知識' : 'Security Knowledge',
                  value: education.title,
                  isCorrect: true,
                  showValue: true,
                  details: education.tips ? (
                    <div className="mt-2 space-y-2">
                      <p className="text-gray-300 text-sm mb-3">{education.description}</p>
                      {education.tips.map((tip, index) => (
                        <div key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                }] : [])
              ] : [
                // 失败时显示危险信号
                ...dangerSignals.map((signal, index) => ({
                  label: `${language === 'chinese' ? '危險信號' : 'Danger Signal'} ${index + 1}`,
                  value: signal,
                  isCorrect: false,
                  showValue: false,
                  details: (
                    <div className="text-sm text-gray-300">
                      {signal}
                    </div>
                  )
                })),
                ...(education ? [{
                  label: education.title,
                  value: '',
                  isCorrect: false,
                  showValue: false,
                  details: (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300 mb-3">{education.description}</p>
                      {education.tips?.map((tip, index) => (
                        <div key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )
                }] : [])
              ]}
              onRetry={!isCorrect ? () => {
                setShowResult(false);
                setSelectedAnswer(null);
                setIsCorrect(false);
              } : null}
            />
          )}
        </div>
      </BrowserFrame>
    </ChallengeTemplate>
  );
};

export default PhishingChallenge;