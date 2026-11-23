<script setup>
	import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

	const enabled = !prefersReducedMotion();
	const trackPointer = !prefersNativeScroll();

	const canvasRef = ref(null);
	const isReady = ref(false);
	let companion = null;
	let idleId = 0;

	const startCompanion = async (canvas) => {
		if (!canvas || companion) return;

		const { createCursorCompanion } = await import('../../utils/cursor-companion.js');

		companion = createCursorCompanion(canvas, {
			trackPointer,
			onReady: () => {
				isReady.value = true;
			},
		});
	};

	if (enabled) {
		watch(canvasRef, (canvas) => {
			if (!canvas || companion) return;

			if ('requestIdleCallback' in window) {
				idleId = window.requestIdleCallback(() => startCompanion(canvas), { timeout: 1800 });
			} else {
				idleId = window.setTimeout(() => startCompanion(canvas), 400);
			}
		});

		onBeforeUnmount(() => {
			if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
			else window.clearTimeout(idleId);

			companion?.destroy();
			companion = null;
		});
	}
</script>

<template>
	<div
		v-if="enabled"
		aria-hidden="true"
		class="CharacterCompanion"
		:class="{ 'CharacterCompanion--ready': isReady }"
	>
		<canvas
			ref="canvasRef"
			class="CharacterCompanion__canvas"
		/>
	</div>
</template>

<style>
	.CharacterCompanion {
		position: absolute;
		z-index: 20;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		padding-bottom: calc(var(--core-header-height) * 0.5);
		opacity: 0;
		filter: blur(12px);
		scale: 0.94;
		transform-origin: 50% 60%;
		transition:
			opacity 0.9s var(--transition-ease-out),
			filter 0.9s var(--transition-ease-out),
			scale 1s var(--transition-ease-out);

		&--ready {
			opacity: 1;
			filter: blur(0);
			scale: 1;
		}

		&__canvas {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.CharacterCompanion {
			filter: none;
			scale: 1;
			transition: opacity 0.2s linear;

			&--ready {
				filter: none;
				scale: 1;
			}
		}
	}
</style>
