const ACTIONS = Object.freeze({
    "TEST": 1,
    "TRAIN": 2,
    "PREDICT": 3
});

function roundHalf(number) {
    return Math.round((number + 1) / 2);
}

function showResults(result) {
    console.log('[Results]');
    console.log('Test :', result.test);
    console.log('Guess:', result.guess);
}

function toPercent(value) {
    return 0 <= value && value <= 1
    ? (value * 100).toFixed(2)
    : value;
}

module.exports = {
    "actions": ACTIONS,
    "round": roundHalf,
    "showResults": showResults,
    "percent": toPercent
};