const levels = [
    {
        level: 1,
        name: "第一关 · 基础拼读",
        availableWords: ['妈', '爸', '大', '米'], // 本关只出这些汉字的僵尸
        spawnInterval: 8,      // 僵尸刷新极慢（8秒一个）
        zombieSpeed: 10,       // 移动速度慢
        targetKills: 5,        // 只要打死5个僵尸就通关
        maxSamePlants: 2,      // 沿用现有规则：同拼音最多2个
        killToDestroy: 1       // 沿用现有规则：炮台打1只就自毁
    },
    {
        level: 2,
        name: "第二关 · 声韵进阶",
        availableWords: ['花', '鸟', '鱼', '云'], 
        spawnInterval: 6,      // 刷新变快
        zombieSpeed: 15,
        targetKills: 10,
        // ... 等等
    }
];
