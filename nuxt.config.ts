// https://nuxt.com/docs/api/configuration/nuxt-config

import layoutConfig from './app/assets/layout/config.json';

declare const process: { env: Record<string, string | undefined> };

const isStaging = process.env.STAGING_MODE === 'true';
const ssrEnabled = process.env.SSR_ENABLED === 'true';

export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			htmlAttrs: {
				lang: 'en-GB',
			},
			meta: [
				...(isStaging ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
				{
					name: 'description',
					content: 'Chris Codes Launch Kit Description',
				},
				{
					name: 'theme-color',
					content: '#ffffff',
				},
			],
			link: [
				{
					as: 'font',
					crossorigin: 'anonymous',
					href: '/fonts/nunito-regular.woff2',
					rel: 'preload',
					type: 'font/woff2',
				},
				{
					as: 'font',
					crossorigin: 'anonymous',
					href: '/fonts/roboto-regular.woff2',
					rel: 'preload',
					type: 'font/woff2',
				},
				{
					as: 'font',
					crossorigin: 'anonymous',
					href: '/fonts/roboto-bold.woff2',
					rel: 'preload',
					type: 'font/woff2',
				},
				{ rel: 'icon', href: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
				{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
			title: `Chris Codes Launch Kit`,
			viewport: 'width=device-width, initial-scale=1',
		},
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/index.css'],
	devtools: { enabled: false },
	image: {
		domains: ['placehold.co'],
		provider: process.env.VERCEL ? 'vercel' : 'ipx',
		quality: 80,
		densities: [1, 2],
		screens: layoutConfig.imageScreens,
		ipx: {
			modifiers: {
				format: 'webp',
			},
			maxAge: 60 * 60 * 24 * 30,
		},
		vercel: {
			formats: ['image/webp', 'image/avif'],
		},
	},
	modules: [
		'./modules/layout',
		...(ssrEnabled ? ['./modules/content'] : []),
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxtjs/sitemap',
	],
	site: {
		name: 'Chris Codes Launch Kit',
		url: process.env.SITE_URL,
	},
	sitemap: {
		enabled: !isStaging,
		excludeAppSources: true,
		urls: async () => {
			try {
				return (await import('./app/assets/content/site-map.json')).default;
			} catch {
				return [{ loc: '/' }];
			}
		},
	},
	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
		},
	},
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
			CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.CLOUDFLARE_TURNSTILE_SITE_KEY || '',
			DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
			GTM_ID: process.env.GTM_ID || '',
			SITE_URL: process.env.SITE_URL || '',
			SSR_ENABLED: process.env.SSR_ENABLED,
			STAGING_MODE: process.env.STAGING_MODE,
		},
	},
});
