<template>
	<span class="ActionIconLoader" />
</template>

<style>
	.ActionIconLoader {
		--action-icon-loader-size: 1.25em;
		--action-icon-loader-mask:
			conic-gradient(transparent 10%, currentColor), linear-gradient(currentColor 0 0) content-box;

		display: block;
		width: var(--action-icon-loader-size);
		height: var(--action-icon-loader-size);
		padding: 0.25em;
		border-radius: 50%;
		background: currentColor;
		-webkit-mask: var(--action-icon-loader-mask);
		mask: var(--action-icon-loader-mask);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: rotate 1s infinite linear;
	}
</style>
