import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { consola } from 'consola';
import { getLayout } from './get-layout.js';
import { buildBlockCss } from './builders/css/block-css.js';
import { buildMediaQueriesCss } from './builders/css/media-queries-css.js';
import { buildClientConfigJson } from './builders/client-config.js';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const writeOutput = async (relativePath, contents) => {
	const filePath = resolve(rootDir, relativePath);
	await mkdir(dirname(filePath), { recursive: true });
	await writeFile(filePath, contents, 'utf8');
};

const runLayoutBuild = async () => {
	consola.info('Building layout...');

	const layout = getLayout();

	await writeOutput('app/assets/layout/css/media-queries.css', buildMediaQueriesCss(layout));
	await writeOutput('app/assets/layout/css/block.css', buildBlockCss(layout));
	await writeOutput('app/assets/layout/config.json', buildClientConfigJson(layout));

	consola.success('Layout built successfully');
};

export { runLayoutBuild };
