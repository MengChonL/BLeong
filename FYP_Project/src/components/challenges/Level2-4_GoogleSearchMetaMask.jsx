import React, { useState } from 'react';
import BrowserFrame from './BrowserFrame';
import ChallengeTemplate from './ChallengeTemplate';
import GoogleLogo from '../../assets/Google_logo.png';
import Fox from '../../assets/MetaMask_Fox.png';
import CoinbaseLogo from '../../assets/coinbase.png';
import { getChallengeConfig } from '../../config/challenges-config';

/**
 * Level 2-4: 友薦連所 (Referred Gateway)
 * Google-like search page + MetaMask wallet creation simulation
 */
const GoogleSearchMetaMask = () => {
  const [language, setLanguage] = useState('chinese');
  const [view, setView] = useState('search'); // 'search' | 'onboarding' | 'createWallet' | 'walletCreated' | 'coinbase' | 'connectWallet'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [connectPassword, setConnectPassword] = useState('');
  const [connectMnemonic, setConnectMnemonic] = useState('');
  const [showConnectQuestion, setShowConnectQuestion] = useState(true);
  
  // 从配置文件获取数据
  const config = getChallengeConfig('phishing', 'level2-4');
  
  if (!config) {
    return <div className="text-white text-center p-8">配置未找到</div>;
  }
  
  const t = config.content[language];
  const tabs = language === 'chinese' 
    ? ['全部', '圖片', '影片', '新聞', '短片', '網頁', '更多 ▼', '工具 ▼']
    : ['All', 'Images', 'Videos', 'News', 'Shorts', 'Web', 'More ▼', 'Tools ▼'];
  
  // 处理创建钱包
  const handleCreateWallet = () => {
    if (!password || !confirmPassword) {
      alert(language === 'chinese' ? '請填寫密碼' : 'Please enter password');
      return;
    }
    if (password !== confirmPassword) {
      alert(language === 'chinese' ? '密碼不一致' : 'Passwords do not match');
      return;
    }
    setView('walletCreated');
  };
  const handleClick = (type) => {
    switch (type) {
      case 'official':
        alert('✅ 你選擇了官方網站！這是安全的做法。\n\n遊戲提示：接下來請從 metamask.io 下載擴充功能。');
        break;
      case 'ad':
        alert('⚠️ 這是釣魚廣告！網址不是 metamask.io。\n\n真實案例：攻擊者常購買 Google 廣告誘騙用戶下載假錢包。');
        break;
      case 'discord':
        alert('❌ 這是木馬安裝包！Discord 朋友可能已被盜號。\n\n切記：官方從不透過社群發送安裝檔。');
        break;
      case 'webtool':
        alert('🚫 網頁錢包工具要求你輸入助記詞？這是釣魚！\n\n真正的錢包永遠不會讓你在瀏覽器中「創建並儲存」私鑰。');
        break;
      default:
        alert('未知選項');
    }
  };

  const styles = `
    :root {
      --bg: #fff;
      --text: #202124;
      --link: #1a0dab;
      --visited: #60459b;
      --url: #006621;
      --ad-bg: #eef5ff;
      --ad-border: #d0d9ff;
      --ad-text: #4d5156;
      --tab-active: #f8f9fa;
      --border: #ebebeb;
      --hover: #f6f6f6;
    }

    .g-body {
      font-family: Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 0;
      margin: 0;
      font-size: 14px;
    }

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border);
      background: #fff;
    }

    .logo {
      display: flex;
      align-items: center;
      height: 32px;
    }
    .logo img { height: 32px; width: auto; display: block; }

    .search-bar {
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #dfe1e5;
      border-radius: 24px;
      padding: 0 16px;
      width: 720px;
      max-width: 60vw;
      height: 44px;
    }
    .search-bar input {
      flex: 1;
      padding: 10px 8px;
      border: none;
      outline: none;
      font-size: 16px;
      background: transparent;
    }
    .search-bar button {
      padding: 8px 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #5f6368;
      font-size: 18px;
    }
    .search-bar button:hover {
      background: #f8f9fa;
      border-radius: 50%;
    }

    .nav {
      display: flex;
      gap: 20px;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border);
      font-size: 14px;
      color: #70757a;
    }
    .nav a {
      text-decoration: none;
      color: #70757a;
      padding: 6px 8px;
      border-bottom: 2px solid transparent;
    }
    .nav a.active {
      color: #202124;
      border-bottom: 2px solid #202124;
      font-weight: 500;
    }

    .results {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }

    .result {
      margin-bottom: 20px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
    }
    .result:hover { background: var(--hover); }

    .result-header { display: flex; align-items: flex-start; gap: 10px; }

    .favicon {
      width: 16px;
      height: 16px;
      border-radius: 3px;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: #70757a;
    }
    .favicon.google { background: #fff; border: 1px solid #dfe1e5; }
    .favicon.google span { color: #4285F4; font-size: 12px; font-weight: bold; }

    .result-title {
      font-size: 18px;
      font-weight: normal;
      color: var(--link);
      text-decoration: none;
      display: block;
      margin-bottom: 2px;
    }
    .result-title:hover { text-decoration: underline; }

    .result-url {
      font-size: 14px;
      color: var(--url);
      margin: 2px 0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .result-url::after { content: '›'; margin-left: 2px; color: #70757a; }

    .result-desc { font-size: 14px; color: #545454; margin-top: 4px; line-height: 1.4; }

    .ad-label {
      background: var(--ad-bg);
      color: var(--ad-text);
      font-size: 12px;
      padding: 2px 4px;
      border: 1px solid var(--ad-border);
      border-radius: 2px;
      display: inline-block;
      margin-right: 4px;
    }

    .result-footer { display: flex; gap: 10px; margin-top: 8px; }
    .result-footer button {
      padding: 4px 8px;
      background: #f8f9fa;
      border: 1px solid #dadce0;
      border-radius: 4px;
      font-size: 12px;
      color: #5f6368;
      cursor: pointer;
    }
    .result-footer button:hover { background: #f1f3f4; }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #34a853;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      margin-right: 10px;
    }

    .app-grid { display: flex; gap: 8px; margin-right: 10px; }
    .app-icon { width: 24px; height: 24px; background: #eee; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #70757a; }

    /* 正確/釣魚 樣式 */
    .safe-result .result-title { color: #0d8020 !important; }
    .safe-result .result-url { color: #0d8020 !important; }
    .phish-result .result-title { color: #c00000 !important; }
    .phish-result .result-url { color: #c00000 !important; }
    .phish-result .result-desc { color: #800000 !important; }

    .ellipsis { color: #70757a; margin-left: 4px; font-size: 14px; }
  `;

  const renderOnboarding = () => (
    <BrowserFrame url="https://metamask.io" urlColor="#f6851b">
      <div style={{ background: '#ffffff', minHeight: '70vh' }} className="flex items-center justify-center">
        <div className="w-full max-w-xl px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ marginBottom: '30px' }}>{t.onboardingTitle}</h1>
          <p className="text-gray-600" style={{ marginBottom: '50px' }}>{t.onboardingSubtitle}</p>
          <div className="flex items-center justify-center" style={{ marginBottom: '60px' }}>
            <img src={Fox} alt="MetaMask Fox" className="w-56 h-56 object-contain" />
          </div>
          <div>
            <button className="w-full py-4 rounded-full text-white font-bold" style={{ backgroundColor: '#037dd6' }}
              onClick={() => setView('createWallet')}
            >
              {t.createBtn}
            </button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
  
  const renderCreateWallet = () => (
    <BrowserFrame url="https://metamask.io" urlColor="#f6851b">
      <div style={{ background: '#ffffff', minHeight: '70vh' }} className="flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-12">
          <div className="flex items-center justify-center" style={{ marginBottom: '60px' }}>
            <img src={Fox} alt="MetaMask Fox" className="w-32 h-32 object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 text-center" style={{ marginBottom: '60px' }}>{t.createBtn}</h1>
          <div>
            <input 
              type="password" 
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ marginBottom: '50px' }}
            />
            <input 
              type="password" 
              placeholder={t.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ marginBottom: '50px' }}
            />
            <button 
              onClick={handleCreateWallet}
              className="w-full py-3 rounded-full text-white font-bold" 
              style={{ backgroundColor: '#037dd6' }}
            >
              {t.submitBtn}
            </button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
  
  const renderWalletCreated = () => (
    <BrowserFrame url="https://metamask.io" urlColor="#f6851b">
      <div style={{ background: '#ffffff', minHeight: '70vh' }} className="flex items-center justify-center">
        <div className="w-full max-w-2xl px-6 py-12">
          <div className="flex items-center justify-center" style={{ marginBottom: '50px' }}>
            <img src={Fox} alt="MetaMask Fox" className="w-28 h-28 object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 text-center" style={{ marginBottom: '50px' }}>{t.walletCreatedTitle}</h1>
          
          <div>
            {/* 钱包地址 */}
            <div className="bg-gray-50 p-6 rounded-lg" style={{ marginBottom: '40px' }}>
              <p className="text-sm font-semibold text-gray-700" style={{ marginBottom: '15px' }}>{t.addressLabel}</p>
              <p className="font-mono text-lg text-gray-900 break-all" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>{config.wallet.address}</p>
            </div>
            
            {/* 助记词 - 不可选取 */}
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
              <p className="text-sm font-semibold text-gray-700" style={{ marginBottom: '20px' }}>{t.mnemonicLabel}</p>
              <div className="grid grid-cols-3 gap-4" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                {config.wallet.mnemonic.split(' ').map((word, index) => (
                  <div key={index} className="bg-white p-3 rounded border border-gray-300 text-center">
                    <span className="text-xs text-gray-500">{index + 1}.</span>
                    <span className="ml-1 font-mono text-sm">{word}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 继续按钮 */}
            <div style={{ marginTop: '40px' }}>
              <button 
                onClick={() => setView('coinbase')}
                className="w-full py-4 rounded-full text-white font-bold text-lg" 
                style={{ backgroundColor: '#f6851b' }}
              >
                {language === 'chinese' ? '繼續' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );

  const renderConnectWallet = () => {
    const handleSubmitConnection = () => {
      // 不需要验证，直接显示问题框
      console.log('Button clicked! Setting showConnectQuestion to true');
      setShowConnectQuestion(true);
    };

    const handleConfirmAnswer = (answer) => {
      if (answer === 'yes') {
        alert(language === 'chinese' 
          ? '⚠️ 危險！你剛才在一個釣魚網站輸入了你的密碼和助記詞！\n\n真實案例：攻擊者會建立假的交易平台網站，誘騙用戶輸入錢包資訊，從而盜取資產。\n\n請記住：永遠不要在任何網站上輸入你的助記詞！' 
          : '⚠️ Danger! You just entered your password and seed phrase on a phishing website!\n\nReal case: Attackers create fake trading platform websites to trick users into entering their wallet information and steal their assets.\n\nRemember: Never enter your seed phrase on any website!');
        setView('walletCreated');
      } else {
        alert(language === 'chinese' 
          ? '✅ 正確！你不應該在這個網站輸入助記詞！\n\n這是一個釣魚網站。真正的交易平台不會要求你輸入完整的助記詞。' 
          : '✅ Correct! You should not enter your seed phrase on this website!\n\nThis is a phishing website. Real trading platforms never ask for your complete seed phrase.');
        setView('coinbase');
        setShowConnectQuestion(false);
      }
    };

    console.log('renderConnectWallet - showConnectQuestion:', showConnectQuestion);
    
    return (
      <BrowserFrame url="http://www.coinbase.io" urlColor="#0052FF">
        <div style={{ background: '#ffffff', minHeight: '70vh', padding: '40px 20px' }}>
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex gap-8">
              {/* 左侧：表单部分 */}
              <div className="w-1/2">
                <div className="flex items-center justify-center" style={{ marginBottom: '40px' }}>
                  <img src={CoinbaseLogo} alt="Coinbase" className="h-16 object-contain" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 text-center" style={{ marginBottom: '40px' }}>
                  {language === 'chinese' ? '連接你的錢包' : 'Connect Your Wallet'}
                </h1>
                
                <div>
                  <div style={{ marginBottom: '30px' }}>
                    <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: '10px' }}>
                      {language === 'chinese' ? '密碼' : 'Password'}
                    </label>
                    <input 
                      type="password" 
                      placeholder={language === 'chinese' ? '輸入密碼' : 'Enter password'}
                      value={connectPassword}
                      onChange={(e) => setConnectPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={true}
                      style={{ 
                        backgroundColor: '#f5f5f5', 
                        cursor: 'not-allowed',
                        opacity: 0.6
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '40px' }}>
                    <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: '10px' }}>
                      {language === 'chinese' ? '助記詞（12個單詞）' : 'Seed Phrase (12 words)'}
                    </label>
                    <textarea 
                      placeholder={language === 'chinese' ? '輸入你的12個助記詞，用空格分隔' : 'Enter your 12 seed words, separated by spaces'}
                      value={connectMnemonic}
                      onChange={(e) => setConnectMnemonic(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      disabled={true}
                      style={{ 
                        backgroundColor: '#f5f5f5', 
                        cursor: 'not-allowed',
                        opacity: 0.6
                      }}
                    />
                  </div>
                  
                  <button 
                    onClick={handleSubmitConnection}
                    className="w-full py-4 rounded-lg text-white font-bold text-lg transition-all" 
                    style={{ 
                      backgroundColor: '#cccccc',
                      cursor: 'not-allowed',
                      opacity: 0.6
                    }}
                    disabled={true}
                  >
                    {language === 'chinese' ? '連接錢包' : 'Connect Wallet'}
                  </button>
                </div>
              </div>

              {/* 右侧：问题确认框 */}
              <div className="w-1/2 flex items-center justify-center">
                <div className="text-center p-16" style={{ 
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '40px',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 -6px 0 rgba(0, 0, 0, 0.1)',
                  border: '6px solid #fbbf24',
                  width: '100%',
                  maxWidth: '500px'
                }}>
                  <h3 className="text-4xl mb-16" style={{ 
                    color: '#1a1a1a',
                    textShadow: '4px 4px 0px #fbbf24, -2px -2px 0px #fef3c7',
                    fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'unset'
                  }}>
                    {language === 'chinese' ? '你是否輸入密碼以及助記詞？' : 'Did you enter your password and seed phrase?'}
                  </h3>
                  <div className="flex gap-12 justify-center">
                    <button
                      onClick={() => handleConfirmAnswer('yes')}
                      className="px-16 py-6 text-2xl text-white"
                      style={{
                        background: 'linear-gradient(145deg, #dc2626 0%, #991b1b 100%)',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)',
                        border: '4px solid #7f1d1d',
                        fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {language === 'chinese' ? '是' : 'Yes'}
                    </button>
                    
                    <button
                      onClick={() => handleConfirmAnswer('no')}
                      className="px-16 py-6 text-2xl text-white"
                      style={{
                        background: 'linear-gradient(145deg, #16a34a 0%, #15803d 100%)',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(22, 163, 74, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2)',
                        border: '4px solid #14532d',
                        fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {language === 'chinese' ? '否' : 'No'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  };

  const renderCoinbase = () => {
    const handleCreateNewWallet = () => {
      alert(language === 'chinese' 
        ? '你已經建立錢包，請連接你現有的錢包' 
        : 'You have already created a wallet, please connect your existing wallet');
    };

    const handleConnectExistingWallet = () => {
      setView('connectWallet');
    };

    return (
      <BrowserFrame url="http://www.coinbase.io" urlColor="#0052FF">
        <div style={{ background: '#ffffff', minHeight: '70vh' }} className="flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-12">
            <div className="flex items-center justify-center" style={{ marginBottom: '60px' }}>
              <img src={CoinbaseLogo} alt="Coinbase" className="h-20 object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center" style={{ marginBottom: '30px' }}>
              {language === 'chinese' ? '歡迎來到 Coinbase' : 'Welcome to Coinbase'}
            </h1>
            <p className="text-center text-gray-600" style={{ marginBottom: '60px' }}>
              {language === 'chinese' 
                ? '開始您的加密貨幣交易之旅' 
                : 'Start your cryptocurrency trading journey'}
            </p>
            
            <div>
              <button 
                onClick={handleCreateNewWallet}
                className="w-full py-5 rounded-lg text-white font-bold text-lg transition-all hover:opacity-90" 
                style={{ backgroundColor: '#0052FF', marginBottom: '35px' }}
              >
                {language === 'chinese' ? '建立新錢包' : 'Create New Wallet'}
              </button>
              
              <button 
                onClick={handleConnectExistingWallet}
                className="w-full py-5 rounded-lg font-bold text-lg transition-all border-2 hover:bg-gray-50" 
                style={{ borderColor: '#0052FF', color: '#0052FF', marginBottom: '40px' }}
              >
                {language === 'chinese' ? '連接已有錢包' : 'Connect Existing Wallet'}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              {language === 'chinese' 
                ? '透過連接錢包，您同意我們的服務條款' 
                : 'By connecting your wallet, you agree to our Terms of Service'}
            </p>
          </div>
        </div>
      </BrowserFrame>
    );
  };

  const renderSearch = () => (
    <BrowserFrame url="https://www.google.com/search?q=MetaMask" urlColor="#22d3ee">
      <div className="g-body">
        <style>{styles}</style>

        {/* Header */}
        <div className="header">
        <div className="logo">
          <img src={GoogleLogo} alt="Google" />
        </div>

        <div className="search-bar">
            <input type="text" value={t.searchQuery} readOnly />
        </div>
        </div>

        {/* Nav */}
        <div className="nav">
          {tabs.map((label, idx) => (
            <a key={idx} href="#" className={idx === 0 ? 'active' : ''} onClick={(e) => e.preventDefault()}>{label}</a>
          ))}
        </div>

        {/* Results */}
        <div className="results">
        {/* 1. 釣魚廣告 */}
        <div className="result phish-result" onClick={() => handleClick('ad')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleClick('ad')}>
          <div className="result-header">
            <div className="favicon google"><span>G</span></div>
            <div>
                <div className="ad-label">{t.ad}</div>
              <a href="#" className="result-title" onClick={(e) => e.preventDefault()}>MetaMask 官方下載 | 最新版本 v12.1</a>
              <div className="result-url">https://metamask-download.com<span className="ellipsis">...</span></div>
              <div className="result-desc">官方合作夥伴提供快速安裝服務，支援多鏈錢包，一鍵備份助記詞，安全可靠。</div>
            </div>
          </div>
        </div>

          {/* 2. 官方網站（正確） */}
          <div className="result safe-result" onClick={() => setView('onboarding')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setView('onboarding')}>
          <div className="result-header">
            <div className="favicon google"><span>G</span></div>
            <div>
                <a href="#" className="result-title" onClick={(e) => e.preventDefault()}>{t.officialTitle}</a>
                <div className="result-url">https://metamask.io<span className="ellipsis">...</span></div>
                <div className="result-desc">{t.officialDesc}</div>
            </div>
          </div>
        </div>

        {/* 3. Discord 朋友推薦（木馬） */}
        <div className="result phish-result" onClick={() => handleClick('discord')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleClick('discord')}>
          <div className="result-header">
            <div className="favicon google"><span>G</span></div>
            <div>
              <a href="#" className="result-title" onClick={(e) => e.preventDefault()}>【官方認證】MetaMask 快速安裝包（免設定）</a>
              <div className="result-url">https://metamask-official.download<span className="ellipsis">...</span></div>
              <div className="result-desc">Discord 社群熱推！官方認證安裝檔，自動備份助記詞到雲端，再也不怕遺失！</div>
            </div>
          </div>
        </div>

        {/* 4. 網頁創建錢包（陷阱） */}
        <div className="result phish-result" onClick={() => handleClick('webtool')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleClick('webtool')}>
          <div className="result-header">
            <div className="favicon google"><span>G</span></div>
            <div>
              <a href="#" className="result-title" onClick={(e) => e.preventDefault()}>線上創建錢包 - 無需下載 | 30 秒完成</a>
              <div className="result-url">https://create-metamask-wallet.com<span className="ellipsis">...</span></div>
              <div className="result-desc">不想安裝軟體？直接在網頁上創建你的加密錢包！支援所有鏈，立即領取新手空投！</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </BrowserFrame>
  );

  const renderView = () => {
    switch (view) {
      case 'search':
        return renderSearch();
      case 'onboarding':
        return renderOnboarding();
      case 'createWallet':
        return renderCreateWallet();
      case 'coinbase':
        return renderCoinbase();
      case 'walletCreated':
        return renderWalletCreated();
      case 'connectWallet':
        return renderConnectWallet();
      default:
        return renderSearch();
    }
  };

  const storyText = language === 'chinese' 
    ? '你喜愛的KOL 小鯊魚 最近在推薦一個交易平台coinbase 你做了一下調查後決定先在MetaMask建立一個錢包 然之後再把錢包綁定在這個交易平台下 在Google搜尋的結果下按進了第一個coinbase的連結'
    : 'Your favorite KOL, Little Shark, recently recommended a trading platform called Coinbase. After doing some research, you decided to first create a wallet in MetaMask and then connect it to this trading platform. You clicked on the first Coinbase link in the Google search results.';

  return (
    <ChallengeTemplate 
      language={language}
      setLanguage={setLanguage}
      title={`${t.title}${t.subtitle ? `: ${t.subtitle}` : ''}`}
      showLanguageSwitch={true}
      containerMaxWidth="75vw"
      containerMaxHeight="75vh"
    >
      {/* 剧情描述框 - 在浏览器外面 */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        padding: '20px 30px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ 
          color: '#ffffff', 
          fontSize: '16px', 
          lineHeight: '1.6',
          margin: 0,
          textAlign: 'center',
          fontWeight: '500'
        }}>
          📱 {storyText}
        </p>
      </div>
      
      {renderView()}
    </ChallengeTemplate>
  );
};

export default GoogleSearchMetaMask;


