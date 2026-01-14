import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Heart, Zap, Infinity, Star, Move, Eye, Moon, Feather, Sun, Droplets, Wind, Mountain, Flower, Cloud, Download, X, Volume2, VolumeX, Microscope, ChevronLeft, ChevronRight } from 'lucide-react';

// --- 1. 音效資源連結 ---
const AUDIO_SRC = {
  dayBgm: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
  nightBgm: "https://assets.mixkit.co/music/preview/mixkit-night-sky-970.mp3",
  cardFlip: "https://assets.mixkit.co/sfx/preview/mixkit-game-card-flip-2569.mp3",
  click: "https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3",
  swoosh: "https://assets.mixkit.co/sfx/preview/mixkit-light-transition-whoosh-2611.mp3"
};

// --- 2. 自定義 SVG 圖示 ---
const InstagramShareIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// --- 3. 數據庫與配置 ---
const CHAKRAS = [
  { id: 'root', name: '海底輪 · Root Chakra', color: 'border-red-400', textColor: 'text-red-900', dayTextColor: 'text-red-900', subColor: 'text-red-600/60', shadow: 'shadow-red-900/10', iconColor: 'text-red-500', keywords: '生存 · 安全 · 穩定', guidance: '對應脊椎根部，代表生存本能、安全感與大地的連結。' },
  { id: 'sacral', name: '生殖輪 · Sacral Chakra', color: 'border-orange-400', textColor: 'text-orange-900', dayTextColor: 'text-orange-900', subColor: 'text-orange-600/60', shadow: 'shadow-orange-900/10', iconColor: 'text-orange-500', keywords: '情緒 · 創造 · 喜悅', guidance: '對應下腹部，代表情緒流動、感官享受與創造力的泉源。' },
  { id: 'solar', name: '太陽神經叢 · Solar Plexus', color: 'border-yellow-500', textColor: 'text-yellow-900', dayTextColor: 'text-yellow-800', subColor: 'text-yellow-700/60', shadow: 'shadow-yellow-900/10', iconColor: 'text-yellow-600', keywords: '自信 · 意志 · 行動', guidance: '對應胃部，代表意志力、自信與個人力量的主導權。' },
  { id: 'heart', name: '心輪 · Heart Chakra', color: 'border-green-500', textColor: 'text-green-900', dayTextColor: 'text-green-900', subColor: 'text-green-700/60', shadow: 'shadow-green-900/10', iconColor: 'text-green-600', keywords: '愛 · 寬恕 · 接納', guidance: '對應心臟與胸腔，代表無條件的愛、接納與慈悲的流動。' },
  { id: 'throat', name: '喉輪 · Throat Chakra', color: 'border-blue-400', textColor: 'text-blue-900', dayTextColor: 'text-blue-900', subColor: 'text-blue-700/60', shadow: 'shadow-blue-900/10', iconColor: 'text-blue-500', keywords: '溝通 · 真實 · 表達', guidance: '對應喉嚨，代表真實的溝通、自我表達與內在誠信。' },
  { id: 'thirdEye', name: '眉心輪 · Third Eye', color: 'border-indigo-400', textColor: 'text-indigo-900', dayTextColor: 'text-indigo-900', subColor: 'text-indigo-700/60', shadow: 'shadow-indigo-900/10', iconColor: 'text-indigo-600', keywords: '直覺 · 洞見 · 想像', guidance: '對應眉心，代表直覺力、洞察力與超越表象的智慧。' },
  { id: 'crown', name: '頂輪 · Crown Chakra', color: 'border-violet-400', textColor: 'text-violet-900', dayTextColor: 'text-violet-900', subColor: 'text-violet-700/60', shadow: 'shadow-violet-900/10', iconColor: 'text-violet-600', keywords: '靈性 · 合一 · 智慧', guidance: '對應頭頂，代表靈性連結、合一意識與更高的悟性。' },
];

const QUOTES_DB = [
  // --- 紅色：海底輪 (Root) ---
  { text: "恐懼存在是因為你活在你的想像中，而不是活在現實中。", en: "Fear is simply because you are not living with life, you are living in your mind.", type: "root" },
  { text: "活得像沒有明天一樣，但要有活到永遠的計畫。", en: "Live like there's no tomorrow, but plan like you'll live forever.", type: "root" },

  // --- 橙色：生殖輪 (Sacral) ---
  { text: "讓你的生命成為一場慶祝，而不是一場戰鬥。", en: "Make your life a celebration, not a battle.", type: "sacral" },
  { text: "快樂是具有傳染性的。", en: "Joy is contagious.", type: "sacral" },

  // --- 黃色：太陽神經叢 (Solar Plexus) ---
  { text: "命運被形塑，在決定的每一瞬間。", en: "It is in your moments of decision that your destiny is shaped.", type: "solar" },
  { text: "決策是力量之父。", en: "Decision is the father of power.", type: "solar" },

  // --- 綠色：心輪 (Heart) ---
  { text: "傷口是光進入你內心的地方。", en: "The wound is the place where the Light enters you.", type: "heart" },
  { text: "你被深愛著，超出你的想像。", en: "You are loved beyond your imagination.", type: "heart" },

  // --- 藍色：喉輪 (Throat) ---
  { text: "在寂靜中，你會聽見宇宙的聲音。", en: "In silence, you will hear the voice of the universe.", type: "throat" },
   { text: "話語是行動的種子。", en: "Words are the seeds of action.", type: "throat" },
 
  // --- 靛色：眉心輪 (Third Eye) ---
  { text: "閉上雙眼，才能看見真實的世界。", en: "Close your eyes to see the real world.", type: "thirdEye" },
  { text: "放下已知，擁抱未知。", en: "Drop the known; embrace the unknown.", type: "thirdEye" },

  // --- 紫色：頂輪 (Crown) ---
  { text: "你不是擁有靈魂的人類，你是正在體驗人生的靈魂。", en: "You are not a human being having a spiritual experience. You are a spiritual being having a human experience.", type: "crown" },
  { text: "愛是所有問題的答案。", en: "Love is the answer to all questions.", type: "crown" },
];

// --- 4. 組件 ---

const Card = ({ data, isRevealed, onClick, index, theme, isMobileFocused, className = "", autoHeight = false, captureMode = false }) => {
  const chakraInfo = CHAKRAS.find(c => c.id === data.type);
  if (!chakraInfo) return null;
 
  // 根據 autoHeight 決定高度樣式
  const heightClass = autoHeight ? "h-auto min-h-96" : "h-96";
  const innerHeightClass = autoHeight ? "h-auto min-h-full" : "h-full";
 
  return (
    <div
      className={`relative w-64 ${heightClass} cursor-pointer ${!captureMode ? 'perspective-1000' : ''} transition-transform duration-700 ${className} ${isRevealed && !isMobileFocused ? '' : 'hover:scale-105'}`}
      onClick={onClick}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`relative w-full ${innerHeightClass} ${!captureMode ? 'duration-1000 preserve-3d' : ''} transition-all ${(isRevealed && !captureMode) ? 'rotate-y-180' : ''}`}>
       
        {/* --- 卡牌背面 --- */}
        {!captureMode && (
          theme === 'night' ? (
            <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden bg-slate-900 border border-white/10 ${autoHeight ? 'min-h-[24rem]' : ''}`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-black"></div>
              <div className="absolute inset-4 border border-white/10 rounded-lg flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center animate-pulse-slow">
                  <div className="w-1 h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                <div className="absolute">
                  <Sparkles className="text-white/40 w-6 h-6 animate-spin-slow" />
                </div>
              </div>
              <p className="absolute bottom-6 w-full text-center text-white/30 text-[10px] tracking-[0.4em] font-light uppercase">Universe</p>
            </div>
          ) : (
            <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden bg-white border border-stone-300 ${autoHeight ? 'min-h-[24rem]' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-orange-50/10"></div>
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="absolute inset-4 border border-stone-300/60 rounded-lg flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-stone-300/60 flex items-center justify-center animate-pulse-slow">
                  <div className="w-1 h-24 bg-gradient-to-b from-transparent via-orange-200/30 to-transparent"></div>
                  <div className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"></div>
                </div>
                <div className="absolute">
                  <Sun className="text-orange-400/50 w-6 h-6 animate-spin-slow" />
                </div>
              </div>
              <p className="absolute bottom-6 w-full text-center text-stone-400 text-[10px] tracking-[0.4em] font-light uppercase">Awakening</p>
            </div>
          )
        )}

        {/* --- 卡牌正面 --- */}
        <div className={`${captureMode ? 'relative' : 'absolute'} w-full h-full backface-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.1)] ${!captureMode ? 'rotate-y-180' : ''} overflow-hidden flex flex-col items-center text-center p-1 ${theme === 'night' ? 'bg-[#FDFCF8] shadow-black/50' : 'bg-white border border-stone-300 shadow-xl shadow-stone-300/50'}`}>
          <div className={`w-full h-full border-2 ${chakraInfo.color} rounded-lg flex flex-col relative overflow-hidden`}>
             <div className={`absolute top-0 left-0 right-0 h-32 opacity-5 bg-gradient-to-b from-${chakraInfo.color.split('-')[1]}-400 to-transparent`}></div>
             <div className="flex-1 flex flex-col items-center p-5 pt-8 relative z-10">
                <div className={`text-[10px] tracking-[0.2em] uppercase font-bold mb-3 ${chakraInfo.subColor}`}>{chakraInfo.keywords}</div>
                <div className={`mb-6 opacity-90 ${chakraInfo.iconColor}`}>
                   {data.type === 'root' && <Mountain strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'sacral' && <Droplets strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'solar' && <Sun strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'heart' && <Flower strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'throat' && <Wind strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'thirdEye' && <Eye strokeWidth={1.5} className="w-6 h-6" />}
                   {data.type === 'crown' && <Sparkles strokeWidth={1.5} className="w-6 h-6" />}
                </div>
               
                <div className={`flex-1 w-full flex flex-col items-center justify-center my-2 ${autoHeight ? 'h-auto' : 'overflow-y-auto no-scrollbar'}`}>
                  <h3 className={`text-base font-medium mb-2 leading-relaxed tracking-wide ${theme === 'day' ? chakraInfo.dayTextColor || chakraInfo.textColor : chakraInfo.textColor} font-serif text-center`}>{data.text}</h3>
                  <p className="text-[10px] font-serif italic text-slate-500/80 leading-relaxed font-light text-center px-2">{data.en}</p>
                </div>
               
                <div className="mt-auto w-full mb-12 pb-6 shrink-0">
                  <div className="flex items-center justify-center gap-2 mb-2 opacity-20">
                      <div className={`h-[1px] flex-1 ${chakraInfo.color.replace('border', 'bg')}`}></div>
                      <Feather className="w-3 h-3 text-slate-400" />
                      <div className={`h-[1px] flex-1 ${chakraInfo.color.replace('border', 'bg')}`}></div>
                  </div>
                  <div className={`text-xs text-left leading-relaxed font-light px-4 py-3 rounded bg-slate-50/50 ${theme === 'day' ? chakraInfo.dayTextColor || chakraInfo.textColor : chakraInfo.textColor}`}>
                      <span className="font-bold text-[9px] opacity-60 uppercase tracking-wider block mb-1">Energy Awareness</span>
                      <div className="font-medium mb-1 opacity-80 text-[10px] tracking-wide">{chakraInfo.name}</div>
                      {chakraInfo.guidance}
                  </div>
                </div>
             </div>
             <div className="pb-3 text-[8px] uppercase tracking-[0.2em] text-slate-400/60 font-light mt-2 absolute bottom-0 w-full text-center">{chakraInfo.name}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- 隱藏的分享卡片生成區 ---
const ShareCardView = ({ cardSelected, theme, targetRef }) => {
  if (!cardSelected) return null;

  return (
    <div ref={targetRef} className={`fixed top-[-9999px] left-[-9999px] w-[400px] p-8 flex flex-col items-center justify-center gap-6 ${theme === 'night' ? 'bg-[#1e2029] text-white' : 'bg-[#F5F5F0] text-slate-800'}`}>
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif tracking-[0.3em] mb-1">今日能量卡</h2>
        <p className="text-[10px] tracking-[0.4em] opacity-60 uppercase">Daily Energy Oracle</p>
        <div className="mt-1 text-[10px] opacity-40">{new Date().toLocaleDateString()}</div>
      </div>
      <Card data={cardSelected} isRevealed={true} index={0} theme={theme} autoHeight={true} captureMode={true} />
      <div className="mt-2 text-[8px] tracking-[0.5em] opacity-40 uppercase">Connect With The Universe</div>
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState('intro');
  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([false, false]);
  const [theme, setTheme] = useState('night');
  const [particles, setParticles] = useState([]);
  const [mobileFocusIndex, setMobileFocusIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [cardToShare, setCardToShare] = useState(null);
  const shareRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const bgmRef = useRef(null);
 
  // Simplified State: Just one flag to start the sequence
  const [isHintActive, setIsHintActive] = useState(false);

  // Swipe States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) setTheme('day');
    else setTheme('night');
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio();
      bgmRef.current.loop = true;
    }
    const bgm = bgmRef.current;
    const targetSrc = theme === 'day' ? AUDIO_SRC.dayBgm : AUDIO_SRC.nightBgm;
    if (bgm.src !== targetSrc) {
      bgm.src = targetSrc;
      bgm.load();
      if (!isMuted) bgm.play().catch(e => console.log("Autoplay prevented", e));
    }
  }, [theme]);

  useEffect(() => {
    if (bgmRef.current) {
      if (isMuted) bgmRef.current.pause();
      else bgmRef.current.play().catch(e => console.log("Playback failed", e));
    }
  }, [isMuted]);

  // Unified Hint Logic
  useEffect(() => {
    let timer;
    // 只有當剛好翻開一張牌，且遊戲狀態是 drawing 時，啟動計時器
    if (gameState === 'drawing' && flippedStates.filter(Boolean).length === 1) {
      // 3秒後啟動 "一鏡到底" 的動畫序列
      timer = setTimeout(() => setIsHintActive(true), 3000);
    } else {
      setIsHintActive(false);
    }
    return () => clearTimeout(timer);
  }, [flippedStates, gameState]);

  const playSfx = (type) => {
    if (isMuted) return;
    const sfx = new Audio(AUDIO_SRC[type]);
    sfx.volume = type === 'swoosh' ? 0.4 : 0.6;
    sfx.play().catch(e => console.log("SFX failed", e));
  };

  const toggleTheme = () => { playSfx('click'); setTheme(prev => prev === 'day' ? 'night' : 'day'); };
  const toggleMute = () => { setIsMuted(prev => !prev); };

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const drawCards = () => {
    if (bgmRef.current && bgmRef.current.paused && !isMuted) {
      bgmRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    playSfx('click');
    setGameState('shuffling');
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => {
      const shuffled = [...QUOTES_DB].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      setDrawnCards(selected);
      setGameState('drawing');
    }, 2500);
  };

  const toggleFlip = (index) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && mobileFocusIndex !== index) {
      playSfx('click');
      setMobileFocusIndex(index);
      setIsHintActive(false); // 切換焦點時，停止提示動畫
      return;
    }
    if (flippedStates[index]) return;
    playSfx('cardFlip');
    const newFlipped = [...flippedStates];
    newFlipped[index] = true;
    setFlippedStates(newFlipped);
    if (navigator.vibrate) navigator.vibrate(20);
    if (newFlipped.every(Boolean)) {
      setTimeout(() => setGameState('result'), 1000);
    }
  };

  // --- Touch Event Handlers ---
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
   
    if (isLeftSwipe || isRightSwipe) {
       // Toggle focus
       const isMobile = window.innerWidth < 768;
       if (isMobile) {
          setMobileFocusIndex(prev => prev === 0 ? 1 : 0);
          playSfx('swoosh');
          setIsHintActive(false); // 切換焦點時，停止提示動畫
       }
    }
  };

  const resetGame = () => {
    playSfx('click');
    setGameState('intro');
    setFlippedStates([false, false]);
    setDrawnCards([]);
    setMobileFocusIndex(0);
    setShowShareModal(false);
    setIsHintActive(false);
  };

  const initiateShare = () => { playSfx('click'); setShowShareModal(true); };

  const executeShare = async (card) => {
    playSfx('click');
    setCardToShare(card);
    setIsSharing(true);
    setShowShareModal(false);
    setTimeout(async () => {
      if (!shareRef.current || !window.html2canvas) return;
      try {
        const canvas = await window.html2canvas(shareRef.current, {
          useCORS: true,
          backgroundColor: theme === 'night' ? '#1e2029' : '#F5F5F0',
          scale: 3
        });
        canvas.toBlob(async (blob) => {
          const file = new File([blob], "daily-energy-card.png", { type: "image/png" });
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try { await navigator.share({ files: [file], title: '今日能量卡', text: `這是我今天的宇宙指引：${card.text} ✨` }); }
            catch (err) { console.log("Share canceled", err); }
          } else {
            const link = document.createElement('a');
            link.download = `energy-card-${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();
          }
          setIsSharing(false);
          setCardToShare(null);
        }, 'image/png');
      } catch (error) { console.error("Share failed:", error); setIsSharing(false); setCardToShare(null); }
    }, 500);
  };

  // 判斷手機版提示文字
  const getMobileInstruction = () => {
    const flippedCount = flippedStates.filter(Boolean).length;
    if (flippedCount === 0) return "點擊卡牌翻開訊息";
    return "";
  };

  return (
    <div className={`min-h-screen w-full font-sans overflow-hidden flex flex-col items-center justify-center relative transition-colors duration-1000 ${theme === 'night' ? 'bg-[#050510] text-white' : 'bg-[#F0EFEB] text-slate-800'}`}>
     
      <ShareCardView cardSelected={cardToShare} theme={theme} targetRef={shareRef} />

      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl flex flex-col items-center ${theme === 'night' ? 'bg-[#1e2029] text-white' : 'bg-[#FDFCF5] text-slate-800'}`}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 opacity-50 hover:opacity-100"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-serif tracking-wider mb-6">選擇要下載的卡片</h3>
            <div className="flex gap-4 justify-center w-full">
              {drawnCards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => executeShare(card)}>
                  <div className="transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 shadow-lg rounded-xl overflow-hidden">
                    <div className="w-32 h-48 pointer-events-none"><Card data={card} isRevealed={true} index={idx} theme={theme} className="w-full h-full" /></div>
                  </div>
                  <span className="text-xs tracking-widest opacity-60 group-hover:opacity-100">{idx === 0 ? '指引卡' : '能量卡'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 transition-opacity duration-300 ${theme === 'night' ? 'text-white/20 hover:text-white/50' : 'text-slate-800/20 hover:text-slate-800/50'}`}>
         <Microscope className="w-4 h-4" />
         <span className="text-[10px] tracking-widest font-serif">Powered by 健康關係實驗室</span>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {theme === 'night' ? (
           <>
             <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-[#101024] to-[#050510]"></div>
             {particles.map(p => (<div key={p.id} className="absolute rounded-full bg-white animate-pulse" style={{ top: p.top, left: p.left, width: `${p.size}px`, height: `${p.size}px`, opacity: Math.random() * 0.5 + 0.2, animationDuration: `${p.duration}s` }}></div>))}
             <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
           </>
         ) : (
           <>
             <div className="absolute inset-0 bg-[#F0EFEB]"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF]/80 via-[#F5F5F0]/50 to-[#E6E2D6]/50"></div>
             <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-300/10 rounded-full blur-[120px] animate-pulse-slow"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-300/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
             {particles.map(p => (<div key={p.id} className="absolute rounded-full bg-amber-400/20 animate-pulse" style={{ top: p.top, left: p.left, width: `${p.size * 2}px`, height: `${p.size * 2}px`, opacity: Math.random() * 0.3 + 0.1, animationDuration: `${p.duration + 2}s` }}></div>))}
           </>
         )}
      </div>

      <div className="absolute top-6 left-6 z-50">
        <button onClick={toggleMute} className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 ${theme === 'night' ? 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10' : 'bg-[#FFF9F0]/80 border-orange-200/50 text-orange-400 hover:bg-white shadow-sm'}`} title={isMuted ? "Unmute Sound" : "Mute Sound"}>
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleTheme} className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 ${theme === 'night' ? 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10' : 'bg-[#FFF9F0]/80 border-orange-200/50 text-orange-400 hover:bg-white shadow-sm'}`} title={theme === 'night' ? "Switch to Day Mode" : "Switch to Night Mode"}>
          {theme === 'night' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <header className="mb-6 md:mb-10 text-center relative">
          <div className={`absolute -inset-8 bg-gradient-to-r blur-xl ${theme === 'night' ? 'from-transparent via-purple-500/10 to-transparent' : 'from-transparent via-orange-300/10 to-transparent'}`}></div>
          <h1 className={`text-3xl md:text-5xl font-light tracking-[0.3em] text-transparent bg-clip-text font-serif ${theme === 'night' ? 'bg-gradient-to-r from-indigo-100 via-white to-purple-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-gradient-to-r from-slate-600 via-slate-800 to-slate-600 drop-shadow-sm'}`}>今日能量卡</h1>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
             <div className={`h-[1px] w-12 bg-gradient-to-r ${theme === 'night' ? 'from-transparent to-white' : 'from-transparent to-slate-400'}`}></div>
             <p className={`text-[10px] md:text-xs tracking-[0.4em] font-light uppercase ${theme === 'night' ? 'text-indigo-200' : 'text-slate-500'}`}>Daily Energy Oracle</p>
             <div className={`h-[1px] w-12 bg-gradient-to-l ${theme === 'night' ? 'from-transparent to-white' : 'from-transparent to-slate-400'}`}></div>
          </div>
        </header>

        {gameState === 'intro' && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="relative group cursor-pointer perspective-1000" onClick={drawCards}>
              <div className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-1 translate-y-1 ${theme === 'night' ? 'bg-slate-800 border-white/5' : 'bg-orange-50 border-orange-200/30'}`}></div>
              <div className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-2 translate-y-2 ${theme === 'night' ? 'bg-slate-800 border-white/5' : 'bg-orange-50 border-orange-200/30'}`}></div>
              <div className={`relative w-56 h-80 rounded-xl shadow-2xl border flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${theme === 'night' ? 'bg-[#0F0F1A] border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_60px_rgba(79,70,229,0.3)]' : 'bg-[#FFFDF5] border-orange-100 shadow-[0_10px_40px_rgba(251,146,60,0.1)] group-hover:shadow-[0_20px_60px_rgba(251,146,60,0.2)]'}`}>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                 <div className={`w-40 h-40 border rounded-full flex items-center justify-center animate-spin-slow ${theme === 'night' ? 'border-white/5' : 'border-orange-200/20'}`}>
                    <div className={`w-32 h-32 border rounded-full ${theme === 'night' ? 'border-white/5' : 'border-orange-200/20'}`}></div>
                 </div>
                 <div className="absolute flex flex-col items-center">
                    {theme === 'night' ? <Moon className="w-8 h-8 text-indigo-300 mb-3 opacity-80" strokeWidth={1} /> : <Sun className="w-8 h-8 text-orange-400 mb-3 opacity-80" strokeWidth={1} />}
                    <span className={`tracking-[0.2em] text-xs font-light ${theme === 'night' ? 'text-indigo-200/60' : 'text-slate-400'}`}>TOUCH TO CONNECT</span>
                 </div>
              </div>
            </div>
            <p className={`mt-12 text-center max-w-md leading-loose font-serif text-sm tracking-wide ${theme === 'night' ? 'text-indigo-200/40' : 'text-slate-500/60'}`}>{theme === 'night' ? "萬物皆有頻率，抽取兩張卡牌，接收今日的指引與能量。" : "新的一天，深呼吸，抽取兩張卡牌，接收祝福與光。"}</p>
          </div>
        )}

        {gameState === 'shuffling' && (
          <div className="flex flex-col items-center justify-center h-80">
            <div className="relative">
              <div className={`w-24 h-24 border-[1px] rounded-full animate-ping absolute ${theme === 'night' ? 'border-indigo-500/30' : 'border-orange-400/20'}`}></div>
              <div className={`w-24 h-24 border-t-[1px] rounded-full animate-spin ${theme === 'night' ? 'border-indigo-300' : 'border-orange-400'}`}></div>
              <div className="absolute inset-0 flex items-center justify-center"><Sparkles className={`w-6 h-6 animate-pulse ${theme === 'night' ? 'text-indigo-200' : 'text-orange-400'}`} /></div>
            </div>
            <p className={`mt-10 text-lg font-light tracking-widest animate-pulse font-serif ${theme === 'night' ? 'text-indigo-100' : 'text-slate-600'}`}>Connecting...</p>
          </div>
        )}

        {(gameState === 'drawing' || gameState === 'result') && (
          <div className="w-full flex flex-col items-center">
           
            <div
               className="relative w-full h-[450px] md:h-auto flex justify-center items-center perspective-1000 mb-6 md:mb-10"
               onTouchStart={onTouchStart}
               onTouchMove={onTouchMove}
               onTouchEnd={onTouchEnd}
            >
              {drawnCards.map((card, idx) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const isFocused = mobileFocusIndex === idx;
                const shouldGlow = isMobile && flippedStates.filter(Boolean).length === 1 && !flippedStates[idx];
               
                const glowClass = shouldGlow
                  ? (theme === 'day'
                      ? "animate-flash-glow-day ring-4 ring-orange-500 shadow-[0_0_80px_rgba(249,115,22,0.9)] rounded-xl relative z-50"
                      : "animate-flash-glow-night ring-4 ring-white shadow-[0_0_80px_rgba(255,255,255,1)] rounded-xl relative z-50")
                  : "";

                let containerStyle = {};
                if (isMobile) {
                  if (isFocused) {
                    // Center Card (Foreground)
                    // 修改處：根據 index 決定動畫方向（鏡像處理）
                    // Index 0 (左卡): 預設向左逆時針 nudge (暗示往右滑)
                    // Index 1 (右卡): 鏡像向右順時針 nudge (暗示往左滑)
                    const animationName = idx === 0 ? 'card-nudge-center' : 'card-nudge-center-mirror';
                    const nudgeStyle = isHintActive ? { animation: `${animationName} 1.5s ease-in-out infinite` } : {};
                    
                    containerStyle = {
                      zIndex: 50,
                      transform: 'translate(-50%, -50%) scale(1.05) rotate(0deg)',
                      top: '45%',
                      left: '50%',
                      ...nudgeStyle
                    };
                  } else {
                    // Background Card Animation Logic (Mirrored)
                    let animationStyle = {};
                    let animationName = '';

                    // 判斷是左邊還是右邊的背景卡，分別給予鏡像動畫
                    if (isHintActive) {
                        animationName = idx === 0 ? 'card-life-cycle-left' : 'card-life-cycle-right';
                        animationStyle = { animation: `${animationName} 16s ease-in-out forwards` };
                    }

                    // 基礎位置也必須分開設定，確保切換時不會瞬移
                    const baseX = idx === 0 ? '-65%' : '-35%';
                    const baseRot = idx === 0 ? '-5deg' : '5deg';

                    containerStyle = {
                        zIndex: shouldGlow ? 40 : 10,
                        transform: `translate(${baseX}, -48%) scale(0.95) rotate(${baseRot})`,
                        top: '55%',
                        left: '50%',
                        ...animationStyle
                    };
                  }
                } else {
                  containerStyle = { margin: '0 20px' };
                }

                return (
                  <div key={idx} className={`${isMobile ? 'absolute' : 'relative'} flex flex-col items-center gap-6 transition-all duration-500`} style={containerStyle} onClick={() => isMobile && toggleFlip(idx)}>
                    <span className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-1000 ${flippedStates[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${theme === 'night' ? 'text-indigo-300/40' : 'text-slate-400/60'}`}>{idx === 0 ? 'Guidance · 指引' : 'Energy · 能量'}</span>
                    <Card index={idx} data={card} isRevealed={flippedStates[idx]} onClick={() => toggleFlip(idx)} theme={theme} isMobileFocused={isFocused} className={glowClass} />
                  </div>
                );
              })}
            </div>

            {gameState === 'result' && (
              <div className="animate-fadeInUp flex flex-col items-center gap-4 mt-2 md:mt-0 z-50">
                <div className="flex gap-4">
                  <button onClick={resetGame} className={`group relative px-6 py-2 overflow-hidden rounded-full bg-transparent border transition-all duration-300 ${theme === 'night' ? 'border-white/10 hover:border-white/30' : 'border-slate-300 hover:border-slate-400'}`}>
                    <div className={`absolute inset-0 w-0 transition-all duration-[250ms] ease-out group-hover:w-full ${theme === 'night' ? 'bg-white/5' : 'bg-slate-100'}`}></div>
                    <div className="relative flex items-center gap-2">
                      <RefreshCw className={`w-3 h-3 group-hover:rotate-180 transition-transform duration-700 ${theme === 'night' ? 'text-indigo-300' : 'text-slate-500'}`} />
                      <span className={`tracking-[0.2em] text-xs ${theme === 'night' ? 'text-indigo-200' : 'text-slate-600'}`}>RESTART</span>
                    </div>
                  </button>
                  <button onClick={initiateShare} disabled={isSharing} className={`group relative px-6 py-2 overflow-hidden rounded-full bg-transparent border transition-all duration-300 ${theme === 'night' ? 'border-indigo-500/50 hover:border-indigo-400 bg-indigo-900/20' : 'border-orange-300 hover:border-orange-400 bg-orange-50'}`}>
                    <div className="relative flex items-center gap-2">
                      {isSharing ? <span className="animate-spin"><RefreshCw className="w-3 h-3" /></span> : <Download className={`w-3 h-3 ${theme === 'night' ? 'text-indigo-300' : 'text-orange-500'}`} />}
                      <span className={`tracking-[0.2em] text-xs ${theme === 'night' ? 'text-indigo-200' : 'text-orange-600'}`}>{isSharing ? 'SAVING...' : 'DOWNLOAD'}</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
           
            {gameState === 'drawing' && !flippedStates.every(Boolean) && (
               <p className={`mt-4 mb-20 md:mb-8 animate-pulse tracking-[0.2em] text-xs font-light ${theme === 'night' ? 'text-indigo-200/50' : 'text-slate-400'} flex items-center gap-2`}>
                 {typeof window !== 'undefined' && window.innerWidth < 768 ? getMobileInstruction() : "點擊卡牌翻開訊息"}
               </p>
            )}
          </div>
        )}
      </div>
     
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-fadeIn { animation: fadeIn 1.5s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
       
        /* 卡牌物理暗示 (Nudge Center - Focused Card) */
        @keyframes card-nudge-center {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.05); }
          25% { transform: translate(-58%, -50%) rotate(-3deg) scale(1.05); }
          50% { transform: translate(-50%, -50%) rotate(0deg) scale(1.05); }
        }

        /* [NEW] 鏡像卡牌物理暗示 (Nudge Center Mirror - Focused Card) */
        /* 針對第二張卡牌 (Index 1) 為焦點時使用：向右移動，順時針旋轉 */
        @keyframes card-nudge-center-mirror {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1.05); }
          25% { transform: translate(-42%, -50%) rotate(3deg) scale(1.05); } /* 向右移，順時針 */
          50% { transform: translate(-50%, -50%) rotate(0deg) scale(1.05); }
        }

        /* --- RIGHT Side Animation (For Index 1 in background) --- */
        @keyframes card-life-cycle-right {
          /* --- 靜止 --- */
          0%, 18% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }

          /* --- 晃動 --- */
          20% { transform: translate(-35%, -48%) rotate(9deg) scale(0.95); }
          22% { transform: translate(-35%, -48%) rotate(1deg) scale(0.95); }
          24% { transform: translate(-35%, -48%) rotate(8deg) scale(0.95); }
          26% { transform: translate(-35%, -48%) rotate(2deg) scale(0.95); }
          28%, 30% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }

          /* --- 小跳 --- */
          33% { transform: translate(-35%, -46%) rotate(5deg) scale(0.98, 0.92); }
          36% { transform: translate(-35%, -62%) rotate(5deg) scale(0.94, 0.97); animation-timing-function: ease-out; }
          39% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); animation-timing-function: ease-in; }
          42% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }
          44% { transform: translate(-35%, -46%) rotate(5deg) scale(0.98, 0.92); }
          47% { transform: translate(-35%, -65%) rotate(5deg) scale(0.94, 0.97); }
          50% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }

          /* --- 中跳 --- */
          53% { transform: translate(-35%, -45%) rotate(5deg) scale(1.02, 0.88); }
          57% { transform: translate(-35%, -82%) rotate(2deg) scale(0.95, 1.05); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          60% { transform: translate(-35%, -82%) rotate(2deg) scale(0.95, 1.05); }
          64% { transform: translate(-35%, -48%) rotate(5deg) scale(1.05, 0.9); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); }
          68% { transform: translate(-35%, -55%) rotate(4deg) scale(0.98, 1.02); }
          72% { transform: translate(-35%, -48%) rotate(5deg) scale(1.01, 0.99); }
          75% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }
          
          /* --- 結束 --- */
          79% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }
          82% { transform: translate(-35%, -55%) rotate(5deg) scale(0.98, 0.98); }
          85% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }
          90% { transform: translate(-35%, -48%) rotate(5.5deg) scale(0.95); }
          100% { transform: translate(-35%, -48%) rotate(5deg) scale(0.95); }
        }

        /* --- LEFT Side Animation (Mirrored, For Index 0 in background) --- */
        /* Changes: X translate -35 -> -65, Rotate positive -> negative */
        @keyframes card-life-cycle-left {
          /* --- 靜止 --- */
          0%, 18% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }

          /* --- 晃動 --- */
          20% { transform: translate(-65%, -48%) rotate(-9deg) scale(0.95); }
          22% { transform: translate(-65%, -48%) rotate(-1deg) scale(0.95); }
          24% { transform: translate(-65%, -48%) rotate(-8deg) scale(0.95); }
          26% { transform: translate(-65%, -48%) rotate(-2deg) scale(0.95); }
          28%, 30% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }

          /* --- 小跳 --- */
          33% { transform: translate(-65%, -46%) rotate(-5deg) scale(0.98, 0.92); }
          36% { transform: translate(-65%, -62%) rotate(-5deg) scale(0.94, 0.97); animation-timing-function: ease-out; }
          39% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); animation-timing-function: ease-in; }
          42% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }
          44% { transform: translate(-65%, -46%) rotate(-5deg) scale(0.98, 0.92); }
          47% { transform: translate(-65%, -65%) rotate(-5deg) scale(0.94, 0.97); }
          50% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }

          /* --- 中跳 --- */
          53% { transform: translate(-65%, -45%) rotate(-5deg) scale(1.02, 0.88); }
          57% { transform: translate(-65%, -82%) rotate(-2deg) scale(0.95, 1.05); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          60% { transform: translate(-65%, -82%) rotate(-2deg) scale(0.95, 1.05); }
          64% { transform: translate(-65%, -48%) rotate(-5deg) scale(1.05, 0.9); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); }
          68% { transform: translate(-65%, -55%) rotate(-4deg) scale(0.98, 1.02); }
          72% { transform: translate(-65%, -48%) rotate(-5deg) scale(1.01, 0.99); }
          75% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }
          
          /* --- 結束 --- */
          79% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }
          82% { transform: translate(-65%, -55%) rotate(-5deg) scale(0.98, 0.98); }
          85% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }
          90% { transform: translate(-65%, -48%) rotate(-5.5deg) scale(0.95); }
          100% { transform: translate(-65%, -48%) rotate(-5deg) scale(0.95); }
        }

        @keyframes flashGlowDay {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(249,115,22,0.6); transform: scale(1); }
          50% { opacity: 1; box-shadow: 0 0 60px rgba(249,115,22,0.9); transform: scale(1.02); }
        }
        .animate-flash-glow-day {
          animation: flashGlowDay 1.2s infinite;
        }

        @keyframes flashGlowWhite {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(255,255,255,0.5); transform: scale(1); }
          50% { opacity: 1; box-shadow: 0 0 60px rgba(255,255,255,1); transform: scale(1.02); }
        }
        .animate-flash-glow-night {
          animation: flashGlowWhite 1.5s infinite;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
       
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

