<script setup>
	import { createCursorCompanion } from '../../utils/cursor-companion.js';

	const canvasRef = ref(null);
	let companion = null;

	watch(canvasRef, (canvas) => {
		if (!canvas || companion) return;

		companion = createCursorCompanion(canvas);
	});

	onBeforeUnmount(() => {
		companion?.destroy();
		companion = null;
	});
</script>

<template>
	<div
		aria-hidden="true"
		class="CharacterCompanion"
	>
		<canvas
			ref="canvasRef"
			class="CharacterCompanion__canvas"
		/>
	</div>
</template>

<style>
	.CharacterCompanion {
		position: fixed;
		z-index: 20;
		inset: 0;
		overflow: hidden;
		pointer-events: none;

		&__canvas {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
