const zombieTypes = {
    normal: { id: 'normal', hp: 100, speed: 15, cssClass: 'z-normal' },
    cone: { id: 'cone', hp: 200, speed: 12, cssClass: 'z-cone' },
    runner: { id: 'runner', hp: 50, speed: 28, cssClass: 'z-runner' }
};

const zombieStyle = document.createElement('style');
zombieStyle.innerHTML = `
    .z-normal .z-body { width: 24px; height: 40px; background: #7f8c8d; border-radius: 10px 10px 4px 4px; position: relative; }
    .z-normal .z-body::before { content: ''; position: absolute; top: 10px; left: -10px; width: 10px; height: 6px; background: #95a5a6; border-radius: 4px; }
    .z-cone .z-body { width: 28px; height: 42px; background: #7f8c8d; border-radius: 12px 12px 4px 4px; position: relative; }
    .z-cone .z-body::before { content: ''; position: absolute; top: 10px; left: -10px; width: 10px; height: 6px; background: #95a5a6; border-radius: 4px; }
    .z-cone .z-body::after { content: ''; position: absolute; top: -25px; left: 50%; transform: translateX(-50%); border-left: 16px solid transparent; border-right: 16px solid transparent; border-bottom: 25px solid #e67e22; z-index: 13; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); }
    .z-runner .z-body { width: 20px; height: 38px; background: #c0392b; border-radius: 8px 8px 2px 2px; position: relative; transform: rotate(10deg); }
    .z-runner .z-body::before { content: ''; position: absolute; top: 8px; left: -12px; width: 12px; height: 4px; background: #e74c3c; border-radius: 2px; transform: rotate(-20deg); }
`;
document.head.appendChild(zombieStyle);
