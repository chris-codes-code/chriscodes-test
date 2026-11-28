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
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/scroll/title.js')).animateContentTitle;
		animation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		rootEl = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && rootEl) animation.cleanup(rootEl);
	});
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
