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
					content: 'Full-stack developer specialising in digital UI/UX experiences.',
				},
				{
					name: 'theme-color',
					content: '#111111',
				},
			],
			link: [
				{ crossorigin: 'anonymous', href: 'https://stream.mux.com', rel: 'preconnect' },
				{ crossorigin: 'anonymous', href: 'https://www.datocms-assets.com', rel: 'preconnect' },
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
				{ rel: 'icon', href: '/favicon.png', type: 'image/png', sizes: '32x32' },
				{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
			title: 'Chris Codes',
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
	experimental: {
		appManifest: false,
	},
	image: {
		domains: ['placehold.co', 'www.datocms-assets.com'],
		provider: process.env.VERCEL ? 'vercel' : 'ipx',
		format: ['avif', 'webp'],
		quality: 75,
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
	nitro: {
		compressPublicAssets: true,
		minify: true,
	},
	site: {
		name: 'Chris Codes',
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
	routeRules: {
		'/**': {
			headers: {
				'Content-Security-Policy':
					"default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; frame-src 'self'; img-src 'self' data: blob: https:; font-src 'self' data: https:; media-src 'self' blob: https:; connect-src 'self' blob: data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; worker-src 'self' blob:; upgrade-insecure-requests",
				'Referrer-Policy': 'strict-origin-when-cross-origin',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'SAMEORIGIN',
			},
		},
		'/_ipx/**': {
			headers: {
				'cache-control': 'public, max-age=2592000, immutable',
			},
		},
		'/fonts/**': {
			headers: {
				'cache-control': 'public, max-age=31536000',
			},
		},
		'/favicon.ico': {
			headers: {
				'cache-control': 'public, max-age=86400',
			},
		},
		'/favicon.png': {
			headers: {
				'cache-control': 'public, max-age=86400',
			},
		},
		'/favicon.svg': {
			headers: {
				'cache-control': 'public, max-age=86400',
			},
		},
	},
	runtimeConfig: {
		emailAccountUsername: process.env.EMAIL_ACCOUNT_USERNAME || '',
		emailAccountPassword: process.env.EMAIL_ACCOUNT_PASSWORD || '',
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
	vite: {
		build: {
			reportCompressedSize: false,
		},
		esbuild: {
			legalComments: 'none',
		},
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag === 'mux-player',
		},
	},
});
