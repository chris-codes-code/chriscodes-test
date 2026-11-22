<script setup>
	import { initiateMasonry } from './utils/initiate-masonry.js';

	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		itemCount: {
			default: null,
			type: Number,
		},
	});

	const attrs = useAttrs();
	const containerRef = ref(null);

	const getContainer = () => {
		const value = containerRef.value;
		if (!value) return null;
		return value instanceof HTMLElement ? value : value.$el;
	};

	const layout = (force = false) => {
		initiateMasonry(getContainer(), { force });
	};

	watch(
		() => props.itemCount,
		() => {
			nextTick(() => layout(true));
		},
	);

	onMounted(() => {
		const container = getContainer();
		if (!container) return;

		layout(true);

		const onResize = () => layout();
		const onLoad = () => nextTick(() => layout(true));
		const observer = new ResizeObserver(onResize);

		observer.observe(container);
		window.addEventListener('resize', onResize);
		container.addEventListener('load', onLoad, true);

		onUnmounted(() => {
			observer.disconnect();
			window.removeEventListener('resize', onResize);
			container.removeEventListener('load', onLoad, true);
		});
	});
</script>

<template>
	<BlockColumns
		ref="containerRef"
		class="UIMasonry"
		v-bind="attrs"
		gap-x="calc(var(--columns-gap-y) * 1)"
		gap-y="calc(var(--columns-gap-y) * 2)"
	>
		<slot />
	</BlockColumns>
</template>

<style>
	.UIMasonry {
		position: relative;
	}
</style>
