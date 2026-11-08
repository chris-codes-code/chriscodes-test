// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	{
		rules: {
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-unused-vars': 'warn',
			'prefer-const': 'warn',
			'no-var': 'error',
			eqeqeq: ['error', 'always'],
			'vue/no-unused-components': 'warn',
			'vue/require-default-prop': 'warn',
			'vue/html-self-closing': [
				'warn',
				{
					html: {
						void: 'any',
						normal: 'any',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
			'vue/html-closing-bracket-newline': [
				'error',
				{
					singleline: 'never',
					multiline: 'always',
				},
			],
			'vue/html-closing-bracket-spacing': [
				'error',
				{
					selfClosingTag: 'always',
				},
			],
			'vue/multiline-html-element-content-newline': [
				'error',
				{
					ignores: ['pre', 'textarea'],
				},
			],
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: { max: 1 },
					multiline: { max: 1 },
				},
			],
			'vue/html-indent': [
				'error',
				'tab',
				{
					baseIndent: 1,
					alignAttributesVertically: false,
				},
			],
			'vue/padding-line-between-tags': [
				'error',
				[
					{
						blankLine: 'always',
						prev: '*',
						next: '*',
					},
				],
			],
		},
	},
	{
		files: ['app/components/Primitive/HTML.vue', 'app/components/Primitive/SVG.vue'],
		rules: {
			'vue/no-v-html': 'off',
		},
	},
);
