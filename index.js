/**
 * ARGV
 * [fichier dataset entrainement]
 * optional 
 *      -t, --train [fichier de sortie]
 *      -p, --predict [fichier de sortie] [fichier dataset inputs]
 * }
 * 
 * Par défaut, avec un seul argument, test de la précision d'un
 * réseau (par division du dataset en 2).
 * Avec -t ou --train, entrainement d'un brain.NeuralNetwork et
 * enregistrement au format JSON.
 * Avec -p ou --predict, entrainement d'un NN, test des inputs et
 * enregistrement des sorties au format JSON.
 * 
 * DATASET
 * [ ... { input: Object || Array, output: Object || Array } ]
 */

const runCore = require('./core');
const argvToOpts = require('./argv-to-opts');

argvToOpts()
.then(runCore)
.then(console.info)
.catch(console.error);