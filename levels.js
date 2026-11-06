// levels.js - 关卡权重与预算配置
const LEVELS = [
    { id: 1, name: "1-1 基础单韵", startBudget: 3, budgetAdd: 1, hugeWaves: [9], isConveyor: false, weights: { normal: 100 } },
    { id: 2, name: "1-2 声母进阶", startBudget: 4, budgetAdd: 1, hugeWaves: [9], isConveyor: false, weights: { normal: 100 } },
    { id: 3, name: "1-3 复韵母", startBudget: 5, budgetAdd: 2, hugeWaves: [9, 19], isConveyor: false, weights: { normal: 80, cone: 20 } },
    { id: 4, name: "1-4 特殊韵母", startBudget: 6, budgetAdd: 2, hugeWaves: [9, 19], isConveyor: false, weights: { normal: 70, cone: 30 } },
    { id: 5, name: "1-5 前鼻韵母", startBudget: 7, budgetAdd: 2, hugeWaves: [9, 19], isConveyor: false, weights: { normal: 60, double: 25, cone: 15 } },
    { id: 6, name: "1-6 后鼻韵母", startBudget: 8, budgetAdd: 2, hugeWaves: [9, 19], isConveyor: false, weights: { normal: 50, double: 30, cone: 15, double_cone: 5 } },
    { id: 7, name: "1-7 翘舌平舌", startBudget: 9, budgetAdd: 3, hugeWaves: [9, 19], isConveyor: false, weights: { normal: 30, double: 50, cone: 15, double_cone: 5 } },
    { id: 8, name: "1-8 三拼音节", startBudget: 10, budgetAdd: 3, hugeWaves: [9, 19, 29], isConveyor: false, weights: { normal: 25, double: 45, cone: 20, double_cone: 10 } },
    { id: 9, name: "1-9 综合挑战", startBudget: 12, budgetAdd: 3, hugeWaves: [9, 19, 29], isConveyor: false, weights: { normal: 15, double: 45, cone: 25, double_cone: 15 } },
    { id: 10, name: "1-10 传送带关", startBudget: 10, budgetAdd: 2, hugeWaves: [9, 19, 29], isConveyor: true, weights: { normal: 30, double: 50, cone: 15, double_cone: 5 } }
];
