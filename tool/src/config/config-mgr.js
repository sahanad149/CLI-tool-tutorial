import chalk from 'chalk';
import { cosmiconfigSync } from 'cosmiconfig';
import schema from './schema.json' assert { type: 'json' };
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';
import createLogger from '../logger.js';

const logger = createLogger('config:mgr');
const ajv = new Ajv({ jsonPointers: true });
const configLoader = cosmiconfigSync('tool');

export default function getConfig() {
  const result = configLoader.search();

  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 }; // Default configuration
  } else {
    const isValid = ajv.validate(schema, result.config);

    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }

    logger.debug('Found configuration', result.config);
    return result.config;
  }
}
