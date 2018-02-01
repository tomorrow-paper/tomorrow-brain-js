const getAccuracy = (net, testData) => {
    const toBestOnly = (result) => {
        return result.black < result.white
        ? { white: 1 }
        : { black: 1 };
    }

    const samePropNames = (a, b) => {
        const APROPS = Object.getOwnPropertyNames(a);
        const BPROPS = Object.getOwnPropertyNames(b);
        return APROPS[0] === BPROPS[0];
    }

    const HITS = testData.reduce((acc, source) => {
        const output = toBestOnly(net.run(source.input));
        return samePropNames(output, source.output) ? acc + 1 : acc;
    }, 0);

    return HITS / testData.length;
};

module.exports = getAccuracy;
