#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import createLogger from '../src/logger.js';
import getConfig from '../src/config/config-mgr.js';
import start from '../src/commands/start.js';

const logger = createLogger('config:mgr');

// Enable debug logging
import debug from 'debug';
debug.enable('*'); // Enable all debug messages

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });

  logger.debug('Received args', args);

  if (args['--start']) {
    const config = getConfig();
    start(config);
  } else if (args['--build']) {
    // Implement build logic if needed
    logger.debug('Build command is not yet implemented');
    // build();
  } else {
    usage();
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}
