const WAVE_CONFIG = {
    firstWaveDelayMs: 6000,
    waveIntervalMs: 25000,
    hugeWaveIntervalMs: 45000,
    finalWaveDelayMs: 49000,
    redTextDelayMs: 7200
};

const LEVELS = [
    { id: 1, name: "1-1", isConveyor: false, startBudget: 3, budgetAdd: 1, hugeWaves: [9], weights: { normal: 100 } },
    { id: 2, name: "1-2", isConveyor: false, startBudget: 4, budgetAdd: 1, hugeWaves: [9], weights: { normal: 100 } },
    { id: 3, name: "1-3", isConveyor: false, startBudget: 5, budgetAdd: 2, hugeWaves: [9, 19], weights: { normal: 80, cone: 20 } },
    { id: 4, name: "1-4", isConveyor: false, startBudget: 6, budgetAdd: 2, hugeWaves: [9, 19], weights: { normal: 70, cone: 30 } },
    { id: 5, name: "1-5", isConveyor: false, startBudget: 7, budgetAdd: 2, hugeWaves: [9, 19], weights: { normal: 60, double: 25, cone: 15 } },
    { id: 6, name: "1-6", isConveyor: false, startBudget: 8, budgetAdd: 2, hugeWaves: [9, 19], weights: { normal: 50, double: 30, cone: 15, double_cone: 5 } },
    { id: 7, name: "1-7", isConveyor: false, startBudget: 9, budgetAdd: 3, hugeWaves: [9, 19], weights: { normal: 40, double: 30, cone: 25, double_cone: 5 } },
    { id: 8, name: "1-8", isConveyor: false, startBudget: 10, budgetAdd: 3, hugeWaves: [9, 19, 29], weights: { normal: 25, double: 45, cone: 20, double_cone: 10 } },
    { id: 9, name: "1-9", isConveyor: false, startBudget: 12, budgetAdd: 3, hugeWaves: [9, 19, 29], weights: { normal: 15, double: 45, cone: 25, double_cone: 15 } },
    { id: 10, name: "1-10", isConveyor: true, startBudget: 10, budgetAdd: 2, hugeWaves: [9, 19, 29], weights: { normal: 30, double: 50, cone: 15, double_cone: 5 } }
];

function calcWaveBudget(lv, wave) {
    return lv.startBudget + (wave - 1) * lv.budgetAdd;
}

function isHugeWave(lv, wave) {
    return lv.hugeWaves.includes(wave);
}
