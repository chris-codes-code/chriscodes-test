<script setup>
	defineProps({
		alt: {
			required: true,
			type: String,
		},
		decoding: {
			default: 'auto',
			type: String,
			validator: (value) => ['async', 'auto', 'sync'].includes(value),
		},
		fetchpriority: {
			default: 'auto',
			type: String,
			validator: (value) => ['auto', 'high', 'low'].includes(value),
		},
		fit: {
			default: 'cover',
			type: String,
		},
		height: {
			required: true,
			type: Number,
		},
		loading: {
			default: 'lazy',
			type: String,
			validator: (value) => ['lazy', 'eager'].includes(value),
		},
		objectPosition: {
			default: null,
			type: String,
		},
		preload: {
			default: false,
			type: Boolean,
		},
		sizes: {
			default: null,
			type: String,
		},
		src: {
			required: true,
			type: String,
		},
		width: {
			required: true,
			type: Number,
		},
	});

	const emit = defineEmits(['image-loaded']);
</script>

<template>
	<NuxtImg
		:alt="alt"
		background="transparent"
		class="PrimitiveImage"
		:decoding="decoding"
		:fetchpriority="fetchpriority"
		:fit="fit"
		:height="height"
		:loading="loading"
		:preload="preload"
		:sizes="sizes"
		:src="src"
		:style="{ objectPosition: objectPosition || '50% 50%' }"
		:width="width"
		@load="emit('image-loaded', $event.target)"
	/>
</template>

<style>
	.PrimitiveImage {
		display: block;
	}
</style>
