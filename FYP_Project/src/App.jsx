import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import GamePage from "./pages/GamePage";
import ChallengePage from "./pages/ChallengePage";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;