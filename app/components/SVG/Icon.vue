<script setup>
	import { svg } from '~/assets/svg';

	const props = defineProps({
		icon: {
			required: true,
			type: String,
			validator: (value) => value in svg,
		},
		overrideSize: {
			default: false,
			type: Boolean,
		},
	});

	const icon = svg?.[props.icon] || null;
</script>

<template>
	<PrimitiveSVG
		v-if="icon"
		class="SVGIcon"
		:override-size="overrideSize"
		:svg="icon"
	/>
</template>
