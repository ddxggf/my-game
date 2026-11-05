const NODES = [];
for(let i=1;i<=15;i++){NODES.push({id:'dna_a_'+i,name:'细胞质 '+i,desc:'+1e'+i+'/s',x:1000+i*70,y:4000-i*120,baseCost:15*Math.pow(3,i),costMult:1.15,cps:Math.pow(10,i),maxLv:15,type:'dna',req:i>1?[{id:'dna_a_'+(i-1),lv:5}]:[]});}
for(let i=1;i<=10;i++){NODES.push({id:'dna_b_'+i,name:'基因锁 '+i,desc:'全局 x2.5',x:1600+i*70,y:4000-i*120,baseCost:1000*Math.pow(5,i),costMult:1.8,mult:2.5,maxLv:10,type:'dna',req:[{id:'dna_a_'+(i*1.5|0),lv:10}]});}
for(let i=1;i<=10;i++){NODES.push({id:'dna_c_'+i,name:'生命奇点 '+i,desc:'全局 x10',x:2200+i*70,y:4000-i*120,baseCost:1e12*Math.pow(100,i),costMult:2.5,mult:10,maxLv:5,type:'dna',req:[{id:'dna_b_'+i,lv:'MAX'}]});}
for(let i=1;i<=10;i++){NODES.push({id:'reb_a_'+i,name:'灵魂碎片 '+i,desc:'+重生产出',x:3000+i*80,y:4000-i*150,baseCost:10*Math.pow(2.5,i),costMult:1.5,cps:Math.pow(100,i),maxLv:15,type:'rebirth',req:i>1?[{id:'reb_a_'+(i-1),lv:5}]:[]});}
for(let i=1;i<=10;i++){NODES.push({id:'reb_b_'+i,name:'轮回法则 '+i,desc:'全局 x5',x:3600+i*80,y:4000-i*150,baseCost:50*Math.pow(4,i),costMult:2,mult:5,maxLv:10,type:'rebirth',req:[{id:'reb_a_'+i,lv:10}]});}
for(let i=1;i<=5;i++){NODES.push({id:'reb_c_'+i,name:'永恒觉醒 '+i,desc:'全局 x50',x:4200+i*100,y:4000-i*200,baseCost:1000*Math.pow(10,i),costMult:3,mult:50,maxLv:5,type:'rebirth',req:[{id:'reb_b_'+(i*2),lv:'MAX'}]});}
for(let i=1;i<=5;i++){NODES.push({id:'asc_a_'+i,name:'宇宙基础 '+i,desc:'全局 x100',x:5000+i*100,y:4000-i*200,baseCost:1*Math.pow(1.8,i),costMult:2,mult:100,maxLv:5,type:'ascend',req:i>1?[{id:'asc_a_'+(i-1),lv:3}]:[]});}
for(let i=1;i<=5;i++){NODES.push({id:'asc_b_'+i,name:'维度跃迁 '+i,desc:'全局 x1000',x:5600+i*100,y:4000-i*200,baseCost:5*Math.pow(2.5,i),costMult:2.5,mult:1000,maxLv:5,type:'ascend',req:[{id:'asc_a_'+i,lv:'MAX'}]});}
for(let i=1;i<=5;i++){NODES.push({id:'asc_c_'+i,name:'终极奇点 '+i,desc:'全属性质变',x:6200+i*100,y:4000-i*200,baseCost:50*Math.pow(5,i),costMult:3,mult:10000,maxLv:3,type:'ascend',req:[{id:'asc_b_'+i,lv:3}]});}
