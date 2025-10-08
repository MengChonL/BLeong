import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import GamePage from "./pages/GamePage";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;