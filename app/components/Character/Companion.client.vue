<script setup>
	import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

	// Touch: show the companion, but skip pointer look-at.
	const enabled = !prefersReducedMotion();
	const isTouch = prefersNativeScroll();
	const trackPointer = !isTouch;

	const canvasRef = ref(null);
	const isReady = ref(false);
	let companion = null;
	let idleId = 0;
	let loadHandler = null;

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

	const scheduleStart = (canvas) => {
		const run = () => {
			if ('requestIdleCallback' in window) {
				// Touch: wait for real idle — forced early start fights Draco/WASM + first paint.
				idleId = window.requestIdleCallback(() => startCompanion(canvas), {
					timeout: isTouch ? 8000 : 1800,
				});
			} else {
				idleId = window.setTimeout(() => startCompanion(canvas), isTouch ? 2500 : 400);
			}
		};

		if (isTouch && document.readyState !== 'complete') {
			loadHandler = () => run();
			window.addEventListener('load', loadHandler, { once: true });
			return;
		}

		run();
	};

	if (enabled) {
		watch(canvasRef, (canvas) => {
			if (!canvas || companion) return;
			scheduleStart(canvas);
		});

		onBeforeUnmount(() => {
			if (loadHandler) window.removeEventListener('load', loadHandler);
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

	@media (pointer: coarse), (prefers-reduced-motion: reduce) {
		.CharacterCompanion {
			filter: none;
			scale: 1;
			transition: opacity 0.35s linear;

			&--ready {
				filter: none;
				scale: 1;
			}
		}
	}
</style>
