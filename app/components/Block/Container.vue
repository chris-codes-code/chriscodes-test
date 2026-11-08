<script setup>
	import layoutConfig from '~/assets/layout/config.json';

	const props = defineProps({
		mode: {
			default: layoutConfig.containerMode,
			type: String,
			validator: (value) => ['contain', 'fluid', 'fluid-infinite'].includes(value),
		},
	});

	const classObj = {
		BlockContainer: true,
		[`BlockContainer--${props.mode}`]: true,
	};
</script>

<template>
	<div :class="classObj">
		<slot />
	</div>
</template>

<style>
	.BlockContainer {
		&--contain {
			--block-container-max-width: var(--container-width);
		}

		&--fluid {
			--block-container-max-width: var(--container-width-max);
		}

		&--fluid-infinite {
			--block-container-max-width: none;
			--container-gutter: var(--container-gutter-fluid);
			--columns-gap-x: var(--columns-gap-x-fluid);
			--columns-gap-y: var(--columns-gap-y-fluid);
			--content-width: calc(100% - var(--container-gutter) * 2);
		}

		width: 100%;
		max-width: var(--block-container-max-width);
		padding: 0 var(--container-gutter);
		margin: 0 auto;
	}
</style>
