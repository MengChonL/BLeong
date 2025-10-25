import React from 'react';
import { motion } from 'framer-motion';

/**
 * 挑战结果页面组件 - 像素风格设计
 * 可用于显示成功或失败的结果
 * 
 * @param {Object} props
 * @param {boolean} props.isSuccess - 是否成功
 * @param {string} props.title - 关卡标题（如"唯一之跡，無擾無疑"）
 * @param {string} props.description - 任务描述
 * @param {string} props.successMessage - 成功时的主标题
 * @param {string} props.failureMessage - 失败时的主标题
 * @param {string} props.successExplanation - 成功说明文字
 * @param {string} props.failureExplanation - 失败说明文字
 * @param {string} props.successSubtitle - 成功时的副标题（默认："恭喜完成任務"）
 * @param {string} props.retryButtonText - 重试按钮文本（默认："重試"）
 * @param {Array} props.checkItems - 检查项目数组 [{label: string, value: string, isCorrect: boolean, showValue: boolean, details: ReactNode}]
 * @param {Function} props.onRetry - 重试按钮点击事件（仅失败时显示）
 * @param {Object} props.customStyles - 自定义样式
 */
const ChallengeResultScreen = ({
  isSuccess = false,
  title = "",
  description = "",
  successMessage = "挑戰成功！",
  failureMessage = "挑戰失敗！",
  successExplanation = "恭喜！你成功完成了挑戰。",
  failureExplanation = "請檢查以下項目：",
  successSubtitle = "恭喜完成任務",
  retryButtonText = "重試",
  checkItems = [],
  onRetry = null,
  customStyles = {}
}) => {
  const themeColor = isSuccess ? '#22c55e' : '#ef4444';
  const themeBgColor = isSuccess ? 'green' : 'red';
  const themeColorRgb = isSuccess ? '34, 197, 94' : '239, 68, 68';

  // 像素化的勾图标组件
  const PixelCheckmark = ({ size = 24, color = "#22c55e" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "6" : "5"} y={size > 24 ? "15" : "14"} width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "9" : "7"} y={size > 24 ? "18" : "16"} width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "12" : "9"} y={size > 24 ? "15" : "14"} width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "15" : "11"} y="12" width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "18" : "13"} y={size > 24 ? "9" : "10"} width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
      <rect x={size > 24 ? "21" : "15"} y={size > 24 ? "6" : "8"} width={size > 24 ? "3" : "2"} height={size > 24 ? "3" : "2"} fill={color}/>
    </svg>
  );

  // 像素化的X图标组件
  const PixelCross = ({ size = 24, color = "#ef4444" }) => {
    const scale = size / 24;
    const pixelSize = size > 24 ? 3 : 2;
    
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* 左上到右下的对角线 */}
        <rect x="6" y="6" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="9" y="9" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="12" y="12" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="15" y="15" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="18" y="18" width={pixelSize} height={pixelSize} fill={color}/>
        
        {/* 右上到左下的对角线 */}
        <rect x="18" y="6" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="15" y="9" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="9" y="15" width={pixelSize} height={pixelSize} fill={color}/>
        <rect x="6" y="18" width={pixelSize} height={pixelSize} fill={color}/>
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div 
        className="relative w-full h-full bg-gray-900 overflow-hidden pixel-font text-white" 
        style={{ 
          minHeight: '80vh',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
          ...customStyles.container
        }}
      >
        {/* 装饰性圆圈和线条 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <filter id={isSuccess ? "glowGreen" : "glow"}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {isSuccess ? (
            // 成功时的绿色圆圈装饰
            <>
              <circle cx="20%" cy="35%" r="80" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5" filter="url(#glowGreen)" opacity="0.6">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="80%" cy="55%" r="100" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5" filter="url(#glowGreen)" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="90%" cy="15%" r="40" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.2"/>
              <circle cx="10%" cy="85%" r="50" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.2"/>
              <circle cx="85%" cy="88%" r="50" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.15"/>
              <path d="M 10% 30% Q 50% 20%, 90% 25%" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.3" filter="url(#glowGreen)"/>
              <path d="M 15% 70% Q 50% 75%, 85% 68%" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3" filter="url(#glowGreen)"/>
            </>
          ) : (
            // 失败时的红色圆圈标注
            <>
              {checkItems.map((item, index) => {
                if (item.isCorrect) return null;
                const yPosition = 30 + (index * 17);
                const radiusY = 10 - (index * 0.5);
                return (
                  <g key={index}>
                    <ellipse 
                      cx="20%" 
                      cy={`${yPosition}%`} 
                      rx="15%" 
                      ry={`${radiusY}%`} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="3" 
                      strokeDasharray="5,5" 
                      filter="url(#glow)" 
                      opacity="0.8"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite"/>
                    </ellipse>
                    <path 
                      d={`M 35% ${yPosition}% Q 50% ${yPosition - 3}%, 70% ${yPosition}%`} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      filter="url(#glow)" 
                      opacity="0.8"
                    />
                  </g>
                );
              })}
              <circle cx="90%" cy="12%" r="40" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.2"/>
              <circle cx="10%" cy="95%" r="30" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.2"/>
              <circle cx="85%" cy="88%" r="50" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.15"/>
            </>
          )}
        </svg>

        {/* 内容区域 */}
        <div className="relative" style={{ zIndex: 2 }}>
          {/* 关卡信息顶部 */}
          {title && (
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-4 px-6 border-b-2 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-bold ${isSuccess ? 'text-green-400' : 'text-blue-400'}`}>
                    {title}
                  </h3>
                  {description && (
                    <p className="text-sm text-gray-300 mt-1">{description}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success/Failure Banner */}
          <div 
            className={`text-white py-6 px-6 flex items-center justify-center gap-4 border-b-4`}
            style={{
              backgroundColor: isSuccess ? '#16a34a' : '#dc2626',
              borderBottomColor: isSuccess ? '#15803d' : '#991b1b'
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {isSuccess ? (
                <PixelCheckmark size={40} color="white" />
              ) : (
                <PixelCross size={40} color="white" />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                {isSuccess ? successMessage : failureMessage}
              </h2>
              <p className="text-sm md:text-base opacity-90">
                {isSuccess ? successSubtitle : failureExplanation}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div 
            className="p-8 space-y-6 flex flex-col items-center justify-center" 
            style={{ minHeight: isSuccess ? '50vh' : 'auto' }}
          >
            {isSuccess ? (
              // 成功页面内容
              <>
                {/* 大的成功图标 */}
                <div className="mb-8">
                  <svg width="160" height="160" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="12" width="3" height="3" fill="#22c55e"/>
                    <rect x="5" y="15" width="3" height="3" fill="#22c55e"/>
                    <rect x="8" y="18" width="4" height="4" fill="#22c55e"/>
                    <rect x="12" y="14" width="4" height="4" fill="#22c55e"/>
                    <rect x="16" y="10" width="3" height="3" fill="#22c55e"/>
                    <rect x="19" y="7" width="3" height="3" fill="#22c55e"/>
                    <rect x="22" y="4" width="2" height="2" fill="#22c55e"/>
                  </svg>
                </div>

                {/* 成功信息卡片 */}
                {successExplanation && (
                  <div 
                    className="max-w-2xl w-full bg-green-900/30 border-2 border-green-500 p-8 rounded-lg" 
                    style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
                  >
                    <h3 className="text-3xl font-bold text-green-300 mb-6 text-center">
                      {successMessage}
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed text-center">
                      {successExplanation}
                    </p>
                  </div>
                )}

                {/* 成功详情列表 */}
                {checkItems.length > 0 && (
                  <div className="max-w-2xl w-full space-y-3 mt-8">
                    {checkItems.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-green-900/30 border-2 border-green-500 rounded-lg"
                        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
                      >
                        <div className="flex items-center gap-3">
                          <PixelCheckmark size={24} color="#22c55e" />
                          <span className="text-green-300 font-bold">{item.label}</span>
                        </div>
                        {item.showValue && item.value && (
                          <span className="text-gray-300 text-sm">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // 失败页面内容
              <>
                {checkItems.length > 0 && (
                  <div className="w-full space-y-4">
                    {checkItems.map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-start justify-between p-4 border-2 ${
                          item.isCorrect 
                            ? 'bg-green-900/30 border-green-500' 
                            : 'bg-red-900/30 border-red-500'
                        }`}
                        style={{ 
                          boxShadow: item.isCorrect 
                            ? '0 0 15px rgba(34, 197, 94, 0.3)' 
                            : '0 0 15px rgba(239, 68, 68, 0.3)' 
                        }}
                      >
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-2 ${
                            item.isCorrect ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {item.label}
                          </h3>
                          {item.details && (
                            <div className="text-sm text-gray-300">
                              {item.details}
                            </div>
                          )}
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center ml-4">
                          {item.isCorrect ? (
                            <PixelCheckmark size={32} color="#22c55e" />
                          ) : (
                            <PixelCross size={32} color="#ef4444" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Button - 仅失败时显示 */}
          {!isSuccess && onRetry && (
            <div className="px-6 pb-8 pt-12 flex justify-center">
              <button 
                onClick={onRetry}
                className="px-12 py-4 text-white font-bold text-lg rounded-lg border-3 transition-all transform hover:scale-110 active:scale-95"
                style={{ 
                  backgroundColor: '#ef4444',
                  borderColor: '#fca5a5',
                  borderWidth: '3px',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.8), inset 0 -3px 0 rgba(0,0,0,0.3)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(239, 68, 68, 1), inset 0 -3px 0 rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.8), inset 0 -3px 0 rgba(0,0,0,0.3)';
                }}
              >
                {retryButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeResultScreen;

