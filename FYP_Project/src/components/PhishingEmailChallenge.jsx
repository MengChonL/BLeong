import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PhishingEmailChallenge = ({ isOpen, onClose, onAnswer, language }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    // 延遲一下再調用回調，讓用戶看到結果
    setTimeout(() => {
      onAnswer(answer);
    }, 2000);
  };

  const content = {
    chinese: {
      title: '釣魚郵件識別挑戰',
      question: '這是否為詐騙郵件？',
      yes: '是',
      no: '不是',
      correct: '正確！這確實是詐騙郵件',
      incorrect: '錯誤！這確實是詐騙郵件',
      explanation: '這封郵件包含多個詐騙信號：1) 冒充知名人物（馬化疼）2) 緊急時間限制 3) 要求授權轉帳權限 4) 可疑的域名'
    },
    english: {
      title: 'Phishing Email Identification Challenge',
      question: 'Is this a scam email?',
      yes: 'Yes',
      no: 'No',
      correct: 'Correct! This is indeed a scam email',
      incorrect: 'Wrong! This is indeed a scam email',
      explanation: 'This email contains multiple scam signals: 1) Impersonating a famous person (Mark Hua Teng) 2) Urgent time limit 3) Requesting transfer authorization 4) Suspicious domain'
    }
  };

  const currentContent = content[language];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: '#1a1a1a',
          border: '8px solid #000000',
          borderRadius: '16px',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
          fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace'
        }}
      >
        {/* Safari 瀏覽器標題欄 */}
        <div 
          className="flex items-center justify-between p-4 border-b-4 border-black"
          style={{ backgroundColor: '#2d2d2d' }}
        >
          <div className="flex items-center gap-3">
            {/* 關閉、最小化、最大化按鈕 */}
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
            </div>
            {/* 地址欄 */}
            <div 
              className="flex-1 mx-4 px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: '#1a1a1a',
                border: '3px solid #000000',
                color: '#ffffff'
              }}
            >
              <span className="text-sm">http://claim-gaif[.]free-nft[.]xyz/connect</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold"
            style={{ fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace' }}
          >
            ×
          </button>
        </div>

        {/* 郵件內容區域 */}
        <div className="p-8" style={{ backgroundColor: '#f5f5f5' }}>
          <div 
            className="max-w-4xl mx-auto p-8"
            style={{
              backgroundColor: '#ffffff',
              border: '4px solid #000000',
              borderRadius: '12px',
              boxShadow: '8px 8px 0px #000000'
            }}
          >
            {/* 郵件標題 */}
            <div className="mb-6">
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ 
                  color: '#1a1a1a',
                  fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {language === 'chinese' ? '緊急：免費領取 5000 枚 $GAIF 代幣！' : 'URGENT: Claim 5000 $GAIF Tokens for FREE!'}
              </h2>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-bold">From:</span> mark.hua.teng@gaif.io<br/>
                <span className="font-bold">To:</span> crypto.pioneer@email.com<br/>
                <span className="font-bold">Date:</span> {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* 郵件正文 */}
            <div 
              className="text-base leading-relaxed"
              style={{ 
                color: '#1a1a1a',
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                lineHeight: '1.6'
              }}
            >
              {language === 'chinese' ? (
                <>
                  <p className="mb-4">親愛的加密先驅者，</p>
                  
                  <p className="mb-4">
                    我是馬化疼（Mark Hua Teng）——您沒看錯，就是那位創辦 Facebook 的傳奇人物！我最近秘密成立了一個名為 GAIF（Global AI Finance）的 Web3 項目，旨在用區塊鏈技術「顛覆傳統金融」。由於您是我們精選的 100 位早期用戶之一，特此邀請您免費領取 5000 枚 $GAIF 代幣（價值約 50,000 美元！）。
                  </p>

                  <p className="mb-4 font-bold">為什麼選擇 GAIF？</p>
                  
                  <ul className="mb-4 list-none">
                    <li className="mb-2">✅ 馬化疼親自背書：我在元宇宙辦公室親自簽署了此項目！</li>
                    <li className="mb-2">✅ 革命性技術：GAIF 使用「量子區塊鏈」+「AI 挖礦」，每秒處理 100 萬筆交易！</li>
                    <li className="mb-2">✅ 零風險暴富：只要連接您的錢包，代幣自動空投到您的帳戶！</li>
                  </ul>

                  <p className="mb-4 font-bold text-red-600">⚠️ 緊急行動步驟（24 小時內有效）：</p>
                  
                  <ol className="mb-4 list-decimal list-inside">
                    <li className="mb-2">點擊此連結：http://Gaif.io</li>
                    <li className="mb-2">連接您的 MetaMask 錢包（支援 ETH、BNB、SOL 鏈）</li>
                    <li className="mb-2">授權「讀取+轉帳」權限以驗證身份</li>
                    <li className="mb-2">領取代幣！</li>
                  </ol>

                  <p className="mb-4 font-bold text-red-600">📢 注意：因 SEC 監管壓力，此機會僅開放 24 小時！錯過將永久失去資格！</p>

                  <div className="mb-4">
                    <p className="font-bold mb-2">常見問題</p>
                    <p className="mb-2"><strong>Q: 為什麼要授權轉帳權限？</strong></p>
                    <p className="mb-2">A: 這是 Web3 標準流程！系統需「暫時鎖定」您的資產以防止機器人領取（放心，30 秒後自動解鎖！）。</p>
                    
                    <p className="mb-2"><strong>Q: 馬化疼不是創辦 Facebook 嗎？為何做加密貨幣？</strong></p>
                    <p className="mb-2">A: 我已辭職專注 Web3！GAIF 是我的新創業，與 Facebook 無關（但技術同源）。</p>
                  </div>

                  <p className="mb-4 font-bold text-blue-600">別再猶豫！立即點擊領取 → http://claim-gaif[.]free-nft[.]xyz/connect</p>

                  <p className="mb-4">祝您財富自由，</p>
                  <p className="font-bold">馬化疼（Mark Hua Teng）</p>
                  <p className="font-bold">GAIF 創始人 & CEO</p>
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
                    <li className="mb-2">Click this link: http://Gaif.io</li>
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

                  <p className="mb-4 font-bold text-blue-600">Don't hesitate! Click to claim now → http://claim-gaif[.]free-nft[.]xyz/connect</p>

                  <p className="mb-4">Wishing you financial freedom,</p>
                  <p className="font-bold">Mark Hua Teng</p>
                  <p className="font-bold">GAIF Founder & CEO</p>
                </>
              )}
            </div>
          </div>

          {/* 問題區域 */}
          <div className="mt-8 text-center">
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: '#1a1a1a',
                fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px'
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
                  className="px-8 py-4 text-xl font-bold text-white rounded-lg"
                  style={{
                    backgroundColor: '#ef4444',
                    border: '4px solid #000000',
                    boxShadow: '6px 6px 0px #000000',
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {currentContent.yes}
                </motion.button>
                <motion.button
                  onClick={() => handleAnswer('no')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-xl font-bold text-white rounded-lg"
                  style={{
                    backgroundColor: '#10b981',
                    border: '4px solid #000000',
                    boxShadow: '6px 6px 0px #000000',
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {currentContent.no}
                </motion.button>
              </div>
            ) : (
              <div className="text-center">
                <div 
                  className="p-6 rounded-lg mb-4"
                  style={{
                    backgroundColor: selectedAnswer === 'yes' ? '#10b981' : '#ef4444',
                    border: '4px solid #000000',
                    boxShadow: '6px 6px 0px #000000'
                  }}
                >
                  <p 
                    className="text-2xl font-bold text-white"
                    style={{ 
                      fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {selectedAnswer === 'yes' ? currentContent.correct : currentContent.incorrect}
                  </p>
                </div>
                <p 
                  className="text-lg text-gray-700 max-w-2xl mx-auto"
                  style={{ 
                    fontFamily: 'Courier New, Monaco, Menlo, Ubuntu Mono, monospace',
                    lineHeight: '1.6'
                  }}
                >
                  {currentContent.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhishingEmailChallenge;
