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
    .z-normal .z-body { width: 24px; height: 40px; background: #7f8c8d; border-radius: 10px 10px 4px 4px; position: relative; }
    .z-normal .z-body::before { content: ''; position: absolute; top: 10px; left: -10px; width: 10px; height: 6px; background: #95a5a6; border-radius: 4px; }
    .z-cone .z-body { width: 24px; height: 38px; background: #e67e22; border-radius: 8px 8px 2px 2px; position: relative; transform: rotate(8deg); }
    .z-cone .z-body::before { content: ''; position: absolute; top: 10px; left: -12px; width: 12px; height: 4px; background: #d35400; border-radius: 2px; transform: rotate(-20deg); }
    .z-flag .z-body { width: 24px; height: 40px; background: #7f8c8d; border-radius: 10px 10px 4px 4px; position: relative; }
    .z-flag .z-body::before { content: '🚩'; position: absolute; top: -22px; left: -2px; font-size: 24px; transform: rotate(-15deg); z-index: 15; }
`;
document.head.appendChild(zombieStyle);
