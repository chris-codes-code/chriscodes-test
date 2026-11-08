import { defineNuxtModule } from '@nuxt/kit';
import { runContentBuild } from './run.js';

export default defineNuxtModule({
	meta: {
		name: 'content',
		configKey: 'content',
	},
	defaults: {
		outputDir: 'app/assets/content',
	},
	setup(options, nuxt) {
		if (nuxt.options.dev || nuxt.options._prepare) return;

		nuxt.hooks.hook('build:before', async () => {
			await runContentBuild(options);
		});
	},
});
