<script setup>
	defineProps({
		gapX: {
			type: String,
			default: 'var(--columns-gap-x)',
		},
		gapY: {
			type: String,
			default: 'var(--columns-gap-y)',
		},
	});
</script>

<template>
	<div
		class="BlockColumns"
		:style="{ '--block-columns-gap-x': gapX, '--block-columns-gap-y': gapY }"
	>
		<slot />
	</div>
</template>

<style>
	.BlockColumns {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: calc(100% + var(--block-columns-gap-x));
		margin-top: calc(0px - var(--block-columns-gap-y));
		margin-left: calc(0px - var(--block-columns-gap-x));
	}
</style>
