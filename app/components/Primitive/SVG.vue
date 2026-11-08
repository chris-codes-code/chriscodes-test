<script setup>
	const props = defineProps({
		svg: {
			required: true,
			type: Object,
		},
		overrideSize: {
			default: false,
			type: Boolean,
		},
	});

	const { 2: width, 3: height } = props.svg?.viewBox.split(' ') ?? [];
</script>

<template>
	<svg
		v-if="svg"
		class="PrimitiveSVG"
		focusable="false"
		preserveAspectRatio="xMidYMid meet"
		role="presentation"
		:width="overrideSize ? null : width"
		:height="overrideSize ? null : height"
		:viewBox="svg.viewBox"
		v-html="svg.path"
	/>
</template>

<style>
	.PrimitiveSVG {
		display: block;
	}
</style>
