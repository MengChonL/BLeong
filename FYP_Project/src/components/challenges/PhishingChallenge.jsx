import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChallengeTemplate from './ChallengeTemplate';
import BrowserFrame from './BrowserFrame';

/**
 * 通用钓鱼邮件挑战组件
 * 通过配置数据驱动渲染，不需要为每个钓鱼邮件挑战创建新页面
 */
const PhishingChallenge = ({ config }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('chinese');

  if (!config) {
    return (
      <div className="text-white text-center p-8">
        <h1 className="text-2xl">挑战配置未找到</h1>
      </div>
    );
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    setTimeout(() => {
      console.log('钓鱼挑战答案:', answer, '是否正确:', answer === config.correctAnswer);
    }, 2000);
  };

  const currentContent = config.content[language];
  const isCorrect = selectedAnswer === config.correctAnswer;

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

  return (
    <ChallengeTemplate
      language={language}
      setLanguage={setLanguage}
    >
      <BrowserFrame url={config.email.url}>
        {/* 邮件内容区域 */}
        <div 
          className="w-full mx-auto p-6"
          style={{
            backgroundColor: '#ffffff',
            border: '4px solid #000000',
            borderRadius: '12px',
            boxShadow: '8px 8px 0px #000000',
            maxWidth: '100%'
          }}
        >
          {/* 邮件标题 */}
          <div className="mb-6">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ 
                color: '#1a1a1a',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              {config.email.subject[language]}
            </h2>
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-bold">From:</span> {config.email.from}<br/>
              <span className="font-bold">To:</span> {config.email.to}<br/>
              <span className="font-bold">Date:</span> {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* 邮件正文 - 使用配置或默认内容 */}
          <div 
            className="text-lg leading-relaxed"
            style={{ 
              color: '#1a1a1a',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.8'
            }}
          >
            {language === 'chinese' ? (
              <>
                <p className="mb-4">亲爱的加密先驱者，</p>
                
                <p className="mb-4">
                  我是马化疼（Mark Hua Teng）——您没看错，就是那位创办 Facebook 的传奇人物！我最近秘密成立了一个名为 GAIF（Global AI Finance）的 Web3 项目，旨在用区块链技术「颠覆传统金融」。由于您是我们精选的 100 位早期用户之一，特此邀请您免费领取 5000 枚 $GAIF 代币（价值约 50,000 美元！）。
                </p>

                <p className="mb-4 font-bold">为什么选择 GAIF？</p>
                
                <ul className="mb-4 list-none">
                  <li className="mb-2">✅ 马化疼亲自背书：我在元宇宙办公室亲自签署了此项目！</li>
                  <li className="mb-2">✅ 革命性技术：GAIF 使用「量子区块链」+「AI 挖矿」，每秒处理 100 万笔交易！</li>
                  <li className="mb-2">✅ 零风险暴富：只要连接您的钱包，代币自动空投到您的帐户！</li>
                </ul>

                <p className="mb-4 font-bold text-red-600">⚠️ 紧急行动步骤（24 小时内有效）：</p>
                
                <ol className="mb-4 list-decimal list-inside">
                  <li className="mb-2">点击此连结：http://GetGafi.io</li>
                  <li className="mb-2">连接您的 MetaMask 钱包（支援 ETH、BNB、SOL 链）</li>
                  <li className="mb-2">授权「读取+转帐」权限以验证身份</li>
                  <li className="mb-2">领取代币！</li>
                </ol>

                <p className="mb-4 font-bold text-red-600">📢 注意：因 SEC 监管压力，此机会仅开放 24 小时！错过将永久失去资格！</p>

                <div className="mb-4">
                  <p className="font-bold mb-2">常见问题</p>
                  <p className="mb-2"><strong>Q: 为什么要授权转帐权限？</strong></p>
                  <p className="mb-2">A: 这是 Web3 标准流程！系统需「暂时锁定」您的资产以防止机器人领取（放心，30 秒后自动解锁！）。</p>
                  
                  <p className="mb-2"><strong>Q: 马化疼不是创办 Facebook 吗？为何做加密货币？</strong></p>
                  <p className="mb-2">A: 我已辞职专注 Web3！GAIF 是我的新创业，与 Facebook 无关（但技术同源）。</p>
                </div>

                <p className="mb-4 font-bold text-blue-600">别再犹豫！立即点击领取 → http://GetGafi.io</p>

                <p className="mb-4">祝您财富自由，</p>
                <p className="font-bold">马化疼（Mark Hua Teng）</p>
                <p className="font-bold">GAIF 创始人 & CEO</p>
              </>
            ) : (
              <>
                <p className="mb-4">Dear Crypto Pioneer,</p>
                
                <p className="mb-4">
                  I am Mark Hua Teng—yes, you read that right, the legendary founder of Facebook! I have recently secretly launched a Web3 project called GAIF (Global AI Finance), aimed at "disrupting traditional finance" with blockchain technology. As one of our carefully selected 100 early users, I invite you to claim 5000 $GAIF tokens for free (worth approximately $50,000!).
                </p>

                <p className="mb-4 font-bold">Why Choose GAIF?</p>
                
                <ul className="mb-4 list-none">
                  <li className="mb-2">✅ Personally endorsed by Mark Hua Teng: I personally signed this project in my metaverse office!</li>
                  <li className="mb-2">✅ Revolutionary technology: GAIF uses "quantum blockchain" + "AI mining", processing 1 million transactions per second!</li>
                  <li className="mb-2">✅ Zero-risk wealth: Just connect your wallet and tokens are automatically airdropped to your account!</li>
                </ul>

                <p className="mb-4 font-bold text-red-600">⚠️ URGENT ACTION STEPS (Valid for 24 hours):</p>
                
                <ol className="mb-4 list-decimal list-inside">
                  <li className="mb-2">Click this link: http://GetGafi.io</li>
                  <li className="mb-2">Connect your MetaMask wallet (supports ETH, BNB, SOL chains)</li>
                  <li className="mb-2">Authorize "Read + Transfer" permissions to verify identity</li>
                  <li className="mb-2">Claim tokens!</li>
                </ol>

                <p className="mb-4 font-bold text-red-600">📢 NOTICE: Due to SEC regulatory pressure, this opportunity is only open for 24 hours! Missing it means permanent disqualification!</p>

                <div className="mb-4">
                  <p className="font-bold mb-2">Frequently Asked Questions</p>
                  <p className="mb-2"><strong>Q: Why do I need to authorize transfer permissions?</strong></p>
                  <p className="mb-2">A: This is the standard Web3 process! The system needs to "temporarily lock" your assets to prevent bot claims (don't worry, it automatically unlocks after 30 seconds!).</p>
                  
                  <p className="mb-2"><strong>Q: Didn't Mark Hua Teng found Facebook? Why is he doing cryptocurrency?</strong></p>
                  <p className="mb-2">A: I have resigned to focus on Web3! GAIF is my new venture, unrelated to Facebook (but with the same technical foundation).</p>
                </div>

                <p className="mb-4 font-bold text-blue-600">Don't hesitate! Click to claim now → http://GetGafi.io</p>

                <p className="mb-4">Wishing you financial freedom,</p>
                <p className="font-bold">Mark Hua Teng</p>
                <p className="font-bold">GAIF Founder & CEO</p>
              </>
            )}
          </div>
        </div>

        {/* 问题区域 */}
        <div className="mt-8 text-center">
          <h3 
            className="text-3xl font-bold mb-8"
            style={{ 
              color: '#1a1a1a',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            {currentContent.question}
          </h3>

          {!showResult ? (
            <div className="flex gap-8 justify-center">
              <motion.button
                onClick={() => handleAnswer('yes')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 text-2xl font-bold text-white rounded-lg"
                style={{
                  backgroundColor: '#ef4444',
                  border: '4px solid #000000',
                  boxShadow: '6px 6px 0px #000000',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {common.yes}
              </motion.button>
              <motion.button
                onClick={() => handleAnswer('no')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 text-2xl font-bold text-white rounded-lg"
                style={{
                  backgroundColor: '#10b981',
                  border: '4px solid #000000',
                  boxShadow: '6px 6px 0px #000000',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {common.no}
              </motion.button>
            </div>
          ) : (
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
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
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {isCorrect ? common.correct : common.incorrect}
                </p>
              </motion.div>

              {/* 识别要点 */}
              {config.signals && (
                <div 
                  className="p-6 rounded-lg text-left mb-6"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '3px solid #fbbf24',
                  }}
                >
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                    🎯 {common.explanation}
                  </h4>
                  <ul className="space-y-2">
                    {config.signals[language].map((signal, index) => (
                      <li key={index} className="flex items-start" style={{ color: '#1a1a1a' }}>
                        <span className="mr-2" style={{ color: '#ef4444' }}>⚠️</span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 按钮 */}
              <div className="flex gap-4 justify-center">
                {!isCorrect && (
                  <motion.button
                    onClick={() => {
                      setShowResult(false);
                      setSelectedAnswer(null);
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
            </div>
          )}
        </div>
      </BrowserFrame>
    </ChallengeTemplate>
  );
};

export default PhishingChallenge;

