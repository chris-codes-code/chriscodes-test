<script setup>
	import { sanitiseText } from '../../../../../modules/content/utils/sanitise-text.js';

	const sampleInput = [
		'<p>Hello <strong>world</strong></p>',
		'<scr' + 'ipt>alert(1)</scr' + 'ipt>',
		'<img src=x onerror=alert(1)>',
		'<a href="javascript:alert(1)">bad link</a>',
		'<a href="https://example.com">good link</a>',
		'<p onclick="doSomething()">click me</p>',
	].join('\n');

	const sampleOutput = sanitiseText(sampleInput);
</script>

<template>
	<BlockContainer class="DeveloperComponentLibrarySectionSanitiseText">
		<StyleText>
			<p>
				Use
				<code>sanitiseText</code>
				(
				<code>modules/content/utils/sanitise-text.js</code>
				) when mapping CMS rich text in the content builder — typically via
				<code>formatText</code>
				. It keeps an allowlist of tags and attributes, and strips scripts, event handlers, and unsafe URLs before HTML
				reaches the page.
			</p>
		</StyleText>

		<div class="DeveloperComponentLibrarySectionSanitiseText__panel">
			<h3 class="DeveloperComponentLibrarySectionSanitiseText__label">Input</h3>

			<pre class="DeveloperComponentLibrarySectionSanitiseText__code"><code>{{ sampleInput }}</code></pre>
		</div>

		<div class="DeveloperComponentLibrarySectionSanitiseText__panel">
			<h3 class="DeveloperComponentLibrarySectionSanitiseText__label">Output</h3>

			<pre class="DeveloperComponentLibrarySectionSanitiseText__code"><code>{{ sampleOutput }}</code></pre>
		</div>

		<div class="DeveloperComponentLibrarySectionSanitiseText__panel">
			<h3 class="DeveloperComponentLibrarySectionSanitiseText__label">Rendered</h3>

			<StyleText>
				<PrimitiveHTML :html="sampleOutput" />
			</StyleText>
		</div>
	</BlockContainer>
</template>

<style>
	.DeveloperComponentLibrarySectionSanitiseText {
		&__panel {
			margin-top: var(--space-lg);
		}

		&__label {
			margin-bottom: var(--space-sm);
		}

		&__code {
			margin: 0;
			padding: var(--space-md);
			overflow-x: auto;
			border: 1px solid rgba(var(--color-black-rgb), 0.1);
			background: rgba(var(--color-black-rgb), 0.03);
			font-size: var(--font-size-code);
			line-height: 1.5;
			white-space: pre-wrap;
			word-break: break-word;
		}
	}
</style>
