"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [rejectCount, setRejectCount] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const rejectBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rejectMessages = [
    "不许拒绝！再想想？🥺",
    "你确定吗？我会很难过的😢",
    "再给我一次机会嘛～💕",
    "别点这个按钮啦！点另一个～🌹",
    "你忍心拒绝我吗？😭",
    "我已经买好票了呢～🎬",
    "拒绝无效！请重新选择 😤",
    "这个按钮坏了，点另一个吧 🔧",
  ];

  // 生成随机浮动爱心
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        };
        const updated = [...prev, newHeart];
        if (updated.length > 15) updated.shift();
        return updated;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleReject = useCallback(() => {
    setRejectCount((prev) => prev + 1);

    if (rejectBtnRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const btn = rejectBtnRef.current.getBoundingClientRect();

      const maxX = container.width - btn.width - 20;
      const maxY = container.height - btn.height - 20;

      const randomX = Math.max(20, Math.random() * maxX);
      const randomY = Math.max(20, Math.random() * maxY);

      rejectBtnRef.current.style.position = "fixed";
      rejectBtnRef.current.style.left = `${randomX}px`;
      rejectBtnRef.current.style.top = `${randomY}px`;
      rejectBtnRef.current.style.transition = "all 0.3s ease";
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-rose-300 to-red-300 relative overflow-hidden">
        {/* 成功页面的爱心雨 */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              fontSize: `${16 + Math.random() * 24}px`,
            }}
          >
            💖
          </div>
        ))}

        <div className="z-10 text-center px-6">
          <div className="text-7xl mb-8 animate-pulse">🎉</div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
          >
            期待我们的见面
          </h1>
          <p className="text-xl text-white/90 mt-4 mb-2">
            我会准时来接你的 💐
          </p>
          <div className="mt-8 text-6xl animate-bounce">🥰</div>
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
            <p className="text-white text-lg">📅 这周日</p>
            <p className="text-white text-lg">🎬 一起看电影</p>
            <p className="text-white text-lg">💕 不见不散</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 relative overflow-hidden"
    >
      {/* 浮动爱心背景 */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none opacity-30 animate-pulse"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${16 + Math.random() * 20}px`,
            transition: "all 1s ease",
          }}
        >
          💗
        </div>
      ))}

      <div className="z-10 text-center px-6 max-w-lg">
        {/* 信封动画 */}
        <div className="text-6xl mb-6 animate-bounce">💌</div>

        {/* 主卡片 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-relaxed">
            这周日约你看电影
            <br />
            好吗？
          </h1>

          <div className="text-5xl my-6">🎬✨</div>

          {rejectCount > 0 && (
            <p className="text-pink-500 text-sm mb-4 animate-pulse font-medium">
              {rejectMessages[rejectCount % rejectMessages.length]}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={handleAccept}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300 active:scale-95 min-w-[160px]"
            >
              好呀 💕
            </button>

            <button
              ref={rejectBtnRef}
              onClick={handleReject}
              className="px-8 py-3 bg-gray-200 text-gray-500 text-base rounded-full hover:bg-gray-300 transition-all duration-300 min-w-[120px] z-50"
              style={
                rejectCount > 3
                  ? { fontSize: `${Math.max(10, 16 - rejectCount)}px`, opacity: Math.max(0.3, 1 - rejectCount * 0.1) }
                  : {}
              }
            >
              {rejectCount === 0
                ? "再想想..."
                : rejectCount < 3
                ? "还是算了"
                : rejectCount < 5
                ? "我点不到了"
                : "投降投降"}
            </button>
          </div>
        </div>

        {/* 底部提示 */}
        <p className="text-pink-400/60 text-xs mt-8">
          💌 来自一个很想见你的人
        </p>
      </div>
    </div>
  );
}
