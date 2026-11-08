import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'api');

const toFixturePath = (url) => {
	const { pathname } = new URL(url);
	const contentPath = pathname.replace(/^\/[^/]+\/content\//, '');

	return `${contentPath}.json`;
};

const mockFetch = async (url) => {
	try {
		const filePath = join(fixturesDir, toFixturePath(url));
		const data = JSON.parse(await readFile(filePath, 'utf8'));

		return {
			ok: true,
			status: 200,
			json: async () => data,
		};
	} catch {
		return {
			ok: false,
			status: 404,
			json: async () => ({ status: 404 }),
		};
	}
};

export { mockFetch };
