<script setup>
	import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

	const enabled = !prefersReducedMotion();
	const useImage = prefersNativeScroll();
	const trackPointer = !useImage;

	const canvasRef = ref(null);
	const isReady = ref(false);
	let companion = null;
	let idleId = 0;

	const imageRef = ref(null);

	const onImageLoad = () => {
		isReady.value = true;
	};

	onMounted(() => {
		if (useImage && imageRef.value?.complete) isReady.value = true;
	});

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

	if (enabled && !useImage) {
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
		:class="{
			'CharacterCompanion--ready': isReady,
			'CharacterCompanion--image': useImage,
		}"
	>
		<picture
			v-if="useImage"
			class="CharacterCompanion__picture"
		>
			<source
				srcset="/models/character.webp"
				type="image/webp"
			/>
			<img
				ref="imageRef"
				class="CharacterCompanion__image"
				src="/models/character.png"
				alt=""
				width="1200"
				height="1600"
				decoding="async"
				fetchpriority="low"
				@load="onImageLoad"
			/>
		</picture>

		<canvas
			v-else
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

		&__canvas,
		&__picture,
		&__image {
			display: block;
			width: 100%;
			height: 100%;
		}

		&__image {
			object-fit: contain;
			object-position: center bottom;
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
