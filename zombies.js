// ======
// Zombie
// ======
const zombieTypes = {
    // 普通僵尸：基础属性
    normal: {
        id: 'normal',
        name: '普通僵尸',
        hp: 100,           // 血量
        speed: 15,         // 移动速度
        emoji: '🧟',       // 外观标识
        class: 'z-normal'  // 可扩展的 CSS 类名
    },
    // 路障僵尸：血厚，走得慢
    cone: {
        id: 'cone',
        name: '路障僵尸',
        hp: 250,
        speed: 12,
        emoji: '🧟‍♂️',     // 暂时用男僵尸代替，后续可加路障图标
        class: 'z-cone'
    },
    // 快跑僵尸：血脆，跑得快
    runner: {
        id: 'runner',
        name: '快跑僵尸',
        hp: 50,
        speed: 30,
        emoji: '🧟‍♀️',     // 暂时用女僵尸代替
        class: 'z-runner'
    }
};
