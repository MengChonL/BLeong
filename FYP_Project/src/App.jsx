import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import GamePage from "./pages/GamePage";
import ChallengePage from "./pages/ChallengePage";
import Level2_4_GoogleSearchMetaMask from "./components/challenges/Level2-4_GoogleSearchMetaMask";
// 首先導入 Tailwind CSS 基礎樣式
import "./main.tailwind.css";
// 然後導入其他樣式文件
import "./index.css";
import "./styles/global.css";
import "./styles/pixel-font.css"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/game" element={<GamePage />} />
        
        {/* 动态路由系统 - 所有挑战使用统一路由 */}
        <Route path="/challenge/:type/:id" element={<ChallengePage />} />
        {/* 專用路由：Level 2-4 Google 搜尋釣魚頁面預覽 */}
        <Route path="/challenge/phishing/level2-4" element={<Level2_4_GoogleSearchMetaMask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;