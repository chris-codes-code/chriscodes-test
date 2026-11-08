import { config } from 'dotenv';
import { CONTENT_BUILDERS, runContentBuild } from './run.js';

config();

const requestedContent = process.argv.slice(2).filter((arg) => CONTENT_BUILDERS.includes(arg));

await runContentBuild({ outputDir: 'app/assets/content' }, requestedContent);
