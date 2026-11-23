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
		/* Don't transition color here — parent (e.g. header island) already does.
		   Double color transitions lag badly on mobile Safari. */
		transition:
			background-color var(--transition-fast-ease),
			border-color var(--transition-fast-ease);

		&--text {
			width: auto;
			padding-inline: 16px;
			font-family: var(--font-family-primary);
			font-size: 13px;
			line-height: 1;
			white-space: nowrap;
		}

		button:focus-visible &,
		a:focus-visible &,
		button[data-active='true'] &,
		a[data-active='true'] & {
			background-color: var(--style-ui-button-icon-hover);
		}

		@media (hover: hover) and (pointer: fine) {
			button:hover &,
			a:hover & {
				background-color: var(--style-ui-button-icon-hover);
			}
		}
	}
</style>
