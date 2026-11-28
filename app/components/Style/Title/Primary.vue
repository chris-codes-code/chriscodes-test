<script setup>
	const SPEED = 60; // px per second
	const BREAK = '✱';

	const props = defineProps({
		title: {
			default: null,
			type: String,
		},
		level: {
			default: 'h1',
			type: String,
			validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(value),
		},
		direction: {
			default: 'left',
			type: String,
			validator: (value) => ['left', 'right'].includes(value),
		},
		color: {
			default: null,
			type: String,
			validator: (value) => !value || ['accent', 'black', 'white', 'dark'].includes(value),
		},
		clip: {
			default: false,
			type: Boolean,
		},
	});

	const colorStyle = computed(() => (props.color ? { color: `var(--color-${props.color})` } : undefined));

	const label = computed(() => {
		if (!props.title?.trim()) return '';

		return `${props.title.trim().toUpperCase().split(/\s+/).join(` ${BREAK} `)} ${BREAK}`;
	});

	const rootRef = ref(null);
	const trackRef = ref(null);
	const count = ref(2);

	let observer;

	const update = () => {
		const root = rootRef.value;
		const track = trackRef.value;
		const first = track?.children[0];
		if (!root || !track || !first?.offsetWidth) return;

		count.value = (Math.ceil(root.offsetWidth / first.offsetWidth) + 1) * 2;

		nextTick(() => {
			track.style.animationDuration = `${track.scrollWidth / 2 / SPEED}s`;
		});
	};

	onMounted(() => {
		update();

		observer = new ResizeObserver(update);
		observer.observe(rootRef.value);
	});

	onUnmounted(() => {
		observer?.disconnect();
	});

	watch(label, () => nextTick(update));
</script>

<template>
	<div
		v-if="label"
		ref="rootRef"
		class="StyleTitlePrimary"
		:class="{
			'StyleTitlePrimary--right': direction === 'right',
			'StyleTitlePrimary--clip': clip,
		}"
		:style="colorStyle"
	>
		<div
			ref="trackRef"
			class="StyleTitlePrimary__track"
		>
			<component
				:is="level"
				class="StyleTitlePrimary__text"
			>
				{{ label }}
			</component>

			<span
				v-for="index in Math.max(count - 1, 0)"
				:key="index"
				class="StyleTitlePrimary__text"
				aria-hidden="true"
			>
				{{ label }}
			</span>
		</div>
	</div>
</template>

<style>
	.StyleTitlePrimary {
		position: relative;
		width: 100%;
		overflow-x: clip;

		&__track {
			display: flex;
			width: max-content;
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;
			will-change: transform;
			animation: style-title-primary linear infinite;
		}

		&--right &__track {
			animation-direction: reverse;
		}

		&__text {
			flex-shrink: 0;
			margin: 0;
			font: var(--font-heading);
			font-size: calc(50svh - var(--core-header-height));
			white-space: nowrap;

			&::after {
				content: '\00a0';
			}
		}
	}

	@keyframes style-title-primary {
		to {
			translate: -50%;
		}
	}
</style>
