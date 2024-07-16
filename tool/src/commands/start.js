// const chalk = require('chalk');
import chalk from 'chalk';
import createLogger from '../logger.js';
const logger = createLogger('config:mgr');

export default function start(config) {
    logger.highlight('  Starting the app  ');
    logger.debug('Received configuration', config);
//   console.log(chalk.bgCyanBright('  Starting the app  '));
//   console.log(chalk.gray('Received configuration in start -'), config);
} 
