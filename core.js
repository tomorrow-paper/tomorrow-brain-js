const brain = require('brain.js');
const fs = require('fs');

const accuracy = require('./accuracy');
const utils = require('./utils');
const ACTIONS = utils.actions;
const ROUND = utils.round;
const percent = utils.percent;

const NN_OPTS = {
    activation: 'sigmoid',
    errorThresh: 0.01,
    hiddenLayers: [7],
    iterations: 2000,
};

function datasetFromFilename(filename) {
    return new Promise((resolve, reject) => {
        const DATA_PATH = `${__dirname}/${filename}`;
        const DATA_STAT = fs.lstatSync(DATA_PATH);
        
        if (!DATA_STAT.isFile())
            reject(DATA_PATH, '- Should be a file');
        
        const DATA_STREAM = fs.readFileSync(DATA_PATH);
        const DATA_SET = JSON.parse(DATA_STREAM);

        resolve(DATA_SET);
    });
}

function testNN(options) {

    function extractSets(dataset) {
        const TRAIN_SET = dataset.slice(0, ROUND(dataset.length));
        const TEST_SET = dataset.slice(ROUND(dataset.length));
        return { first: TRAIN_SET, second: TEST_SET };
    }

    function trainNet(sets) {
        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(sets.first);
        return { net: _NET, tests: sets.second };
    }

    function findAccuracy(obj) {
        const ACCURACY = accuracy(obj.net, obj.tests);
        console.log('Accuracy:', percent(ACCURACY), '%');
    }

    return new Promise((resolve, reject) => {
        return datasetFromFilename(options.dataFile)
        .then(extractSets)
        .then(trainNet)
        .then(findAccuracy)
        .catch(reject);
    });
}

function trainNN(options) {
    return new Promise((resolve, reject) => {
        reject('Not implemented yet');
    });
}

function predictNN(options) {
    return new Promise((resolve, reject) => {
        const DATA_PATH = `${__dirname}/${options.dataFile}`;
        const INPUTS_PATH = `${__dirname}/${options.inputsFile}`;

        const DATA_STAT = fs.lstatSync(DATA_PATH);
        const INPUTS_STAT = fs.lstatSync(INPUTS_PATH);
        
        if (!DATA_STAT.isFile())
            reject(DATA_PATH + ': Should be a file');
        else if (!INPUTS_STAT.isFile())
            reject(INPUTS_PATH + ': Should be a file');
        
        const DATA_STREAM = fs.readFileSync(DATA_PATH);
        const INPUTS_STREAM = fs.readFileSync(INPUTS_PATH);

        const DATA_SET = JSON.parse(DATA_STREAM);
        const INPUTS_SET = JSON.parse(INPUTS_STREAM);
        
        const _NET = new brain.NeuralNetwork(NN_OPTS);
        _NET.train(DATA_SET);
        
        const GUESSES = INPUTS_SET.reduce((acc, test) => {
            let guess = _NET.run(test.input);
            acc.push(guess);
            return acc;
        }, []);
        
        const OUTPUT_PATH = `${__dirname}/${options.outputFile}`;
        const writing = fs.writeFileSync(OUTPUT_PATH, JSON.stringify(GUESSES));
    
        resolve('Success');
    });
}

module.exports = (config) => {
    const OPTIONS = config.options;
    const ACTION = config.action;

    return new Promise((resolve, reject) => {
        switch (ACTION) {
            case ACTIONS.TEST:
                return testNN(OPTIONS).then(resolve).catch(reject);
            case ACTIONS.TRAIN:
                return trainNN(OPTIONS).then(resolve).catch(reject);
            case ACTIONS.PREDICT:
                return predictNN(OPTIONS).then(resolve).catch(reject);
            default:
                reject('Unknown action');
        }
    });
};
