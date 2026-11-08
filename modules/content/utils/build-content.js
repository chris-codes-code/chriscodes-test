import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

const buildContent = (directory, path, content) => {
	try {
		const contentDir = join(process.cwd(), directory);
		mkdirSync(contentDir, { recursive: true });

		const filePath = join(contentDir, path);
		mkdirSync(dirname(filePath), { recursive: true });
		writeFileSync(filePath, `${JSON.stringify(content, null, '\t')}\n`, 'utf-8');
	} catch (error) {
		throw new Error(`Failed to write content file ${path}: ${error.message}`, { cause: error });
	}
};

export { buildContent };
