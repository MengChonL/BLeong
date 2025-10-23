import React from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeConfig } from '../config/challenges-config';
import Level2_1_AddressPoisoningChallenge from '../components/challenges/Level2-1_AddressPoisoningChallenge';
import Level1_1_PhishingChallenge from '../components/challenges/Level1-1_PhishingChallenge';
import Level1_2_WalletTransferChallenge from '../components/challenges/Level1-2_WalletTransferChallenge';
import Level1_3_ChatNFTScam from '../components/challenges/Level1-3_ChatNFTScam';
import Level2_4_GoogleSearchMetaMask from '../components/challenges/Level2-4_GoogleSearchMetaMask';

/**
 * 通用挑战页面
 * 根据 URL 参数动态加载对应的挑战
 * 路由格式: /challenge/:type/:id
 * 例如: /challenge/addressPoisoning/level1-2
 */
const ChallengePage = () => {
  const { type, id } = useParams();
  
  // 从配置文件获取挑战数据
  const config = getChallengeConfig(id);

  // 如果找不到配置，显示错误
  if (!config) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-4">挑战未找到</p>
          <p className="text-gray-400">Type: {type}, ID: {id}</p>
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

  // 根据挑战类型和模式渲染对应的组件
  switch (type) {
    case 'addressPoisoning':
      // 根据模式选择不同的组件
      if (config.mode === 'wallet') {
        return <Level1_2_WalletTransferChallenge config={config} />;
      }
      return <Level2_1_AddressPoisoningChallenge config={config} />;
    
    case 'phishing':
      // 根据挑战ID选择不同的组件
      if (id === 'level2-4') {
        return <Level2_4_GoogleSearchMetaMask config={config} />;
      }
      return <Level1_1_PhishingChallenge config={config} />;
    
    case 'chatNFT':
      return <Level1_3_ChatNFTScam config={config} />;
    
    
    default:
      return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">未知挑战类型</h1>
            <p className="text-xl">{type}</p>
          </div>
        </div>
      );
  }
};

export default ChallengePage;

