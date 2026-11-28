<script setup>
	const props = defineProps({
		direction: {
			default: 'left',
			type: String,
			validator: (value) => ['left', 'right'].includes(value),
		},
		paused: {
			default: false,
			type: Boolean,
		},
		pauseOnHover: {
			default: false,
			type: Boolean,
		},
		speed: {
			default: 60, // px per second
			type: Number,
		},
	});

	const rootRef = ref(null);
	const trackRef = ref(null);
	const setCount = ref(2);

	let observer;

	const syncCloneFocus = () => {
		const track = trackRef.value;
		if (!track) return;

		[...track.children].forEach((set, index) => {
			if (index === 0) return;

			set.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach((el) => {
				el.setAttribute('tabindex', '-1');
			});
		});
	};

	// Clones stay clickable for the marquee, but must not take focus — otherwise
	// Chrome warns: aria-hidden ancestor + focused descendant.
	const onClonePointerDown = (event) => {
		const track = trackRef.value;
		const set = event.target.closest?.('.StyleTicker__set');
		if (!track || !set || set === track.children[0]) return;

		if (event.target.closest?.('a, button, input, select, textarea, [tabindex]')) {
			event.preventDefault();

			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}
	};

	const update = () => {
		const root = rootRef.value;
		const track = trackRef.value;
		const first = track?.children[0];
		if (!root || !track || !first?.offsetWidth) return;

		setCount.value = Math.max((Math.ceil(root.offsetWidth / first.offsetWidth) + 1) * 2, 2);

		nextTick(() => {
			track.style.animationDuration = `${track.scrollWidth / 2 / props.speed}s`;
			syncCloneFocus();
		});
	};

	onMounted(() => {
		update();

		observer = new ResizeObserver(update);
		observer.observe(rootRef.value);

		const firstSet = trackRef.value?.children[0];
		if (firstSet) observer.observe(firstSet);

		trackRef.value?.addEventListener('pointerdown', onClonePointerDown, true);
	});

	onUnmounted(() => {
		observer?.disconnect();
		trackRef.value?.removeEventListener('pointerdown', onClonePointerDown, true);
	});

	watch(
		() => props.speed,
		() => nextTick(update),
	);
</script>

<template>
	<div
		ref="rootRef"
		class="StyleTicker"
		:class="{
			'StyleTicker--right': direction === 'right',
			'StyleTicker--paused': paused,
			'StyleTicker--pause-on-hover': pauseOnHover,
		}"
	>
		<div
			ref="trackRef"
			class="StyleTicker__track"
		>
			<div
				v-for="index in setCount"
				:key="`style-ticker-set-${index}`"
				class="StyleTicker__set"
				:aria-hidden="index > 1 ? 'true' : undefined"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<style>
	.StyleTicker {
		width: 100%;
		overflow-x: clip;

		&__track {
			display: flex;
			width: max-content;
			animation: style-ticker linear infinite;
		}

		&--right &__track {
			animation-direction: reverse;
		}

		&--paused &__track,
		&--pause-on-hover:hover &__track {
			animation-play-state: paused;
		}

		&__set {
			display: flex;
			flex-shrink: 0;
		}
	}

	@keyframes style-ticker {
		to {
			translate: -50%;
		}
	}
</style>
