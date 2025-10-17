import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';
import BrowserFrame from './BrowserFrame';
// 导入图标
import SolanaIcon from '../../assets/Solana.png';
import BNBIcon from '../../assets/BNB.png';
import MetaMaskIcon from '../../assets/MetaMask_Fox.png';

/**
 * 授权陷阱挑战组件 - Level 1-1
 * 识别空投诈骗中的无限授权陷阱
 */
const ApprovalTrapChallenge = ({ config }) => {
  const [language, setLanguage] = useState('chinese');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(config.transaction.timeLimit * 3600); // 转换为秒

  // 倒计时逻辑
  useEffect(() => {
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

  const currentContent = config.content[language];
  const dangerSignals = config.dangerSignals[language];
  const education = config.education[language];

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
            backgroundColor: '#ffffff',
            padding: '40px',
            color: '#1a1a1a',
            minHeight: '80vh',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {/* 标题 */}
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#1a1a1a' }}>
            {currentContent.title}
          </h1>

          {!showResult ? (
            <>
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
                          {config.transaction.network}
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
                      {config.transaction.senderShort}
                    </div>
                  </div>

                  {/* 领取按钮 */}
                  <motion.button
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
                          {config.transaction.network}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>錢包</div>
                    <div className="font-mono text-sm" style={{ color: '#ffffff' }}>
                      {config.transaction.walletAddressShort}
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
                        {config.transaction.senderShort}
                      </div>
                    </div>

                    <div className="p-5" style={{ 
                      backgroundColor: '#2d2d2d', 
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>{currentContent.receiver}</div>
                      <div className="font-mono text-base font-bold" style={{ color: '#ffffff' }}>
                        {config.transaction.receiverShort}
                      </div>
                    </div>

                    <div className="p-5" style={{ 
                      backgroundColor: '#2d2d2d', 
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      <div className="text-xs mb-2" style={{ color: '#9ca3af' }}>{currentContent.amount}</div>
                      <div className="font-mono text-base font-bold" style={{ color: '#ffffff' }}>
                        {config.transaction.amount}
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
                        <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{config.transaction.token}</span>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#9ca3af' }}>{currentContent.approvalAmount}: </span>
                        <span className="text-sm font-bold" style={{ color: '#ef4444' }}>
                          {config.transaction.approvalAmount}
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
                        {currentContent.gasPrice}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction.gasPrice}</span>
                      </div>
                      <div style={{ color: '#e5e7eb' }}>
                        {currentContent.gasLimit}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction.gasLimit}</span>
                      </div>
                      <div style={{ color: '#e5e7eb' }}>
                        {currentContent.estimatedFee}: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{config.transaction.estimatedFee}</span>
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
              </div>

              {/* 问题和选项 - 卡通风格 */}
              <div className="text-center p-16" style={{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '32px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), inset 0 -4px 0 rgba(0, 0, 0, 0.1)',
                border: '4px solid #fbbf24',
                marginTop: '120px'
              }}>
                <h3 className="text-4xl mb-16" style={{ 
                  color: '#1a1a1a',
                  textShadow: '3px 3px 0px #fbbf24, -1px -1px 0px #fef3c7',
                  fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}>
                  {currentContent.question}
                </h3>
                <div className="flex gap-16 justify-center">
                  <motion.button
                    onClick={() => handleAnswer('yes')}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: -5,
                      boxShadow: '0 15px 40px rgba(220, 38, 38, 0.5)' 
                    }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    className="px-20 py-6 text-2xl text-white"
                    style={{
                      background: selectedAnswer === 'yes' 
                        ? 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)' 
                        : 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                      border: selectedAnswer === 'yes' ? '4px solid #dc2626' : '4px solid #10b981',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      boxShadow: selectedAnswer === 'yes' 
                        ? '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)' 
                        : '0 10px 30px rgba(16, 185, 129, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)',
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
                      boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)' 
                    }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    className="px-20 py-6 text-2xl text-white"
                    style={{
                      background: selectedAnswer === 'no' 
                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' 
                        : 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                      border: selectedAnswer === 'no' ? '4px solid #10b981' : '4px solid #dc2626',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      boxShadow: selectedAnswer === 'no' 
                        ? '0 10px 30px rgba(16, 185, 129, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)' 
                        : '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)',
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
            </>
          ) : (
            /* 结果显示 */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div
                className="p-12 mb-8"
                style={{
                  backgroundColor: isCorrect ? '#10b981' : '#ef4444',
                  border: 'none',
                  borderRadius: '12px'
                }}
              >
                <div className="text-7xl mb-6">
                  {isCorrect ? '✓' : '✗'}
                </div>
                <p className="text-4xl font-bold text-white mb-4">
                  {isCorrect ? '恭喜！答對了！' : '答錯了！'}
                </p>
                <p className="text-xl text-white">
                  {isCorrect 
                    ? '你成功識別了授權陷阱！永遠不要授權無限額度給未知合約。'
                    : '這是一個授權陷阱！無限授權會讓攻擊者轉走你所有的代幣。'
                  }
                </p>
              </div>

              {/* 危险信号 */}
              <div className="p-8 mb-8 text-left" style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#dc2626' }}>
                  {currentContent.warningTitle}
                </h3>
                <ul className="space-y-3">
                  {dangerSignals.map((signal, index) => (
                    <li key={index} className="text-lg" style={{ color: '#991b1b' }}>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 教育内容 */}
              <div className="p-8 text-left" style={{ backgroundColor: '#f0f9ff', border: '2px solid #3b82f6' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1e40af' }}>
                  {education.title}
                </h3>
                <p className="text-lg mb-6" style={{ color: '#1e3a8a' }}>
                  {education.description}
                </p>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#1e40af' }}>
                  安全提示：
                </h4>
                <ul className="space-y-2">
                  {education.tips.map((tip, index) => (
                    <li key={index} className="text-lg flex items-start gap-2" style={{ color: '#1e3a8a' }}>
                      <span>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 继续按钮 */}
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-12 py-4 text-xl font-bold text-white"
                style={{
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                返回遊戲
              </motion.button>
            </motion.div>
          )}
        </div>
      </BrowserFrame>
    </ChallengeTemplate>
  );
};

export default ApprovalTrapChallenge;
