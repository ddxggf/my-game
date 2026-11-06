// zombies.js - 僵尸属性与纯 CSS 建模
const zombieTypes = {
    normal:      { id: 'normal',      cost: 1, hp: 1, speed: 15, cssClass: 'z-normal' },
    double:      { id: 'double',      cost: 2, hp: 2, speed: 15, cssClass: 'z-normal' }, // 双字
    cone:        { id: 'cone',        cost: 3, hp: 2, speed: 20, cssClass: 'z-cone' },   // 跑得快
    double_cone: { id: 'double_cone', cost: 4, hp: 4, speed: 20, cssClass: 'z-cone' },   // 双字路障
    flag:        { id: 'flag',        cost: 0, hp: 1, speed: 18, cssClass: 'z-flag' }    // 旗帜
};

const zombieStyle = document.createElement('style');
zombieStyle.innerHTML = `
    /* 普通僵尸 (灰) */
    .z-normal .z-body { width: 24px; height: 40px; background: #7f8c8d; border-radius: 10px 10px 4px 4px; position: relative; }
    .z-normal .z-body::before { content: ''; position: absolute; top: 10px; left: -10px; width: 10px; height: 6px; background: #95a5a6; border-radius: 4px; }
    
    /* 路障僵尸 (橙, 跑得快) */
    .z-cone .z-body { width: 24px; height: 38px; background: #e67e22; border-radius: 8px 8px 2px 2px; position: relative; transform: rotate(8deg); }
    .z-cone .z-body::before { content: ''; position: absolute; top: 10px; left: -12px; width: 12px; height: 4px; background: #d35400; border-radius: 2px; transform: rotate(-20deg); }

    /* 旗帜僵尸 (专属外观) */
    .z-flag .z-body { width: 24px; height: 40px; background: #7f8c8d; border-radius: 10px 10px 4px 4px; position: relative; }
    .z-flag .z-body::before { content: '🚩'; position: absolute; top: -30px; left: -5px; font-size: 30px; transform: rotate(-15deg); }
`;
document.head.appendChild(zombieStyle);
