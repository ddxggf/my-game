// zombies.js - 脏比属性与纯CSS建模
const zombieTypes = {
    normal: { id: 'normal', cost: 1, hp: 1, speed: 15, cssClass: 'z-normal' },
    double: { id: 'double', cost: 2, hp: 2, speed: 15, cssClass: 'z-normal' }, 
    cone:   { id: 'cone', cost: 3, hp: 2, speed: 20, cssClass: 'z-cone' },   
    double_cone: { id: 'double_cone', cost: 4, hp: 4, speed: 20, cssClass: 'z-cone' }, 
    flag:   { id: 'flag', cost: 0, hp: 1, speed: 18, cssClass: 'z-flag' }
};

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function getDoubleWord() {
    return { w1: getRandomWord(), w2: getRandomWord() };
}

const zombieStyle = document.createElement('style');
zombieStyle.innerHTML = `
    /* 身体基础 (破西装) */
    .z-body {
        width: 28px; height: 36px; 
        background: #3b4a4f; 
        border-radius: 10px 10px 4px 4px; 
        position: relative;
        border-bottom: 3px solid #1a2226;
        transition: transform 0.1s;
    }
    
    /* 僵尸的绿脑袋和眼睛 */
    .z-body::before {
        content: ''; position: absolute; top: -24px; left: 50%; transform: translateX(-50%);
        width: 24px; height: 24px; background: #9ab35a;
        border-radius: 50%;
        box-shadow: inset 5px 6px 0 -1px #111, inset -6px 7px 0 -1px #111, inset 0 -5px 0 -2px #4a2e19;
        border: 1px solid #5e7333;
        z-index: 12;
    }

    /* 领带 */
    .z-body::after {
        content: ''; position: absolute; top: 4px; left: 50%; transform: translateX(-50%);
        width: 6px; height: 14px; background: #c0392b; border-radius: 2px;
    }

    /* 伸出的双手 */
    .z-body-wrap::after {
        content: ''; position: absolute; bottom: 15px; left: -5px; 
        width: 50px; height: 7px; 
        background: #9ab35a;
        border-radius: 3px;
        z-index: 13;
        box-shadow: inset 0 2px 0 rgba(0,0,0,0.2);
    }

    /* 走路摇晃动画 */
    .zombie {
        animation: walkZ 0.6s infinite alternate;
    }
    @keyframes walkZ {
        from { transform: translate(-50%, -50%) rotate(-2deg); }
        to { transform: translate(-50%, -50%) rotate(2deg); }
    }

    /* 路障僵尸专属：橙色三角锥 */
    .z-cone .z-body-wrap::before {
        content: ''; position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
        width: 28px; height: 24px; background: #e67e22;
        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        z-index: 14;
        box-shadow: inset 0 -4px 0 #fff;
    }

    /* 旗帜僵尸专属：手里的红旗 */
    .z-flag .z-body-wrap::before {
        content: ''; position: absolute; bottom: 5px; left: -15px; width: 3px; height: 45px; background: #7f8c8d; z-index: 9;
    }
    .z-flag .z-body-wrap::after {
        content: ''; position: absolute; bottom: 35px; left: -12px; width: 18px; height: 12px; background: #e74c3c; border: 1px solid #fff; z-index: 8;
    }
`;
document.head.appendChild(zombieStyle);
