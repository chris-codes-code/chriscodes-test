import { defineNuxtModule } from '@nuxt/kit';
import { runLayoutBuild } from './run.js';

export default defineNuxtModule({
	meta: {
		name: 'layout',
		configKey: 'layout',
	},
	setup(_options, nuxt) {
		if (nuxt.options.dev || nuxt.options._prepare) return;

		nuxt.hooks.hook('build:before', async () => {
			await runLayoutBuild();
		});
	},
});
