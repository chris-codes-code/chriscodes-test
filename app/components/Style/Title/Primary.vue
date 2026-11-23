<script setup>
	const SPEED = 60; // px per second
	const BREAK = '✱';
	const MAX_BOOST = 1.25; // peak extra speed (1 → 2.25×)
	const IMPULSE = 0.004; // boost added per px scrolled
	const DECAY = 0.965; // per-frame energy decay (~smooth ease-out)

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

	const colorStyle = computed(() =>
		props.color ? { color: `var(--color-${props.color})` } : undefined,
	);

	const label = computed(() => {
		if (!props.title?.trim()) return '';

		return `${props.title.trim().toUpperCase().split(/\s+/).join(` ${BREAK} `)} ${BREAK}`;
	});

	const rootRef = ref(null);
	const trackRef = ref(null);
	const count = ref(2);

	let energy = 0;
	let lastScrollY = 0;
	let frame = 0;
	let observer;

	const update = () => {
		const root = rootRef.value;
		const track = trackRef.value;
		const first = track?.children[0];
		if (!root || !track || !first?.offsetWidth) return;

		count.value = (Math.ceil(root.offsetWidth / first.offsetWidth) + 1) * 2;

		nextTick(() => {
			track.style.animationDuration = `${track.scrollWidth / 2 / SPEED}s`;
			track.style.animationPlaybackRate = 1 + energy;
		});
	};

	const onWindowScroll = () => {
		const scrollY = window.scrollY;
		const delta = Math.abs(scrollY - lastScrollY);
		lastScrollY = scrollY;
		energy = Math.min(energy + delta * IMPULSE, MAX_BOOST);
	};

	const tick = () => {
		energy *= DECAY;
		if (energy < 0.001) energy = 0;

		if (trackRef.value) {
			trackRef.value.style.animationPlaybackRate = 1 + energy;
		}

		frame = requestAnimationFrame(tick);
	};

	onMounted(async () => {
		await document.fonts.ready;
		update();

		observer = new ResizeObserver(update);
		observer.observe(rootRef.value);

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!reduceMotion) {
			lastScrollY = window.scrollY;
			window.addEventListener('scroll', onWindowScroll, { passive: true });
			frame = requestAnimationFrame(tick);
		}
	});

	onUnmounted(() => {
		observer?.disconnect();
		window.removeEventListener('scroll', onWindowScroll);
		cancelAnimationFrame(frame);
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
		<span
			v-if="clip"
			class="StyleTitlePrimary__glow"
			aria-hidden="true"
		/>

		<div
			ref="trackRef"
			class="StyleTitlePrimary__track"
		>
			<component
				:is="level"
				class="StyleTitlePrimary__item"
			>
				{{ label }}
			</component>

			<span
				v-for="index in Math.max(count - 1, 0)"
				:key="index"
				class="StyleTitlePrimary__item"
				aria-hidden="true"
			>
				{{ label }}
			</span>
		</div>
	</div>
</template>

<style>
	@property --style-title-primary-accent {
		syntax: '<color>';
		inherits: true;
		initial-value: #dfff4f;
	}

	@property --style-title-primary-violet {
		syntax: '<color>';
		inherits: true;
		initial-value: #b66dff;
	}

	.StyleTitlePrimary {
		--style-title-primary-accent: var(--color-accent);
		--style-title-primary-violet: #b66dff;

		position: relative;
		width: 100%;
		overflow-x: clip;

		&__glow {
			display: none;
		}

		&__track {
			display: flex;
			width: max-content;
			animation: style-title-primary linear infinite;
		}

		&--right &__track {
			animation-direction: reverse;
		}

		&__item {
			flex-shrink: 0;
			margin: 0;
			font: var(--font-heading);
			font-size: calc(50vh - var(--core-header-height));
			line-height: 1;
			white-space: nowrap;

			&::after {
				content: '\00a0';
			}
		}

		&--clip {
			transition:
				--style-title-primary-accent var(--theme-color-ease),
				--style-title-primary-violet var(--theme-color-ease);

			.StyleTitlePrimary__item {
				color: transparent;
				background:
					radial-gradient(circle at 30% 40%, var(--style-title-primary-accent), transparent 42%),
					radial-gradient(circle at 70% 60%, var(--style-title-primary-violet), transparent 42%),
					linear-gradient(100deg in oklch, var(--style-title-primary-accent), var(--style-title-primary-violet));
				background-size: 160% 160%;
				background-position: 30% 40%;
				background-attachment: fixed;
				-webkit-background-clip: text;
				background-clip: text;
			}

			@supports (mask-clip: text) {
				-webkit-mask-image: linear-gradient(#000, #000);
				mask-image: linear-gradient(#000, #000);
				-webkit-mask-clip: text;
				mask-clip: text;
				-webkit-mask-repeat: no-repeat;
				mask-repeat: no-repeat;

				.StyleTitlePrimary__glow {
					display: block;
					position: absolute;
					z-index: 0;
					inset: -24%;
					pointer-events: none;
					background:
						radial-gradient(circle at 30% 40%, var(--style-title-primary-accent), transparent 42%),
						radial-gradient(circle at 70% 60%, var(--style-title-primary-violet), transparent 42%),
						linear-gradient(100deg in oklch, var(--style-title-primary-accent), var(--style-title-primary-violet));
					filter: blur(60px);
					animation: style-title-primary-drift 9s ease-in-out infinite alternate;
				}

				.StyleTitlePrimary__track {
					position: relative;
					z-index: 1;
				}

				.StyleTitlePrimary__item {
					color: inherit;
					background: none;
					-webkit-background-clip: unset;
					background-clip: unset;
					background-attachment: unset;
				}
			}
		}
	}

	[data-theme='light'] .StyleTitlePrimary--clip {
		--style-title-primary-accent: oklch(from var(--color-accent) 0.58 c h);
		--style-title-primary-violet: oklch(from #b66dff 0.55 c h);
	}

	@keyframes style-title-primary {
		to {
			translate: -50%;
		}
	}

	@keyframes style-title-primary-drift {
		to {
			translate: 10% -8%;
			rotate: 25deg;
			scale: 1.2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.StyleTitlePrimary__track {
			animation: none;
		}

		.StyleTitlePrimary__glow {
			animation: none;
		}
	}
</style>
