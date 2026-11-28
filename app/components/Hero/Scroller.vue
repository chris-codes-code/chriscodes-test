<script setup>
	const rootRef = ref(null);
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/intro/landing.js')).animateLandingIntro;
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
		ref="rootRef"
		class="HeroScroller"
	>
		<div class="HeroScroller__container HeroScroller__container--primary">
			<StyleTitlePrimary
				title="code create repeat"
				direction="right"
			/>
		</div>

		<div
			id="about"
			class="HeroScroller__region HeroScroller__region--secondary"
		>
			<CharacterCompanion />

			<div class="HeroScroller__container HeroScroller__container--secondary">
				<StyleTitlePrimary
					title="code create repeat"
					level="span"
				/>
			</div>
		</div>
	</div>
</template>

<style>
	.HeroScroller {
		margin-top: calc(var(--core-header-height) * -1);
		transform-origin: 50% 30%;

		&__region {
			position: relative;

			&--secondary {
				/* svh stays stable when the mobile URL bar shows/hides */
				height: 50svh;
			}
		}

		&__container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 50svh;
			isolation: isolate;
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;

			&--primary {
				padding-top: var(--core-header-height);
			}

			&--secondary {
				position: relative;
				height: 100%;
				padding-bottom: var(--core-header-height);

				.StyleTitlePrimary {
					opacity: 0.25;
				}
			}
		}
	}
</style>
