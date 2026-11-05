const NODES = [];

function addNode(id, name, type, baseCost, costMult, maxLv, props, req = []) {
  NODES.push(Object.assign({ id, name, type, baseCost, costMult, maxLv, req, level: 0 }, props));
}

// DNA 树 (35个)
addNode('d1', '单细胞', 'dna', 20, 1.5, 5, { cps: 1 });
addNode('d2a', '线粒体', 'dna', 150, 1.6, 10, { cps: 10 }, [{id:'d1', lv:'MAX'}]);
addNode('d2b', '细胞核', 'dna', 200, 1.6, 10, { dnaPct: 2 }, [{id:'d1', lv:'MAX'}]);
addNode('d3a', '多细胞', 'dna', 2000, 1.7, 15, { cps: 100 }, [{id:'d2a', lv:'MAX'}]);
addNode('d3b', '叶绿体', 'dna', 2500, 1.7, 10, { currPct: 0.5 }, [{id:'d2a', lv:'MAX'}]);
addNode('d3c', '细胞壁', 'dna', 3000, 1.7, 10, { dnaPct: 3 }, [{id:'d2b', lv:'MAX'}]);
addNode('d3d', '酶催化', 'dna', 3500, 1.7, 10, { depPct: 20 }, [{id:'d2b', lv:'MAX'}]);
addNode('d4a', '器官形成', 'dna', 30000, 1.8, 15, { cps: 1000 }, [{id:'d3a', lv:'MAX'}]);
addNode('d4b', '血液循环', 'dna', 40000, 1.8, 10, { depPct: 30 }, [{id:'d3a', lv:'MAX'}]);
addNode('d4c', '光合升级', 'dna', 50000, 1.8, 10, { currPct: 1.0 }, [{id:'d3b', lv:'MAX'}]);
addNode('d4d', '氧气利用', 'dna', 60000, 1.8, 10, { dnaPct: 5 }, [{id:'d3b', lv:'MAX'}]);
addNode('d4e', '骨架', 'dna', 70000, 1.8, 15, { cps: 2500 }, [{id:'d3c', lv:'MAX'}]);
addNode('d4f', '防御机制', 'dna', 80000, 1.8, 10, { depPct: 30 }, [{id:'d3c', lv:'MAX'}]);
addNode('d4g', '神经元', 'dna', 90000, 1.8, 10, { dnaPct: 6 }, [{id:'d3d', lv:'MAX'}]);
addNode('d4h', '反射弧', 'dna', 100000, 1.8, 10, { currPct: 1.5 }, [{id:'d3d', lv:'MAX'}]);
addNode('d5a', '爬行动物', 'dna', 1e6, 1.9, 15, { cps: 10000 }, [{id:'d4a', lv:'MAX'}]);
addNode('d5b', '视觉', 'dna', 2e6, 1.9, 10, { dnaPct: 8 }, [{id:'d4b', lv:'MAX'}]);
addNode('d5c', '听觉', 'dna', 3e6, 1.9, 10, { depPct: 40 }, [{id:'d4b', lv:'MAX'}]);
addNode('d5d', '落叶林', 'dna', 4e6, 1.9, 10, { currPct: 2.0 }, [{id:'d4c', lv:'MAX'}]);
addNode('d5e', '热带雨林', 'dna', 5e6, 1.9, 10, { dnaPct: 10 }, [{id:'d4d', lv:'MAX'}]);
addNode('d5f', '肌肉', 'dna', 6e6, 1.9, 15, { cps: 25000 }, [{id:'d4e', lv:'MAX'}]);
addNode('d5g', '甲壳', 'dna', 7e6, 1.9, 10, { depPct: 40 }, [{id:'d4f', lv:'MAX'}]);
addNode('d5h', '大脑', 'dna', 8e6, 1.9, 10, { currPct: 2.5 }, [{id:'d4g', lv:'MAX'}]);
addNode('d5i', '意识', 'dna', 9e6, 1.9, 10, { dnaPct: 12 }, [{id:'d4g', lv:'MAX'}]);
addNode('d5j', '条件反射', 'dna', 1e7, 1.9, 10, { depPct: 50 }, [{id:'d4h', lv:'MAX'}]);
addNode('d6a', '哺乳动物', 'dna', 1e8, 2.0, 15, { cps: 100000 }, [{id:'d5a', lv:'MAX'}]);
addNode('d6b', '恒温', 'dna', 2e8, 2.0, 10, { dnaPct: 15 }, [{id:'d5b', lv:'MAX'}]);
addNode('d6c', '胎生', 'dna', 3e8, 2.0, 10, { currPct: 3.0 }, [{id:'d5c', lv:'MAX'}]);
addNode('d6d', '复杂生态', 'dna', 4e8, 2.0, 10, { depPct: 60 }, [{id:'d5d', lv:'MAX'}]);
addNode('d6e', '早期人类', 'dna', 5e8, 2.0, 15, { cps: 500000 }, [{id:'d5h', lv:'MAX'}]);
addNode('d6f', '工具使用', 'dna', 6e8, 2.0, 10, { dnaPct: 20 }, [{id:'d5i', lv:'MAX'}]);
addNode('d6g', '语言', 'dna', 7e8, 2.0, 10, { currPct: 4.0 }, [{id:'d5j', lv:'MAX'}]);
addNode('d6h', '文明', 'dna', 8e8, 2.0, 10, { depPct: 80 }, [{id:'d5f', lv:'MAX'}]);

// 重生树 (25个)
addNode('r1', '灵魂觉醒', 'reb', 1, 1.5, 10, { rebPct: 10 });
addNode('r2a', '轮回法则', 'reb', 5, 1.5, 15, { depPct: 20 }, [{id:'r1', lv:'MAX'}]);
addNode('r2b', '灵魂共鸣', 'reb', 8, 1.5, 15, { cps: 1000 }, [{id:'r1', lv:'MAX'}]);
addNode('r3a', '记忆碎片', 'reb', 20, 1.6, 10, { rebPct: 15 }, [{id:'r2a', lv:'MAX'}]);
addNode('r3b', '意识重载', 'reb', 30, 1.6, 10, { dnaPct: 20 }, [{id:'r2a', lv:'MAX'}]);
addNode('r3c', '灵魂燃烧', 'reb', 40, 1.6, 10, { currPct: 1.0 }, [{id:'r2b', lv:'MAX'}]);
addNode('r3d', '往生咒', 'reb', 50, 1.6, 10, { depPct: 30 }, [{id:'r2b', lv:'MAX'}]);
addNode('r4a', '法则主宰', 'reb', 100, 1.7, 10, { rebPct: 20 }, [{id:'r3a', lv:'MAX'}]);
addNode('r4b', '时空穿梭', 'reb', 150, 1.7, 10, { dnaPct: 30 }, [{id:'r3b', lv:'MAX'}]);
addNode('r4c', '灵魂领域', 'reb', 200, 1.7, 10, { cps: 100000 }, [{id:'r3c', lv:'MAX'}]);
addNode('r4d', '转世重修', 'reb', 250, 1.7, 10, { currPct: 2.0 }, [{id:'r3d', lv:'MAX'}]);
addNode('r5a', '真理之眼', 'reb', 500, 1.8, 10, { depPct: 50 }, [{id:'r4a', lv:'MAX'}]);
addNode('r5b', '永恒寿命', 'reb', 800, 1.8, 10, { rebPct: 30 }, [{id:'r4b', lv:'MAX'}]);
addNode('r5c', '宇宙共鸣', 'reb', 1200, 1.8, 10, { dnaPct: 50 }, [{id:'r4c', lv:'MAX'}]);
addNode('r5d', '灵魂超脱', 'reb', 1500, 1.8, 10, { cps: 1e6 }, [{id:'r4d', lv:'MAX'}]);
addNode('r6a', '因果律器', 'reb', 3000, 1.9, 10, { depPct: 80 }, [{id:'r5a', lv:'MAX'}]);
addNode('r6b', '生死掌控', 'reb', 4000, 1.9, 10, { rebPct: 50 }, [{id:'r5b', lv:'MAX'}]);
addNode('r6c', '万物归一', 'reb', 5000, 1.9, 10, { dnaPct: 80 }, [{id:'r5c', lv:'MAX'}]);
addNode('r6d', '法则重塑', 'reb', 6000, 1.9, 10, { currPct: 5.0 }, [{id:'r5d', lv:'MAX'}]);
addNode('r7a', '起源之海', 'reb', 10000, 2.0, 10, { depPct: 100 }, [{id:'r6a', lv:'MAX'}]);
addNode('r7b', '灵能风暴', 'reb', 15000, 2.0, 10, { cps: 1e8 }, [{id:'r6b', lv:'MAX'}]);
addNode('r7c', '维度之光', 'reb', 20000, 2.0, 10, { dnaPct: 120 }, [{id:'r6c', lv:'MAX'}]);
addNode('r7d', '终极轮回', 'reb', 25000, 2.0, 10, { rebPct: 100 }, [{id:'r6d', lv:'MAX'}]);
addNode('r8a', '造物主碎片', 'reb', 50000, 2.5, 5, { depPct: 150 }, [{id:'r7a', lv:'MAX'}]);
addNode('r8b', '精神实体化', 'reb', 100000, 2.5, 5, { cps: 1e10 }, [{id:'r7c', lv:'MAX'}]);

// 飞升树 (15个)
addNode('a1', '宇宙初开', 'asc', 1, 2.0, 5, { ascPct: 20 });
addNode('a2a', '星河璀璨', 'asc', 3, 2.0, 10, { dnaPct: 100 }, [{id:'a1', lv:'MAX'}]);
addNode('a2b', '星系旋转', 'asc', 5, 2.0, 10, { currPct: 2.0 }, [{id:'a1', lv:'MAX'}]);
addNode('a3a', '黑洞引力', 'asc', 10, 2.2, 10, { depPct: 50 }, [{id:'a2a', lv:'MAX'}]);
addNode('a3b', '白洞喷发', 'asc', 15, 2.2, 10, { cps: 1e9 }, [{id:'a2a', lv:'MAX'}]);
addNode('a3c', '暗物质', 'asc', 20, 2.2, 10, { ascPct: 30 }, [{id:'a2b', lv:'MAX'}]);
addNode('a3d', '暗能量', 'asc', 25, 2.2, 10, { rebPct: 100 }, [{id:'a2b', lv:'MAX'}]);
addNode('a4a', '维度坍塌', 'asc', 50, 2.5, 10, { dnaPct: 200 }, [{id:'a3a', lv:'MAX'}]);
addNode('a4b', '多重宇宙', 'asc', 80, 2.5, 10, { currPct: 5.0 }, [{id:'a3b', lv:'MAX'}]);
addNode('a4c', '量子涨落', 'asc', 120, 2.5, 10, { depPct: 100 }, [{id:'a3c', lv:'MAX'}]);
addNode('a4d', '弦论震动', 'asc', 150, 2.5, 10, { cps: 1e12 }, [{id:'a3d', lv:'MAX'}]);
addNode('a5a', '时间倒流', 'asc', 300, 3.0, 5, { ascPct: 50 }, [{id:'a4a', lv:'MAX'}]);
addNode('a5b', '空间折叠', 'asc', 500, 3.0, 5, { rebPct: 200 }, [{id:'a4b', lv:'MAX'}]);
addNode('a5c', '因果逆转', 'asc', 800, 3.0, 5, { dnaPct: 500 }, [{id:'a4c', lv:'MAX'}]);
addNode('a5d', '创世神格', 'asc', 1000, 3.0, 1, { depPct: 200 }, [{id:'a4d', lv:'MAX'}]);
