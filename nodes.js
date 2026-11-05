const NODES = [];

for(let i=1; i<=5; i++) { NODES.push({ id: 'dna_c_'+i, name: '细胞质 '+i, type: 'dna', baseCost: Math.pow(10, i+1), costMult: 1.5, maxLv: 15, cps: Math.pow(2, i), req: i>1?[{id:'dna_c_'+(i-1), lv: 5}]:[] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'dna_g_'+i, name: '基因锁 '+i, type: 'dna', baseCost: Math.pow(10, i*2+2), costMult: 1.8, maxLv: 10, mult: 1.5, req: [{id:'dna_c_'+i, lv: 10}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'dna_s_'+i, name: '生命奇点 '+i, type: 'dna', baseCost: Math.pow(10, i*3+3), costMult: 2.0, maxLv: 5, mult: 2, req: [{id:'dna_g_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'dna_o_'+i, name: '超脱 '+i, type: 'dna', baseCost: Math.pow(10, i*5+5), costMult: 3.0, maxLv: 3, cps: Math.pow(10, i*2), req: [{id:'dna_s_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'dna_e_'+i, name: '永恒 '+i, type: 'dna', baseCost: Math.pow(10, i*7+7), costMult: 5.0, maxLv: 1, mult: 5, req: [{id:'dna_o_'+i, lv: 'MAX'}] }); }

for(let i=1; i<=5; i++) { NODES.push({ id: 'reb_1_'+i, name: '灵魂碎片 '+i, type: 'reb', baseCost: i, maxLv: 15, mult: 1.2, req: i>1?[{id:'reb_1_'+(i-1), lv: 5}]:[] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'reb_2_'+i, name: '轮回法则 '+i, type: 'reb', baseCost: i*2, maxLv: 10, mult: 1.5, req: [{id:'reb_1_'+i, lv: 10}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'reb_3_'+i, name: '永恒觉醒 '+i, type: 'reb', baseCost: i*3, maxLv: 5, mult: 2, req: [{id:'reb_2_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'reb_4_'+i, name: '宇宙共鸣 '+i, type: 'reb', baseCost: i*5, maxLv: 3, mult: 3, req: [{id:'reb_3_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'reb_5_'+i, name: '真理之眼 '+i, type: 'reb', baseCost: i*8, maxLv: 1, mult: 5, req: [{id:'reb_4_'+i, lv: 'MAX'}] }); }

for(let i=1; i<=5; i++) { NODES.push({ id: 'asc_1_'+i, name: '宇宙基础 '+i, type: 'asc', baseCost: i, maxLv: 5, mult: 2, req: i>1?[{id:'asc_1_'+(i-1), lv: 3}]:[] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'asc_2_'+i, name: '维度跃迁 '+i, type: 'asc', baseCost: i*2, maxLv: 5, mult: 3, req: [{id:'asc_1_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'asc_3_'+i, name: '终极奇点 '+i, type: 'asc', baseCost: i*3, maxLv: 3, mult: 5, req: [{id:'asc_2_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'asc_4_'+i, name: '因果律器 '+i, type: 'asc', baseCost: i*5, maxLv: 3, mult: 10, req: [{id:'asc_3_'+i, lv: 'MAX'}] }); }
for(let i=1; i<=5; i++) { NODES.push({ id: 'asc_5_'+i, name: '创世神格 '+i, type: 'asc', baseCost: i*10, maxLv: 1, mult: 50, req: [{id:'asc_4_'+i, lv: 'MAX'}] }); }
