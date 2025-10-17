import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';

/**
 * 通用地址投毒挑战组件
 * 通过配置数据驱动渲染，不需要为每个挑战创建新页面
 */
const AddressPoisoningChallenge = ({ config }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('chinese');

  if (!config) {
    return (
      <div className="text-white text-center p-8">
        <h1 className="text-2xl">挑战配置未找到</h1>
      </div>
    );
  }

  const handleAddressSelect = (optionId) => {
    const selected = config.options.find(opt => opt.id === optionId);
    setSelectedAddress(selected);
    setShowResult(true);
    setTimeout(() => {
      console.log('选择的地址:', optionId, '是否正确:', selected.isCorrect);
    }, 2000);
  };

  const currentContent = config.content[language];
  const isCorrect = selectedAddress?.isCorrect;

  // 通用文本（所有地址投毒挑战共用）
  const commonText = {
    chinese: {
      recipientInfo: '收款人信息',
      transactionHistory: '最近交易记录',
      yourWallet: '我的钱包',
      balance: '余额',
      selectAddress: '选择此地址',
      correct: '✓ 正确！转账成功',
      incorrect: '✗ 错误！这是投毒地址',
      explanation: '你选择了正确的地址！在进行转账时，务必仔细核对完整地址，特别注意开头和结尾的字符。',
      errorExplanation: '这是一个投毒地址！攻击者故意使用与真实地址前后几位相同的地址，诱导你转错账。请务必核对完整地址！',
      tip: '💡 小贴士',
      tips: [
        '转账前务必核对完整地址',
        '特别注意地址的开头和结尾',
        '可以使用地址簿保存常用地址',
        '大额转账前先发送小额测试',
      ],
      continueButton: '继续',
      retryButton: '重试',
      addressComparison: '地址对比分析',
      correctAddress: '正确地址',
      poisonedAddress: '投毒地址 (攻击者)',
      comparisonWarning: '注意：两个地址只有少数字符不同！攻击者故意制造相似地址诱导转账。',
      sent: '已发送',
      received: '已收到',
      success: '成功',
    },
    english: {
      recipientInfo: 'Recipient Information',
      transactionHistory: 'Recent Transactions',
      yourWallet: 'My Wallet',
      balance: 'Balance',
      selectAddress: 'Select This Address',
      correct: '✓ Correct! Transfer Successful',
      incorrect: '✗ Wrong! This is a Poisoned Address',
      explanation: 'You selected the correct address! When making transfers, always verify the complete address carefully, paying special attention to the beginning and end characters.',
      errorExplanation: 'This is a poisoned address! Attackers deliberately use addresses with the same first and last few characters as the real address to trick you into sending to the wrong account. Always verify the complete address!',
      tip: '💡 Tip',
      tips: [
        'Always verify the complete address before transfer',
        'Pay special attention to the beginning and end of the address',
        'Use address book to save frequently used addresses',
        'Send a small test amount before large transfers',
      ],
      continueButton: 'Continue',
      retryButton: 'Retry',
      addressComparison: 'Address Comparison',
      correctAddress: 'Correct Address',
      poisonedAddress: 'Poisoned Address (Attacker)',
      comparisonWarning: 'Notice: Only a few characters are different! Attackers deliberately create similar addresses to trick transfers.',
      sent: 'Sent',
      received: 'Received',
      success: 'Success',
    }
  };

  const common = commonText[language];

  return (
    <ChallengeTemplate
      language={language}
      setLanguage={setLanguage}
      containerMaxWidth="90vw"
      containerMaxHeight="90vh"
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          border: '8px solid #000000',
          borderRadius: '16px',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
          padding: '40px',
          color: '#ffffff',
        }}
      >
        {/* 标题 */}
        <h1 
          className="text-4xl font-bold mb-6 text-center"
          style={{ 
            color: '#22d3ee',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          {currentContent.title}
        </h1>

        {/* 任务说明 */}
        <div 
          className="mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: '#2d2d2d',
            border: '3px solid #374151',
          }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color: '#fbbf24' }}>
            📋 {currentContent.scenario}
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: '#d1d5db' }}>
            {currentContent.scenarioText}
          </p>
        </div>

        {/* 收款人信息卡片 */}
        <div 
          className="mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: '#1f2937',
            border: '3px solid #10b981',
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: '#10b981' }}>
            👤 {common.recipientInfo}
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
              {config.recipient.avatar}
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: '#ffffff' }}>
                {config.recipient.username}
              </div>
              <div className="text-sm" style={{ color: '#9ca3af' }}>
                {config.recipient.relationship[language]}
              </div>
            </div>
          </div>
        </div>

        {/* 钱包界面 */}
        <div 
          className="mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: '#111827',
            border: '4px solid #000000',
            boxShadow: '6px 6px 0px #000000',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#10b981' }}>
              💼 {common.yourWallet}
            </h2>
            <span className="text-lg" style={{ color: '#9ca3af' }}>
              {common.balance}: {config.wallet.balance}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-4" style={{ color: '#22d3ee' }}>
            {common.transactionHistory}
          </h3>

          {/* 交易记录列表 */}
          <div className="space-y-3">
            {config.wallet.transactions.map((tx, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: '#1f2937',
                  border: '2px solid #374151',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: tx.type === 'sent' ? '#22d3ee' : '#ef4444' }}>
                      {tx.type === 'sent' ? '→' : '←'} {tx.type === 'sent' ? common.sent : common.received}
                    </span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                      {common.success}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: tx.type === 'sent' ? '#ef4444' : '#10b981' }}>
                    {tx.amount}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>
                    {tx.type === 'sent' ? (language === 'chinese' ? '收款人' : 'To') : (language === 'chinese' ? '发送人' : 'From')}: {tx.toName || tx.fromName}
                  </div>
                  <div className="font-mono text-sm break-all" style={{ color: '#d1d5db' }}>
                    {tx.to || tx.from}
                  </div>
                </div>
                <div className="text-xs" style={{ color: '#6b7280' }}>
                  {tx.timeAgo[language]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 问题区域 */}
        {!showResult && (
          <div className="mb-8">
            <h3 
              className="text-2xl font-bold mb-6 text-center"
              style={{ 
                color: '#ffffff',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              {currentContent.question}
            </h3>

            <div className="space-y-4">
              {config.options.map((option) => (
                <motion.div
                  key={option.id}
                  onClick={() => handleAddressSelect(option.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-6 rounded-lg cursor-pointer"
                  style={{
                    backgroundColor: '#1f2937',
                    border: `3px solid ${option.borderColor}`,
                    boxShadow: '4px 4px 0px #000000',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          background: option.isCorrect 
                            ? 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)'
                            : 'linear-gradient(to bottom right, #6b7280, #374151)'
                        }}
                      >
                        {option.avatar}
                      </div>
                      <div>
                        <div className="text-lg font-bold" style={{ color: option.borderColor }}>
                          {option.label[language]}
                        </div>
                        <div className="text-sm" style={{ color: '#9ca3af' }}>
                          {option.source[language]}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl">{option.icon}</div>
                  </div>
                  <div className="font-mono text-base break-all p-3 rounded" style={{ 
                    color: '#ffffff',
                    backgroundColor: '#374151'
                  }}>
                    {option.address}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 提示 */}
            <div className="text-center mt-6">
              <p className="text-sm" style={{ color: '#9ca3af' }}>
                💡 {language === 'chinese' 
                  ? '仔细对比所有地址，注意开头和结尾的字符' 
                  : 'Carefully compare all addresses, pay attention to the beginning and end characters'}
              </p>
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
              className="p-8 rounded-lg mb-6"
              style={{
                backgroundColor: isCorrect ? '#10b981' : '#ef4444',
                border: '4px solid #000000',
                boxShadow: '6px 6px 0px #000000'
              }}
            >
              <div className="text-6xl mb-4">
                {isCorrect ? '✓' : '✗'}
              </div>
              <p 
                className="text-3xl font-bold text-white mb-4"
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
                {isCorrect ? common.explanation : common.errorExplanation}
              </p>
            </div>

            {/* 地址对比 */}
            <div 
              className="p-6 rounded-lg mb-6 text-left"
              style={{
                backgroundColor: '#2d2d2d',
                border: '3px solid #374151',
              }}
            >
              <h4 className="text-lg font-bold mb-4" style={{ color: '#22d3ee' }}>
                {common.addressComparison}
              </h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm mb-2" style={{ color: '#10b981' }}>
                    ✓ {common.correctAddress} ({config.recipient.username})
                  </div>
                  <div className="font-mono text-sm break-all p-3 rounded" style={{ 
                    backgroundColor: '#1f2937',
                    color: '#10b981',
                    border: '2px solid #10b981'
                  }}>
                    {config.addresses.correct}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm mb-2" style={{ color: '#ef4444' }}>
                    ✗ {common.poisonedAddress}
                  </div>
                  <div className="font-mono text-sm break-all p-3 rounded" style={{ 
                    backgroundColor: '#1f2937',
                    color: '#ef4444',
                    border: '2px solid #ef4444'
                  }}>
                    {config.addresses.poisoned}
                  </div>
                </div>
                
                <div className="text-sm" style={{ color: '#fbbf24' }}>
                  ⚠️ {common.comparisonWarning}
                </div>
              </div>
            </div>

            {/* 安全提示 */}
            <div 
              className="p-6 rounded-lg text-left mb-6"
              style={{
                backgroundColor: '#2d2d2d',
                border: '3px solid #fbbf24',
              }}
            >
              <h4 className="text-xl font-bold mb-4" style={{ color: '#fbbf24' }}>
                {common.tip}
              </h4>
              <ul className="space-y-2">
                {common.tips.map((tip, index) => (
                  <li key={index} className="flex items-start" style={{ color: '#d1d5db' }}>
                    <span className="mr-2" style={{ color: '#10b981' }}>✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 按钮 */}
            <div className="flex gap-4 justify-center">
              {!isCorrect && (
                <motion.button
                  onClick={() => {
                    setShowResult(false);
                    setSelectedAddress(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-xl font-bold text-white rounded-lg"
                  style={{
                    backgroundColor: '#f59e0b',
                    border: '4px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                  }}
                >
                  {common.retryButton}
                </motion.button>
              )}
              
              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-xl font-bold text-white rounded-lg"
                style={{
                  backgroundColor: '#10b981',
                  border: '4px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                }}
              >
                {common.continueButton}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </ChallengeTemplate>
  );
};

export default AddressPoisoningChallenge;

