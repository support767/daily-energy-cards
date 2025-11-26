import React, { useState, useEffect } from "react";
import {
  Sparkles,
  RefreshCw,
  Heart,
  Zap,
  Infinity,
  Star,
  Move,
  Eye,
  Moon,
  Feather,
  Sun,
  Droplets,
  Wind,
  Mountain,
  Flower,
  Cloud,
} from "lucide-react";

// --- 1. 數據庫與配置 ---

// 七脈輪顏色定義與覺察指引 (Awareness)
const CHAKRAS = [
  {
    id: "root",
    name: "海底輪 · Root Chakra",
    color: "border-red-400",
    textColor: "text-red-900",
    dayTextColor: "text-red-900",
    subColor: "text-red-600/60",
    shadow: "shadow-red-900/10",
    iconColor: "text-red-500",
    keywords: "生存 · 安全 · 穩定",
    guidance: "對應脊椎根部，代表生存本能、安全感與大地的連結。",
  },
  {
    id: "sacral",
    name: "生殖輪 · Sacral Chakra",
    color: "border-orange-400",
    textColor: "text-orange-900",
    dayTextColor: "text-orange-900",
    subColor: "text-orange-600/60",
    shadow: "shadow-orange-900/10",
    iconColor: "text-orange-500",
    keywords: "情緒 · 創造 · 喜悅",
    guidance: "對應下腹部，代表情緒流動、感官享受與創造力的泉源。",
  },
  {
    id: "solar",
    name: "太陽神經叢 · Solar Plexus",
    color: "border-yellow-500",
    textColor: "text-yellow-900",
    dayTextColor: "text-yellow-800",
    subColor: "text-yellow-700/60",
    shadow: "shadow-yellow-900/10",
    iconColor: "text-yellow-600",
    keywords: "自信 · 意志 · 行動",
    guidance: "對應胃部，代表意志力、自信與個人力量的主導權。",
  },
  {
    id: "heart",
    name: "心輪 · Heart Chakra",
    color: "border-green-500",
    textColor: "text-green-900",
    dayTextColor: "text-green-900",
    subColor: "text-green-700/60",
    shadow: "shadow-green-900/10",
    iconColor: "text-green-600",
    keywords: "愛 · 寬恕 · 接納",
    guidance: "對應心臟與胸腔，代表無條件的愛、接納與慈悲的流動。",
  },
  {
    id: "throat",
    name: "喉輪 · Throat Chakra",
    color: "border-blue-400",
    textColor: "text-blue-900",
    dayTextColor: "text-blue-900",
    subColor: "text-blue-700/60",
    shadow: "shadow-blue-900/10",
    iconColor: "text-blue-500",
    keywords: "溝通 · 真實 · 表達",
    guidance: "對應喉嚨，代表真實的溝通、自我表達與內在誠信。",
  },
  {
    id: "thirdEye",
    name: "眉心輪 · Third Eye",
    color: "border-indigo-400",
    textColor: "text-indigo-900",
    dayTextColor: "text-indigo-900",
    subColor: "text-indigo-700/60",
    shadow: "shadow-indigo-900/10",
    iconColor: "text-indigo-600",
    keywords: "直覺 · 洞見 · 想像",
    guidance: "對應眉心，代表直覺力、洞察力與超越表象的智慧。",
  },
  {
    id: "crown",
    name: "頂輪 · Crown Chakra",
    color: "border-violet-400",
    textColor: "text-violet-900",
    dayTextColor: "text-violet-900",
    subColor: "text-violet-700/60",
    shadow: "shadow-violet-900/10",
    iconColor: "text-violet-600",
    keywords: "靈性 · 合一 · 智慧",
    guidance: "對應頭頂，代表靈性連結、合一意識與更高的悟性。",
  },
];

// 金句庫 (245 句)
const QUOTES_DB = [
  // --- 紅色：海底輪 (Root) ---
  {
    text: "恐懼存在是因為你活在你的想像中，而不是活在現實中。",
    en: "Fear is simply because you are not living with life, you are living in your mind.",
    type: "root",
  },
  {
    text: "行動是恐懼的解藥。",
    en: "Action is the antidote to fear.",
    type: "root",
  },
  {
    text: "不要悲傷，你失去的任何東西，都會以另一種形式回來。",
    en: "Don't grieve. Anything you lose comes round in another form.",
    type: "root",
  },
  {
    text: "如果你學會如何駕馭你的身體，它將成為你最大的天賦。",
    en: "If you learn to handle your body right, it is a great possibility.",
    type: "root",
  },
  {
    text: "無論發生什麼，都要對自己的生命完全負責。",
    en: "Taking complete responsibility for your life means you don't blame anyone for anything.",
    type: "root",
  },
  {
    text: "當你放下你是誰的執念，你才能成為你該成為的人。",
    en: "When you let go of who you are, you become who you might be.",
    type: "root",
  },
  {
    text: "沒有所謂的失敗，只有學習。",
    en: "There is no such thing as failure. There are only results.",
    type: "root",
  },
  {
    text: "樹木長得越高，根就必須扎得越深。",
    en: "The higher the tree grows, the deeper the roots must sink.",
    type: "root",
  },
  {
    text: "過去已經過去，未來還沒發生，你只擁有當下。",
    en: "The past is gone, the future is not here, you only have now.",
    type: "root",
  },
  {
    text: "痛苦是不可避免的，但受苦是選擇。",
    en: "Pain is inevitable. Suffering is optional.",
    type: "root",
  },
  {
    text: "專注於你想去的地方，而不是你恐懼的地方。",
    en: "Focus on where you want to go, not on what you fear.",
    type: "root",
  },
  {
    text: "你來到這個世界不是為了證明什麼，而是為了體驗。",
    en: "You are not here to prove anything, you are here to experience life.",
    type: "root",
  },
  {
    text: "安全感來自於內在的平衡，而非外在的環境。",
    en: "Security comes from inner balance, not external circumstances.",
    type: "root",
  },
  {
    text: "改變不是關於能力，而是關於動力。",
    en: "Change is not a matter of ability, it's a matter of motivation.",
    type: "root",
  },
  {
    text: "身體是靈魂的殿堂，請善待它。",
    en: "The body is the temple of the soul; treat it with care.",
    type: "root",
  },
  {
    text: "你在尋找的穩定，始於你的雙腳站立之處。",
    en: "The stability you seek begins right where your feet stand.",
    type: "root",
  },
  {
    text: "恐懼只是心智編造的故事。",
    en: "Fear is just a story the mind tells.",
    type: "root",
  },
  {
    text: "像山一樣穩固，像大地一樣包容。",
    en: "Be as solid as a mountain, as inclusive as the earth.",
    type: "root",
  },
  {
    text: "即使在最黑暗的土壤中，種子也能找到光。",
    en: "Even in the darkest soil, the seed finds the light.",
    type: "root",
  },
  {
    text: "每一次呼吸，都是與生命重新連結的機會。",
    en: "Every breath is a chance to reconnect with life.",
    type: "root",
  },
  {
    text: "你的能量流向你關注的地方。",
    en: "Where focus goes, energy flows.",
    type: "root",
  },
  {
    text: "現在不是擔心的時候，現在是活著的時候。",
    en: "Now is not the time to worry; now is the time to live.",
    type: "root",
  },
  {
    text: "把你的焦慮轉化為行動的燃料。",
    en: "Turn your anxiety into fuel for action.",
    type: "root",
  },
  {
    text: "你比你想像的更強大，比你知道的更有韌性。",
    en: "You are stronger than you imagine and more resilient than you know.",
    type: "root",
  },
  {
    text: "接受現狀是改變的第一步。",
    en: "Accepting what is, is the first step to changing it.",
    type: "root",
  },
  {
    text: "所有的生命都是相互連結的根。",
    en: "All life is an interconnected root system.",
    type: "root",
  },
  {
    text: "不要讓過去的陰影遮擋當下的陽光。",
    en: "Do not let the shadows of the past block the sunlight of the present.",
    type: "root",
  },
  {
    text: "在混亂中尋找平靜，那是你的力量之源。",
    en: "Find peace in the chaos; that is your source of power.",
    type: "root",
  },
  {
    text: "你所需要的資源都已在你的周圍。",
    en: "The resources you need are already around you.",
    type: "root",
  },
  {
    text: "感恩你所擁有的，你將會擁有更多。",
    en: "Be grateful for what you have, and you will have more.",
    type: "root",
  },
  {
    text: "生命總是支持著支持生命的人。",
    en: "Life always supports those who support life.",
    type: "root",
  },
  {
    text: "紮根越深，越能抵禦風暴。",
    en: "The deeper the roots, the better to weather the storm.",
    type: "root",
  },
  {
    text: "你的存在本身就是一種價值。",
    en: "Your existence itself is a value.",
    type: "root",
  },
  {
    text: "放慢腳步，感受大地的脈動。",
    en: "Slow down and feel the pulse of the earth.",
    type: "root",
  },
  {
    text: "活得像沒有明天一樣，但要有活到永遠的計畫。",
    en: "Live like there's no tomorrow, but plan like you'll live forever.",
    type: "root",
  },

  // --- 橙色：生殖輪 (Sacral) ---
  {
    text: "讓你的生命成為一場慶祝，而不是一場戰鬥。",
    en: "Make your life a celebration, not a battle.",
    type: "sacral",
  },
  {
    text: "跟隨你的喜悅，那是靈魂的指南針。",
    en: "Follow your joy; it is the compass of your soul.",
    type: "sacral",
  },
  {
    text: "情緒是生命的調味，不要讓它成為主菜。",
    en: "Emotion is the juice of life, don't let it become the main course.",
    type: "sacral",
  },
  {
    text: "在你的心中有一根蠟燭，準備好被點燃。",
    en: "There is a candle in your heart, ready to be kindled.",
    type: "sacral",
  },
  {
    text: "生活的品質取決於你感受的深度。",
    en: "The quality of your life is the quality of your emotions.",
    type: "sacral",
  },
  {
    text: "去愛吧，就像沒有受過傷一樣。",
    en: "Love like you've never been hurt.",
    type: "sacral",
  },
  {
    text: "讓美成為我們所做的一切。",
    en: "Let the beauty of what you love be what you do.",
    type: "sacral",
  },
  {
    text: "快樂不是你追求的東西，而是你的本質。",
    en: "Joy is not something to be pursued, it is your very nature.",
    type: "sacral",
  },
  {
    text: "只要你還活著，就盡情地舞動吧。",
    en: "As long as you are alive, dance your way through life.",
    type: "sacral",
  },
  {
    text: "你的問題不在於情緒，而在於你對情緒的抗拒。",
    en: "The problem is not the emotion, but your resistance to it.",
    type: "sacral",
  },
  {
    text: "熱情是喚醒潛能的鑰匙。",
    en: "Passion is the key that awakens your potential.",
    type: "sacral",
  },
  {
    text: "與其尋找愛，不如去尋找並移除你內心阻擋愛的障礙。",
    en: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    type: "sacral",
  },
  {
    text: "不要因為害怕結束，而拒絕開始。",
    en: "Do not refuse to start just because you fear the end.",
    type: "sacral",
  },
  {
    text: "流動，像水一樣，不執著於形狀。",
    en: "Flow like water, unattached to any shape.",
    type: "sacral",
  },
  {
    text: "感受一切，因為這就是活著的證明。",
    en: "Feel everything, for this is the proof of being alive.",
    type: "sacral",
  },
  {
    text: "創造力是智慧在玩耍。",
    en: "Creativity is intelligence having fun.",
    type: "sacral",
  },
  {
    text: "讓你的渴望引領你走向未知的領域。",
    en: "Let your desire lead you into unknown territories.",
    type: "sacral",
  },
  {
    text: "接受你的脆弱，那是你美麗的一部分。",
    en: "Accept your vulnerability; it is part of your beauty.",
    type: "sacral",
  },
  {
    text: "生命不是用來解決的問題，而是用來體驗的現實。",
    en: "Life is not a problem to be solved, but a reality to be experienced.",
    type: "sacral",
  },
  {
    text: "在每一個微小的瞬間中尋找快樂。",
    en: "Find joy in every tiny moment.",
    type: "sacral",
  },
  {
    text: "你的感受是你通往真實自我的橋樑。",
    en: "Your feelings are the bridge to your true self.",
    type: "sacral",
  },
  {
    text: "不要壓抑你的光芒，讓它照亮世界。",
    en: "Do not suppress your light; let it illuminate the world.",
    type: "sacral",
  },
  {
    text: "激情是生命的燃料。",
    en: "Passion is the fuel of life.",
    type: "sacral",
  },
  {
    text: "原諒自己曾經的麻木，現在開始去感覺。",
    en: "Forgive yourself for being numb; start feeling now.",
    type: "sacral",
  },
  {
    text: "每一個情緒都是一個信使，聽聽它想說什麼。",
    en: "Every emotion is a messenger; listen to what it has to say.",
    type: "sacral",
  },
  {
    text: "在流動中，你將找到自由。",
    en: "In flow, you will find freedom.",
    type: "sacral",
  },
  {
    text: "擁抱變化的浪潮。",
    en: "Embrace the waves of change.",
    type: "sacral",
  },
  {
    text: "美在於不完美之中。",
    en: "Beauty lies in imperfection.",
    type: "sacral",
  },
  {
    text: "讓你的靈魂在喜悅中歌唱。",
    en: "Let your soul sing in joy.",
    type: "sacral",
  },
  {
    text: "你值得擁有生命中所有的美好。",
    en: "You deserve all the beauty in life.",
    type: "sacral",
  },
  {
    text: "釋放控制，享受過程。",
    en: "Release control and enjoy the process.",
    type: "sacral",
  },
  {
    text: "你的身體知道答案，學會傾聽它。",
    en: "Your body knows the answer; learn to listen to it.",
    type: "sacral",
  },
  {
    text: "與他人建立深刻的連結，始於與自己的連結。",
    en: "Deep connection with others begins with connection to self.",
    type: "sacral",
  },
  {
    text: "像孩子一樣充滿好奇地探索世界。",
    en: "Explore the world with the curiosity of a child.",
    type: "sacral",
  },
  { text: "快樂是具有傳染性的。", en: "Joy is contagious.", type: "sacral" },

  // --- 黃色：太陽神經叢 (Solar Plexus) ---
  {
    text: "決定的一瞬間，命運就此形塑。",
    en: "It is in your moments of decision that your destiny is shaped.",
    type: "solar",
  },
  {
    text: "你唯一的極限，就是你自己設定的限制。",
    en: "The only limit you have is the one you set yourself.",
    type: "solar",
  },
  {
    text: "如果你不主宰你的生命，別人就會代勞。",
    en: "If you do not take charge of your life, someone else will.",
    type: "solar",
  },
  {
    text: "你生而有翼，為何要在泥濘中爬行？",
    en: "You were born with wings, why prefer to crawl through life?",
    type: "solar",
  },
  {
    text: "只有當你承擔責任時，你才擁有創造命運的力量。",
    en: "Only when you take responsibility, you have the power to create your destiny.",
    type: "solar",
  },
  {
    text: "設定目標是將無形變為有形的第一步。",
    en: "Setting goals is the first step in turning the invisible into the visible.",
    type: "solar",
  },
  {
    text: "不要等待機會，要創造機會。",
    en: "Don't wait for opportunity. Create it.",
    type: "solar",
  },
  {
    text: "你的過去不等於你的未來。",
    en: "Your past does not equal your future.",
    type: "solar",
  },
  {
    text: "昨天的我很聰明，所以我想改變世界；今天的我有智慧，所以我正在改變自己。",
    en: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    type: "solar",
  },
  {
    text: "力量不來自於身體的能力，而來自於不屈的意志。",
    en: "Strength does not come from physical capacity. It comes from an indomitable will.",
    type: "solar",
  },
  {
    text: "如果你想改變你的生活，首先要改變你的標準。",
    en: "If you want to change your life, raise your standards.",
    type: "solar",
  },
  {
    text: "命運不是機遇的問題，而是選擇的問題。",
    en: "Destiny is not a matter of chance; it is a matter of choice.",
    type: "solar",
  },
  {
    text: "信念具有創造和毀滅的力量。",
    en: "Beliefs have the power to create and the power to destroy.",
    type: "solar",
  },
  {
    text: "專注於解決方案，而不是問題。",
    en: "Focus on the solution, not the problem.",
    type: "solar",
  },
  {
    text: "成功是埋頭苦幹的結果，不是運氣。",
    en: "Success is the result of hard work, not luck.",
    type: "solar",
  },
  {
    text: "你的習慣決定了你的未來。",
    en: "Your habits determine your future.",
    type: "solar",
  },
  {
    text: "勇敢不是沒有恐懼，而是面對恐懼依然前行。",
    en: "Courage is not the absence of fear, but moving forward despite it.",
    type: "solar",
  },
  {
    text: "點燃你內心的火。",
    en: "Ignite the fire within you.",
    type: "solar",
  },
  {
    text: "你是你自己故事的作者。",
    en: "You are the author of your own story.",
    type: "solar",
  },
  {
    text: "不要讓任何人定義你的價值。",
    en: "Do not let anyone define your worth.",
    type: "solar",
  },
  {
    text: "自信來自於信守對自己的承諾。",
    en: "Confidence comes from keeping promises to yourself.",
    type: "solar",
  },
  {
    text: "障礙是通往成功的踏腳石。",
    en: "Obstacles are stepping stones to success.",
    type: "solar",
  },
  {
    text: "堅持是將不可能變為可能的魔法。",
    en: "Persistence is the magic that turns the impossible into the possible.",
    type: "solar",
  },
  {
    text: "每一個行動都播下了一個未來的種子。",
    en: "Every action sows a seed for the future.",
    type: "solar",
  },
  {
    text: "不要為了適應世界而縮小自己。",
    en: "Do not shrink yourself to fit into the world.",
    type: "solar",
  },
  {
    text: "你的能量介紹了你，甚至在你開口之前。",
    en: "Your energy introduces you before you even speak.",
    type: "solar",
  },
  {
    text: "掌握自己，就是掌握命運。",
    en: "Mastering yourself is mastering destiny.",
    type: "solar",
  },
  {
    text: "清楚你要什麼，世界就會為你讓路。",
    en: "Know what you want, and the world will make way for you.",
    type: "solar",
  },
  {
    text: "不要只是活著，要蓬勃發展。",
    en: "Don't just survive; thrive.",
    type: "solar",
  },
  { text: "真正的力量是溫柔的。", en: "True power is gentle.", type: "solar" },
  {
    text: "每一個挑戰都是成長的邀請。",
    en: "Every challenge is an invitation to grow.",
    type: "solar",
  },
  {
    text: "相信你有能力處理任何發生的事。",
    en: "Trust that you can handle whatever happens.",
    type: "solar",
  },
  {
    text: "行動勝過千言萬語。",
    en: "Action speaks louder than a thousand words.",
    type: "solar",
  },
  {
    text: "你是強大的創造者。",
    en: "You are a powerful creator.",
    type: "solar",
  },
  {
    text: "決策是力量之父。",
    en: "Decision is the father of power.",
    type: "solar",
  },

  // --- 綠色：心輪 (Heart) ---
  {
    text: "傷口是光進入你內心的地方。",
    en: "The wound is the place where the Light enters you.",
    type: "heart",
  },
  {
    text: "愛不是你做的事，愛是你存在的狀態。",
    en: "Love is not something you do. Love is the way you are.",
    type: "heart",
  },
  {
    text: "只有用極大的愛，才能打破你心中的牆。",
    en: "Only with great love can you break the walls within your heart.",
    type: "heart",
  },
  {
    text: "你尋找的東西，也在尋找你。",
    en: "What you seek is seeking you.",
    type: "heart",
  },
  {
    text: "愛是治癒這世界所有問題的良藥。",
    en: "Love is the medicine for all the world's problems.",
    type: "heart",
  },
  {
    text: "唯有打開心扉，宇宙才能進入。",
    en: "Only when you open your heart can the universe enter.",
    type: "heart",
  },
  {
    text: "不要因為沒有掌聲而放棄給予愛。",
    en: "Do not stop giving love just because you don't receive applause.",
    type: "heart",
  },
  {
    text: "如果你愛自己，你會愛所有人。",
    en: "If you love yourself, you love everyone.",
    type: "heart",
  },
  {
    text: "讓自己成為被這種奇怪引力拉著走的人，那就是愛。",
    en: "Let yourself be silently drawn by the strange pull of what you really love.",
    type: "heart",
  },
  {
    text: "感恩是心靈最美的花朵。",
    en: "Gratitude is the fairest blossom which springs from the soul.",
    type: "heart",
  },
  {
    text: "生命中唯一的財富是愛。",
    en: "The only wealth in life is love.",
    type: "heart",
  },
  {
    text: "愛不是佔有，愛是自由。",
    en: "Love is not possession, love is freedom.",
    type: "heart",
  },
  {
    text: "封閉的心無法接收祝福。",
    en: "A closed heart cannot receive blessings.",
    type: "heart",
  },
  {
    text: "哪裡有愛，哪裡就沒有恐懼。",
    en: "Where there is love, there is no fear.",
    type: "heart",
  },
  {
    text: "原諒是釋放囚犯，而那個囚犯就是你。",
    en: "Forgiveness is setting a prisoner free, and that prisoner is you.",
    type: "heart",
  },
  {
    text: "慈悲不是軟弱，它是最強大的力量。",
    en: "Compassion is not weakness; it is the strongest power.",
    type: "heart",
  },
  {
    text: "愛是將兩個人合而為一的魔法。",
    en: "Love is the alchemy that merges two into one.",
    type: "heart",
  },
  { text: "讓愛成為你的呼吸。", en: "Let love be your breath.", type: "heart" },
  {
    text: "我們生來就是為了愛與被愛。",
    en: "We are born to love and be loved.",
    type: "heart",
  },
  { text: "愛不需要理由。", en: "Love needs no reason.", type: "heart" },
  {
    text: "透過愛的眼睛看世界，一切都變了。",
    en: "Look at the world through the eyes of love, and everything changes.",
    type: "heart",
  },
  {
    text: "你的心知道通往治癒的路。",
    en: "Your heart knows the way to healing.",
    type: "heart",
  },
  { text: "在給予中，我們接受。", en: "In giving, we receive.", type: "heart" },
  {
    text: "愛是宇宙的語言。",
    en: "Love is the language of the universe.",
    type: "heart",
  },
  { text: "溫柔地對待自己。", en: "Be gentle with yourself.", type: "heart" },
  {
    text: "連結是生命的本質。",
    en: "Connection is the essence of life.",
    type: "heart",
  },
  {
    text: "每一顆心都渴望回歸合一。",
    en: "Every heart longs to return to oneness.",
    type: "heart",
  },
  {
    text: "愛能融化最堅硬的冰。",
    en: "Love can melt the hardest ice.",
    type: "heart",
  },
  { text: "你是愛的源頭。", en: "You are the source of love", type: "heart" },
  {
    text: "真正的親密是靈魂的真實。",
    en: "True intimacy is the nakedness of the soul.",
    type: "heart",
  },
  {
    text: "讓心引領你的腳步。",
    en: "Let your heart lead your steps.",
    type: "heart",
  },
  {
    text: "擁抱每一個遇見的靈魂。",
    en: "Embrace every soul you meet.",
    type: "heart",
  },
  { text: "愛是永恆的。", en: "Love is eternal.", type: "heart" },
  {
    text: "你被深愛著，超出你的想像。",
    en: "You are loved beyond your imagination.",
    type: "heart",
  },

  // --- 藍色：喉輪 (Throat) ---
  {
    text: "在寂靜中，你會聽見宇宙的聲音。",
    en: "In silence, you will hear the voice of the universe.",
    type: "throat",
  },
  {
    text: "提升你的語言，而不是提高你的聲音。",
    en: "Raise your words, not voice.",
    type: "throat",
  },
  {
    text: "說真話是一種習慣，而不是一種策略。",
    en: "Speaking the truth is a habit, not a strategy.",
    type: "throat",
  },
  {
    text: "語言有力量，請用它來祝福而非詛咒。",
    en: "Words have power; use them to bless, not to curse.",
    type: "throat",
  },
  {
    text: "你說出的每一句話，都在編織你的實相。",
    en: "Every word you speak is weaving your reality.",
    type: "throat",
  },
  {
    text: "聽從內心的聲音，它是唯一的導師。",
    en: "Listen to the voice within; it is the only teacher.",
    type: "throat",
  },
  {
    text: "沉默是神性語言，其他都只是翻譯。",
    en: "Silence is the language of God, all else is poor translation.",
    type: "throat",
  },
  {
    text: "說話之前，先讓你的話語經過三道門：它真實嗎？它必要嗎？它基於愛嗎？",
    en: "Before you speak, let your words pass through three gates: Is it true? Is it necessary? Is it kind?",
    type: "throat",
  },
  {
    text: "真實的力量來自於真實的表達。",
    en: "The power of truth comes from true expression.",
    type: "throat",
  },
  {
    text: "你的聲音是你靈魂的震動。",
    en: "Your voice is the vibration of your soul.",
    type: "throat",
  },
  {
    text: "不要讓世界的噪音淹沒了你內在的聲音。",
    en: "Don't let the noise of the world drown out your inner voice.",
    type: "throat",
  },
  {
    text: "溝通是理解的橋樑。",
    en: "Communication is the bridge to understanding.",
    type: "throat",
  },
  {
    text: "你的真理是你最珍貴的禮物。",
    en: "Your truth is your most precious gift.",
    type: "throat",
  },
  {
    text: "勇敢地說出你的需求。",
    en: "Speak your needs bravely.",
    type: "throat",
  },
  {
    text: "傾聽是愛的一種形式。",
    en: "Listening is a form of love.",
    type: "throat",
  },
  { text: "誠實賦予你自由。", en: "Honesty sets you free.", type: "throat" },
  {
    text: "不要害怕表達獨特的自己。",
    en: "Do not fear expressing your unique self.",
    type: "throat",
  },
  {
    text: "你的故事值得被聽見。",
    en: "Your story deserves to be heard.",
    type: "throat",
  },
  {
    text: "清晰的思想帶來清晰的表達。",
    en: "Clear thoughts bring clear expression.",
    type: "throat",
  },
  {
    text: "用你的聲音創造和諧。",
    en: "Create harmony with your voice.",
    type: "throat",
  },
  {
    text: "真誠是靈魂的語言。",
    en: "Sincerity is the language of the soul.",
    type: "throat",
  },
  {
    text: "當你說真話時，你不需要記住任何事。",
    en: "If you tell the truth, you don't have to remember anything.",
    type: "throat",
  },
  {
    text: "沉默充滿了答案。",
    en: "Silence is full of answers.",
    type: "throat",
  },
  {
    text: "你的聲音可以治癒，也可以傷害，請明智選擇。",
    en: "Your voice can heal or hurt; choose wisely.",
    type: "throat",
  },
  {
    text: "讓你的行動與你的話語一致。",
    en: "Let your actions align with your words.",
    type: "throat",
  },
  {
    text: "在表達中找到流動。",
    en: "Find flow in expression.",
    type: "throat",
  },
  {
    text: "不要為了取悅他人而背叛自己的真理。",
    en: "Do not betray your truth to please others.",
    type: "throat",
  },
  {
    text: "你的話語是投向宇宙的咒語。",
    en: "Your words are spells cast into the universe.",
    type: "throat",
  },
  {
    text: "唱出你心中的歌。",
    en: "Sing the song in your heart.",
    type: "throat",
  },
  {
    text: "真正的溝通超越語言。",
    en: "True communication goes beyond words.",
    type: "throat",
  },
  { text: "平靜地表達憤怒。", en: "Express anger calmly.", type: "throat" },
  {
    text: "做一個真實的人，而不是完美的人。",
    en: "Be real, not perfect.",
    type: "throat",
  },
  { text: "你的聲音很重要。", en: "Your voice matters.", type: "throat" },
  {
    text: "話語是行動的種子。",
    en: "Words are the seeds of action.",
    type: "throat",
  },

  // --- 靛色：眉心輪 (Third Eye) ---
  {
    text: "閉上雙眼，才能看見真實的世界。",
    en: "Close your eyes to see the real world.",
    type: "thirdEye",
  },
  {
    text: "你不僅是大海中的一滴水，你是整片大海。",
    en: "You are not a drop in the ocean. You are the entire ocean in a drop.",
    type: "thirdEye",
  },
  {
    text: "向內觀看，答案早已在你心中。",
    en: "Look inward; the answer is already within you.",
    type: "thirdEye",
  },
  {
    text: "你看到的樣子，取決於你的內心。",
    en: "The way you see things depends on your interior.",
    type: "thirdEye",
  },
  {
    text: "智慧不是知識的累積，而是靈魂的清澈。",
    en: "Wisdom is not the accumulation of knowledge, but the clarity of the soul.",
    type: "thirdEye",
  },
  {
    text: "當你改變看事情的方式，你看到的事情就會改變。",
    en: "When you change the way you look at things, the things you look at change.",
    type: "thirdEye",
  },
  {
    text: "直覺是靈魂在對你耳語。",
    en: "Intuition is the soul whispering to you.",
    type: "thirdEye",
  },
  {
    text: "所有的知識都將過時，唯有智慧永恆。",
    en: "All knowledge will become outdated, only wisdom is eternal.",
    type: "thirdEye",
  },
  {
    text: "你不是在尋找風景，你是在尋找新的眼光。",
    en: "You are not looking for landscapes, you are looking for new eyes.",
    type: "thirdEye",
  },
  {
    text: "真相不需要被捍衛，它只需要被看見。",
    en: "Truth does not need to be defended, it only needs to be seen.",
    type: "thirdEye",
  },
  {
    text: "你的視覺只能看到表面，你的心能看到本質。",
    en: "Your vision only sees the surface, your heart sees the essence.",
    type: "thirdEye",
  },
  {
    text: "相信你未知的預感。",
    en: "Trust your unknown hunches.",
    type: "thirdEye",
  },
  {
    text: "心智是僕人，直覺是主人。",
    en: "The mind is the servant; intuition is the master.",
    type: "thirdEye",
  },
  { text: "看見看不見的。", en: "See the unseen.", type: "thirdEye" },
  {
    text: "平靜心智，你將看清一切。",
    en: "Quiet the mind, and you will see clearly.",
    type: "thirdEye",
  },
  {
    text: "你的想像力是預覽生命即將發生的美好。",
    en: "Your imagination is a preview of life's coming attractions.",
    type: "thirdEye",
  },
  {
    text: "洞察力是看穿表象的能力。",
    en: "Insight is the ability to see through appearances.",
    type: "thirdEye",
  },
  {
    text: "你所尋找的，已在你的視野之內，只是你未曾察覺。",
    en: "What you seek is already within your sight, you just haven't noticed.",
    type: "thirdEye",
  },
  {
    text: "夢境是現實的另一種形式。",
    en: "Dreams are another form of reality.",
    type: "thirdEye",
  },
  {
    text: "跟隨那個讓你感到擴展的感覺。",
    en: "Follow the feeling that makes you expand.",
    type: "thirdEye",
  },
  {
    text: "知識是學來的，智慧是回憶來的。",
    en: "Knowledge is learned; wisdom is remembered.",
    type: "thirdEye",
  },
  {
    text: "觀察者與被觀察者是一體的。",
    en: "The observer and the observed are one.",
    type: "thirdEye",
  },
  { text: "清晰是力量。", en: "Clarity is power.", type: "thirdEye" },
  {
    text: "不要迷失在細節中，看見全貌。",
    en: "Do not get lost in details; see the whole picture.",
    type: "thirdEye",
  },
  {
    text: "你是宇宙覺察自身的方式。",
    en: "You are the universe perceiving itself.",
    type: "thirdEye",
  },
  {
    text: "信任宇宙的流動。",
    en: "Trust the flow of the universe.",
    type: "thirdEye",
  },
  {
    text: "過去、現在、未來同時存在。",
    en: "Past, present, and future exist simultaneously.",
    type: "thirdEye",
  },
  {
    text: "你的意識決定了你的實相。",
    en: "Your consciousness determines your reality.",
    type: "thirdEye",
  },
  {
    text: "醒來吧，你活在夢中。",
    en: "Wake up; you are living in a dream.",
    type: "thirdEye",
  },
  {
    text: "內在的光芒永遠不會熄滅。",
    en: "The inner light never goes out.",
    type: "thirdEye",
  },
  {
    text: "透過靈魂的眼睛看世界。",
    en: "See the world through the eyes of the soul.",
    type: "thirdEye",
  },
  {
    text: "你就是你一直在等待的答案。",
    en: "You are the answer you've been waiting for.",
    type: "thirdEye",
  },
  {
    text: "放下已知，擁抱未知。",
    en: "Drop the known; embrace the unknown.",
    type: "thirdEye",
  },

  // --- 紫色：頂輪 (Crown) ---
  {
    text: "你不是擁有靈魂的人類，你是正在體驗人生的靈魂。",
    en: "You are not a human being having a spiritual experience. You are a spiritual being having a human experience.",
    type: "crown",
  },
  {
    text: "這一切都只是路過，唯有你是永恆。",
    en: "All this is just passing through; only you are eternal.",
    type: "crown",
  },
  {
    text: "當你放下我是誰，你就成為了無限。",
    en: "When you drop 'who I am', you become infinite.",
    type: "crown",
  },
  {
    text: "宇宙不在你之外，宇宙在你之內。",
    en: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    type: "crown",
  },
  {
    text: "如果你想要飛，就必須放棄下。",
    en: "If you want to fly, give up everything that weighs you down.",
    type: "crown",
  },
  {
    text: "神性不是一個目標，它是你的本源。",
    en: "Divinity is not a goal; it is your source.",
    type: "crown",
  },
  {
    text: "在呼吸之間，感受神聖的恩典。",
    en: "In between breaths, feel the divine grace.",
    type: "crown",
  },
  {
    text: "生與死只是生命這條河流的兩岸。",
    en: "Life and death are just two banks of the same river.",
    type: "crown",
  },
  {
    text: "當你空無一物，你便擁有了萬物。",
    en: "When you are nothing, you are everything.",
    type: "crown",
  },
  {
    text: "只有當你停止尋找，你才會發現。",
    en: "Only when you stop searching will you find.",
    type: "crown",
  },
  {
    text: "你即是光，你即是愛，你即是無限。",
    en: "You are light, you are love, you are infinite.",
    type: "crown",
  },
  { text: "我們都是一體。", en: "We are all one.", type: "crown" },
  {
    text: "奇蹟是自然法則，不是例外。",
    en: "Miracles are natural laws, not exceptions.",
    type: "crown",
  },
  {
    text: "臣服是通往勝利的門戶。",
    en: "Surrender is the gateway to victory.",
    type: "crown",
  },
  {
    text: "你被宇宙無條件地支持著。",
    en: "You are unconditionally supported by the universe.",
    type: "crown",
  },
  { text: "放下，讓內在神性接手。", en: "Let go and let God.", type: "crown" },
  {
    text: "寧靜是靈魂的故鄉。",
    en: "Stillness is the home of the soul.",
    type: "crown",
  },
  {
    text: "當你與道同行，你不會迷路。",
    en: "When you walk with the Tao, you will not get lost.",
    type: "crown",
  },
  {
    text: "你的本質是純粹的意識。",
    en: "Your essence is pure consciousness.",
    type: "crown",
  },
  {
    text: "愛是宇宙的織物。",
    en: "Love is the fabric of the universe.",
    type: "crown",
  },
  { text: "在萬物中看見神性。", en: "See God in everything.", type: "crown" },
  {
    text: "你是一束光，暫時居住在身體裡。",
    en: "You are a beam of light temporarily residing in a body.",
    type: "crown",
  },
  {
    text: "超越小我，觸碰無限。",
    en: "Transcend the ego; touch the infinite.",
    type: "crown",
  },
  {
    text: "感恩是連接神性的橋樑。",
    en: "Gratitude is the bridge to divinity.",
    type: "crown",
  },
  {
    text: "每一刻都是神聖、神奇的。",
    en: "Every moment is sacred.",
    type: "crown",
  },
  {
    text: "你是天空，其餘只是天氣。",
    en: "You are the sky; the rest is just weather.",
    type: "crown",
  },
  {
    text: "信任生命的展開。",
    en: "Trust the unfolding of life.",
    type: "crown",
  },
  {
    text: "你的靈魂知道回家的路。",
    en: "Your soul knows the way home.",
    type: "crown",
  },
  {
    text: "與高我連結，獲得指引。",
    en: "Connect with your Higher Self for guidance.",
    type: "crown",
  },
  { text: "你是被祝福的。", en: "You are blessed.", type: "crown" },
  {
    text: "覺醒是回憶起你是誰。",
    en: "Awakening is remembering who you are.",
    type: "crown",
  },
  {
    text: "愛是所有問題的答案。",
    en: "Love is the answer to all questions.",
    type: "crown",
  },
];

// --- 2. Card 組件 (必須放在 App 之前) ---

const Card = ({ data, isRevealed, onClick, index, theme }) => {
  const chakraInfo = CHAKRAS.find((c) => c.id === data.type);
  if (!chakraInfo) return null;

  return (
    <div
      className={`relative w-64 h-96 cursor-pointer perspective-1000 transition-transform duration-700 ${
        isRevealed ? "" : "hover:scale-105"
      }`}
      onClick={onClick}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={`relative w-full h-full duration-1000 preserve-3d transition-all ${
          isRevealed ? "rotate-y-180" : ""
        }`}
      >
        {/* --- 卡牌背面 (未翻開) --- */}
        {theme === "night" ? (
          // 夜間模式背面：深邃宇宙
          <div className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden bg-slate-900 border border-white/10">
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
            <p className="absolute bottom-6 w-full text-center text-white/30 text-[10px] tracking-[0.4em] font-light uppercase">
              Universe
            </p>
          </div>
        ) : (
          // 日間模式背面：晨曦白金
          <div className="absolute w-full h-full backface-hidden rounded-xl shadow-xl overflow-hidden bg-[#fafaf9] border border-orange-100/50">
            {/* 柔和的晨光漸層 - 使用更暖的象牙與蜜桃色 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFCF5] via-[#FFF6E6] to-[#FFE8E0]"></div>
            {/* 裝飾紋理 */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="absolute inset-4 border border-orange-900/5 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-orange-300/20 flex items-center justify-center animate-pulse-slow">
                <div className="w-1 h-24 bg-gradient-to-b from-transparent via-orange-300/20 to-transparent"></div>
                <div className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-orange-300/20 to-transparent"></div>
              </div>
              <div className="absolute">
                <Sun className="text-orange-400/30 w-6 h-6 animate-spin-slow" />
              </div>
            </div>
            <p className="absolute bottom-6 w-full text-center text-orange-800/20 text-[10px] tracking-[0.4em] font-light uppercase">
              Awakening
            </p>
          </div>
        )}

        {/* --- 卡牌正面 (已翻開) - 根據日夜微調配色 --- */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.1)] rotate-y-180 overflow-hidden flex flex-col items-center text-center p-1 bg-[#FDFCF8] ${
            theme === "night" ? "shadow-black/50" : "shadow-orange-900/5"
          }`}
        >
          {/* 內層邊框容器 */}
          <div
            className={`w-full h-full border-2 ${chakraInfo.color} rounded-lg flex flex-col relative overflow-hidden`}
          >
            {/* 頂部極簡裝飾 */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 opacity-5 bg-gradient-to-b from-${
                chakraInfo.color.split("-")[1]
              }-400 to-transparent`}
            ></div>

            <div className="flex-1 flex flex-col items-center p-5 pt-8 relative z-10">
              {/* 1. 脈輪關鍵字 */}
              <div
                className={`text-[10px] tracking-[0.2em] uppercase font-bold mb-3 ${chakraInfo.subColor}`}
              >
                {chakraInfo.keywords}
              </div>

              {/* 2. 脈輪符號 */}
              <div className={`mb-6 opacity-90 ${chakraInfo.iconColor}`}>
                {data.type === "root" && (
                  <Mountain strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "sacral" && (
                  <Droplets strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "solar" && (
                  <Sun strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "heart" && (
                  <Flower strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "throat" && (
                  <Wind strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "thirdEye" && (
                  <Eye strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "crown" && (
                  <Sparkles strokeWidth={1.5} className="w-6 h-6" />
                )}
              </div>

              {/* 3. 核心金句 */}
              <h3
                className={`text-base font-medium mb-3 leading-relaxed tracking-wide ${
                  theme === "day"
                    ? chakraInfo.dayTextColor || chakraInfo.textColor
                    : chakraInfo.textColor
                } font-serif min-h-[4.5rem] flex items-center justify-center`}
              >
                {data.text}
              </h3>

              {/* 4. 英文金句 */}
              <p className="text-[10px] font-serif italic text-slate-500/80 leading-relaxed font-light mb-6 px-2">
                {data.en}
              </p>

              {/* 5. 分隔線與覺察指引 (Awareness) */}
              <div className="mt-auto w-full">
                <div className="flex items-center justify-center gap-2 mb-3 opacity-20">
                  <div
                    className={`h-[1px] flex-1 ${chakraInfo.color.replace(
                      "border",
                      "bg"
                    )}`}
                  ></div>
                  <Feather className="w-3 h-3 text-slate-400" />
                  <div
                    className={`h-[1px] flex-1 ${chakraInfo.color.replace(
                      "border",
                      "bg"
                    )}`}
                  ></div>
                </div>

                <div
                  className={`text-xs text-left leading-relaxed font-light p-3 rounded bg-slate-50/50 ${
                    theme === "day"
                      ? chakraInfo.dayTextColor || chakraInfo.textColor
                      : chakraInfo.textColor
                  }`}
                >
                  <span className="font-bold text-[9px] opacity-60 uppercase tracking-wider block mb-1">
                    Energy Awareness
                  </span>
                  {chakraInfo.guidance}
                </div>
              </div>
            </div>

            {/* 底部脈輪標籤 */}
            <div className="pb-3 text-[8px] uppercase tracking-[0.2em] text-slate-400/60 font-light mt-2">
              {chakraInfo.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. 主程式 App ---

export default function App() {
  const [gameState, setGameState] = useState("intro");
  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([false, false]);
  const [theme, setTheme] = useState("night");
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setTheme("day");
    } else {
      setTheme("night");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const drawCards = () => {
    setGameState("shuffling");
    if (navigator.vibrate) navigator.vibrate(50);

    setTimeout(() => {
      const shuffled = [...QUOTES_DB].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      setDrawnCards(selected);
      setGameState("drawing");
    }, 2500);
  };

  const toggleFlip = (index) => {
    if (flippedStates[index]) return;
    const newFlipped = [...flippedStates];
    newFlipped[index] = true;
    setFlippedStates(newFlipped);

    if (navigator.vibrate) navigator.vibrate(20);

    if (newFlipped.every(Boolean)) {
      setTimeout(() => setGameState("result"), 1000);
    }
  };

  const resetGame = () => {
    setGameState("intro");
    setFlippedStates([false, false]);
    setDrawnCards([]);
  };

  return (
    <div
      className={`min-h-screen w-full font-sans overflow-hidden flex flex-col items-center justify-center relative transition-colors duration-1000 ${
        theme === "night"
          ? "bg-[#050510] text-white"
          : "bg-[#FDFCF5] text-slate-800"
      }`}
    >
      {/* 動態背景層 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {theme === "night" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-[#101024] to-[#050510]"></div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDuration: `${p.duration}s`,
                }}
              ></div>
            ))}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCF5] via-[#FFF8F0] to-[#FFE8E0]"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-300/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div
              className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-300/10 rounded-full blur-[100px] animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-amber-400/20 animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size * 2}px`,
                  height: `${p.size * 2}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                  animationDuration: `${p.duration + 2}s`,
                }}
              ></div>
            ))}
          </>
        )}
      </div>

      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 ${
          theme === "night"
            ? "bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10"
            : "bg-[#FFF9F0]/80 border-orange-200/50 text-orange-400 hover:bg-white shadow-sm"
        }`}
      >
        {theme === "night" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <header className="mb-10 text-center relative">
          <div
            className={`absolute -inset-8 bg-gradient-to-r blur-xl ${
              theme === "night"
                ? "from-transparent via-purple-500/10 to-transparent"
                : "from-transparent via-orange-300/10 to-transparent"
            }`}
          ></div>
          <h1
            className={`text-3xl md:text-5xl font-light tracking-[0.3em] text-transparent bg-clip-text font-serif ${
              theme === "night"
                ? "bg-gradient-to-r from-indigo-100 via-white to-purple-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-gradient-to-r from-slate-600 via-slate-800 to-slate-600 drop-shadow-sm"
            }`}
          >
            今日能量卡
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
            <div
              className={`h-[1px] w-12 bg-gradient-to-r ${
                theme === "night"
                  ? "from-transparent to-white"
                  : "from-transparent to-slate-400"
              }`}
            ></div>
            <p
              className={`text-[10px] md:text-xs tracking-[0.4em] font-light uppercase ${
                theme === "night" ? "text-indigo-200" : "text-slate-500"
              }`}
            >
              Daily Energy Oracle
            </p>
            <div
              className={`h-[1px] w-12 bg-gradient-to-l ${
                theme === "night"
                  ? "from-transparent to-white"
                  : "from-transparent to-slate-400"
              }`}
            ></div>
          </div>
        </header>

        {gameState === "intro" && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div
              className="relative group cursor-pointer perspective-1000"
              onClick={drawCards}
            >
              <div
                className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-1 translate-y-1 ${
                  theme === "night"
                    ? "bg-slate-800 border-white/5"
                    : "bg-orange-50 border-orange-200/30"
                }`}
              ></div>
              <div
                className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-2 translate-y-2 ${
                  theme === "night"
                    ? "bg-slate-800 border-white/5"
                    : "bg-orange-50 border-orange-200/30"
                }`}
              ></div>

              <div
                className={`relative w-56 h-80 rounded-xl shadow-2xl border flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${
                  theme === "night"
                    ? "bg-[#0F0F1A] border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_60px_rgba(79,70,229,0.3)]"
                    : "bg-[#FFFDF5] border-orange-100 shadow-[0_10px_40px_rgba(251,146,60,0.1)] group-hover:shadow-[0_20px_60px_rgba(251,146,60,0.2)]"
                }`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div
                  className={`w-40 h-40 border rounded-full flex items-center justify-center animate-spin-slow ${
                    theme === "night"
                      ? "border-white/5"
                      : "border-orange-200/20"
                  }`}
                >
                  <div
                    className={`w-32 h-32 border rounded-full ${
                      theme === "night"
                        ? "border-white/5"
                        : "border-orange-200/20"
                    }`}
                  ></div>
                </div>
                <div className="absolute flex flex-col items-center">
                  {theme === "night" ? (
                    <Moon
                      className="w-8 h-8 text-indigo-300 mb-3 opacity-80"
                      strokeWidth={1}
                    />
                  ) : (
                    <Sun
                      className="w-8 h-8 text-orange-400 mb-3 opacity-80"
                      strokeWidth={1}
                    />
                  )}
                  <span
                    className={`tracking-[0.2em] text-xs font-light ${
                      theme === "night"
                        ? "text-indigo-200/60"
                        : "text-slate-400"
                    }`}
                  >
                    TOUCH TO CONNECT
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`mt-12 text-center max-w-md leading-loose font-serif text-sm tracking-wide ${
                theme === "night" ? "text-indigo-200/40" : "text-slate-500/60"
              }`}
            >
              {theme === "night"
                ? "萬物皆有頻率，讓宇宙的指引流向你。"
                : "新的一天，深呼吸，接收今日的祝福與光。"}
            </p>
          </div>
        )}

        {gameState === "shuffling" && (
          <div className="flex flex-col items-center justify-center h-80">
            <div className="relative">
              <div
                className={`w-24 h-24 border-[1px] rounded-full animate-ping absolute ${
                  theme === "night"
                    ? "border-indigo-500/30"
                    : "border-orange-400/20"
                }`}
              ></div>
              <div
                className={`w-24 h-24 border-t-[1px] rounded-full animate-spin ${
                  theme === "night" ? "border-indigo-300" : "border-orange-400"
                }`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles
                  className={`w-6 h-6 animate-pulse ${
                    theme === "night" ? "text-indigo-200" : "text-orange-400"
                  }`}
                />
              </div>
            </div>
            <p
              className={`mt-10 text-lg font-light tracking-widest animate-pulse font-serif ${
                theme === "night" ? "text-indigo-100" : "text-slate-600"
              }`}
            >
              Connecting...
            </p>
          </div>
        )}

        {(gameState === "drawing" || gameState === "result") && (
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center perspective-1000 mb-10">
              {drawnCards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center gap-6">
                  <span
                    className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-1000 ${
                      flippedStates[idx]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    } ${
                      theme === "night"
                        ? "text-indigo-300/40"
                        : "text-slate-400/60"
                    }`}
                  >
                    {idx === 0 ? "Guidance · 指引" : "Energy · 能量"}
                  </span>
                  <Card
                    index={idx}
                    data={card}
                    isRevealed={flippedStates[idx]}
                    onClick={() => toggleFlip(idx)}
                    theme={theme}
                  />
                </div>
              ))}
            </div>

            {gameState === "result" && (
              <div className="animate-fadeInUp flex flex-col items-center gap-6 mt-2">
                <button
                  onClick={resetGame}
                  className={`group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border transition-all duration-300 ${
                    theme === "night"
                      ? "border-white/10 hover:border-white/30"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`absolute inset-0 w-0 transition-all duration-[250ms] ease-out group-hover:w-full ${
                      theme === "night" ? "bg-white/5" : "bg-slate-100"
                    }`}
                  ></div>
                  <div className="relative flex items-center gap-3">
                    <RefreshCw
                      className={`w-3 h-3 group-hover:rotate-180 transition-transform duration-700 ${
                        theme === "night" ? "text-indigo-300" : "text-slate-500"
                      }`}
                    />
                    <span
                      className={`tracking-[0.2em] text-xs ${
                        theme === "night" ? "text-indigo-200" : "text-slate-600"
                      }`}
                    >
                      RESTART
                    </span>
                  </div>
                </button>
              </div>
            )}

            {gameState === "drawing" && !flippedStates.every(Boolean) && (
              <p
                className={`mt-8 animate-pulse tracking-[0.2em] text-xs font-light ${
                  theme === "night" ? "text-indigo-200/30" : "text-slate-400"
                }`}
              >
                點擊卡牌翻開訊息
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
