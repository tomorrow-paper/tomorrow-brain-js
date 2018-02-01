const ACTIONS = require('./utils').actions; 

function processArgs(args) {
    return new Promise((resolve, reject) => {
        let options;
        let action;

        switch (args.length) {
            case 6:
                options = {
                    'inputsFile': process.argv[5],
                    'outputFile': process.argv[4],
                    'dataFile': process.argv[2]
                };
                action = ACTIONS.PREDICT;
                break;
            case 5:
                options = {
                    'outputFile': process.argv[4],
                    'dataFile': process.argv[2]
                };
                action = ACTIONS.TRAIN;
                break;
            case 3:
                options = {
                    'dataFile': process.argv[2]
                };
                action = ACTIONS.TEST;
                break;
            default:
                reject('Invalid args');
        }

        resolve({ options, action });
    });
}

module.exports = () => {
    return processArgs(process.argv);
};