<script setup>
	defineProps({
		text: {
			default: false,
			type: Boolean,
		},
	});
</script>

<template>
	<span
		class="StyleUIButtonIcon"
		:class="{ 'StyleUIButtonIcon--text': text }"
	>
		<slot />
	</span>
</template>

<style>
	.StyleUIButtonIcon {
		--style-ui-button-icon-hover: color-mix(in srgb, currentColor 5%, transparent);
		--style-ui-button-icon-hover-active: color-mix(in srgb, currentColor 15%, transparent);

		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 100%;
		min-height: 36px;
		color: inherit;
		background-color: transparent;
		border: 1px solid var(--style-ui-button-icon-hover);
		border-radius: 16px;
		corner-shape: squircle;
		transition: var(--theme-interactive-transition);

		&--text {
			width: auto;
			padding-inline: 16px;
			font-family: var(--font-family-primary);
			font-size: 13px;
			line-height: 1;
			white-space: nowrap;
		}

		button:focus-visible &,
		a:focus-visible & {
			background-color: var(--style-ui-button-icon-hover);
		}

		button[data-active='true']:focus-visible &,
		a[data-active='true']:focus-visible & {
			background-color: var(--style-ui-button-icon-hover-active);
		}

		@media (hover: hover) and (pointer: fine) {
			button:hover &,
			a:hover & {
				background-color: var(--style-ui-button-icon-hover);
			}

			button[data-active='true']:hover &,
			a[data-active='true']:hover & {
				background-color: var(--style-ui-button-icon-hover-active);
			}
		}
	}
</style>
