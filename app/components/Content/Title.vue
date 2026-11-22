<script setup>
	defineProps({
		title: {
			default: null,
			type: String,
		},
		direction: {
			default: 'left',
			type: String,
		},
		level: {
			default: 'h2',
			type: String,
		},
		color: {
			default: null,
			type: String,
		},
	});

	const rootRef = ref(null);

	useScrollAnimation(rootRef, () => import('~/assets/animations/scroll/title.js'), 'animateContentTitle');
</script>

<template>
	<div
		v-if="title"
		ref="rootRef"
		class="ContentTitle"
	>
		<StyleTitlePrimary
			:title="title"
			:direction="direction"
			:level="level"
			:color="color"
		/>
	</div>
</template>
